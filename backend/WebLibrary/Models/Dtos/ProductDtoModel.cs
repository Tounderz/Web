using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebLibrary.Models.Dtos
{
    public class ProductDtoModel
    {
        public int Id { get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        public int TypeId { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public IFormFile Img { get; set; }
        public int Price { get; set; }
        public int IsFavourite { set; get; }
        public int Available { set; get; }
    }
}
