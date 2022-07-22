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
    [Route(ConstType.TYPES_ROUTE)]
    [ApiController]
    public class TypeController : ControllerBase
    {
        private readonly IType _type;
        private readonly IProduct _product;
        private readonly IGeneralMethods _generalMethods;

        public TypeController(IType type,  IProduct product, IGeneralMethods generalMethods)
        {
            _type = type;
            _product = product;
            _generalMethods = generalMethods;
        }

        [HttpGet(ConstParameters.HTTP_GET_LIST)]
        [HttpGet(ConstType.HTTP_GET_LIST_ID)]
        public IActionResult GetType(int categoryId)
        {
            List<TypeModel> types = new ();
            if (categoryId > 0)
            {
                types = _type.Types.Where(i => i.CategoryId == categoryId).ToList();
                return Ok(new { types });
            }

            types = _type.Types.ToList();
            return Ok(new { types });
        }

        [HttpPost(ConstType.HTTP_POST_TYPES_BY_BRAND)]
        public IActionResult GetTypesByBrand()
        {
            int[] typesId = Request.Form.FirstOrDefault(i => i.Key == FormFields.IDS).Value.Count > 0 ?
                             Array.ConvertAll(Request.Form.FirstOrDefault(i => i.Key == FormFields.IDS).Value
                             .ToString().Trim(' ').Split(','), int.Parse) : Array.Empty<int>();
            if (typesId.Length == 0 && typesId == null)
            {
                return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
            }

            List<TypeModel> typesByBrand = _type.Types.Where(i => typesId.Contains(i.Id)).ToList();

            return Ok(new { typesByBrand = typesByBrand });
        }

        

        [HttpPost(ConstType.HTTP_POST_PRODUCT_BRAND)]
        public IActionResult GetProductsBrandsByType(TypeDtoModel model)
        {
            if (model.TypeId == 0 && (model.BrandsId.Length == 0 || model.BrandsId == null))
            {
                return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
            }

            var products = new List<ProductModel>();
            if (model.TypeId != 0)
            {
                products = _product.Products.Where(i => i.TypeId == model.TypeId).ToList();
            }

            if (model.BrandsId != null && model.BrandsId.Length != 0)
            {
                products = products.Count != 0 ? products.Where(i => model.BrandsId.Contains(i.BrandId)).ToList() : 
                    _product.Products.Where(i => model.BrandsId.Contains(i.BrandId)).ToList();
            }

            if (products == null || products.Count < 1)
            {
                return BadRequest(new { message = "There are no products according to the selected criteria!" });
            }
            
            var list = _generalMethods.GetProducts(products, model.Page);
            var typesId = products.Select(i => i.TypeId).ToList();
            var types = _type.Types.Where(i => typesId.Contains(i.Id)).ToList();
            var brandsByType = model.BrandsId != null ? model.BrandsId : Array.Empty<int>();

            return Ok(new { products = list.products, countPages = list.countPages, brandsByType = brandsByType, types = types }) ;
        }

        [HttpPost(ConstParameters.HTTP_POST_CREATE)]
        public IActionResult CreateType(TypeModel model)
        {
            if (model.CategoryId == 0 || string.IsNullOrEmpty(model.Name))
            {
                return BadRequest(new { message = "Fill in the fields!" });
            }

            var type = _type.CreateType(model);
            if (type == null)
            {
                return BadRequest(new { message = "There is a type with this name!" });
            }

            return Ok(new { type });
        }

        [HttpPost(ConstParameters.HTTP_POST_UPDATE)]
        public IActionResult UpdateType(TypeModel model)
        {
            var type = _type.UpdateType(model);
            if (type == null)
            {
                return BadRequest(new { message = "There is a type with this name!" });
            }

            return Ok(new { type });
        }

        [HttpDelete(ConstParameters.HTTP_DELETE)]
        public IActionResult DeleteType(int id)
        {
            var type = _type.DeleteType(id);
            if (type == null)
            {
                return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
            }

            var types = _type.Types.ToList();
            return Ok(new { types });
        }
    }
}
