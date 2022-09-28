using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebLibrary.Models;

namespace WebLibrary.Abstract
{
    public interface IRestoringAnAccount
    {
        DeletedAccountModel Restoring(string email);
        DeletedAccountModel UpdatingToken(DeletedAccountModel model);
        DeletedAccountModel GetUserByToken(string token);
        UserModel RestoringUser(DeletedAccountModel model);
    }
}
