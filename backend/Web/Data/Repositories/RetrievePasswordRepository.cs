using System.Linq;
using System;
using WebLibrary.Abstract;
using WebLibrary.Models;
using WebLibrary.ConstParameters;
using Newtonsoft.Json.Linq;

namespace Web.Data.Repositories
{
    public class RetrievePasswordRepository : IRetrievePassword
    {
        private readonly AppDBContext _context;
        private readonly ISendEmail _sendEmail;

        public RetrievePasswordRepository(AppDBContext context, ISendEmail sendEmail)
        {
            _context = context;
            _sendEmail = sendEmail;
        }

        public bool CreateToken(string email)
        {
            var messageSendingCheck = false;
            var retrievePassword = _context.RetrievePasswords.FirstOrDefault(i => i.Email == email);
            if (retrievePassword != null)
            {
                var comparisonResult = DateTime.Compare(retrievePassword.DateExpiresToken, DateTime.Now);
                if (comparisonResult == 1)
                {
                    messageSendingCheck = SendEmail(email, retrievePassword.RetrievePasswordToken);
                    return messageSendingCheck;
                }
                else
                {
                    return false;
                }
            }

            retrievePassword = new RetrievePasswordModel()
            {
                Email = email,
                RetrievePasswordToken = Guid.NewGuid().ToString(),
                DateExpiresToken = DateTime.Now.AddDays(7)
            };

            messageSendingCheck = SendEmail(email, retrievePassword.RetrievePasswordToken);
            if (messageSendingCheck)
            {
                _context.RetrievePasswords.Add(retrievePassword);
                _context.SaveChanges();
            }
            
            return messageSendingCheck;
        }

        public UserModel RetrievePasswordService(string token)
        {
            var retrievePasswordModel = _context.RetrievePasswords.FirstOrDefault(i => i.RetrievePasswordToken == token);
            var user = retrievePasswordModel != null ? _context.Users.FirstOrDefault(i => i.Email == retrievePasswordModel.Email) : null;
            if (user == null)
            {
                return null;
            }

            var resultDate = DateTime.Compare(retrievePasswordModel.DateExpiresToken, DateTime.Now);
            if (resultDate < 1)
            {
                return null;
            }

            return user;
        }

        public bool UpdateToken(string token)
        {
            var messageSendingCheck = false;
            var retrievePasswordModel = _context.RetrievePasswords.FirstOrDefault(i => i.RetrievePasswordToken == token);
            if (retrievePasswordModel == null)
            {
                return messageSendingCheck;
            }

            retrievePasswordModel.RetrievePasswordToken = Guid.NewGuid().ToString();
            retrievePasswordModel.DateExpiresToken = DateTime.Now.AddDays(7);
            messageSendingCheck = SendEmail(retrievePasswordModel.Email, retrievePasswordModel.RetrievePasswordToken);
            if (messageSendingCheck)
            {
                _context.RetrievePasswords.Update(retrievePasswordModel);
                _context.SaveChanges();
            }

            return messageSendingCheck;
        }

        public void TokenRemotalFromBD(string token)
        {
            var retrievePasswordModel = _context.RetrievePasswords.FirstOrDefault(i => i.RetrievePasswordToken == token);
            _context.RetrievePasswords.Remove(retrievePasswordModel);
            _context.SaveChanges();
        }

        private bool SendEmail(string email, string token)
        {
            var messageBody = _sendEmail.MessageBodyRetrievePassword(token);
            var messageSendingCheck = messageBody != null && _sendEmail.SendEmail(email, messageBody, RetrievePasswordConst.SUBJECK_RETRIEVE_YOUR_PASSWORD);
            return messageSendingCheck;
        }
    }
}
