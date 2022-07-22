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
    [Route(ConstProduct.PRODUCTS_ROUTE)]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProduct _product;

        public ProductController(IProduct product, IGeneralMethods general)
        {
            _product = product;
        }

        [HttpGet(ConstProduct.HTTP_GET_PRODUCT)]
        public IActionResult GetProduct(int id)
        {
            var product = _product.Products.FirstOrDefault(i => i.Id == id);
            if (product == null)
            {
                return BadRequest();
            }

            return Ok( new { product = product });
        }

        [HttpGet(ConstProduct.HTTP_GET_PRODUCT_LIST)]
        public IActionResult GetProducts(int page)
        {
            var list = _product.GetProductsList(page);

            return Ok( new { products = list.products, countPages = list.countPages });
        }

        [HttpGet(ConstProduct.HTTP_GET_INFO)]
        public IActionResult GetInfoProduct(int productId)
        {
            List<ProductInfoModel> infoProducts = _product.ProductInfos.Where(i => i.ProductId == productId).ToList();
            return Ok(new { infoProducts });
        }

        [HttpPost(ConstProduct.HTTP_POST_COUNT_VIEW)]
        public IActionResult UpdateCountViewProduct()
        {
            var view = View();
            if (view.Role.ToLower() != ConstParameters.ADMIN_ROLE && view.Role.ToLower() != ConstParameters.MODERATOR_ROLE)
            {
                _product.CountView(view.ModelId);
            }

            return Ok();
        }

        [HttpPost(ConstParameters.HTTP_POST_CREATE)]
        public IActionResult CreateProduct()
        {
            var productDto = CreateProductDto();
            var product = productDto != null ? _product.CreateProduct(productDto) : null;
            if (product == null)
            {
                return BadRequest(new { message = "There is a product with this name!" });
            }

            return Ok( new { product = product } );
        }

        [HttpPost(ConstProduct.HTTP_POST_CREATE_INFO)]
        public IActionResult CreateInfo(ProductInfoModel model)
        {
            var info = _product.CreateProductInfo(model);
            if (info == null)
            {
                return BadRequest(new { message = "The title field with this name exists!" });
            }

            List<ProductInfoModel> infoList = _product.ProductInfos.Where(i => i.ProductId == model.ProductId).ToList();
            return Ok(new { info = infoList });
        }

        [HttpPost(ConstParameters.HTTP_POST_UPDATE)]
        public IActionResult UpdateProduct()
        {
            var productDto = CreateProductDto();
            var product = productDto != null ? _product.UpdateProduct(productDto) : null;
            if (product == null)
            {
                return BadRequest(new { message = "There is a product with this name!" });
            }

            return Ok(new { product = product });
        }

        [HttpPost(ConstProduct.HTTP_POST_UPDATE_INFO)]
        public IActionResult UpdateInfo(ProductInfoModel model)
        {
            var info = _product.UpdateProductInfo(model);
            if (info == null)
            {
                return BadRequest(new { message = "The title field with this name exists!" });
            }

            List<ProductInfoModel> infoList = _product.ProductInfos.Where(i => i.ProductId == info.ProductId).ToList();

            return Ok(new { info = infoList });
        }

        [HttpDelete(ConstProduct.HTTP_DELETE_INFO)]
        public IActionResult DeleteInfo(int id)
        {
            _product.DeleteInfo(id);
            var infoProducts = _product.ProductInfos.Where(i => i.ProductId == id).ToList();
            return Ok(new { infoProducts = infoProducts });
        }

        [HttpDelete(ConstParameters.HTTP_DELETE)]
        public IActionResult DeleteProduct(int id)
        {
            _product.DeleteProduct(id);
            _product.DeleteProductInfos(id);
            return Ok("success");
        }

        private ProductDtoModel CreateProductDto()
        {
            var productDto = new ProductDtoModel
            {
                Id = int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.ID).Value),
                Name = Request.Form.FirstOrDefault(i => i.Key == FormFields.NAME).Value,
                CategoryId = Request.Form.FirstOrDefault(i => i.Key == FormFields.CATEGORY_ID).Value != string.Empty ?
                             int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.CATEGORY_ID).Value) : 0,
                TypeId = Request.Form.FirstOrDefault(i => i.Key == FormFields.TYPE_ID).Value != string.Empty ?
                         int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.TYPE_ID).Value) : 0,
                BrandId = Request.Form.FirstOrDefault(i => i.Key == FormFields.BRAND_ID).Value != string.Empty ?
                          int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.BRAND_ID).Value) : 0,
                ShortDescription = Request.Form.FirstOrDefault(i => i.Key == FormFields.SHART_DESCRIPTION).Value,
                IsFavourite = Request.Form.FirstOrDefault(i => i.Key == FormFields.IS_FAVOURITE).Value != string.Empty ?
                              int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.IS_FAVOURITE).Value) : 0,
                Available = Request.Form.FirstOrDefault(i => i.Key == FormFields.AVAILABLE).Value != string.Empty ?
                            int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.AVAILABLE).Value) : 0,
                Price = Request.Form.FirstOrDefault(i => i.Key == FormFields.PRICE).Value != string.Empty ?
                        int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.PRICE).Value) : 0,
                Img = Request.Form.Files.Count != 0 ? Request.Form.Files[0] : null,
            };

            return productDto;
        }

        private ViewDtoModel View()
        {
            var view = new ViewDtoModel
            {
                ModelId = Request.Form.FirstOrDefault(i => i.Key == FormFields.ID).Value != string.Empty ?
                     int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.ID).Value) : 0,
                Role = Request.Form.FirstOrDefault(i => i.Key == FormFields.ROLE).Value,
            };

            return view;
        }
    }
}