using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace WebLibrary.Abstract
{
    public interface ISort
    {
        List<UserModel> SortUser(SortDtoModel model);
        (int countPages, List<ProductTableModel> products) SortProduct(SortDtoModel model);
    }
}
