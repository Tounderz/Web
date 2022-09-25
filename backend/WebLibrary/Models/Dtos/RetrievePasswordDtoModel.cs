using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebLibrary.Models.Dtos
{
    public class RetrievePasswordDtoModel
    {
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }
}
