using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebLibrary.Models.Dtos
{
    public class OrderDtoModel
    {
        public string Login { get; set; }
        public int ProductId { get; set; }
        public int ProductPrice { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public int House { get; set; }
        public int Flat { get; set; }
        public string CommentsOrder { get; set; }
        public DateTime OrderTime { get; set; }
        public string PaymentMethod { get; set; }
    }
}
