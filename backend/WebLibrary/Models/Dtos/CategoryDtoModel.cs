using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace WebLibrary.Models.Dtos
{
    public class CategoryDtoModel
    {
        public int Id { set; get; }
        public string Name { set; get; }
        public string ShortDescription { get; set; }
        public string Info { get; set; }
        public int[] BrandsId { get; set; }
        public IFormFile Img { get; set; }
    }
}
