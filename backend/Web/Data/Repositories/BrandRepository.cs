using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Abstract;
using WebLibrary.ConstParameters;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace Web.Data.Repositories
{
    public class BrandRepository : IBrand
    {
        private readonly AppDBContext _context;
        private readonly IGeneralMethods _generalMethods;

        public BrandRepository(AppDBContext context, IGeneralMethods generalMethods)
        {
            _context = context;
            _generalMethods = generalMethods;
        }

        public IEnumerable<BrandModel> Brands => _context.Brands;


        public BrandModel CreateBrand(BrandDtoModel model)
        {
            if (!CheckBrandName(model.Name))
            {
                return null;
            }

            var brand = new BrandModel
            {
                Name = model.Name,
                Img = model.Img != null ? _generalMethods.SaveImg(model.Img) : string.Empty,
                Info = model.Info,
            };

            _context.Brands.Add(brand);
            _context.SaveChanges();
            return brand;
        }

        public BrandModel UpdateBrand(BrandDtoModel model)
        {
            var brand = Brands.FirstOrDefault(i => i.Id == model.BrandId);
            if (brand == null || !CheckBrandName(model.Name))
            {
                return null;
            }

            brand.Name = model.Name != string.Empty ? model.Name : brand.Name;
            brand.Img = model.Img != null ? _generalMethods.SaveImg(model.Img) : brand.Img;
            brand.Info = model.Info != string.Empty ? model.Info : brand.Info;

            _context.Brands.Update(brand);
            _context.SaveChanges();
            return brand;
        }

        public void DeleteBrand(int id)
        {
            var brand = Brands.FirstOrDefault(i => i.Id == id);
            if (brand == null)
            {
                return;
            }

            _context.Brands.Remove(brand);
            _context.SaveChanges();
        }

        public void CountView(int id)
        {
            var brand = Brands.FirstOrDefault(i => i.Id == id);
            brand.CountView += ConstParameters.PLUS_ONE_VIEWING;
            _context.Brands.Update(brand);
            _context.SaveChanges();
        }

        private bool CheckBrandName(string name)
        {
            var brand = Brands.FirstOrDefault(i => i.Name.ToLower() == name.ToLower());
            if (brand == null)
            {
                return true;
            }

            return false;
        }
    }
}
