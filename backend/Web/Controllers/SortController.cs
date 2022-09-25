using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebLibrary.Abstract;
using WebLibrary.ConstParameters;
using WebLibrary.Models.Dtos;

namespace Web.Controllers
{
    [Route(ConstSort.SORT_ROUTE)]
    [ApiController]
    public class SortController : ControllerBase
    {
        private readonly ISort _sort;
        private readonly IGeneralMethods _generalMethods;

        public SortController(ISort sort, IGeneralMethods generalMethods)
        {
            _sort = sort;
            _generalMethods = generalMethods;
        }

        [HttpPost(ConstSort.HTTP_POST_SORT_USERS)]
        public IActionResult SortUsers(SortDtoModel model)
        {
            var sort = _sort.SortUser(model);
            if (sort == null)
            {
                return BadRequest();
            }

            var (countPages, users) = _generalMethods.GetUsersList(sort, model.Page);
            return Ok(new
            {
                usersList = users,
                countPages = countPages
            });
        }

        [HttpPost(ConstSort.HTTP_POST_SORT_PRODUCTS)]
        public IActionResult SortProducts(SortDtoModel model)
        {
            var (countPages, products) = _sort.SortProduct(model);
            if (products == null)
            {
                return BadRequest();
            }

            return Ok( new
            {
                products = products,
                countPages = countPages
            });
        }
    }
}
