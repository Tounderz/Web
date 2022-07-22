using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebLibrary.Models;

namespace Web.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) :
            base(options)
        {
        }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<ProductModel> Products { get; set; }
        public DbSet<CategoryModel> Categories { get; set; }
        public DbSet<BasketModel> Baskets { get; set; }
        public DbSet<ProductInfoModel> ProductInfos { get; set; }
        public DbSet<BrandModel> Brands { get; set; }
        public DbSet<TypeModel> Types { get; set; }
        public DbSet<OrderModel> Orders { get; set; }
        public DbSet<PaymentMethodModel> PaymentMethods { get; set; }
        public DbSet<CategoriesBrandsModel> CategoriesBrands { get; set; }
        public DbSet<RefreshTokenModel> RefreshTokens { get; set; }
    }
}
