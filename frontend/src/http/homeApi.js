import $api from './interceptorsApi';

export const fetchProductsPopular = async () => {
    const {data} = await $api.get('/home/productsPopular');
    return data;
}

export const fetchBrandsPopular = async () => {
    const {data} = await $api.get('/home/brandsPopular');
    return data;
}

export const fetchCategoriesPopular = async () => {
    const {data} = await $api.get('/home/categoriesPopular');
    return data;
}