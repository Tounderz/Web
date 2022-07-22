using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebLibrary.Models
{
    public class BasketProductModel
    {
        public int Id { get; set; }
        public int BasketId { get; set; }
        public int ProductId { get; set; }
    }
}
