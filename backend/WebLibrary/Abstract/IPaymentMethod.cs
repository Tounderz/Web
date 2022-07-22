using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Models;

namespace WebLibrary.Abstract
{
    public interface IPaymentMethod
    {
        IEnumerable<PaymentMethodModel> PaymentMethods { get; }
        PaymentMethodModel CreatePaymentMethod(string name);
        PaymentMethodModel UpdatePaymentMethod(PaymentMethodModel model);
        PaymentMethodModel DeletePaymentMethod(int id);
    }
}
