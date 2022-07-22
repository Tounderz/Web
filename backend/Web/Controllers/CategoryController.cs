using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Abstract;
using WebLibrary.ConstParameters;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace Web.Controllers
{
    [Route(CategoryConst.CATEGORIES_ROUTE)]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategory _category;
        private readonly ICategoriesBrands _categoriesBrands;
        private readonly IProduct _product;
        private readonly IGeneralMethods _generalMethods;

        public CategoryController(ICategory category, ICategoriesBrands categoriesBrands, IProduct product, IGeneralMethods generalMethods)
        {
            _category = category;
            _categoriesBrands = categoriesBrands;
            _product = product;
            _generalMethods = generalMethods;
        }

        [HttpGet(ConstParameters.HTTP_GET_LIST)]
        public IActionResult GetCategories()
        {
            var categories = _category.Categories;
            return Ok(new { categories = categories });
        }

        [HttpPost(CategoryConst.HTTP_POST_CATEGORIES_BY_BRAND)]
        public IActionResult GetBrands()
        {
            int[] categoriesId = Request.Form.FirstOrDefault(i => i.Key == FormFields.IDS).Value.Count > 0 ?
                             Array.ConvertAll(Request.Form.FirstOrDefault(i => i.Key == FormFields.IDS).Value
                             .ToString().Trim(' ').Split(','), int.Parse) : Array.Empty<int>();
            if (categoriesId.Length == 0 && categoriesId == null)
            {
                return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
            }

            var categoriesByBrand = _category.Categories.Where(i => categoriesId.Contains(i.Id)).ToList();

            return Ok(new { categoriesByBrand });
        }

        [HttpPost(CategoryConst.HTTP_POST_PRODUCTS_CATEGORY)]
        public IActionResult GetProductsCategory()
        {
            var model = FormView();
            if (model.ModelId == 0)
            {
                return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
            }

            if (model.Role.ToLower() != ConstParameters.ADMIN_ROLE && model.Role.ToLower() != ConstParameters.MODERATOR_ROLE)
            {
                _category.CountView(model.ModelId);
            }

            var productList = _product.Products.Where(i => i.CategoryId == model.ModelId).ToList();
            if (productList == null || productList.Count < 1)
            {
                return BadRequest(new { message = "There are no products according to the selected criteria!" });
            }

            var brandsId = _categoriesBrands.CategoriesBrands.Where(i => i.CategoryId == model.ModelId).Select(i => i.BrandId).ToList();
            var (countPages, products) = _generalMethods.GetProducts(productList, model.Page);

            return Ok(new { 
                products = products,
                brandsId = brandsId,
                countPages = countPages 
            });
        }

        [HttpPost(CategoryConst.HTTP_POST_CATEGORY_BY_BRAND)]
        public IActionResult GetProductsCategoryByBrand()
        {
            var model = GetBrandsByCategoryDtoModel();
            if (model.CategoryId == 0 || model.BrandsId.Length == 0 )
            {
                return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
            }

            var productList = _product.Products.Where(i => i.CategoryId == model.CategoryId).ToList();
            productList = productList.Where(i => model.BrandsId.Contains(i.BrandId)).ToList();
            if (productList == null || productList.Count < 1)
            {
                return BadRequest(new { message = "There are no products according to the selected criteria!" });
            }

            var (countPages, products) = _generalMethods.GetProducts(productList, model.Page);

            return Ok(new { 
                products = products,
                countPages = countPages 
            });
        }

        [HttpPost(ConstParameters.HTTP_POST_CREATE)]
        public IActionResult CreateCategory()
        {
            var categoryDto = FormCategoryDto();
            var category = categoryDto != null ? _category.CreateCategory(categoryDto) : null;
            if (category == null)
            {
                return BadRequest(new { message = "There is a category with this name!" });
            }

            categoryDto.Id = category.Id;
            var categoriesBrands = categoryDto.BrandsId.Length > 0 ? _categoriesBrands.CreateBrandsByCategory(categoryDto) : null;
            if (categoriesBrands == null)
            {
                return BadRequest(new { message = "It is required to select the brand(s) for this category!" });
            }

            return Ok(new { category, categoriesBrands });
        }

        [HttpPost(ConstParameters.HTTP_POST_UPDATE)]
        public IActionResult UpdateCategory()
        {
            var categoryDto = FormCategoryDto();
            var category = categoryDto != null ? _category.UpdateCategory(categoryDto) : null;
            if (category == null)
            {
                return BadRequest(new { message = "There is a category with this name!" });
            }

            categoryDto.Id = category.Id;
            var categoriesBrands = categoryDto.BrandsId.Length > 0 ? _categoriesBrands.UpdateBrandsByCategory(categoryDto) : null;
            if (categoriesBrands == null)
            {
                return BadRequest(new { message = "It is required to select the brand(s) for this category!" });
            }

            return Ok(new { category, categoriesBrands });
        }

        [HttpDelete(ConstParameters.HTTP_DELETE)]
        public IActionResult DeleteCategory(int id)
        {
            _category.RemoveCategory(id);
            _categoriesBrands.RemoveBrandsByCategory(id);

            return Ok("success");
        }

        private CategoryDtoModel FormCategoryDto()
        {
            var categoryDto = new CategoryDtoModel
            {
                Id = int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.ID).Value),
                Name = Request.Form.FirstOrDefault(i => i.Key == FormFields.NAME).Value != string.Empty ?
                       Request.Form.FirstOrDefault(i => i.Key == FormFields.NAME).Value : string.Empty,
                ShortDescription = Request.Form.FirstOrDefault(i => i.Key == FormFields.SHART_DESCRIPTION).Value != string.Empty ?
                                   Request.Form.FirstOrDefault(i => i.Key == FormFields.SHART_DESCRIPTION).Value : string.Empty,
                Info = Request.Form.FirstOrDefault(i => i.Key == FormFields.INFO).Value != string.Empty ?
                                   Request.Form.FirstOrDefault(i => i.Key == FormFields.INFO).Value : string.Empty,
                BrandsId = !string.IsNullOrEmpty(Request.Form.FirstOrDefault(i => i.Key == FormFields.BRANDS_ID).Value) ?
                           Array.ConvertAll(Request.Form.FirstOrDefault(i => i.Key == FormFields.BRANDS_ID).Value
                           .ToString().Trim(' ').Split(','), int.Parse) : Array.Empty<int>(),
                Img = Request.Form.Files.Count != 0 ? Request.Form.Files[0] : null
            };

            return categoryDto;
        }

        private ViewDtoModel FormView()
        {
            var view = new ViewDtoModel
            {
                ModelId = int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.ID).Value),
                Role = Request.Form.FirstOrDefault(i => i.Key == FormFields.ROLE).Value,
                Page = Request.Form.FirstOrDefault(i => i.Key == FormFields.PAGE).Value != string.Empty ?
                     int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.PAGE).Value) : ConstParameters.START_PAGE,
            };

            return view;
        }

        private BrandsByCategoryDtoModel GetBrandsByCategoryDtoModel()
        {
            var model = new BrandsByCategoryDtoModel
            {
                CategoryId = int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.CATEGORY_ID).Value),
                BrandsId = !string.IsNullOrEmpty(Request.Form.FirstOrDefault(i => i.Key == FormFields.BRANDS_ID).Value) ?
                               Array.ConvertAll(Request.Form.FirstOrDefault(i => i.Key == FormFields.BRANDS_ID).Value
                               .ToString().Trim(' ').Split(','), int.Parse) : Array.Empty<int>(),
                Page = int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.PAGE).Value) > 0 ?
                       int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.PAGE).Value) : ConstParameters.START_PAGE,
            };

            return model;
        }
    }
}
