using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebLibrary.Models.Dtos
{
    public class BrandDtoModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Info { get; set; }
        public int[] CategoriesId { get; set; }
        public IFormFile Img { get; set; }
    }
}
