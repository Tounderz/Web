import axiosApi from './axiosApi';

export const fetchProductsPopular = async () => {
    const {data} = await axiosApi.get('/home/productsPopular');
    return data;
}

export const fetchBrandsPopular = async () => {
    const {data} = await axiosApi.get('/home/brandsPopular');
    return data;
}

export const fetchCategoriesPopular = async () => {
    const {data} = await axiosApi.get('/home/categoriesPopular');
    return data;
}