import { createRequest } from './interceptor';
import $api from './interceptorsApi';

export const orderDetail = async (name, productId, productPrice, city, street, house, flat, commentsOrder, paymentMethod) => {
    const {data} = await $api.post('/orders/order', { Login: name, ProductId: productId, ProductPrice: productPrice, City: city, Street: street, House: house, Flat: flat, CommentsOrder: commentsOrder, PaymentMethod: paymentMethod });
    return data;
}

export const orderAllItemsBasket = async (name, city, street, house, flat, commentsOrder, paymentMethod) => {
    const {data} = await $api.post('/orders/orderAllItemsBasket', { Login: name, City: city, Street: street, House: house, Flat: flat, CommentsOrder: commentsOrder, PaymentMethod: paymentMethod });
    return data;
}

export const ordersList = async (login, page) => {
    const {data} = await $api.post(`/orders/ordersList`, { Login: login, Page: page });
    return data;
}