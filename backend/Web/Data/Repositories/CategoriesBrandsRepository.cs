using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Abstract;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace Web.Data.Repositories
{
    public class CategoriesBrandsRepository : ICategoriesBrands
    {
        private readonly AppDBContext _context;

        public CategoriesBrandsRepository(AppDBContext context)
        {
            _context = context;
        }

        public IEnumerable<CategoriesBrandsModel> CategoriesBrands => _context.CategoriesBrands;

        public List<CategoriesBrandsModel> CreateCategoriesByBrand(BrandDtoModel model)
        {
            List<CategoriesBrandsModel> categoriesBrands = new();
            foreach (var item in model.CategoriesId)
            {
                categoriesBrands.Add(new CategoriesBrandsModel { CategoryId = item, BrandId = model.BrandId });
            }

            _context.CategoriesBrands.AddRange(categoriesBrands);
            _context.SaveChanges();
            return categoriesBrands;
        }

        public List<CategoriesBrandsModel> CreateBrandsByCategory(CategoryDtoModel model)
        {
            List<CategoriesBrandsModel> categoriesBrands = new();
            foreach (var item in model.BrandsId)
            {
                categoriesBrands.Add(new CategoriesBrandsModel { CategoryId = model.Id, BrandId = item });
            }

            _context.CategoriesBrands.AddRange(categoriesBrands);
            _context.SaveChanges();
            return categoriesBrands;
        }

        public List<CategoriesBrandsModel> UpdateCategoriesByBrand(BrandDtoModel model)
        {
            List<CategoriesBrandsModel> categoriesBrands = new();
            foreach (var item in model.CategoriesId)
            {
                categoriesBrands.Add(new CategoriesBrandsModel { CategoryId = item, BrandId = model.BrandId });
            }

            _context.CategoriesBrands.UpdateRange(categoriesBrands);
            _context.SaveChanges();
            return categoriesBrands;
        }

        public List<CategoriesBrandsModel> UpdateBrandsByCategory(CategoryDtoModel model)
        {
            List<CategoriesBrandsModel> categoriesBrands = new();
            foreach (var item in model.BrandsId)
            {
                categoriesBrands.Add(new CategoriesBrandsModel { CategoryId = model.Id, BrandId = item });
            }
            _context.CategoriesBrands.UpdateRange(categoriesBrands);
            _context.SaveChanges();
            return categoriesBrands;
        }
        public void RemoveCategoriesByBrand(int id)
        {
            var categoriesBrands = CategoriesBrands.Where(i => i.BrandId == id).ToList();
            if (categoriesBrands.Count <= 0)
            {
                return;
            }

            _context.CategoriesBrands.RemoveRange(categoriesBrands);
            _context.SaveChanges();
        }

        public void RemoveBrandsByCategory(int id)
        {
            var categoriesBrands = CategoriesBrands.Where(i => i.CategoryId == id).ToList();
            if (categoriesBrands.Count <= 0)
            {
                return;
            }

            _context.CategoriesBrands.RemoveRange(categoriesBrands);
            _context.SaveChanges();
        }

        private void RemoveCategoriesByBrand(int[] categoriesId, int brandId)
        {
            var listCategoriesIdFroBrand = CategoriesBrands.Where(i => i.BrandId == brandId).Select(i => i.CategoryId).ToList();
            foreach (var item in listCategoriesIdFroBrand)
            {
                if (!categoriesId.Contains(item))
                {
                    _context.CategoriesBrands.Remove(new CategoriesBrandsModel { CategoryId = brandId, BrandId = item });
                }
            }
        }

        private void RemoveBrandsByCategory(int[] brandsId, int categoryId)
        {
            var listBrandsIdFromCategory = CategoriesBrands.Where(i => i.CategoryId == categoryId).Select(i => i.BrandId).ToList();
            foreach (var item in listBrandsIdFromCategory)
            {
                if (!brandsId.Contains(item))
                {
                    _context.CategoriesBrands.Remove(new CategoriesBrandsModel { CategoryId = categoryId, BrandId = item });
                }
            }
        }
    }
}
