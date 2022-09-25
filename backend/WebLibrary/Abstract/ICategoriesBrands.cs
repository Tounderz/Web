using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace WebLibrary.Abstract
{
    public interface ICategoriesBrands
    {
        IEnumerable<CategoriesBrandsModel> CategoriesBrands { get; }
        List<CategoriesBrandsModel> GetBrandsByCategory(int categoryId);
        List<CategoriesBrandsModel> GetCategoriesByBrand(int brandId);
        List<CategoriesBrandsModel> CreateBrandsByCategory(CategoryDtoModel model);
        List<CategoriesBrandsModel> UpdateBrandsByCategory(CategoryDtoModel model);
        List<CategoriesBrandsModel> CreateCategoriesByBrand(BrandDtoModel model);
        List<CategoriesBrandsModel> UpdateCategoriesByBrand(BrandDtoModel model);
        void RemoveBrandsByCategory(int id);
        void RemoveCategoriesByBrand(int id);
    }
}
