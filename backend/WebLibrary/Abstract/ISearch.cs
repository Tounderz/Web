using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace WebLibrary.Abstract
{
    public interface ISearch
    {
        List<ProductModel> ResaultSearch(string parameter);
        List<UserModel> ResaultSearchUsers(SearchDtoModel model);
        List<ProductModel> ResaultSearchProductByAdmin(SearchDtoModel model);
        (int countPages, List<ProductTableModel> products) GetProductsList(List<ProductModel> model, int page);
    }
}
