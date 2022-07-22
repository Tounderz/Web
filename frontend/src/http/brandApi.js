import { CONFIG_MULTIPART, FORM_DATA_IDS, FORM_DATA_VIEW } from '../utils/const';
import axiosApi from './axiosApi';
import { createRequest } from './interceptor';

export const formDataBrand = (brandId, name, info, categoriesId, img) => {
    const formData = new FormData();
    formData.append('Id', brandId);
    formData.append('Name', name);
    formData.append('Info', info)
    formData.append('CategoriesId', categoriesId);
    formData.append("File", img);
    return formData;
}

export const fetchBrands = async () => {
    const {data} = await axiosApi.get(`/brands/list`)
    return data
}

export const fetchBrandsByCategory = async (brandsId) => {
    const {data} = await axiosApi.post(`/brands/brandsByCategory`, FORM_DATA_IDS(brandsId), CONFIG_MULTIPART)
    return data
}

export const createBrand = async (formData) => {
    const {data} = await createRequest().post('/brands/create', formData, CONFIG_MULTIPART)
    return data;
}

export const updateBrand = async (formData) => {
    const {data} = await createRequest().post('/brands/update', formData, CONFIG_MULTIPART)
    return data
}

export const removeBrand = async (id) => {
    const {data} = await createRequest().delete(`/brands/delete?id=${id}`)
    return data
}

export const fetchProductsBrand = async (brandId, role, page) => {
    const {data} = await axiosApi.post(`/brands/productsBrand`, FORM_DATA_VIEW(brandId, role, page), CONFIG_MULTIPART)
    return data
}

const formData = (brandId, categoriesId, page) => {
    const formData = new FormData()
    formData.append('BrandId', brandId)
    formData.append('CategoriesId', categoriesId)
    formData.append('Page', page)
    
    return formData
}
export const fetchProductsBrandByCategory = async (brandId, categoriesId, page) => {
    const {data} = await axiosApi.post(`/brands/brandByCategory`, formData(brandId, categoriesId, page), CONFIG_MULTIPART)
    return data
}