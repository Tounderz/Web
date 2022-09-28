using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebLibrary.Models
{
    public class DeletedAccountModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserEmail { get; set; }
        public DateTime DateOfRemovalFromDb { get; set; }
        public string RestoringToken { get; set; }
        public DateTime DateExpiresToken { get; set; }

    }
}
