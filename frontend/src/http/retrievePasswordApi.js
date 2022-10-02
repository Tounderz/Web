import axiosApi from "./axiosApi";
import $api from "./interceptorsApi";

export const retrievePassword = async (email) => {
    const {data} = await $api.get(`/retrievePassword/retrievePassword?email=${email}`);
    return data;
}

export const createNewPassword = async (token, newPassword) => {
    const {data} = await $api.post(`/retrievePassword/createNewPassword`, {Token: token, NewPassword: newPassword} );
    return data;
}