import { createRequest } from "./interceptor"

export const sortUsers = async (fieldName, typeSort, page) => {
    const {data} = await createRequest().post(`/sort/users`, { FieldName: fieldName, TypeSort: typeSort, Page: page });
    return data;
}

export const sortProducts = async (fieldName, typeSort, page) => {
    const {data} = await createRequest().post(`/sort/products`, { FieldName: fieldName, TypeSort: typeSort, Page: page });
    return data;
}