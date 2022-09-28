import axiosApi from "./axiosApi";

export const retrievePassword = async (email) => {
    const {data} = await axiosApi.get(`/retrievePassword/retrievePassword?email=${email}`);
    return data;
}

export const createNewPassword = async (token, newPassword) => {
    const {data} = await axiosApi.post(`/retrievePassword/createNewPassword`, {Token: token, NewPassword: newPassword} );
    return data;
}