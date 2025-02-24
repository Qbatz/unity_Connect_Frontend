import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const AxiosConfig = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin' : '*'
    }
})
AxiosConfig.interceptors.request.use(
    (config) => {
        console.log("UnityConnectToken",UnityConnectToken);
        
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


// import axios from 'axios';
// import Cookies from 'universal-cookie';

// const cookies = new Cookies();

// const AxiosConfig = axios.create({
//     baseURL: process.env.REACT_APP_BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     }
// });

// // Interceptor for handling the token
// AxiosConfig.interceptors.request.use(
//     (config) => {
//         const UnityConnectToken = cookies.get('token');
//         console.log("Token from Cookies:", UnityConnectToken); // Debugging

//         if (UnityConnectToken) {
//             config.headers['Authorization'] = `Bearer ${UnityConnectToken}`;
//         } else {
//             console.warn("No token found in cookies.");
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export default AxiosConfig;
