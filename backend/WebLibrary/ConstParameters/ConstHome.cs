using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebLibrary.ConstParameters
{
    public static class ConstHome
    {
        public const string HOME_ROUTE = "home";
        public const string HTTP_GET_PRODUCTS_POPULAR = "productsPopular";
        public const string HTTP_GET_BRANDS_POPULAR = "brandsPopular";
        public const string HTTP_GET_CATEGORIES_POPULAR = "categoriesPopular";

        public const int LIMIT_PRODUCT_POPULAR = 8;
        public const int LIMIT_CATEGORIES_POPULAR = 6;
        public const int LIMIT_BRANDS_POPULAR = 7;
    }
}
