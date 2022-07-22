using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Abstract;
using WebLibrary.ConstParameters;
using WebLibrary.Models;

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

        public UserModel ResaultSearchUserByIdAdmin(int parameter)
        {
            var user = _context.Users.FirstOrDefault(i => i.Id == parameter);
            return user;
        }

        public List<UserModel> ResaultSearchUsers(string parameter)
        {
            var users = _context.Users.Where(i => i.Login.Contains(parameter) || 
                                                  i.Name.Contains(parameter) || 
                                                  i.Surname.Contains(parameter) || 
                                                  i.Role.Contains(parameter) || 
                                                  i.Phone.Contains(parameter) || 
                                                  i.Email.Contains(parameter)
                                                  ).ToList();
            users = users.Distinct().ToList();
            return users;
        }

        public List<ProductModel> ResaultSearchProductAdmin(string parameter)
        {
            var products = _context.Products.Where(i => i.Name.Contains(parameter)).ToList();
            return products;
        }

        public ProductModel ResaultSearchProductByIdAdmin(int parameter)
        {
            var products = _context.Products.FirstOrDefault(i => i.Id == parameter);
            return products;
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
