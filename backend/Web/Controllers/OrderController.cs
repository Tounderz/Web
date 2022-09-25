using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Abstract;
using WebLibrary.ConstParameters;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace Web.Controllers
{
    [ApiController]
    [Route(ConstOrder.ORDERS_ROUTE)]
    public class OrderController : ControllerBase
    {
        private readonly IOrder _order;
        private readonly IAuthorization _auth;
        private readonly IBasket _basket;
        private readonly ISendEmail _sendEmail;

        public OrderController(IOrder order, IAuthorization auth, IBasket basket, ISendEmail sendEmail)
        {
            _order = order;
            _auth = auth;
            _basket = basket;
            _sendEmail = sendEmail;
        }

        [HttpPost(ConstOrder.HTTP_POST_CREATE_ORDER)]
        public IActionResult Order(OrderDtoModel model)
        {
            var user = _auth.GetByUser(model.Login);
            if (user == null)
            {
                return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
            }

            var order = _order.CreateOrder(user, model);
            if (order == null)
            {
                return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
            }

            var messageBody = _sendEmail.MessageBodyOrder(order);
            var messageSendingCheck = messageBody != null ? _sendEmail.SendEmail(user.Email, messageBody, ConstOrder.SUBJECK_ORDER) : false;
            if (!messageSendingCheck)
            {
                return BadRequest(new { message = "This email address doesn`t exist" });
            }
                
            return Ok(new { orderId = order.Id });
        }

        [HttpPost(ConstOrder.HTTP_POST_CREATE_ALL_ITEMS_BASKET)]
        public IActionResult OrderAllItemsBaskek(OrderDtoModel model)
        {
            var user = _auth.GetByUser(model.Login);
            if (user == null)
            {
                return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
            }

            List<int> idProducts = _basket.Baskets.Where(i => i.UserId == user.Id).Select(i => i.ProductId).ToList();
            List<int> ordersId = new ();
            for (int i = 0; i < idProducts.Count; i++)
            {
                model.ProductId = idProducts[i];
                var order = _order.CreateOrder(user, model);
                if (order == null)
                {
                    return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
                }

                ordersId.Add(order.Id);
            }

            return Ok(new { ordersId = ordersId });
        }

        [HttpPost(ConstOrder.HTTP_POST_ORDERS_LIST)]
        public IActionResult OrderList(OrderListDtoModel model)
        {
            var orders = _order.OrderList(model.Login);
            if (orders == null)
            {
                return BadRequest(new { message = "You don't have completed purchases!" });
            }

            var list = _order.GetOrdersList(orders, model.Page);
            var totalAmount = list.orders.Sum(i => i.ProductPrice);

            return Ok(new { orders = list.orders, totalAmount = totalAmount, countPages = list.countPages });
        }
    }
}