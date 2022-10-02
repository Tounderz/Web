import { createRequest } from './interceptor';
import $api from './interceptorsApi';

export const fetchSearch = async (parameter, page) => {
    const {data} = await $api.post(`/search/result`, { Parameter: parameter, Page: page } );
    return data;
}

export const fetchSearchUsers = async (parameter, page, criteria) => {
    const {data} = await $api.post('/search/searchUsers', { Parameter: parameter, Page: page, Criteria: criteria });
    return data;
}

export const fetchSearchProductAdmin = async (parameter, page, criteria) => {
    const {data} = await $api.post('/search/searchProductAdmin', { Parameter: parameter, Page: page, Criteria: criteria });
    return data;
}