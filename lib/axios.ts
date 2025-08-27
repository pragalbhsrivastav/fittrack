import axios, { InternalAxiosRequestConfig } from 'axios';


// Track active requests
let activeRequests: number = 0;
let showLoaderCallback = () => { };
let hideLoaderCallback = () => { };

interface LoaderCallback {
    (): void;
}

interface SetLoaderCallbacks {
    (show: LoaderCallback, hide: LoaderCallback): void;
}

export const setLoaderCallbacks: SetLoaderCallbacks = (show, hide) => {
    showLoaderCallback = show;
    hideLoaderCallback = hide;
};


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'
})

api.interceptors.request.use((config) => {
    activeRequests++;

    if (activeRequests === 1) {
        showLoaderCallback();
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
}, (error) => {
    return Promise.reject(error)
})

api.interceptors.response.use((response) => {

    activeRequests--;
    if (activeRequests === 0) {
        hideLoaderCallback();
    }
    return response;
}, (error) => {
    activeRequests--;
    if (activeRequests === 0) {
        hideLoaderCallback();
    }
    return Promise.reject(error);
});

export default api;

