import { createRequest } from './interceptor';

export const fetchProductsPopular = async () => {
    const {data} = await createRequest().get('/home/productsPopular');
    return data;
}

export const fetchBrandsPopular = async () => {
    const {data} = await createRequest().get('/home/brandsPopular');
    return data;
}

export const fetchCategoriesPopular = async () => {
    const {data} = await createRequest().get('/home/categoriesPopular');
    return data;
}