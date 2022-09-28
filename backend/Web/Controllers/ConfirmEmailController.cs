using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebLibrary.Abstract;
using WebLibrary.ConstParameters;

namespace Web.Controllers
{
    [Route(ConfirmEmailConst.CONFIRM_ROUTE)]
    [ApiController]
    public class ConfirmEmailController : ControllerBase
    {
        private readonly IConfirmEmail _confirmEmail;
        private readonly ISendEmail _sendEmail;

        public ConfirmEmailController(IConfirmEmail confirmEmail, ISendEmail sendEmail)
        {
            _confirmEmail = confirmEmail;
            _sendEmail = sendEmail;
        }

        [HttpGet(ConfirmEmailConst.HTTP_GET_CONFIRM_EMAIL)]
        public IActionResult ConfirmEmail(string token)
        {
            var user = _confirmEmail.ConfirmEmailService(token);
            if (user == null)
            {
                return BadRequest(new { message = ConfirmEmailConst.ERROR_INCORRECT_EMAIL_OUTDATED_LINK });
            }

            if (!user.ConfirmEmail)
            {
                var confirmEmail = _confirmEmail.UpdatingToken(user.Email);
                var messageBody = _sendEmail.MessageBodyConfirmEmail(confirmEmail.ConfirmEmailToken);
                var messageSendingCheck = messageBody != null && _sendEmail.SendEmail(user.Email, messageBody, ConfirmEmailConst.SUBJECK_CONFIRM_EMAIL);
                if (!messageSendingCheck)
                {
                    return BadRequest(new { message = ConfirmEmailConst.ERROR_CONFIRM_EMAIL });
                }

                return BadRequest(new { message = ConfirmEmailConst.UPDATE_TOKEN });
            }

            var userConfirmEmail = user.ConfirmEmail.ToString().ToLower();
            _confirmEmail.TokenRemotalFromBD(token);

            return Ok(new { confirmEmail = userConfirmEmail, message = ConfirmEmailConst.MESSAGE_CONFIRM_AUTHORIZATION });
        }

        [HttpGet(ConfirmEmailConst.HTTP_GET_UPDATE_TOKEN)]
        public IActionResult UpdateToken(string email)
        {
            var confirmEmail = _confirmEmail.UpdatingToken(email);
            if (confirmEmail == null)
            {
                return BadRequest(new { message = ConfirmEmailConst.ERROR_CONFIRM_EMAIL });
            }

            return Ok(new { message = ConfirmEmailConst.UPDATE_TOKEN });
        }
    }
}
