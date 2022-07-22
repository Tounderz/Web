using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Abstract;
using WebLibrary.ConstParameters;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace Web.Data.Repositories
{
    public class OrderRepository : IOrder
    {
        private readonly AppDBContext _context;

        public OrderRepository(AppDBContext context)
        {
            _context = context;
        }

        public OrderModel CreateOrder(UserModel user, OrderDtoModel model)
        {
            var order = new OrderModel
            {
                UserId = user.Id,
                ProductId = model.ProductId,
                ProductPrice = model.ProductPrice,
                Name = user.Name,
                Phone = user.Phone,
                Email = user.Email,
                City = model.City,
                Street = model.Street,
                House = model.House,
                Flat = model.Flat,
                CommentsOrder = model.CommentsOrder,
                OrderTime = DateTime.Now,
                PaymentMethod = model.PaymentMethod,
            };

            _context.Orders.Add(order);
            _context.SaveChanges();

            return order;
        }

        public List<PurchasesHistoryDto> OrderList(string login)
        {
            var user = _context.Users.FirstOrDefault(i => i.Login == login);
            var orders = _context.Orders.Where(i => i.UserId == user.Id).ToList();
            if (orders == null || orders.Count < 1)
            {
                return null;
            }

            var ordersList = new List<PurchasesHistoryDto>();
            for (int i = 0; i < orders.Count; i++)
            {
                ordersList.Add(new PurchasesHistoryDto
                {
                    OrderId = i + 1,
                    OrderTime = orders[i].OrderTime.ToString(ConstParameters.FORMAT_DATE_TIME_ORDER),
                    ProductName = _context.Products.FirstOrDefault(x => x.Id == orders[i].ProductId).Name,
                    ProductPrice = orders[i].ProductPrice,
                    ProductImg = _context.Products.FirstOrDefault(x => x.Id == orders[i].ProductId).Img,
                });
            }

            return ordersList;
        }

        public (int countPages, List<PurchasesHistoryDto> orders) GetOrdersList(List<PurchasesHistoryDto> orders, int page)
        {
            decimal count = orders.Count;
            var countPages = Convert.ToInt32(Math.Ceiling(count / ConstParameters.LIMIN_ORDERS_ONE_PAGE));
            int start = ConstParameters.LIMIN_ORDERS_ONE_PAGE * (page - 1);
            orders = orders.Skip(start).Take(ConstParameters.LIMIN_ORDERS_ONE_PAGE).ToList();

            return (countPages, orders);
        }
    }
}
