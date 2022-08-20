import axios from 'axios';
import axiosRetry from 'axios-retry';
import axiosApi from './axiosApi';
// import { RequestError } from '@/modules/shared/errors/request.error';

const DELAY = 2500;
const BASE_URL = 'https://localhost:44315';

export function createRequest() {
  const request = axios.create();
  const accessToken = localStorage.getItem('accessToken');

  //это для того чтобы оно 3 раза постучалось чтобы рефреш сделать
  axiosRetry(request, {
    retries: 3,
    retryDelay(count) {
      return count * DELAY;
    },
  });

  //Чтобы не писать везде в header bearer token
  request.interceptors.request.use((config) => {
    config.headers.accept = 'application/json';
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.baseURL = BASE_URL;
    return config;
  });

  //ну и тут идет проверка на то что это за ошибка если 401 то обновляем
    request.interceptors.response.use(undefined, async (error) => {
        if (error.isAxiosError) {
            console.log(error.response?.status);
            if (error.response?.status === 401) {
                const { data } = await axiosApi.post('auth/refreshToken');
                // localStorage.removeItem('accessToken')
                localStorage.setItem('accessToken', data.accessToken);

        error.config.headers.accept = 'application/json';
        error.config.headers.authorization = `Bearer ${accessToken}`;
        error.config.baseURL = BASE_URL;
        return request(error.config);
      }
    }

    let data = error?.response?.data;

    if (Array.isArray(data)) {
        data = data[0];
    }

    throw new Error(data.message);
  });

  return request;
}