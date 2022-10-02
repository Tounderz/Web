import { createRequest } from './interceptor';
import $api from './interceptorsApi';

export const fetchBaskets = async (login, page) => {
    const {data} = await $api.post(`/baskets/cart`, { UserLogin: login, Page: page });
    return data;
}

export const addToCart = async (id, login) => {
    const {data} = await $api.post('/baskets/add', {ProductId: id, UserLogin: login});
    return data;
}

export const removeToCartItem = async (id, login, page) => {
    const {data} = await $api.post('/baskets/delete', {ProductId: id, UserLogin: login, Page: page});
    return data;
}

export const cleanToCart = async (login, page) => {
    const {data} = await $api.post('/baskets/clean', {UserLogin: login, Page: page});
    return data;
}