import { CONFIG_MULTIPART } from "../utils/const";
import { createRequest } from "./interceptor";

export const formDataUser = (id, name, surname, email, phone, login, password, role, img) => {
    const formData = new FormData()
    formData.append('UserId', id)
    formData.append('Name', name)
    formData.append('Surname', surname)
    formData.append('Email', email)
    formData.append('Phone', phone)
    formData.append('Login', login)
    formData.append('Password', password)
    formData.append('Role', role)
    formData.append('Img', img)    

    return formData;
}

export const register = async (formData) => {
    const {data} = await createRequest().post(`/auth/register`, formData, CONFIG_MULTIPART)
    return data
}

export const signIn = async (login, password) => {
    const {data}  = await createRequest().post(`/auth/login`, {Login: login, Password: password})
    return data
}

export const check = async () => {
    const {data} = await createRequest().post('auth/refreshToken')
    return data
}

export const logout = async () => {
    localStorage.removeItem('accessToken');
    const {data} = await createRequest().post('/auth/logout')
    return data
}

export const fetchUser = async (login) => {
    const {data} = await createRequest().get(`/auth/getUser?login=${login}`)
    return data
}

export const fetchUsers = async (page) => {
    const {data} = await createRequest().get(`/auth/listUser?page=${page}`)
    return data
}

export const removeUser = async (id) => {
    const {data} = await createRequest().delete(`/auth/deleteUser?id=${id}`)
    return data
}

export const updateUserByAdmin = async (formData) => {
    const {data} = await createRequest().post('/auth/updateUserByAdmin', formData, CONFIG_MULTIPART)
    return data
}

export const updateUserByUser = async (formData) => {
    const {data} = await createRequest().post('/auth/updateUserByUser', formData, CONFIG_MULTIPART)
    return data
}

export const updatePassword = async (oldPassword, newPassword, idUser) => {
    const formData = new FormData();
        formData.append('OldPassword', oldPassword);
        formData.append('NewPassword', newPassword);
        formData.append('UserId', idUser);
    const {data} = await createRequest().post('/auth/updatePassword', formData, CONFIG_MULTIPART)
    return data
}