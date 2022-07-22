import { createRequest } from './interceptor';

export const fetchBaskets = async (login, page) => {
    const {data} = await createRequest().post(`/baskets/cart`, { UserLogin: login, Page: page })
    return data
}

export const addToCart = async (id, login) => {
    const {data} = await createRequest().post('/baskets/add', {ProductId: id, UserLogin: login})
    return data
}

export const removeToCartItem = async (id, login, page) => {
    const {data} = await createRequest().post('/baskets/delete', {ProductId: id, UserLogin: login, Page: page})
    return data
}

export const cleanToCart = async (login, page) => {
    const {data} = await createRequest().post('/baskets/clean', {UserLogin: login, Page: page})
    return data
}