using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using Web.Migrations;
using WebLibrary.Abstract;
using WebLibrary.ConstParameters;
using WebLibrary.Models;

namespace Web.Data.Repositories
{
    public class ConfirmEmailRepository : IConfirmEmail
    {
        private readonly AppDBContext _context;
        private readonly ISendEmail _sendEmail;

        public ConfirmEmailRepository(AppDBContext context, ISendEmail sendEmail)
        {
            _context = context;
            _sendEmail = sendEmail;
        }

        public bool CreateToken(string email)
        {
            var confirmEmail = _context.ConfirmEmails.FirstOrDefault(i => i.Email == email);
            if (confirmEmail != null)
            {
                return false;
            }

            var token = Guid.NewGuid().ToString();
            confirmEmail = new ConfirmEmailModel()
            {
                Email = email,
                ConfirmEmailToken = token,
                DateExpiresToken = DateTime.Now.AddDays(1),
            };

            var messageBody = _sendEmail.MessageBodyConfirmEmail(confirmEmail.ConfirmEmailToken);
            var messageSendingCheck = messageBody != null && _sendEmail.SendEmail(email, messageBody, ConfirmEmailConst.SUBJECK_CONFIRM_EMAIL);
            if (!messageSendingCheck)
            {
                return messageSendingCheck;
            }

            _context.ConfirmEmails.Add(confirmEmail);
            _context.SaveChanges();
            return messageSendingCheck;
        }

        public UserModel ConfirmEmailService(string token)
        {
            var confirmEmailModel = _context.ConfirmEmails.FirstOrDefault(i => i.ConfirmEmailToken == token);
            var user = confirmEmailModel != null ? _context.Users.FirstOrDefault(i => i.Email == confirmEmailModel.Email) : null;
            if (user == null)
            {
                return null;
            }

            var resultDate = DateTime.Compare(confirmEmailModel.DateExpiresToken, DateTime.Now);
            if (resultDate < 1)
            {
                return user;
            }

            user.ConfirmEmail = true;
            _context.Users.Update(user);
            _context.SaveChanges();
            return user;
        }

        public ConfirmEmailModel UpdatingToken(string email)
        {
            var model = _context.ConfirmEmails.FirstOrDefault(i => i.Email == email);
            if (model == null)
            {
                return null;
            }

            model.ConfirmEmailToken = Guid.NewGuid().ToString();
            model.DateExpiresToken = DateTime.Now.AddDays(1);
            var messageBody = _sendEmail.MessageBodyConfirmEmail(model.ConfirmEmailToken);
            var messageSendingCheck = messageBody != null && _sendEmail.SendEmail(email, messageBody, ConfirmEmailConst.SUBJECK_CONFIRM_EMAIL);
            if (!messageSendingCheck)
            {
                return null;
            }

            _context.ConfirmEmails.Update(model);
            _context.SaveChanges();

            return model;
        }

        public void TokenRemotalFromBD(string token)
        {
            var confirmEmailModel = _context.ConfirmEmails.FirstOrDefault(i => i.ConfirmEmailToken == token);
            _context.ConfirmEmails.Remove(confirmEmailModel);
            _context.SaveChanges();
        }
    }
}
