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
        UserModel RetrievePasswordService(string token);
        void TokenRemotalFromBD(string token);
    }
}
