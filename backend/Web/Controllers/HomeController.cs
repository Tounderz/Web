using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using WebLibrary.Abstract;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;
using WebLibrary.ConstParameters;

namespace Web.Controllers
{
    [Route(ConstHome.HOME_ROUTE)]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IProduct _product;
        private readonly IBrand _brand;
        private readonly ICategory _category;

        public HomeController(IProduct product, IBrand brand, ICategory category)
        {
            _product = product;
            _brand = brand;
            _category = category;
        }

        [HttpGet(ConstHome.HTTP_GET_PRODUCTS_POPULAR)]
        public IActionResult GetPopularProducts()
        {
            var popularProducts = _product.Products.OrderByDescending(i => i.CountView).Take(ConstHome.LIMIT_PRODUCT_POPULAR).ToList();
            return Ok(new { popularProducts });
        }

        [HttpGet(ConstHome.HTTP_GET_BRANDS_POPULAR)]
        public IActionResult GetPopularBrands()
        {
            var popularBrands = _brand.Brands.OrderByDescending(i => i.CountView).Take(ConstHome.LIMIT_BRANDS_POPULAR).ToList();
            return Ok(new { popularBrands });
        }

        [HttpGet(ConstHome.HTTP_GET_CATEGORIES_POPULAR)]
        public IActionResult GetPopularCategories()
        {
            var popularCategories = _category.Categories.OrderByDescending(i => i.CountView).Take(ConstHome.LIMIT_CATEGORIES_POPULAR).ToList();
            return Ok(new { popularCategories });
        }
    }
}
