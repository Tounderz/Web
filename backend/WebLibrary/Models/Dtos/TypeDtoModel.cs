using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebLibrary.Models.Dtos
{
    public class TypeDtoModel
    {
        public int TypeId { get; set; }
        public int[] BrandsId { get; set; }
        public int Page { get; set; }
    }
}
