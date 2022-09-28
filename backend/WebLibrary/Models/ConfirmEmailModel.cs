using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebLibrary.Models
{
    public class ConfirmEmailModel
    {
        public int Id { get; set; }
        public string ConfirmEmailToken { get; set; }
        public DateTime DateExpiresToken { get; set; }
        public string Email { get; set; }
    }
}
