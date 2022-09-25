using System.Linq;
using System;
using WebLibrary.Abstract;
using WebLibrary.Models;

namespace Web.Data.Repositories
{
    public class RetrievePasswordRepository : IRetrievePassword
    {
        private readonly AppDBContext _context;

        public RetrievePasswordRepository(AppDBContext context)
        {
            _context = context;
        }

        public UserModel RetrievePasswordService(string token)
        {
            var retrievePasswordModel = _context.RetrievePasswords.FirstOrDefault(i => i.RetrievePasswordToken == token);
            var user = retrievePasswordModel != null ? _context.Users.FirstOrDefault(i => i.Email == retrievePasswordModel.Email) : null;
            if (user == null)
            {
                return null;
            }

            var resultDate = DateTime.Compare(retrievePasswordModel.DateExpires, DateTime.Now);
            if (resultDate < 1)
            {
                return null;
            }

            return user;
        }

        public void TokenRemotalFromBD(string token)
        {
            var retrievePasswordModel = _context.RetrievePasswords.FirstOrDefault(i => i.RetrievePasswordToken == token);
            _context.RetrievePasswords.Remove(retrievePasswordModel);
            _context.SaveChanges();
        }
    }
}
