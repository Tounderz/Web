using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace WebLibrary.Abstract
{
    public interface ICategory
    {
        IEnumerable<CategoryModel> Categories { get; }
        CategoryModel CreateCategory(CategoryDtoModel model);
        CategoryModel UpdateCategory(CategoryDtoModel model);
        void RemoveCategory(int id);
        void CountView(int id);
    }
}
