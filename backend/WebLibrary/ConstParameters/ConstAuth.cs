using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebLibrary.ConstParameters
{
    public static class ConstAuth
    {
        public const string AUTH_ROUTE = "auth";
        public const string HTTP_GET_GET_USER = "getUser";
        public const string HTTP_POST_LOGIN = "login";
        public const string HTTP_POST_REGISTER = "register";
        public const string HTTP_GET_CONFIRM_EMAIL = "confirmEmail";
        public const string HTTP_GET_USER = "user";
        public const string HTTP_GET_LIST_USERS = "listUser";
        public const string HTTP_POST_UPDATE_USER_BY_ADMIN = "updateUserByAdmin";
        public const string HTTP_POST_UPDATE_USER_BY_USER = "updateUserByUser";
        public const string HTTP_POST_UPDATE_PASSWORD = "updatePassword";
        public const string HTTP_POST_LOGOUT = "logout";
        public const string HTTP_DELETE_USER = "deleteUser";
        public const string HTTP_POST_REFRESH_TOKEN = "refreshToken";
        public const string HTTP_POST_CREATE_NEW_PASSWORD = "createNewPassword";
        public const string HTTP_GET_RETRIEVE_PASSWORD = "retrievePassword";
        public const string ERROR_MESSAGE_LOGIN_OR_EMAIL = "Such login or Email address already exists.";
        public const string ERROR_MESSAGE_UPDATE_PASSWORD = "Invalid Old Password.";
        public const string ERROR_MESSAGE_INVALID_LOGIN = "Invalid Login.";
        public const string ERROR_MESSAGE_INVALID_PASSWORD = "Invalid Password.";
        public const string ERROR_CONFIRM_EMAIL = "You have not confirmed the email address!";
        public const string ERROR_INCORRECT_EMAIL_OUTDATED_LINK = "Incorrect email address or outdated link.";
        public const string ERROR_INCORRECT_EMAIL = "Incorrect email address.";
        public const string MESSAGE_PASSWORD_SUCCESSFULY = "Password successfully changed.";
        public const string AUTHORIZATION = "Authorization";
        public const string SUBJECK_CONFIRM_EMAIL = "Confirmation Of Authorisation";
        public const string SUBJECK_RETRIEVE_YOUR_PASSWORD = "Retrieve your password";
    }
}
