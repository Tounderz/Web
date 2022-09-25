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

        public List<CategoriesBrandsModel> GetBrandsByCategory(int categoryId)
        {
            var list = CategoriesBrands.Where(i => i.CategoryId == categoryId).ToList();
            return list;
        }

        public List<CategoriesBrandsModel> GetCategoriesByBrand(int brandId)
        {
            var list = CategoriesBrands.Where(i => i.BrandId == brandId).ToList();
            return list;
        }

        public List<CategoriesBrandsModel> CreateCategoriesByBrand(BrandDtoModel model)
        {
            List<CategoriesBrandsModel> categoriesBrands = new ();
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
            var categoriesIdFromBd = CategoriesBrands.Where(i => i.BrandId == model.BrandId).Select(i => i.CategoryId).ToList();
            var removeList = new List<CategoriesBrandsModel>();
            var addList = new List<CategoriesBrandsModel>();
            foreach (var item in categoriesIdFromBd)
            {
                if (!model.CategoriesId.Contains(item))
                {
                    removeList.Add(_context.CategoriesBrands.FirstOrDefault(i => i.CategoryId == item && i.BrandId == model.BrandId));
                }
            }

            foreach (var item in model.CategoriesId)
            {
                if (!categoriesIdFromBd.Contains(item))
                {
                    addList.Add(new CategoriesBrandsModel { CategoryId = item, BrandId = model.BrandId });
                }
            }

            if (addList.Count > 0)
            {
                _context.CategoriesBrands.AddRange(addList);
                _context.SaveChanges();
            }

            if (removeList.Count > 0)
            {
                _context.CategoriesBrands.RemoveRange(removeList);
                _context.SaveChanges();
            }

            return addList;
        }

        public List<CategoriesBrandsModel> UpdateBrandsByCategory(CategoryDtoModel model)
        {
            var brandsIdFromBd = CategoriesBrands.Where(i => i.CategoryId == model.Id).Select(i => i.BrandId).ToList();
            var removeList = new List<CategoriesBrandsModel>();
            var addList = new List<CategoriesBrandsModel>();
            foreach (var item in brandsIdFromBd)
            {
                if (!model.BrandsId.Contains(item))
                {
                    removeList.Add(_context.CategoriesBrands.FirstOrDefault(i => i.CategoryId == model.Id && i.BrandId == item));
                }
            }

            foreach (var item in model.BrandsId)
            {
                if (!brandsIdFromBd.Contains(item))
                {
                    addList.Add(new CategoriesBrandsModel { CategoryId = model.Id, BrandId = item });
                }
            }

            if (removeList.Count > 0)
            {
                _context.CategoriesBrands.RemoveRange(removeList);
                _context.SaveChanges();
            }

            if (addList.Count > 0)
            {
                _context.CategoriesBrands.AddRange(addList);
                _context.SaveChanges();
            }
            
            return addList;
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
    }
}
