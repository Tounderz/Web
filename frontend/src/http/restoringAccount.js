import axiosApi from "./axiosApi";
import $api from "./interceptorsApi";

export const restoring = async (email) => {
    const {data}  = await $api.get(`/restoringAccount/restoring?email=${email}`);
    return data;
}

export const restore = async (token) => {
    const {data}  = await $api.get(`/restoringAccount/restored?token=${token}`);
    return data;
}