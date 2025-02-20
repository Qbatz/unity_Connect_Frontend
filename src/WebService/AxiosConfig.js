import axios from 'axios'
import Cookies from 'universal-cookie';
import config from './Config';

const cookies = new Cookies();

const AxiosConfig = axios.create({
    baseURL: config.apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin' : '*'
    }
})
AxiosConfig.interceptors.request.use(
    (config) => {
        const UnityConnectToken = cookies.get('token');

        if (UnityConnectToken) {
            config.headers['Authorization'] = `Bearer ${UnityConnectToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);

    }
);
export default AxiosConfig;