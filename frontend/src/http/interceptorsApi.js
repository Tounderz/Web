import axios from "axios";

const BASE_URL = 'https://localhost:44315';

const $api = axios.create({
    baseURL: BASE_URL
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
})

$api.interceptors.response.use(config => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${BASE_URL}/auth/refreshToken`);
            localStorage.setItem('accessToken', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('No Authorization');
        }
    }

    throw error;
})

export default $api;