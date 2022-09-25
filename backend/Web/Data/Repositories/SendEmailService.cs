using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MimeKit;
using Org.BouncyCastle.Crypto.Macs;
using System;
using System.Linq;
using System.Net.Mail;
using Web.Migrations;
using WebLibrary.Abstract;
using WebLibrary.Models;

namespace Web.Data.Repositories
{
    public class SendEmailService : ISendEmail
    {
        private readonly EmailConfiguration _emailConfig;
        private readonly AppDBContext _context;

        public SendEmailService(EmailConfiguration emailConfig, AppDBContext context)
        {
            _emailConfig = emailConfig;
            _context = context;
        }

        public bool SendEmail(string email, string messageBody, string subject)
        {
            using MailKit.Net.Smtp.SmtpClient client = new();
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(_emailConfig.UserName, "asd@asd.ru"));
                message.To.Add(new MailboxAddress("", email));
                message.Subject = subject;
                message.Body = new BodyBuilder()
                {
                    HtmlBody = messageBody
                }.ToMessageBody();


                client.Connect(_emailConfig.SmtpServer, _emailConfig.Port, true);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate(_emailConfig.From, _emailConfig.Password);
                client.Send(message);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                client.Disconnect(true);
                client.Dispose();
            }
        }

        public string MessageBodyConfirmEmail(string email)
        {
            string token = string.Empty;
            var confirmEmail = _context.ConfirmEmails.FirstOrDefault(i => i.Email == email);
            if (confirmEmail == null)
            {
                token = Guid.NewGuid().ToString();
                confirmEmail = new ConfirmEmailModel()
                {
                    ConfirmEmailToken = token,
                    Email = email,
                    DateOfCreation = DateTime.Now,
                    DateExpires = DateTime.Now.AddDays(7)
                };

                _context.ConfirmEmails.Add(confirmEmail);
                _context.SaveChanges();
            }
            else
            {
                var comparisonResult = DateTime.Compare(confirmEmail.DateExpires, DateTime.Now);
                if (comparisonResult < 1)
                {
                    token = Guid.NewGuid().ToString();
                    confirmEmail.ConfirmEmailToken = token;
                    confirmEmail.DateOfCreation = DateTime.Now;
                    confirmEmail.DateExpires = DateTime.Now.AddDays(7);

                    _context.ConfirmEmails.Update(confirmEmail);
                    _context.SaveChanges();
                }
                else
                {
                    token = confirmEmail.ConfirmEmailToken;
                }
            }

            var link = $"http://localhost:3000/verifyEmail?token={token}";
            var messageBody = $"Confirm your account Please confirm your account by clicking <a href={link}>{link}</a>";
            return messageBody;
        }

        public string MessageBodyRetrievePassword(string email)
        {
            string token = string.Empty;
            var retrievePassword = _context.RetrievePasswords.FirstOrDefault(i => i.Email == email);
            if (retrievePassword == null)
            {
                token = Guid.NewGuid().ToString();
                retrievePassword = new RetrievePasswordModel()
                {
                    RetrievePasswordToken = token,
                    Email = email,
                    DateOfCreation = DateTime.Now,
                    DateExpires = DateTime.Now.AddDays(7)
                };

                _context.RetrievePasswords.Add(retrievePassword);
                _context.SaveChanges();
            }
            else
            {
                var comparisonResult = DateTime.Compare(retrievePassword.DateExpires, DateTime.Now);
                if (comparisonResult < 1)
                {
                    token = Guid.NewGuid().ToString();
                    retrievePassword.RetrievePasswordToken = token;
                    retrievePassword.DateOfCreation = DateTime.Now;
                    retrievePassword.DateExpires = DateTime.Now.AddDays(7);

                    _context.RetrievePasswords.Update(retrievePassword);
                    _context.SaveChanges();
                }
                else
                {
                    token = retrievePassword.RetrievePasswordToken;
                }
            }

            var link = $"http://localhost:3000/retrievePassword?token={token}";
            var messageBody = $"To recover your password, follow this link: <a href={link}>{link}</a>";
            return messageBody;
        }

        public string MessageBodyOrder(OrderModel model)
        {
            var product = _context.Products.FirstOrDefault(i => i.Id == model.ProductId);
            if (product == null)
            {
                return null;
            }

            var messageBody = $"<div>Order from {model.OrderTime}</div>" +
                          $"<div>City: {model.City}, Street: {model.Street} {model.House} - {model.Flat}</div> " +
                          $"<div>Product: {product.Name}</div>" +
                          $"<div>Price: {product.Price}$</div>";

            return messageBody;
        }

        
    }
}
