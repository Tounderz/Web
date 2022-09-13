using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Abstract;
using WebLibrary.ConstParameters;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace Web.Data.Repositories
{
    public class SearchRepository : ISearch
    {
        private readonly AppDBContext _context;

        public SearchRepository(AppDBContext context)
        {
            _context = context;
        }

        public List<ProductModel> ResaultSearch(string parameter)
        {
            var brand = SearchBrand(parameter);
            var category = SearchCategory(parameter);
            var type = SearchType(parameter);
            var product = SearchProduct(parameter);
            var products = _context.Products.Where(i => brand.Contains(i.BrandId) || 
                                                        category.Contains(i.CategoryId) || 
                                                        type.Contains(i.TypeId) || 
                                                        product.Contains(i.Id)
                                                        ).ToList();
            products = products.Distinct().ToList();

            return products;
        }

        public List<UserModel> ResaultSearchUsers(SearchDtoModel model)
        {
            try
            {
                var users = new List<UserModel>();
                switch (model.Criteria)
                {
                    case FormFields.ID:
                        var user = _context.Users.FirstOrDefault(i => i.Id == int.Parse(model.Parameter));
                        if (user == null)
                        {
                            return null;
                        }

                        users.Add(user);
                        break;
                    case FormFields.LOGIN:
                        users = _context.Users.Where(i => i.Login.Contains(model.Parameter)).ToList();
                        break;
                    case FormFields.NAME:
                        users = _context.Users.Where(i => i.Name.Contains(model.Parameter)).ToList();
                        break;
                    case FormFields.SURNAME:
                        users = _context.Users.Where(i => i.Surname.Contains(model.Parameter)).ToList();
                        break;
                    case FormFields.ROLE:
                        users = _context.Users.Where(i => i.Role.Contains(model.Parameter)).ToList();
                        break;
                    case FormFields.PHONE:
                        users = _context.Users.Where(i => i.Phone.Contains(model.Parameter)).ToList();
                        break;
                    case FormFields.EMAIL:
                        users = _context.Users.Where(i => i.Email.Contains(model.Parameter)).ToList();
                        break;
                    default:
                        break;
                }

                return users;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<ProductModel> ResaultSearchProductByAdmin(SearchDtoModel model)
        {
            try
            {
                var products = new List<ProductModel>();
                switch (model.Criteria)
                {
                    case FormFields.ID:
                        var product = _context.Products.FirstOrDefault(i => i.Id == int.Parse(model.Parameter));
                        if (product == null)
                        {
                            return null;
                        }

                        products.Add(product);
                        break;
                    case FormFields.NAME:
                        products = _context.Products.Where(i => i.Name.Contains(model.Parameter)).ToList();
                        break;
                    case FormFields.CATEGORY:
                        var categoryId = _context.Categories.FirstOrDefault(i => i.Name.Contains(model.Parameter)).Id;
                        products = _context.Products.Where(i => i.CategoryId == categoryId).ToList();
                        break;
                    case FormFields.TYPE:
                        var typeId = _context.Types.FirstOrDefault(i => i.Name.Contains(model.Parameter)).Id;
                        products = _context.Products.Where(i => i.TypeId == typeId).ToList();
                        break;
                    case FormFields.BRAND:
                        var brandId = _context.Brands.FirstOrDefault(i => i.Name.Contains(model.Parameter)).Id;
                        products = _context.Products.Where(i => i.BrandId == brandId).ToList();
                        return products;
                    case FormFields.PRICE:
                        products = _context.Products.Where(i => i.Price == int.Parse(model.Parameter)).ToList();
                        break;
                    case FormFields.AVAILABLE:
                        products = _context.Products.Where(i => i.Available == bool.Parse(model.Parameter)).ToList();
                        break;
                    case FormFields.COUNT_VIEW:
                        products = _context.Products.Where(i => i.CountView == int.Parse(model.Parameter)).ToList();
                        break;
                    default:
                        break;
                }

                return products;
            }
            catch (Exception)
            {
                return null;
            }
            
        }

        public (int countPages, List<ProductTableModel> products) GetProductsList(List<ProductModel> model, int page)
        {
            var products = new List<ProductTableModel>();
            foreach (var item in model)
            {
                var product = new ProductTableModel
                {
                    Id = item.Id,
                    Name = item.Name,
                    CategoryName = _context.Categories.FirstOrDefault(i => i.Id == item.CategoryId).Name,
                    BrandName = _context.Brands.FirstOrDefault(i => i.Id == item.BrandId).Name,
                    TypeName = _context.Types.FirstOrDefault(i => i.Id == item.TypeId).Name,
                    ShortDescription = !string.IsNullOrEmpty(item.ShortDescription) ? item.ShortDescription : string.Empty,
                    Available = item.Available.ToString(),
                    CountView = item.CountView,
                    Price = item.Price
                };

                products.Add(product);
            }

            decimal count = products.Count;
            var countPages = Convert.ToInt32(Math.Ceiling(count / ConstParameters.LIMIT_PRODUCT_ONE_PAGE));
            int start = ConstParameters.LIMIT_PRODUCT_ONE_PAGE * (page - 1);

            products = products.Skip(start).Take(ConstParameters.LIMIT_PRODUCT_ONE_PAGE).ToList();

            return (countPages, products);
        }

        private List<int> SearchBrand(string parameter)
        {
            var brands = _context.Brands.Where(i => i.Name.Contains(parameter)).Select(i => i.Id).ToList();
            return brands;
        }

        private List<int> SearchCategory(string parameter)
        {
            var categories = _context.Categories.Where(i => i.Name.Contains(parameter)).Select(i => i.Id).ToList();
            return categories;
        }

        private List<int> SearchType(string parameter)
        {
            var types = _context.Types.Where(i => i.Name.Contains(parameter)).Select(i => i.Id).ToList();
            return types;
        }

        private List<int> SearchProduct(string parameter)
        {
            var products = _context.Products.Where(i => i.Name.Contains(parameter)).Select(i => i.Id).ToList();
            return products ?? null;
        }
    }
}
