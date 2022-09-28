using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebLibrary.Models;

namespace WebLibrary.Abstract
{
    public interface IRetrievePassword
    {
        bool CreateToken(string email);
        UserModel RetrievePasswordService(string token);
        bool UpdateToken(string token);
        void TokenRemotalFromBD(string token);
    }
}
