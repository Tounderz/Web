using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace WebLibrary.Abstract
{
    public interface IBrand
    {
        IEnumerable<BrandModel> Brands { get; }
        BrandModel CreateBrand(BrandDtoModel model);
        BrandModel UpdateBrand(BrandDtoModel model);
        void DeleteBrand(int id);
        void CountView(int id);
    }
}
