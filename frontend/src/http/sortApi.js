import { createRequest } from "./interceptor"
import $api from "./interceptorsApi";

export const sortUsers = async (fieldName, typeSort, page) => {
    const {data} = await $api.post(`/sort/users`, { FieldName: fieldName, TypeSort: typeSort, Page: page });
    return data;
}

export const sortProducts = async (fieldName, typeSort, page) => {
    const {data} = await $api.post(`/sort/products`, { FieldName: fieldName, TypeSort: typeSort, Page: page });
    return data;
}