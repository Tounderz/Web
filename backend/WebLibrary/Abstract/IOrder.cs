using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace WebLibrary.Abstract
{
    public interface IOrder
    {
        OrderModel CreateOrder(UserModel user, OrderDtoModel model);
        List<PurchasesHistoryDto> OrderList(string login);
        (int countPages, List<PurchasesHistoryDto> orders) GetOrdersList(List<PurchasesHistoryDto> orders, int page);
    }
}
