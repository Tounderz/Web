using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.ConstParameters;
using WebLibrary.Abstract;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace Web.Data.Repositories
{
    public class CategoryRepository : ICategory
    {
        private readonly AppDBContext _context;
        private readonly IGeneralMethods _generalMethods;

        public CategoryRepository(AppDBContext context, IGeneralMethods generalMethods)
        {
            _context = context;
            _generalMethods = generalMethods;
        }

        public IEnumerable<CategoryModel> Categories => _context.Categories;

        public CategoryModel CreateCategory(CategoryDtoModel model)
        {
            if (!CheckCategoryName(model.Name))
            {
                return null;
            }

            var category = new CategoryModel
            {
                Name = model.Name,
                Img = model.Img != null ? _generalMethods.SaveImg(model.Img) : string.Empty,
                ShortDescription = model.ShortDescription,
                Info = model.Info,
            };

            _context.Categories.Add(category);
            _context.SaveChanges();
            return category;
        }

        public CategoryModel UpdateCategory(CategoryDtoModel model)
        {
            var category = Categories.FirstOrDefault(i => i.Id == model.Id);
            if (category == null || !CheckCategoryName(model.Name))
            {
                return null;
            }

            category.Name = model.Name != string.Empty ? model.Name : category.Name;
            category.ShortDescription = model.ShortDescription != string.Empty ? model.ShortDescription : category.ShortDescription;
            category.Img = model.Img != null ? _generalMethods.SaveImg(model.Img) : category.Img;
            category.Info = model.Info != string.Empty ? model.Info : category.Info;

            _context.Categories.Update(category);
            _context.SaveChanges();
            return category;
        }

        public void RemoveCategory(int id)
        {
            var category = Categories.FirstOrDefault(i => i.Id == id);
            if (category == null)
            {
                return;
            }
            
            _context.Categories.Remove(category);
            _context.SaveChanges();
        }

        public void CountView(int id)
        {
            var category = Categories.FirstOrDefault(i => i.Id == id);
            category.CountView += ConstParameters.PLUS_ONE_VIEWING;
            _context.Categories.Update(category);
            _context.SaveChanges();
        }

        public CategoryDtoModel FormCategoryDto(CategoryDtoModel dto)
        {
            dto.Id = dto.Id > 0 ? dto.Id : 0;
            dto.Name = !string.IsNullOrEmpty(dto.Name) ? dto.Name : string.Empty;
            dto.ShortDescription = !string.IsNullOrEmpty(dto.ShortDescription) ? dto.ShortDescription : string.Empty;
            dto.Info = !string.IsNullOrEmpty(dto.Info) ? dto.Info : string.Empty;
            dto.BrandsId = dto.BrandsId.Length > 0 ? dto.BrandsId : Array.Empty<int>();
            dto.Img = dto.Img.Length != 0 ? dto.Img : null;

            return dto;
        }

        private bool CheckCategoryName(string name)
        {
            if (name == string.Empty)
            {
                return true;
            }

            var category = Categories.Select(i => i.Name.Contains(name, StringComparison.InvariantCultureIgnoreCase));
            if (category == null)
            {
                return true;
            }

            return false;
        }
    }
}
