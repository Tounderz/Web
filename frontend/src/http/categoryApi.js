import { CONFIG_MULTIPART, FORM_DATA_VIEW, FORM_DATA_IDS} from '../utils/const';
import axiosApi from './axiosApi';
import { createRequest } from './interceptor';

export const formDataCategory = (categoryId, name, shortDescription, info, img, brandsId) => {
    const formData = new FormData();
    formData.append('Id', categoryId);
    formData.append('Name', name);
    formData.append('ShortDescription', shortDescription);
    formData.append('Info', info)
    formData.append("Img", img);
    formData.append('BrandsId', brandsId);

    return formData;
}

export const fetchCategories = async () => {
    const {data} = await axiosApi.get(`/categories/list`)
    return data
}

export const fetchCategoriesByBrand = async (categoriesId) => {
    const {data} = await axiosApi.post(`/categories/categoriesByBrand`, FORM_DATA_IDS(categoriesId), CONFIG_MULTIPART)
    return data
}

export const createCategory = async ( formData ) => {
    const {data} = await createRequest().post('/categories/create', formData, CONFIG_MULTIPART )
    return data;
}

export const updateCategory = async ( formData ) => {
    const {data} = await createRequest().post('/categories/update', formData, CONFIG_MULTIPART )
    return data
}

export const removeCategory = async (id) => {
    const {data} = await createRequest().delete(`/categories/delete?id=${id}`)
    return data
}

export const fetchProductsCategory = async (categoryId, role, page) => {
    const {data} = await axiosApi.post(`/categories/productsCategory`, FORM_DATA_VIEW(categoryId, role, page), CONFIG_MULTIPART)
    return data
}

const formData = (categoryId, brandsId, page) => {
    const formData = new FormData()
    formData.append('CategoryId', categoryId)
    formData.append('BrandsId', brandsId)
    formData.append('Page', page)
    
    return formData
}
export const fetchProductsCategoryByBrand = async (categoryId, brandsId, page) => {
    const {data} = await axiosApi.post(`/categories/categoryByBrand`, formData(categoryId, brandsId, page), CONFIG_MULTIPART)
    return data
}