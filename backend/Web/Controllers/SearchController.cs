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
    [Route(ConstSearch.SEARCH_ROUTE)]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly ISearch _search;
        private readonly IGeneralMethods _generalMethods;

        public SearchController(ISearch search, IGeneralMethods generalMethods)
        {
            _search = search;
            _generalMethods = generalMethods;
        }

        [HttpPost(ConstSearch.HTTP_POST_SEARCH_RESULT)]
        public IActionResult Search(SearchDtoModel model)
        {
            List<ProductModel> products = _search.ResaultSearch(model.Parameter);
            if (products == null || products.Count < 1)
            {
                return BadRequest(new { message = ConstSearch.MESSAGE_ERROR });
            }

            var list = _generalMethods.GetProducts(products, model.Page);

            return Ok(new { products = list.products, countPages = list.countPages });
        }

        [HttpPost(ConstSearch.HTTP_POST_SEARCH_RESULT_USERS)]
        public IActionResult SearchUsers(SearchDtoModel model)
        {
            var users = new List<UserModel>();
            if (model.Criteria == FormFields.ID)
            {
                var user = _search.ResaultSearchUserByIdAdmin(int.Parse(model.Parameter));
                if (user == null)
                {
                    return BadRequest(new { message = ConstSearch.MESSAGE_ERROR });
                }

                users.Add(user);
            }
            else
            {
                users = _search.ResaultSearchUsers(model.Parameter);
            }

            if (users == null || users.Count < 1)
            {
                return BadRequest(new { message = ConstSearch.MESSAGE_ERROR });
            }

            var list = _generalMethods.GetUsersList(users, model.Page);

            return Ok(new { usersList = list.users, countPages = list.countPages });
        }

        [HttpPost(ConstSearch.HTTP_POST_SEARCH_RESULT_PRODUCT)]
        public IActionResult SearchProductAdmin(SearchDtoModel model)
        {
                var products = new List<ProductModel>();
                if (model.Criteria == FormFields.ID)
                {
                    var user = _search.ResaultSearchProductByIdAdmin(int.Parse(model.Parameter));
                    if (user == null)
                    {
                        return BadRequest(new { message = ConstSearch.MESSAGE_ERROR });
                    }

                    products.Add(user);
                }
                else
                {
                    products = _search.ResaultSearchProductAdmin(model.Parameter);
                }

                if (products == null || products.Count < 1)
                {
                    return BadRequest(new { message = ConstSearch.MESSAGE_ERROR });
                }

                var list = _search.GetProductsList(products, model.Page);
                
                return Ok(new { products = list.products, countPages = list.countPages });
        }
    }
}
