import { CONFIG_MULTIPART } from '../utils/const';
import { createRequest } from './interceptor';
import $api from './interceptorsApi';

export const fetchTypes = async (categoryId) => {
    if (categoryId > 0) {
        const {data} = await $api.get(`/types/list?categoryId=${categoryId}`);
        return data;
    } else {
        const {data} = await $api.get(`/types/list`);
        return data;
    }
}

export const fetchTypesByBrand = async (typesId) => {
    const formData = new FormData();
        formData.append('TypesId', typesId);
    const {data} = await $api.post('/types/typesByBrand', formData, CONFIG_MULTIPART );
    return data;
}

export const createType = async (name, categoryId) => {
    const {data} = await $api.post('/types/create', { Name: name, CategoryId: categoryId } );
    return data;
}

export const updateType = async (typeId, name, categoryId) => {
    const {data} = await $api.post('/types/update', { Id: typeId, Name: name, CategoryId: categoryId } );
    return data;
}

export const removeType = async (id) => {
    const {data} = await $api.delete(`/types/delete?id=${id}`);
    return data;
}

export const fetchProductsType = async (typeId, brandsId, page) => {
    const {data} = await $api.post(`/types/productsType`, { TypeId: typeId, BrandsId: brandsId, Page: page } );
    return data;
}