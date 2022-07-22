import axios from "axios";
const BASE_URL = 'https://localhost:44315';

export default axios.create({
    baseURL: BASE_URL
});