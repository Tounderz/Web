﻿using Microsoft.AspNetCore.Http;
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
    [Route(ConstBrand.BRANDS_ROUTE)]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrand _brand;
        private readonly ICategoriesBrands _categoriesBrands;
        private readonly IProduct _product;
        private readonly IGeneralMethods _generalMethods;

        public BrandController(IBrand brand, ICategoriesBrands categoriesBrands, IProduct product, IGeneralMethods generalMethods)
        {
            _brand = brand;
            _categoriesBrands = categoriesBrands;
            _product = product;
            _generalMethods = generalMethods;
        }

        [HttpGet(ConstParameters.HTTP_GET_LIST)]
        public IActionResult GetBrand()
        {
            var brands = _brand.Brands;
            return Ok(new { brands = brands });
        }

        [HttpGet(ConstBrand.HTTP_GET_BRANDS_BY_CATEGORY)]
        public IActionResult GetBrands(int categoryId)
        {
            if (categoryId < 1)
            {
                return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
            }

            var brandsId = _categoriesBrands.CategoriesBrands.Where(i => i.CategoryId == categoryId).Select(i => i.BrandId).ToList();
            if (brandsId.Count == 0 || brandsId == null)
            {
                return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
            }

            var brandsByCategory = _brand.Brands.Where(i => brandsId.Contains(i.Id)).ToList();

            return Ok(new { brandsByCategory = brandsByCategory });
        }

        [HttpPost(ConstBrand.HTTP_POST_PRODUCTS_BRAND)]
        public IActionResult GetProductsBrand()
        {
            var view = FormView();
            if (view.ModelId == 0)
            {
                return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
            }

            if (view.Role.ToLower() != ConstParameters.ADMIN_ROLE && view.Role.ToLower() != ConstParameters.MODERATOR_ROLE)
            {
                _brand.CountView(view.ModelId);
            }

            var productList = _product.Products.Where(i => i.BrandId == view.ModelId).ToList();
            if (productList == null || productList.Count < 1)
            {
                return BadRequest(new { message = "There are no products according to the selected criteria!" });
            }

            var (countPages, products) = _generalMethods.GetProducts(productList, view.Page);

            return Ok(new
            {
                products = products,
                countPages = countPages
            });
        }

        [HttpPost(ConstBrand.HTTP_POST_BRAND_BY_CATEGORY)]
        public IActionResult GetProductsCategoryByBrand()
        {
            var categoriesBrandsDto = GetCategoriesBrandsDto();
            if (categoriesBrandsDto.BrandId == 0 || categoriesBrandsDto.CategoriesId.Length == 0)
            {
                return BadRequest(new { message = ConstParameters.INVALID_CREDENTIALS_ERROR });
            }

            var productList = _product.Products.Where(i => i.BrandId == categoriesBrandsDto.BrandId).ToList();
            productList = productList.Where(i => categoriesBrandsDto.CategoriesId.Contains(i.CategoryId)).ToList();
            if (productList == null || productList.Count < 1)
            {
                return BadRequest(new { message = "There are no products according to the selected criteria!" });
            }

            var typesId = productList.Select(i => i.TypeId).ToList();
            var (countPages, products) = _generalMethods.GetProducts(productList, categoriesBrandsDto.Page);

            return Ok(new
            {
                products = products,
                typesId = typesId,
                countPages = countPages
            });
        }

        [HttpPost(ConstParameters.HTTP_POST_CREATE)]
        public IActionResult CreateBrand()
        {
            var brandDto = FormBrandDto();
            if (brandDto.CategoriesId.Length < 1)
            {
                return BadRequest(new { message = "It is required to select the category(s) for this brand!" });
            }

            var brand = brandDto != null ? _brand.CreateBrand(brandDto) : null;
            if (brand == null)
            {
                return BadRequest(new { message = "There is a brand with this name!" });
            }

            brandDto.BrandId = brand.Id;
            var categoriesBrands = _categoriesBrands.CreateCategoriesByBrand(brandDto);

            var brands = _brand.Brands;
            return Ok(new { brands = brands });
        }

        [HttpPost(ConstParameters.HTTP_POST_UPDATE)]
        public IActionResult UpdateBrand()
        {
            var brandDto = FormBrandDto();
            if (brandDto.CategoriesId == null)
            {
                return BadRequest(new { message = "It is required to select the category(s) for this brand!" });
            }

            var brand = brandDto != null ? _brand.UpdateBrand(brandDto) : null;
            if (brand == null)
            {
                return BadRequest(new { message = "There is a brand with this name!" });
            }

            brandDto.BrandId = brand.Id;
            var categoriesBrands = _categoriesBrands.UpdateCategoriesByBrand(brandDto);

            var brands = _brand.Brands;
            return Ok(new { brands = brands });
        }

        [HttpDelete(ConstParameters.HTTP_DELETE)]
        public IActionResult DeleteCategory(int id)
        {
            _brand.DeleteBrand(id);
            _categoriesBrands.RemoveCategoriesByBrand(id);
            var brands = _brand.Brands;

            return Ok(new { brands = brands });
        }

        private BrandDtoModel FormBrandDto()
        {
            var brandDto = new BrandDtoModel
            {
                BrandId = int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.BRAND_ID).Value),
                Name = !string.IsNullOrEmpty(Request.Form.FirstOrDefault(i => i.Key == FormFields.NAME).Value) ?
                       Request.Form.FirstOrDefault(i => i.Key == FormFields.NAME).Value : string.Empty,
                Info = !string.IsNullOrEmpty(Request.Form.FirstOrDefault(i => i.Key == FormFields.INFO).Value) ?
                       Request.Form.FirstOrDefault(i => i.Key == FormFields.INFO).Value : string.Empty,
                CategoriesId = !string.IsNullOrEmpty(Request.Form.FirstOrDefault(i => i.Key == FormFields.CATEGORIES_ID).Value) ?
                               Array.ConvertAll(Request.Form.FirstOrDefault(i => i.Key == FormFields.CATEGORIES_ID).Value
                               .ToString().Trim(' ').Split(','), int.Parse) : Array.Empty<int>(),
                Img = Request.Form.Files.Count != 0 ? Request.Form.Files[0] : null
            };

            return brandDto;
        }

        private ViewDtoModel FormView()
        {
            var view = new ViewDtoModel
            {
                ModelId = int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.MODEL_ID).Value),
                Role = Request.Form.FirstOrDefault(i => i.Key == FormFields.ROLE).Value,
                Page = int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.PAGE).Value) > 0 ?
                     int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.PAGE).Value) : ConstParameters.START_PAGE,
            };

            return view;
        }

        private CategoriesByBrandDtoModel GetCategoriesBrandsDto()
        {
            var categoriesBrandsDto = new CategoriesByBrandDtoModel
            {
                BrandId = int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.BRAND_ID).Value),
                CategoriesId = !string.IsNullOrEmpty(Request.Form.FirstOrDefault(i => i.Key == FormFields.CATEGORIES_ID).Value) ?
                               Array.ConvertAll(Request.Form.FirstOrDefault(i => i.Key == FormFields.CATEGORIES_ID).Value
                               .ToString().Trim(' ').Split(','), int.Parse) : Array.Empty<int>(),
                Page = int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.PAGE).Value) > 0 ?
                       int.Parse(Request.Form.FirstOrDefault(i => i.Key == FormFields.PAGE).Value) : ConstParameters.START_PAGE,
            };

            return categoriesBrandsDto;
        }
    }
}
