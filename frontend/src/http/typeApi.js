import { CONFIG_MULTIPART, FORM_DATA_IDS } from '../utils/const';
import axiosApi from './axiosApi';
import { createRequest } from './interceptor';

export const fetchTypes = async (categoryId) => {
    if (categoryId > 0) {
        const {data} = await axiosApi.get(`/types/list?categoryId=${categoryId}`)
        return data
    } else {
        const {data} = await axiosApi.get(`/types/list`)
        return data
    }
}

export const fetchTypesByBrand = async (typesId) => {
    const {data} = await axiosApi.post('/types/typesByBrand', FORM_DATA_IDS(typesId), CONFIG_MULTIPART )
    return data
}

export const createType = async (name, categoryId) => {
    const {data} = await createRequest().post('/types/create', { Name: name, CategoryId: categoryId } )
    return data;
}

export const updateType = async (typeId, name, categoryId) => {
    const {data} = await createRequest().post('/types/update', { Id: typeId, Name: name, CategoryId: categoryId } )
    return data
}

export const removeType = async (id) => {
    const {data} = await createRequest().delete(`/types/delete?id=${id}`)
    return data
}

export const fetchProductsType = async (typeId, brandsId, page) => {
    const {data} = await axiosApi.post(`/types/productsType`, { TypeId: typeId, BrandsId: brandsId, Page: page } )
    return data
}