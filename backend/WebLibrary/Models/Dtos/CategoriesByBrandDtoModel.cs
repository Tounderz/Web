using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebLibrary.Models.Dtos
{
    public class CategoriesByBrandDtoModel
    {
        public int BrandId {get;set;}
        public int[] CategoriesId { get; set; }
        public int Page { get; set; }
    }
}
