import api from "../axios";
const baseURL = 'http://127.0.0.1:5000'

export default {
    login: payload => api.post(`${baseURL}/auth/login`,payload),
    register: payload => api.post(`${baseURL}/auth/register`,payload)
}
