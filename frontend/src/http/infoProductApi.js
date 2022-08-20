import axiosApi from './axiosApi';
import { createRequest } from './interceptor';

export const fetchInfoProduct = async (productId) => {
    const {data} = await axiosApi.get(`/products/info?productId=${productId}`);
    return data;
}

export const createInfoProduct = async (productId, title, description) => {
    const {data} = await createRequest().post(`/products/createInfo`, { ProductId: productId, Title: title, Description: description});
    return data;
}

export const updateInfoProduct = async (id, title, description) => {
    const {data} = await createRequest().post(`/products/updateInfo`, { Id: id, Title: title, Description: description});
    return data;
}

export const removeInfoProduct = async (id) => {
    const {data} = await createRequest().delete(`/products/deleteInfo?id=${id}`);
    return data;
}