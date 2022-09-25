import { CONFIG_MULTIPART } from "../utils/const";
import axiosApi from "./axiosApi";
import { createRequest } from "./interceptor";

export const formDataUser = ({id, name, surname, email, phone, login, password, img, role}) => {
    const formData = new FormData();
        formData.append('UserId', id);
        formData.append('Name', name);
        formData.append('Surname', surname);
        formData.append('Email', email);
        formData.append('Phone', phone);
        formData.append('Login', login);
        formData.append('Password', password);
        formData.append('Img', img);
        formData.append('Role', role);

    return formData;
}

export const register = async (formData) => {
    const {data} = await axiosApi.post(`/auth/register`, formData, CONFIG_MULTIPART);
    return data;
}

export const confirmEmail = async (token) => {
    const {data} = await axiosApi.get(`/auth/confirmEmail?token=${token}`);
    return data;
}

export const signIn = async (login, password) => {
    const {data}  = await axiosApi.post(`/auth/login`, {Login: login, Password: password});
    return data;
}

export const check = async () => {
    const {data} = await createRequest().post('auth/refreshToken');
    return data;
}

export const logout = async () => {
    localStorage.removeItem('accessToken');
    const {data} = await createRequest().post('/auth/logout');
    return data;
}

export const fetchUser = async (login) => {
    const {data} = await createRequest().get(`/auth/getUser?login=${login}`);
    return data;
}

export const fetchUsers = async (page) => {
    const {data} = await createRequest().get(`/auth/listUser?page=${page}`);
    return data;
}

export const removeUser = async (id) => {
    const {data} = await createRequest().delete(`/auth/deleteUser?id=${id}`);
    return data;
}

export const updateUserByAdmin = async (formData) => {
    const {data} = await createRequest().post('/auth/updateUserByAdmin', formData, CONFIG_MULTIPART);
    return data;
}

export const updateUserByUser = async (formData) => {
    const {data} = await createRequest().post('/auth/updateUserByUser', formData, CONFIG_MULTIPART);
    return data;
}

export const retrievePassword = async (email) => {
    const {data} = await axiosApi.get(`/auth/retrievePassword?email=${email}`);
    return data;
}

export const createNewPassword = async (token, newPassword) => {
    const {data} = await axiosApi.post(`/auth/createNewPassword`, {Token: token, NewPassword: newPassword} );
    return data;
}

export const updatePassword = async (oldPassword, newPassword, idUser) => {
    const formData = new FormData();
        formData.append('OldPassword', oldPassword);
        formData.append('NewPassword', newPassword);
        formData.append('UserId', idUser);
    const {data} = await createRequest().post('/auth/updatePassword', formData, CONFIG_MULTIPART);
    return data;
}