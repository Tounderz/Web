import { createRequest } from './interceptor';

export const orderDetail = async (name, productId, productPrice, city, street, house, flat, commentsOrder, paymentMethod) => {
    const {data} = await createRequest().post('/orders/order', { Login: name, ProductId: productId, ProductPrice: productPrice, City: city, Street: street, House: house, Flat: flat, CommentsOrder: commentsOrder, PaymentMethod: paymentMethod })
    return data
}

export const orderAllItemsBasket = async (name, city, street, house, flat, commentsOrder, paymentMethod) => {
    const {data} = await createRequest().post('/orders/orderAllItemsBasket', { Login: name, City: city, Street: street, House: house, Flat: flat, CommentsOrder: commentsOrder, PaymentMethod: paymentMethod })
    return data
}

export const ordersList = async (login, page) => {
    const {data} = await createRequest().post(`/orders/ordersList`, { Login: login, Page: page })
    return data
}