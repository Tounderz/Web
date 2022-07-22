using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Abstract;
using WebLibrary.Models;

namespace Web.Data.Repositories
{
    public class PaymentMethodRepository : IPaymentMethod
    {
        private readonly AppDBContext _context;

        public PaymentMethodRepository(AppDBContext context)
        {
            _context = context;
        }

        public IEnumerable<PaymentMethodModel> PaymentMethods => _context.PaymentMethods;

        public PaymentMethodModel CreatePaymentMethod(string name)
        {
            if (!CheckMethodName(name))
            {
                return null;
            }

            var method = new PaymentMethodModel { Name = name };
            _context.PaymentMethods.Add(method);
            _context.SaveChanges();
            return method;
        }

        public PaymentMethodModel UpdatePaymentMethod(PaymentMethodModel model)
        {
            var method = PaymentMethods.FirstOrDefault(i => i.Id == model.Id);
            if (method == null || !CheckMethodName(model.Name))
            {
                return null;
            }

            method.Name = model.Name != string.Empty ? model.Name : method.Name;
            _context.PaymentMethods.Update(method);
            _context.SaveChanges();
            return method;
        }

        public PaymentMethodModel DeletePaymentMethod(int id)
        {
            var method = PaymentMethods.FirstOrDefault(i => i.Id == id);
            if (method == null)
            {
                return null;
            }

            _context.PaymentMethods.Remove(method);
            _context.SaveChanges();
            return method;
        }

        private bool CheckMethodName(string name)
        {
            var method = PaymentMethods.FirstOrDefault(i => i.Name.ToLower() == name.ToLower());
            if (method == null)
            {
                return true;
            }

            return false;
        }
    }
}
