using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebLibrary.Models;

namespace WebLibrary.Abstract
{
    public interface ISearch
    {
        List<ProductModel> ResaultSearch(string parameter);
        List<UserModel> ResaultSearchUsers(string parameter);
        List<ProductModel> ResaultSearchProductAdmin(string parameter);
        ProductModel ResaultSearchProductByIdAdmin(int parameter);
        UserModel ResaultSearchUserByIdAdmin(int parameter);
        (int countPages, List<ProductTableModel> products) GetProductsList(List<ProductModel> model, int page);
    }
}
