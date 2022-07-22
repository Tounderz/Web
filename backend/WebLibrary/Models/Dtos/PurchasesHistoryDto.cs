using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebLibrary.Models.Dtos
{
    public class PurchasesHistoryDto
    {
        public int OrderId { get; set; }
        public string OrderTime { get; set; }
        public string ProductName { get; set; }
        public int ProductPrice { get; set; }
        public string ProductImg { get; set; }
    }
}
