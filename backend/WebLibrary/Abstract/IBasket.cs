using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Models;

namespace WebLibrary.Abstract
{
    public interface IBasket
    {
        IEnumerable <BasketModel> Baskets { get; }
        void AddToBasketItem(int userId, int productId);
        void DeleteToBasketItem(int userId, int productId);
        void СleaningTheTrash(int userId);
        List<ProductModel> GetBasketItems(int userId);
    }
}
