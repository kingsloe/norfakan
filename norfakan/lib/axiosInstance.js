import axios from 'axios';
import { ENDPOINTS } from '../constants/urls';
import { retrieveToken, storeToken, deleteData } from './auth';
import { router } from 'expo-router';

const axiosInstance = axios.create({
    baseURL: ENDPOINTS.getTokenUrl,
});

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use(async (config) => {
    const accessToken = await retrieveToken('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, error => Promise.reject(error));

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
    (response) => response, 
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = await retrieveToken('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                    return router.replace('/sign-in')
                }

                // Request new tokens
                const response = await axios.post(ENDPOINTS.refreshTokenUrl, { refresh: refreshToken });

                const newAccessToken = response.data.access;
                const newRefreshToken = response.data.refresh;

                // Save new tokens
                await storeToken('accessToken', newAccessToken);
                await storeToken('refreshToken', newRefreshToken);

                // Update the Authorization header for the original request
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Retry the original request with the new access token
                return axiosInstance(originalRequest);
            } catch (error) {
                console.error('Token refresh failed:', error);

                await deleteData('accessToken');
                await deleteData('refreshToken');
                // setIsLoggedIn(false);
                return router.replace('/sign-in');

            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
