using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Web.Migrations;
using WebLibrary.Abstract;
using WebLibrary.ConstParameters;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace Web.Controllers
{
    [Route(ConstAuth.AUTH_ROUTE)]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly IAuthorization _auth;
        private readonly IJwt _jwtService;
        private readonly IGeneralMethods _generalMethods;
        private readonly IConfirmEmail _confirmEmail;

        public AuthorizationController(
            IAuthorization auth, IJwt jwtService,
            IGeneralMethods generalMethods, IConfirmEmail confirmEmail)
        {
            _auth = auth;
            _jwtService = jwtService;
            _generalMethods = generalMethods;
            _confirmEmail = confirmEmail;
        }

        [HttpGet(ConstAuth.HTTP_GET_GET_USER)]
        public IActionResult GetUser(string login)
        {
            var user = _auth.GetByUser(login);
            return Ok(new { user = user });
        }

        [HttpPost(ConstAuth.HTTP_POST_LOGIN)]
        public IActionResult Login(UserLoginModel model)
        {
            var user = _auth.GetByUser(model.Login);
            if (user == null)
            {
                return BadRequest(new { message = ConstAuth.ERROR_MESSAGE_INVALID_LOGIN });
            }

            if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
            {
                return BadRequest(new { message = ConstAuth.ERROR_MESSAGE_INVALID_PASSWORD });
            }

            if (!user.ConfirmEmail)
            {
                var confirmEmail = _confirmEmail.UpdatingToken(user.Email);
                return BadRequest(new { message = ConfirmEmailConst.ERROR_CONFIRM_EMAIL });
            }

            if (user.IsDeleted)
            {
                return Ok( new {message = ConstAuth.ERROR_DELETED_ACCOUNT, isDeleted = user.IsDeleted });
            }

            var accessToken = _jwtService.GenerateJwt(user);
            var refreshToken = _jwtService.GenerateRefreshToken(user.Id);
            var userDto = _auth.CreateUserDto(user);

            return Ok(new
            {
                isDeleted = user.IsDeleted,
                user = userDto,
                accessToken = accessToken
            });
        }

        [HttpPost(ConstAuth.HTTP_POST_REGISTER)]
        public IActionResult Register()
        {
            var model = GetUserRegisterModel();
            var checkLoginAndEmail = model != null && _auth.CheckUser(model.Login, model.Email);
            if (!checkLoginAndEmail)
            {
                return BadRequest(new { message = ConstAuth.ERROR_MESSAGE_LOGIN_OR_EMAIL });
            }

            var messageSendingCheck = _confirmEmail.CreateToken(model.Email);
            if (!messageSendingCheck)
            {
                return BadRequest(new { message = ConstAuth.ERROR_MESSAGE_LOGIN_OR_EMAIL });
            }

            var user = _auth.CreateUser(model);

            return Ok(new { user = user });
        }

        [Authorize]
        [HttpPost(ConstAuth.HTTP_POST_REFRESH_TOKEN)]
        public IActionResult RefreshToken()
        {
            var jwtToken = "";

            foreach (var header in Request.Headers)
            {
                if (header.Key == ConstAuth.AUTHORIZATION)
                {
                    jwtToken = header.Value;
                    break;
                }
            }

            var token = _jwtService.Verify(jwtToken[7..]);
            if (token != null && !token.Header.Alg.Equals(SecurityAlgorithms.HmacSha256))
            {
                return Unauthorized();
            }

            var user = _auth.GetByUserFromToken(token);
            var refreshTokenModel = _jwtService.GetRefreshToken(user.Id);
            if (refreshTokenModel == null)
            {
                return Unauthorized();
            }

            var accessToken = _jwtService.GenerateJwt(user);
            var refreshToken = _jwtService.GenerateRefreshToken(user.Id);
            var userDto = _auth.CreateUserDto(user);

            return Ok(new
            {
                accessToken = accessToken,
                user = userDto
            });
        }

        [HttpGet(ConstAuth.HTTP_GET_LIST_USERS)]
        public IActionResult ListUsers(int page)
        {
            var users = _auth.GetByUsersList();
            var (countPages, usersList) = _generalMethods.GetUsersList(users, page);
            return Ok(new
            {
                usersList = usersList,
                countPages = countPages
            });
        }

        [HttpPost(ConstAuth.HTTP_POST_UPDATE_USER_BY_ADMIN)]
        public IActionResult UpdateUserByAdmin()
        {
            var model = GetUserRegisterModel();
            if (model.Email != string.Empty)
            {
                var messageSendingCheck = _confirmEmail.CreateToken(model.Email);
                if (!messageSendingCheck)
                {
                    return BadRequest(new { message = ConstAuth.ERROR_MESSAGE_LOGIN_OR_EMAIL });
                }
            }

            var user = model != null ? _auth.UpdateUser(model) : null;
            if (user == null)
            {
                return BadRequest(new { message = ConstAuth.ERROR_MESSAGE_LOGIN_OR_EMAIL });
            }

            var users = _auth.GetByUsersList();
            var list = _generalMethods.GetUsersList(users, ConstParameters.START_PAGE);
            return Ok(new { usersList = list.users, countPages = list.countPages });
        }

        [HttpPost(ConstAuth.HTTP_POST_UPDATE_USER_BY_USER)]
        public IActionResult UpdateUserByUser()
        {
            var model = GetUserRegisterModel();
            if (!string.IsNullOrEmpty(model.Email))
            {
                var messageSendingCheck = _confirmEmail.CreateToken(model.Email);
                if (!messageSendingCheck)
                {
                    return BadRequest(new { message = ConstAuth.ERROR_MESSAGE_LOGIN_OR_EMAIL });
                }
            }

            var user = model != null ? _auth.UpdateUser(model) : null;
            if (user == null)
            {
                return BadRequest(new { message = ConstAuth.ERROR_MESSAGE_LOGIN_OR_EMAIL });
            }

            return Ok(new { user = user });
        }

        [HttpPost(ConstAuth.HTTP_POST_UPDATE_PASSWORD)]
        public IActionResult UpdatePassword()
        {
            string oldPassword = !string.IsNullOrEmpty(Request.Form.FirstOrDefault(i => i.Key == FormFields.OLD_PASSWORD).Value) ?
                                 Request.Form.FirstOrDefault(i => i.Key == FormFields.OLD_PASSWORD).Value : string.Empty;
            string newPassword = !string.IsNullOrEmpty(Request.Form.FirstOrDefault(i => i.Key == FormFields.NEW_PASSWORD).Value) ?
                                 Request.Form.FirstOrDefault(i => i.Key == FormFields.NEW_PASSWORD).Value : string.Empty;
            int idUser = !string.IsNullOrEmpty(Request.Form.FirstOrDefault(i => i.Key == FormFields.ID_USER).Value) ?
                         int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.ID_USER).Value) : 0;
            var user = _auth.GetUserById(idUser);
            if (user == null)
            {
                return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
            }

            if (!BCrypt.Net.BCrypt.Verify(oldPassword, user.Password))
            {
                return BadRequest(new { message = ConstAuth.ERROR_MESSAGE_UPDATE_PASSWORD });
            }

            user = _auth.UpdatePassword(newPassword, user);
            return Ok(new { user = user });
        }

        [HttpDelete(ConstAuth.HTTP_DELETE_USER)]
        public IActionResult DeleteUser(int id)
        {
            _auth.DeleteUser(id);
            var users = _auth.GetByUsersList();
            var (countPages, usersList) = _generalMethods.GetUsersList(users, ConstParameters.START_PAGE);
            return Ok(new { usersList = usersList, countPages = countPages });
        }

        [HttpPost(ConstAuth.HTTP_POST_LOGOUT)]
        public IActionResult Logout()
        {
            var userDto = new UserDtoModel
            {
                IsAuth = false
            };

            return Ok(new { user = userDto });
        }

        private UserRegisterModel GetUserRegisterModel()
        {
            var model = new UserRegisterModel
            {
                UserId = !string.IsNullOrEmpty(Request.Form.FirstOrDefault(i => i.Key == FormFields.USER_ID).Value) ?
                         int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.USER_ID).Value) : 0,
                Name = !string.IsNullOrEmpty(Request.Form.FirstOrDefault(i => i.Key == FormFields.NAME).Value) ?
                       Request.Form.FirstOrDefault(i => i.Key == FormFields.NAME).Value : string.Empty,
                Surname = !string.IsNullOrEmpty(Request.Form.FirstOrDefault(i => i.Key == FormFields.SURNAME).Value) ?
                          Request.Form.FirstOrDefault(i => i.Key == FormFields.SURNAME).Value : string.Empty,
                Gender = !string.IsNullOrEmpty(Request.Form.FirstOrDefault(i => i.Key == FormFields.GENDER).Value) ?
                          Request.Form.FirstOrDefault(i => i.Key == FormFields.GENDER).Value : string.Empty,
                DateOfBirth = !string.IsNullOrEmpty(Request.Form.FirstOrDefault(i => i.Key == FormFields.DATE_OF_BIRTH).Value) ?
                            DateTime.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.DATE_OF_BIRTH).Value) : DateTime.MinValue,
                Email = !string.IsNullOrEmpty(Request.Form.FirstOrDefault(i => i.Key == FormFields.EMAIL).Value) ?
                        Request.Form.FirstOrDefault(i => i.Key == FormFields.EMAIL).Value : string.Empty,
                Phone = !string.IsNullOrEmpty(Request.Form.FirstOrDefault(i => i.Key == FormFields.PHONE).Value) ?
                        Request.Form.FirstOrDefault(i => i.Key == FormFields.PHONE).Value : string.Empty,
                Login = !string.IsNullOrEmpty(Request.Form.FirstOrDefault(i => i.Key == FormFields.LOGIN).Value) ?
                        Request.Form.FirstOrDefault(i => i.Key == FormFields.LOGIN).Value : string.Empty,
                Password = !string.IsNullOrEmpty(Request.Form.FirstOrDefault(i => i.Key == FormFields.PASSWORD).Value) ?
                           Request.Form.FirstOrDefault(i => i.Key == FormFields.PASSWORD).Value : string.Empty,
                Role = !string.IsNullOrEmpty(Request.Form.FirstOrDefault(i => i.Key == FormFields.ROLE).Value)?
                           Request.Form.FirstOrDefault(i => i.Key == FormFields.ROLE).Value : string.Empty,
                Img = Request.Form.Files.Count != 0 ? Request.Form.Files[0] : null
            };

            return model;
        }
    }
}
