using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace WebLibrary.Abstract
{
    public interface IProduct
    {
        IEnumerable<ProductModel> Products { get; }
        IEnumerable<ProductInfoModel> ProductInfos { get; }
        (int countPages, List<ProductTableModel> products) GetProductsList(int page);
        ProductModel CreateProduct(ProductDtoModel model);
        ProductInfoModel CreateProductInfo(ProductInfoModel model);
        ProductModel UpdateProduct(ProductDtoModel model);
        ProductInfoModel UpdateProductInfo(ProductInfoModel model);
        void DeleteProduct(int id);
        void DeleteInfo(int id);
        void DeleteProductInfos(int id);
        void CountView(int id);
    }
}
