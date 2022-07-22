using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Abstract;
using WebLibrary.ConstParameters;
using WebLibrary.Models;

namespace Web.Controllers
{
    [Route(ConstPaymentMethods.PAYMENT_METHODS_ROUTE)]
    [ApiController]
    public class PaymentMethodController : ControllerBase
    {
        private readonly IPaymentMethod _method;

        public PaymentMethodController(IPaymentMethod paymentMethod)
        {
            _method = paymentMethod;
        }

        [HttpGet(ConstParameters.HTTP_GET_LIST)]
        public IActionResult GetPaymentMethod()
        {
            List<PaymentMethodModel> paymentMethods = _method.PaymentMethods.ToList();
            return Ok(new { paymentMethods = paymentMethods });
        }

        [HttpPost(ConstParameters.HTTP_POST_CREATE)]
        public IActionResult CreateMethod(string name)
        {
            var paymentMethod = _method.CreatePaymentMethod(name);
            if (paymentMethod == null)
            {
                return BadRequest(new { message = ConstPaymentMethods.MESSAGE_ERROR });
            }

            return Ok( new { paymentMethod = paymentMethod });
        }

        [HttpPost(ConstParameters.HTTP_POST_UPDATE)]
        public IActionResult UpdateMethod(PaymentMethodModel model)
        {
            var paymentMethod = _method.UpdatePaymentMethod(model);
            if (paymentMethod == null)
            {
                return BadRequest(new { message = ConstPaymentMethods.MESSAGE_ERROR });
            }
            return Ok( new { paymentMethod = paymentMethod });
        }

        [HttpDelete(ConstParameters.HTTP_DELETE)]
        public IActionResult DeleteMethod(int id)
        {
            var method = _method.DeletePaymentMethod(id);
            if (method == null)
            {
                return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
            }

            var paymentMethods = _method.PaymentMethods.ToList();
            return Ok(new { paymentMethods = paymentMethods });
        }
    }
}
