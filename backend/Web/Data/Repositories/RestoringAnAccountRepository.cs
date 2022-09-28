using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using System.Security.Principal;
using WebLibrary.Abstract;
using WebLibrary.Models;

namespace Web.Data.Repositories
{
    public class RestoringAnAccountRepository : IRestoringAnAccount
    {
        private readonly AppDBContext _context;
        public RestoringAnAccountRepository(AppDBContext context)
        {
            _context = context;
        }

        public DeletedAccountModel Restoring(string email)
        {
            var account = _context.DeletedAccounts.FirstOrDefault(i => i.UserEmail == email);
            var resultDate = account != null ? DateTime.Compare(account.DateOfRemovalFromDb, DateTime.Now) : 0;
            if (resultDate < 1)
            {
                var user = _context.Users.FirstOrDefault(i => i.Id == account.UserId);
                RemoveDeletedAccountModel(account);
                _context.Users.Remove(user);
                _context.SaveChanges();
                return null;
            }

            
            if (string.IsNullOrEmpty(account.RestoringToken))
            {
                account = UpdatingToken(account);
                return account;
            }

            return account;
        }

        public DeletedAccountModel GetUserByToken(string token)
        {
            var account = _context.DeletedAccounts.FirstOrDefault(i => i.RestoringToken == token);
            return account;
        }

        public DeletedAccountModel UpdatingToken(DeletedAccountModel model)
        {
            model.RestoringToken = Guid.NewGuid().ToString();
            model.DateExpiresToken = DateTime.Now.AddDays(1);
            _context.DeletedAccounts.Update(model);
            _context.SaveChanges();

            return model;
        }

        public UserModel RestoringUser(DeletedAccountModel model)
        {
            var user = _context.Users.FirstOrDefault(i => i.Id == model.UserId);
            if (user == null)
            {
                return null;
            }

            user.IsDeleted = false;
            RemoveDeletedAccountModel(model);
            _context.Users.Update(user);
            _context.SaveChanges();

            return user;
        }

        private void RemoveDeletedAccountModel(DeletedAccountModel model)
        {
            _context.DeletedAccounts.Remove(model);
            _context.SaveChanges();
        }
    }
}
