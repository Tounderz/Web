using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebLibrary.ConstParameters
{
    public static class ConstSearch
    {
        public const string SEARCH_ROUTE = "search";
        public const string HTTP_POST_SEARCH_RESULT = "result";
        public const string HTTP_POST_SEARCH_RESULT_USERS = "searchUsers";
        public const string HTTP_POST_SEARCH_RESULT_PRODUCT = "searchProductAdmin";
        public const string MESSAGE_ERROR = "According to the search criteria, nothing was found.";
    }
}
