using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebLibrary.Models
{
    public class RetrievePasswordModel
    {
        public int Id { get; set; }
        public string RetrievePasswordToken { get; set; }
        public DateTime DateOfCreation { get; set; }
        public DateTime DateExpires { get; set; }
        public string Email { get; set; }
    }
}
