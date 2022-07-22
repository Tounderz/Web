using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Abstract;
using WebLibrary.ConstParameters;
using WebLibrary.Models;

namespace Web.Data.ConstMethods
{
    public class GeneralMethods : IGeneralMethods
    {
        public string SaveImg(IFormFile img)
        {
            if (img == null)
            {
                return string.Empty;
            }

            var fileName = Guid.NewGuid().ToString() + img.FileName;
            var path = Path.Combine(Directory.GetCurrentDirectory(), ConstParameters.SHORT_PATH);
            var fullPath = Path.Combine(path, fileName);
            var stream = new FileStream(fullPath, FileMode.Create);
            img.CopyTo(stream);
            stream.Flush();

            return ConstParameters.PATH_IMG + fileName;
        }

        public (int countPages, List<ProductModel> products) GetProducts(List<ProductModel> products, int page)
        {
            decimal count = products.Count;
            var countPages = Convert.ToInt32(Math.Ceiling(count / ConstParameters.LIMIT_PRODUCT_ONE_PAGE));
            int start = ConstParameters.LIMIT_PRODUCT_ONE_PAGE * (page - 1);
            products = products.Skip(start).Take(ConstParameters.LIMIT_PRODUCT_ONE_PAGE).ToList();

            return (countPages, products);
        }

        public (int countPages, List<UserModel> users) GetUsersList(List<UserModel> users, int page)
        {
            decimal count = users.Count;
            var countPages = Convert.ToInt32(Math.Ceiling(count / ConstParameters.LIMIN_USER_ONE_PAGE));
            int start = ConstParameters.LIMIN_USER_ONE_PAGE * (page - 1);
            users = users.Skip(start).Take(ConstParameters.LIMIN_USER_ONE_PAGE).ToList();

            return (countPages, users);
        }
    }
}
