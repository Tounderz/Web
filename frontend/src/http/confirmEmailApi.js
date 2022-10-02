import axiosApi from "./axiosApi";
import $api from "./interceptorsApi";

export const confirmEmail = async (token) => {
    const {data} = await $api.get(`/confirmEmails/confirmEmail?token=${token}`);
    return data;
}

export const updateTokenConfirm = async (email) => {
    const {data} = await $api.get(`/confirmEmails/updateToken?email=${email}`);
    return data;
}