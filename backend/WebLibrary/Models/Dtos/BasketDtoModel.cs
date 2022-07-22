using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebLibrary.Models.Dtos
{
    public class BasketDtoModel
    {
        public int ProductId { get; set; }
        public string UserLogin { get; set; }
        public int Page { get; set; }
    }
}
