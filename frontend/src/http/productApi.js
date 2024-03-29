import { CONFIG_MULTIPART } from '../utils/const';
import { createRequest } from './interceptor';
import $api from './interceptorsApi';

export const formDataProduct = ({productId, name, categoryId, typeId, brandId, shortDescription, isFavourite, available, price, img}) => {
    const formData = new FormData();
        formData.append('Id', productId);
        formData.append('Name', name);
        formData.append('CategoryId', categoryId);
        formData.append('TypeId', typeId);
        formData.append('BrandId', brandId);
        formData.append('ShortDescription', shortDescription);
        formData.append('IsFavourite', isFavourite);
        formData.append('Available', available);
        formData.append('Price', `${price}`);
        formData.append('Img', img);

    return formData;
}

export const fetchProduct = async (id) => {
    const {data} = await $api.get(`/products/getProduct?id=${id}`);
    return data;
}

export const fetchProducts = async (page) => {
    const {data} = await $api.get(`/products/productsList?page=${page}`);
    return data;
}

export const createProduct = async (formData) => {
    const {data} = await $api.post('/products/create', formData, CONFIG_MULTIPART);
    return data;
}

export const updateProduct = async (formData) => {
    const {data} = await $api.post('/products/update', formData, CONFIG_MULTIPART);
    return data;
}

export const removeProduct = async (id) => {
    const {data} = await $api.delete(`/products/delete?id=${id}`);
    return data;
}