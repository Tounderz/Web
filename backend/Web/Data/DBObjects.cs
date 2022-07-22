using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Models;

namespace Web.Data
{
    public class DBObjects
    {
        protected DBObjects()
        {
        }

        private static readonly List<BrandModel> _brands = new ()
        {
            new BrandModel { Name = "Tesla" },
            new BrandModel { Name = "Ford" },
            new BrandModel { Name = "BMW" },
            new BrandModel { Name = "Mercedes" },
            new BrandModel { Name = "Nissan" },
            new BrandModel { Name = "Apple" },
            new BrandModel { Name = "HP" }
        };

        private static readonly List<ProductInfoModel> _productInfos = new ()
        {
            new ProductInfoModel { ProductId = 1, Title = "Range (EPA est.)", Description = "396 mi" },
            new ProductInfoModel { ProductId = 1, Title = "0-60 mph*", Description = "1.99 s" },
            new ProductInfoModel { ProductId = 1, Title = "Top Speed†", Description = "200 mph" },
            new ProductInfoModel { ProductId = 1, Title = "Peak Power", Description = "1,020 hp"},
            new ProductInfoModel { ProductId = 6, Title = "Screen diagonal", Description = "6.7”"},
            new ProductInfoModel { ProductId = 6, Title = "Processor", Description = "A15 Bionic"},
            new ProductInfoModel { ProductId = 6, Title = "Case Material", Description = "Metal/Glass"},
            new ProductInfoModel { ProductId = 6, Title = "Screen diagonal", Description = "6.7”"},
            new ProductInfoModel { ProductId = 7, Title = "Processor", Description = "AMD Ryzen 7 5800H"},
            new ProductInfoModel { ProductId = 7, Title = "Processor frequency", Description = "3,200 MHz - 4400MHz"},
            new ProductInfoModel { ProductId = 7, Title = "Graphics built into the processor", Description = "AMD Radeon Vega 8"},
            new ProductInfoModel { ProductId = 7, Title = "Matrix frequency", Description = "144 Hz"},
            new ProductInfoModel { ProductId = 7, Title = "Discrete graphics", Description = "NVIDIA GeForce RTX 3060 6 GB"},
            new ProductInfoModel { ProductId = 8, Title = "Processor", Description = "Apple M1 Max"},
            new ProductInfoModel { ProductId = 8, Title = "Matrix frequency", Description = "120 Hz"},
            new ProductInfoModel { ProductId = 8, Title = "SSD", Description = "4096 Gb"},
            new ProductInfoModel { ProductId = 8, Title = "Screen diagonal", Description = "16.2”"},
        };

        private static readonly List<CategoryModel> _categories = new () 
        {
            new CategoryModel
            {
                Name = "Cars",
                Img = "/img/Cars.jpg",
                ShortDescription = "In this category, you will pick up a car for yourself."
            },
            new CategoryModel
            {
                Name = "Mobile Phones",
                Img = "/img/Phone.jpg",
                ShortDescription = "In this category, you will pick up a mobile phone to your taste and for your needs."
            },
            new CategoryModel
            {
                Name = "Laptops",
                Img = "/img/Laptop.jpg",
                ShortDescription = "In this category, you will pick up a laptop to your taste and for your needs."
            },
            new CategoryModel
            {
                Name = "PC",
                Img = "/img/Pc.jpg",
                ShortDescription = "Category of PC"
            }
        };

        private static readonly List<TypeModel> _types = new ()
        {
            new TypeModel { CategoryId = 1, Name = "ElictricCars" },
            new TypeModel { CategoryId = 1, Name = "Classics cars" },
            new TypeModel { CategoryId = 2, Name = "IOS" },
            new TypeModel { CategoryId = 3, Name = "Gaming" },
            new TypeModel { CategoryId = 3, Name = "Ultrabook" },
            new TypeModel { CategoryId = 2, Name = "Android" }
        };

        private static readonly List<PaymentMethodModel> _paymentMethods = new ()
        {
            new PaymentMethodModel { Name = "Cash" },
            new PaymentMethodModel { Name = "Credit card" }

        };

        public static void Initial(AppDBContext context)
        {
            if (!context.Categories.Any())//добавление всех необходимых категорий
            {
                context.AddRange(_categories);
            }

            if (!context.Types.Any())
            {
                context.Types.AddRange(_types);
            }

            if (!context.Brands.Any())
            {
                context.Brands.AddRange(_brands);
            }

            if (!context.ProductInfos.Any())
            {
                context.ProductInfos.AddRange(_productInfos);
            }

            if (!context.PaymentMethods.Any())
            {
                context.PaymentMethods.AddRange(_paymentMethods);
            }

            if (!context.Products.Any())
            {
                context.AddRange(
                    new ProductModel
                    {
                        CategoryId = 1,
                        TypeId = 1,
                        BrandId = 1,
                        Name = "Model S",
                        ShortDescription = "Fast car from Tesla",
                        Img = "/img/Tesla.jpg",
                        Price = 45000,
                        IsFavourite = true,
                        Available = true,
                    },
                    new ProductModel
                    {
                        CategoryId = 1,
                        TypeId = 2,
                        BrandId = 2,
                        Name = "Fiesta",
                        ShortDescription = "Quiet and calm",
                        Img = "/img/Ford.jpg",
                        Price = 11000,
                        IsFavourite = false,
                        Available = true,
                    },
                    new ProductModel
                    {
                        CategoryId = 1,
                        TypeId = 2,
                        BrandId = 3,
                        Name = "M3",
                        ShortDescription = "Bold and stylish",
                        Img = "/img/BMW.jpg",
                        Price = 65000,
                        IsFavourite = true,
                        Available = true,
                    },
                    new ProductModel
                    {
                        CategoryId = 1,
                        TypeId = 2,
                        BrandId = 4,
                        Name = "C class",
                        ShortDescription = "Cozy and large",
                        Img = "/img/Mercedes.jpg",
                        Price = 40000,
                        IsFavourite = false,
                        Available = false,
                    },
                    new ProductModel
                    {
                        CategoryId = 1,
                        TypeId = 1,
                        BrandId = 5,
                        Name = "Leaf",
                        ShortDescription = "Silent and economical",
                        Img = "/img/Nissan.jpg",
                        Price = 14000,
                        IsFavourite = true,
                        Available = true,
                    },
                    new ProductModel
                    {
                        CategoryId = 2,
                        TypeId = 3,
                        BrandId = 6,
                        Name = "IPhone 13 Pro Max",
                        ShortDescription = "Apple's flagship",
                        Img = "/img/iphone-13-pro-max.jpg",
                        Price = 1800,
                        IsFavourite = true,
                        Available = true,

                    },
                    new ProductModel
                    {
                        CategoryId = 3,
                        TypeId = 3,
                        BrandId = 7,
                        Name = "OMEN",
                        ShortDescription = "Gaming laptop",
                        Img = "/img/HP.jpg",
                        Price = 2300,
                        IsFavourite = true,
                        Available = true,
                    },
                    new ProductModel
                    {
                        CategoryId = 3,
                        TypeId = 5,
                        BrandId = 6,
                        Name = "Macbook Pro 16 M1 Max 2021",
                        ShortDescription = "Ultrabook, for programming, for designer, for photographer",
                        Img = "/img/mac2021.jpg",
                        Price = 8600,
                        IsFavourite = true,
                        Available = true,
                    }
                );
            }

            context.SaveChanges();
        }
    }
}
