import axiosApi from "./axiosApi";

export const restoring = async (email) => {
    const {data}  = await axiosApi.get(`/restoringAccount/restoring?email=${email}`);
    return data;
}

export const restore = async (token) => {
    const {data}  = await axiosApi.get(`/restoringAccount/restored?token=${token}`);
    return data;
}