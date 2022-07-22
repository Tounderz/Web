using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.ConstParameters;
using WebLibrary.Abstract;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace Web.Data.Repositories
{
    public class ProductRepository : IProduct
    {
        private readonly AppDBContext _context;
        private readonly IGeneralMethods _generalMethods;

        public ProductRepository(AppDBContext context, IGeneralMethods generalMethods)
        {
            _context = context;
            _generalMethods = generalMethods;
        }

        public IEnumerable<ProductModel> Products => _context.Products;
        public IEnumerable<ProductInfoModel> ProductInfos => _context.ProductInfos;

        public ProductModel CreateProduct(ProductDtoModel model)
        {
            if (!CheckProductName(model.Name))
            {
                return null;
            }

            var product = new ProductModel
            {
                Name = model.Name,
                CategoryId = model.CategoryId,
                TypeId = model.TypeId,
                BrandId = model.BrandId,
                Price = model.Price,
                Img = model.Img != null ? _generalMethods.SaveImg(model.Img) : string.Empty,
                ShortDescription = model.ShortDescription,
                IsFavourite = model.IsFavourite != 0 && GetAvailableAndIsFavourite(model.IsFavourite),
                Available = model.Available != 0 && GetAvailableAndIsFavourite(model.Available)
            };

            _context.Products.Add(product);
            _context.SaveChanges();

            return product;
        }

        public (int countPages, List<ProductTableModel> products) GetProductsList(int page)
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

            decimal count = products.Count;
            var countPages = Convert.ToInt32(Math.Ceiling(count / ConstParameters.LIMIT_PRODUCT_ONE_PAGE));
            int start = ConstParameters.LIMIT_PRODUCT_ONE_PAGE * (page - 1);
            products = products.Skip(start).Take(ConstParameters.LIMIT_PRODUCT_ONE_PAGE).ToList();

            return (countPages, products);
        }

        public ProductInfoModel CreateProductInfo(ProductInfoModel model)
        {
            if (!CheckInfoTitle(model.ProductId, model.Title))
            {
                return null;
            }

            var info = new ProductInfoModel { ProductId = model.ProductId, Title = model.Title, Description = model.Description };
            _context.ProductInfos.Add(info);
            _context.SaveChanges();
            return info;
        }

        public ProductModel UpdateProduct(ProductDtoModel model)
        {
            var product = Products.FirstOrDefault(i => i.Id == model.Id);
            if (product == null || !CheckProductName(model.Name))
            {
                return null;
            }

            product.Name = model.Name != string.Empty ?
                           model.Name : product.Name;
            product.CategoryId = model.CategoryId != 0 ? 
                                 model.CategoryId : product.CategoryId;
            product.TypeId = model.TypeId != 0 ? 
                             model.TypeId : product.TypeId;
            product.BrandId = model.BrandId != 0 ? 
                              model.BrandId : product.BrandId;
            product.ShortDescription = model.ShortDescription != string.Empty ? 
                                       model.ShortDescription : product.ShortDescription;
            product.Price = model.Price > 0 ? 
                            model.Price : product.Price;
            product.Img = model.Img != null ? 
                          _generalMethods.SaveImg(model.Img) : product.Img;
            product.Available = model.Available != 0 ? 
                                GetAvailableAndIsFavourite(model.Available) : product.Available; 
            product.IsFavourite = model.IsFavourite != 0 ?
                                  GetAvailableAndIsFavourite(model.IsFavourite) : product.IsFavourite;

            _context.Products.Update(product);
            _context.SaveChanges();
            return product;
        }

        public ProductInfoModel UpdateProductInfo(ProductInfoModel model)
        {
            var info = ProductInfos.FirstOrDefault(i => i.Id == model.Id);
            if (info == null || !CheckInfoTitle(info.ProductId, model.Title))
            {
                return null;
            }

            info.Title = model.Title != string.Empty ? model.Title : info.Title;
            info.Description = model.Description != string.Empty ? model.Description : info.Description;

            _context.Update(info);
            _context.SaveChanges();
            return info;
        }

        public void DeleteProduct(int id)
        {
            var product = Products.FirstOrDefault(i => i.Id == id);
            _context.Products.Remove(product);
            _context.SaveChanges();
        }

        public void DeleteInfo(int id)
        {
            var info = ProductInfos.FirstOrDefault(i => i.Id == id);
            _context.ProductInfos.Remove(info);
        }

        public void DeleteProductInfos(int id)
        {
            var info = ProductInfos.Where(i => i.ProductId == id).ToList();
            _context.ProductInfos.RemoveRange(info);
            _context.SaveChanges();
        }

        public void CountView(int id)
        {
            var product = Products.FirstOrDefault(i => i.Id == id);
            product.CountView += ConstParameters.PLUS_ONE_VIEWING;
            _context.Products.Update(product);
            _context.SaveChanges();
        }

        private bool CheckProductName(string name)
        {
            var product = Products.FirstOrDefault(i => i.Name.ToLower() == name.ToLower());
            if (product == null)
            {
                return true;
            }

            return false;
        }

        private bool CheckInfoTitle(int productId, string title)
        {
            var info = ProductInfos.FirstOrDefault(i => i.ProductId == productId && i.Title.ToLower() == title.ToLower());
            if (info == null)
            {
                return true;
            }

            return false;
        }

        private bool GetAvailableAndIsFavourite(int model)
        {
            return model switch
            {
                1 => true,
                2 => false,
                _ => false,
            };
        }
    }
}
