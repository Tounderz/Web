import { createRequest } from './interceptor';
import $api from './interceptorsApi';

export const fetchInfoProduct = async (productId) => {
    const {data} = await $api.get(`/products/info?productId=${productId}`);
    return data;
}

export const createInfoProduct = async (productId, title, description) => {
    const {data} = await $api.post(`/products/createInfo`, { ProductId: productId, Title: title, Description: description});
    return data;
}

export const updateInfoProduct = async (id, title, description) => {
    const {data} = await $api.post(`/products/updateInfo`, { Id: id, Title: title, Description: description});
    return data;
}

export const removeInfoProduct = async (id) => {
    const {data} = await $api.delete(`/products/deleteInfo?id=${id}`);
    return data;
}