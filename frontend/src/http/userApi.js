import { CONFIG_MULTIPART } from "../utils/const";
import axiosApi from "./axiosApi";
import { createRequest } from "./interceptor";
import $api from "./interceptorsApi";

export const formDataUser = ({id, name, gender, dateOfBirth, surname, email, phone, login, password, img, role}) => {
    const formData = new FormData();
        formData.append('UserId', id);
        formData.append('Name', name);
        formData.append('Surname', surname);
        formData.append('Gender', gender);
        formData.append('DateOfBirth', dateOfBirth);
        formData.append('Email', email);
        formData.append('Phone', phone);
        formData.append('Login', login);
        formData.append('Password', password);
        formData.append('Img', img);
        formData.append('Role', role);

    return formData;
}

export const register = async (formData) => {
    const {data} = await $api.post(`/auth/register`, formData, CONFIG_MULTIPART);
    return data;
}

export const signIn = async (login, password) => {
    const {data}  = await $api.post(`/auth/login`, {Login: login, Password: password});
    return data;
}

export const check = async () => {
    const {data} = await $api.get('auth/refreshToken');
    return data;
}

export const logout = async () => {
    localStorage.removeItem('accessToken');
    const {data} = await $api.post('/auth/logout');
    return data;
}

export const fetchUser = async (login) => {
    const {data} = await $api.get(`/auth/getUser?login=${login}`);
    return data;
}

export const fetchUsers = async (page) => {
    const {data} = await $api.get(`/auth/listUser?page=${page}`);
    return data;
}

export const removeUser = async (id) => {
    const {data} = await $api.delete(`/auth/deleteUser?id=${id}`);
    return data;
}

export const updateUserByAdmin = async (formData) => {
    const {data} = await $api.post('/auth/updateUserByAdmin', formData, CONFIG_MULTIPART);
    return data;
}

export const updateUserByUser = async (formData) => {
    const {data} = await $api.post('/auth/updateUserByUser', formData, CONFIG_MULTIPART);
    return data;
}

export const updatePassword = async (oldPassword, newPassword, idUser) => {
    const formData = new FormData();
        formData.append('OldPassword', oldPassword);
        formData.append('NewPassword', newPassword);
        formData.append('UserId', idUser);
    const {data} = await $api.post('/auth/updatePassword', formData, CONFIG_MULTIPART);
    return data;
}