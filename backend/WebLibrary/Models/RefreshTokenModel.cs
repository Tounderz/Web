using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebLibrary.Models
{
    public class RefreshTokenModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TokenId { get; set; }
        public string Token { get; set; }
        public DateTime Created { get; set; } //дата создания токена refreshToken
        public DateTime Expires { get; set; } //дата окончания действия refreshToken
        public bool IsActive { get; set; }
    }
}
