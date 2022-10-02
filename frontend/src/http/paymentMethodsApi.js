import { createRequest } from './interceptor';
import $api from './interceptorsApi';

export const fetchPaymentMethods = async () => {
    const {data} = await $api.get(`/paymentMethods/list`);
    return data;
}

export const createPaymentMethods = async (name) => {
    const {data} = await $api.post('/paymentMethods/create', {name: name});
    return data;
}

export const updatePaymentMethods = async (id, name) => {
    const {data} = await $api.post('/paymentMethods/update', {Id: id, Name: name});
    return data;
}

export const removePaymentMethods = async (id) => {
    const {data} = await $api.delete(`/paymentMethods/delete?id=${id}`);
    return data;
}