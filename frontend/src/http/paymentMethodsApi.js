import { createRequest } from './interceptor';

export const fetchPaymentMethods = async () => {
    const {data} = await createRequest().get(`/paymentMethods/list`);
    return data;
}

export const createPaymentMethods = async (name) => {
    const {data} = await createRequest().post('/paymentMethods/create', {name: name});
    return data;
}

export const updatePaymentMethods = async (id, name) => {
    const {data} = await createRequest().post('/paymentMethods/update', {Id: id, Name: name});
    return data;
}

export const removePaymentMethods = async (id) => {
    const {data} = await createRequest().delete(`/paymentMethods/delete?id=${id}`);
    return data;
}