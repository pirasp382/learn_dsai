import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8001',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        console.log(`Sending ${config.method} request to ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log(`Response received: ${response.status}`);
        return response;
    },
    (error) => {
        if (error.response) {
            console.error(`Server error: ${error.response.status}`, error.response.data);
        } else if (error.request) {
            console.error('No response from server');
        } else {
            console.error('Request error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;