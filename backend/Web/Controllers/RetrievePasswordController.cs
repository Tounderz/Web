using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using Web.Migrations;
using WebLibrary.Abstract;
using WebLibrary.ConstParameters;
using WebLibrary.Models.Dtos;

namespace Web.Controllers
{
    [Route(RetrievePasswordConst.RETRIEVE_ROUTE)]
    [ApiController]
    public class RetrievePasswordController : ControllerBase
    {
        private readonly IRetrievePassword _retrieve;
        private readonly IAuthorization _auth;

        public RetrievePasswordController(IRetrievePassword retrieve, IAuthorization auth)
        {
            _retrieve = retrieve;
            _auth = auth;
        }

        [HttpGet(RetrievePasswordConst.HTTP_GET_RETRIEVE_PASSWORD)]
        public IActionResult RetrievePassword(string email)
        {
            var user = _auth.GetUserByEmail(email);
            if (user == null)
            {
                return BadRequest(new { message = ConstAuth.ERROR_INCORRECT_EMAIL });
            }

            var messageSendingCheck = _retrieve.CreateToken(email);
            if (!messageSendingCheck)
            {
                return BadRequest(new { message = ConstAuth.ERROR_MESSAGE_LOGIN_OR_EMAIL });
            }

            return Ok();
        }

        [HttpPost(RetrievePasswordConst.HTTP_POST_CREATE_NEW_PASSWORD)]
        public IActionResult CreateNewPassword(RetrievePasswordDtoModel model)
        {
            var user = _retrieve.RetrievePasswordService(model.Token);
            if (user == null)
            {
                var messageSendingCheck = _retrieve.UpdateToken(model.Token);
                return BadRequest(new { message = RetrievePasswordConst.ERROR_INCORRECT_EMAIL_OUTDATED_LINK });
            }

            if (BCrypt.Net.BCrypt.Verify(model.NewPassword, user.Password))
            {
                return BadRequest(new { message = ConstAuth.ERROR_MESSAGE_UPDATE_PASSWORD });
            }

            _auth.UpdatePassword(model.NewPassword, user);
            _retrieve.TokenRemotalFromBD(model.Token);

            return Ok(new { message = ConstAuth.MESSAGE_PASSWORD_SUCCESSFULY });
        }
    }
}
