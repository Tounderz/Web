import axiosApi from "./axiosApi";

export const confirmEmail = async (token) => {
    const {data} = await axiosApi.get(`/confirmEmails/confirmEmail?token=${token}`);
    return data;
}

export const updateTokenConfirm = async (email) => {
    const {data} = await axiosApi.get(`/confirmEmails/updateToken?email=${email}`);
    return data;
}