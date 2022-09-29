using System;
using System.Collections.Generic;
using System.Linq;
using WebLibrary.Abstract;
using WebLibrary.ConstParameters;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace Web.Data.Repositories
{
    public class SortRepository : ISort
    {
        private readonly AppDBContext _context;

        public SortRepository(AppDBContext dbContext)
        {
            _context = dbContext;
        }

        private IEnumerable<UserModel> Users => _context.Users;
        private IEnumerable<ProductModel> Products => _context.Products;

        public (int countPages, List<ProductTableModel> products) SortProduct(SortDtoModel model)
        {
            var products = new List<ProductTableModel>();
            foreach (var item in Products)
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

            switch (model.FieldName)
            {
                case "Id":
                    products = SortProductsById(model.TypeSort, products);
                    break;
                case "BrandName":
                    products = SortProductsByBrandName(model.TypeSort, products);
                    break;
                case "CategoryName":
                    products = SortProductsByCategoryName(model.TypeSort, products);
                    break;
                case "TypeName":
                    products = SortProductsByTypeName(model.TypeSort, products);
                    break;
                case "Name":
                    products = SortProductsByName(model.TypeSort, products);
                    break;
                case "Price":
                    products = SortProductsByPrice(model.TypeSort, products);
                    break;
                case "Available":
                    products = SortProductsByAvailable(model.TypeSort, products);
                    break;
                case "CountView":
                    products = SortProductsByCountView(model.TypeSort, products);
                    break;
                default:
                    break;
            }

            decimal count = products.Count;
            var countPages = Convert.ToInt32(Math.Ceiling(count / ConstParameters.LIMIT_PRODUCT_ONE_PAGE));
            int start = ConstParameters.LIMIT_PRODUCT_ONE_PAGE * (model.Page - 1);
            products = products.Skip(start).Take(ConstParameters.LIMIT_PRODUCT_ONE_PAGE).ToList();

            return (countPages, products);
        }

        public List<UserModel> SortUser(SortDtoModel model)
        {
            var users = new List<UserModel>();
            switch (model.FieldName)
            {
                case "Id":
                    users = SortUsersById(model.TypeSort);
                    break;
                case "Name":
                    users = SortUsersByName(model.TypeSort);
                    break;
                case "Surname":
                    users = SortUsersBySurname(model.TypeSort);
                    break;
                case "Gender":
                    users = SortUsersByGender(model.TypeSort);
                    break;
                case "DateOfBirth":
                    users = SortUsersByDateOfBirth(model.TypeSort);
                    break;
                case "Email":
                    users = SortUsersByEmail(model.TypeSort);
                    break;
                case "Phone":
                    users = SortUsersByPhone(model.TypeSort);
                    break;
                case "Login":
                    users = SortUsersByLogin(model.TypeSort);
                    break;
                case "Role":
                    users = SortUsersByRole(model.TypeSort);
                    break;
                case "ConfirmEmail":
                    users = SortUsersByConfirmEmail(model.TypeSort);
                    break;
                case "IsDeleted":
                    users = SortUsersByIsDeleted(model.TypeSort);
                    break;

                default:
                    break;
            }

            return users;
        }

        private List<ProductTableModel> SortProductsById(string typeSort, List<ProductTableModel> products)
        {
            if (typeSort.ToLower() == "down")
            {
                products = products.OrderByDescending(i => i.Id).ToList();
                return products;
            }

            products = products.OrderBy(i => i.Id).ToList();
            return products;
        }

        private List<ProductTableModel> SortProductsByBrandName(string typeSort, List<ProductTableModel> products)
        {
            if (typeSort.ToLower() == "down")
            {
                products = products.OrderByDescending(i => i.BrandName).ToList();
                return products;
            }

            products = products.OrderBy(i => i.BrandName).ToList();
            return products;
        }

        private List<ProductTableModel> SortProductsByCategoryName(string typeSort, List<ProductTableModel> products)
        {
            if (typeSort.ToLower() == "down")
            {
                products = products.OrderByDescending(i => i.CategoryName).ToList();
                return products;
            }

            products = products.OrderBy(i => i.CategoryName).ToList();
            return products;
        }

        private List<ProductTableModel> SortProductsByTypeName(string typeSort, List<ProductTableModel> products)
        {
            if (typeSort.ToLower() == "down")
            {
                products = products.OrderByDescending(i => i.TypeName).ToList();
                return products;
            }

            products = products.OrderBy(i => i.TypeName).ToList();
            return products;
        }

        private List<ProductTableModel> SortProductsByName(string typeSort, List<ProductTableModel> products)
        {
            if (typeSort.ToLower() == "down")
            {
                products = products.OrderByDescending(i => i.Name).ToList();
                return products;
            }

            products = products.OrderBy(i => i.Name).ToList();
            return products;
        }

        private List<ProductTableModel> SortProductsByPrice(string typeSort, List<ProductTableModel> products)
        {
            if (typeSort.ToLower() == "down")
            {
                products = products.OrderByDescending(i => i.Price).ToList();
                return products;
            }

            products = products.OrderBy(i => i.Price).ToList();
            return products;
        }

        private List<ProductTableModel> SortProductsByAvailable(string typeSort, List<ProductTableModel> products)
        {
            if (typeSort.ToLower() == "down")
            {
                products = products.OrderByDescending(i => i.Available).ToList();
                return products;
            }

            products = products.OrderBy(i => i.Available).ToList();
            return products;
        }

        private List<ProductTableModel> SortProductsByCountView(string typeSort, List<ProductTableModel> products)
        {
            if (typeSort.ToLower() == "down")
            {
                products = products.OrderByDescending(i => i.CountView).ToList();
                return products;
            }

            products = products.OrderBy(i => i.CountView).ToList();
            return products;
        }

        private List<UserModel> SortUsersById(string typeSort)
        {
            var users = new List<UserModel>();
            if (typeSort.ToLower() == "down")
            {
                users = Users.OrderByDescending(i => i.Id).ToList();
                return users;
            }

            users = Users.OrderBy(i => i.Id).ToList();
            return users;
        }

        private List<UserModel> SortUsersByName(string typeSort)
        {
            var users = new List<UserModel>();
            if (typeSort.ToLower() == "down")
            {
                users = Users.OrderByDescending(i => i.Name).ToList();
                return users;
            }

            users = Users.OrderBy(i => i.Name).ToList();
            return users;
        }

        private List<UserModel> SortUsersBySurname(string typeSort)
        {
            var users = new List<UserModel>();
            if (typeSort.ToLower() == "down")
            {
                users = Users.OrderByDescending(i => i.Surname).ToList();
                return users;
            }

            users = Users.OrderBy(i => i.Surname).ToList();
            return users;
        }

        private List<UserModel> SortUsersByGender(string typeSort)
        {
            var users = new List<UserModel>();
            if (typeSort.ToLower() == "down")
            {
                users = Users.OrderByDescending(i => i.Gender).ToList();
                return users;
            }

            users = Users.OrderBy(i => i.Gender).ToList();
            return users;
        }

        private List<UserModel> SortUsersByDateOfBirth(string typeSort)
        {
            var users = new List<UserModel>();
            if (typeSort.ToLower() == "down")
            {
                users = Users.OrderByDescending(i => DateTime.Parse(i.DateOfBirth)).ToList();
                return users;
            }

            users = Users.OrderBy(i => DateTime.Parse(i.DateOfBirth)).ToList();
            return users;
        }

        private List<UserModel> SortUsersByEmail(string typeSort)
        {
            var users = new List<UserModel>();
            if (typeSort.ToLower() == "down")
            {
                users = Users.OrderByDescending(i => i.Email).ToList();
                return users;
            }

            users = Users.OrderBy(i => i.Email).ToList();
            return users;
        }

        private List<UserModel> SortUsersByPhone(string typeSort)
        {
            var users = new List<UserModel>();
            if (typeSort.ToLower() == "down")
            {
                users = Users.OrderByDescending(i => i.Phone).ToList();
                return users;
            }

            users = Users.OrderBy(i => i.Phone).ToList();
            return users;
        }

        private List<UserModel> SortUsersByLogin(string typeSort)
        {
            var users = new List<UserModel>();
            if (typeSort.ToLower() == "down")
            {
                users = Users.OrderByDescending(i => i.Login).ToList();
                return users;
            }

            users = Users.OrderBy(i => i.Login).ToList();
            return users;
        }

        private List<UserModel> SortUsersByRole(string typeSort)
        {
            var users = new List<UserModel>();
            if (typeSort.ToLower() == "down")
            {
                users = Users.OrderByDescending(i => i.Role).ToList();
                return users;
            }

            users = Users.OrderBy(i => i.Role).ToList();
            return users;
        }

        private List<UserModel> SortUsersByConfirmEmail(string typeSort)
        {
            var users = new List<UserModel>();
            if (typeSort.ToLower() == "down")
            {
                users = Users.OrderByDescending(i => i.ConfirmEmail).ToList();
                return users;
            }

            users = Users.OrderBy(i => !i.ConfirmEmail).ToList();
            return users;
        }

        private List<UserModel> SortUsersByIsDeleted(string typeSort)
        {
            var users = new List<UserModel>();
            if (typeSort.ToLower() == "down")
            {
                users = Users.OrderByDescending(i => !i.IsDeleted).ToList();
                return users;
            }

            users = Users.OrderBy(i => i.IsDeleted).ToList();
            return users;
        }
    }
}
