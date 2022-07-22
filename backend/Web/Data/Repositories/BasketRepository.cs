using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Abstract;
using WebLibrary.Models;

namespace Web.Data.Repositories
{
    public class BasketRepository : IBasket
    {
        private readonly AppDBContext _context;
        private readonly IProduct _product;

        public BasketRepository(AppDBContext context, IProduct product)
        {
            _context = context;
            _product = product;
        }

        public IEnumerable<BasketModel> Baskets => _context.Baskets;

        public void AddToBasketItem(int userId, int productId)
        {
            _context.Baskets.Add( new BasketModel {
                ProductId = productId,
                UserId = userId,
            });

            _context.SaveChanges();
        }

        public void DeleteToBasketItem(int userId, int productId)
        {
            BasketModel model = _context.Baskets.FirstOrDefault(x => x.UserId == userId && x.ProductId == productId);
            _context.Baskets.RemoveRange(model);
            _context.SaveChanges();
        }

        public void СleaningTheTrash(int userId)
        {
            List<BasketModel> models = _context.Baskets.Where(i => i.UserId == userId).ToList();
            _context.Baskets.RemoveRange(models);
            _context.SaveChanges();
        }

        public List<ProductModel> GetBasketItems(int userId)
        {
            List<int> productsIdList = _context.Baskets.Where(i => i.UserId == userId).Select(i => i.ProductId).ToList();
            var list = _product.Products.ToList();
            var products = new List<ProductModel>();
            for (int i = 0; i < list.Count; i++)
            {
                for (int j = 0; j < productsIdList.Count; j++)
                {
                    if (list[i].Id == productsIdList[j])
                    {
                        products.Add(list[i]);
                    }
                }
            }

            return products;
        }
    }
}
