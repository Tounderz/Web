using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebLibrary.Models;

namespace WebLibrary.Abstract
{
    public interface IConfirmEmail
    {
        bool CreateToken(string email);
        UserModel ConfirmEmailService(string token);
        ConfirmEmailModel UpdatingToken(string email);
        void TokenRemotalFromBD(string token);
    }
}
