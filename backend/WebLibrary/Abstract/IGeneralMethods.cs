using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace WebLibrary.Abstract
{
    public interface IGeneralMethods
    {
        string SaveImg(IFormFile img);
        (int countPages, List<ProductModel> products) GetProducts(List<ProductModel> products, int page);
        (int countPages, List<UserModel> users) GetUsersList(List<UserModel> users, int page);
        ViewDtoModel FormView(ViewDtoModel dto);
    }
}
