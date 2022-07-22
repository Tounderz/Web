using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebLibrary.ConstParameters
{
    public static class ConstParameters
    {
        public const string SHORT_PATH = "wwwroot/img/";
        public const string PATH_IMG = "/img/";
        public const int PLUS_ONE_VIEWING = 1;

        public const string ADMIN_ROLE = "admin";
        public const string MODERATOR_ROLE = "moderator";
        public const string USER_ROLE = "user";

        public const int START_PAGE = 1;

        public const int LIMIT_PRODUCT_ONE_PAGE = 12;
        public const int LIMIN_USER_ONE_PAGE = 10;
        public const int LIMIN_ORDERS_ONE_PAGE = 10;
        
        public const string FORMAT_DATE_TIME_ORDER = "R";

        public const string HTTP_GET_LIST = "list";
        public const string HTTP_POST_CREATE = "create";
        public const string HTTP_POST_UPDATE = "update";
        public const string HTTP_DELETE = "delete";

        public const string INVALID_CREDENTIALS_ERROR = "Invalid Credentials";

        public const int EXPIRES_REFRESH_TOKEN_DAYS = 7;
        public const int EXPIRES_ACCESS_TOKEN_HOUR = 1;
    }
}