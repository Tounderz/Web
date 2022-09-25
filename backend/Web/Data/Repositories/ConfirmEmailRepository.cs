using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using WebLibrary.Abstract;
using WebLibrary.Models;

namespace Web.Data.Repositories
{
    public class ConfirmEmailRepository : IConfirmEmail
    {
        private readonly AppDBContext _context;

        public ConfirmEmailRepository(AppDBContext context)
        {
            _context = context;
        }

        public UserModel ConfirmEmailService(string token)
        {
            var confirmEmailModel = _context.ConfirmEmails.FirstOrDefault(i => i.ConfirmEmailToken == token);
            var user = confirmEmailModel != null ? _context.Users.FirstOrDefault(i => i.Email == confirmEmailModel.Email) : null;
            if (user == null)
            {
                return null;
            }

            var resultDate = DateTime.Compare(confirmEmailModel.DateExpires, DateTime.Now);
            if (resultDate < 1)
            {
                return user;
            }

            user.ConfirmEmail = true;
            _context.Users.Update(user);
            _context.SaveChanges();
            return user;
        }

        public void TokenRemotalFromBD(string token)
        {
            var confirmEmailModel = _context.ConfirmEmails.FirstOrDefault(i => i.ConfirmEmailToken == token);
            _context.ConfirmEmails.Remove(confirmEmailModel);
            _context.SaveChanges();
        }
    }
}
