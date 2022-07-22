using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebLibrary.Models.Dtos
{
    public class UserDtoModel
    {
        public int UserId { get; set; }
        public string Login { get; set; }
        public string Role { get; set; }
        public bool IsAuth { get; set; }
    }
}
