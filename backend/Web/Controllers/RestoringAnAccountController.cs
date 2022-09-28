using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Principal;
using WebLibrary.Abstract;
using WebLibrary.ConstParameters;

namespace Web.Controllers
{
    [Route(RestoringConst.RESTORING_ROUTE)]
    [ApiController]
    public class RestoringAnAccountController : ControllerBase
    {
        private readonly IRestoringAnAccount _restoring;
        private readonly ISendEmail _sendEmail;

        public RestoringAnAccountController(IRestoringAnAccount restoring, ISendEmail sendEmail)
        {
            _restoring = restoring;
            _sendEmail = sendEmail;
        }

        [HttpGet(RestoringConst.HTTP_GET_RESTORING)]
        public IActionResult RestoringAnAccount(string email)
        {
            var account = _restoring.Restoring(email);
            if (account == null)
            {
                return BadRequest( new { message = RestoringConst.ERROR_NO_ACCOUNT });
            }

            var messageBody = _sendEmail.MessageBodyRestoringAnAccount(account.RestoringToken);
            var send = !string.IsNullOrEmpty(messageBody) && _sendEmail.SendEmail(email, messageBody, RestoringConst.SUBJECK_RESTORING);
            if (!send)
            {
                return BadRequest(new { message = RestoringConst.ERROR_NO_ACCOUNT });
            }

            return Ok( new { message = RestoringConst.MESSAGE_SEND } );
        }

        [HttpGet(RestoringConst.HTTP_GET_RESTORED)]
        public IActionResult RestoredAccount(string token)
        {
            var isDeleted = true;
            var account = _restoring.GetUserByToken(token);
            var resultDate = DateTime.Compare(account.DateExpiresToken, DateTime.Now);
            if (resultDate < 1)
            {
                account = _restoring.UpdatingToken(account);
                var messageBody = _sendEmail.MessageBodyRestoringAnAccount(account.RestoringToken);
                var send = !string.IsNullOrEmpty(messageBody) && _sendEmail.SendEmail(account.UserEmail, messageBody, RestoringConst.SUBJECK_RESTORING);
                if (!send)
                {
                    return BadRequest(new { message = RestoringConst.ERROR_NO_ACCOUNT, isDeleted = isDeleted });
                }

                return BadRequest(new { message = RestoringConst.MESSAGE_UPDATE_TOKEN, isDeleted = isDeleted });
            }

            var user = _restoring.RestoringUser(account);
            if (user == null)
            {
                return BadRequest(new { message = RestoringConst.ERROR_NO_ACCOUNT, isDeleted = isDeleted });
            }

            return Ok( new { message = RestoringConst.MESSAGE_RESTORED_ACCOUNT, isDeleted = user.IsDeleted });
        }
    }
}
