using Microsoft.AspNetCore.Authorization;
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
    [Route("baskets")]
    public class BasketController : ControllerBase
    {
        private readonly IBasket _basket;
        private readonly IAuthorization _auth;
        private readonly IProduct _product;
        private readonly IGeneralMethods _generalMethods;

        public BasketController(IBasket basket, IAuthorization auth, IProduct product, IGeneralMethods generalMethods)
        {
            _basket = basket;
            _auth = auth;
            _product = product;
            _generalMethods = generalMethods;
        }

        [HttpPost("cart")]
        public IActionResult Basket(BasketDtoModel model)
        {
            var user = _auth.GetByUser(model.UserLogin);
            if (user == null)
            {
                return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
            }

            List<ProductModel> baskets = _basket.GetBasketItems(user.Id);
            decimal sum = baskets.Sum(i => i.Price);
            var (countPages, products) = _generalMethods.GetProducts(baskets, model.Page);

            return Ok(new { baskets = products, sum = sum, countPages = countPages });
        }

        [HttpPost("add")]
        public IActionResult AddToCart(BasketDtoModel model)
        {
            var user = _auth.GetByUser(model.UserLogin);
            var product = _product.Products.FirstOrDefault(i => i.Id == model.ProductId);
            if (user == null || product == null)
            {
                return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
            }

            _basket.AddToBasketItem(user.Id, product.Id);
            return Ok(new { message = "success",  });
        }

        [HttpPost("delete")]
        public IActionResult DeleteToCartItem(BasketDtoModel model) // удаление объекта из корзины
        {
            var user = _auth.GetByUser(model.UserLogin);
            var product = _product.Products.FirstOrDefault(i => i.Id == model.ProductId);

            if (user == null || product == null)
            {
                return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
            }

            _basket.DeleteToBasketItem(user.Id, product.Id);
            List<ProductModel> baskets = _basket.GetBasketItems(user.Id);
            decimal sum = baskets.Sum(i => i.Price);
            var (countPages, products) = _generalMethods.GetProducts(baskets, model.Page);

            return Ok(new { baskets = products, sum = sum, countPages = countPages });
        }

        [HttpPost("clean")]
        public IActionResult CleaningTheTrash(BasketDtoModel model)//очистка корзины
        {
            var user = _auth.GetByUser(model.UserLogin);

            if (user == null)
            {
                return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
            }

            _basket.СleaningTheTrash(user.Id);
            List<ProductModel> baskets = _basket.GetBasketItems(user.Id);
            decimal sum = baskets.Sum(i => i.Price);
            var (countPages, products) = _generalMethods.GetProducts(baskets, model.Page);

            return Ok(new { baskets = products, sum = sum, countPages = countPages });
        }
    }
}
