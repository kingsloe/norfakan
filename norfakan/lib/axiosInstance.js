import { ENDPOINTS } from "../constants/urls";
import axios from "axios";
import { retrieveToken, storeToken, deleteData } from "./auth";
import { router } from "expo-router";
import {useMemo} from "react";
import { useAuth } from "../context/AuthProvider";

const useAxios = () => {
    const { setIsLoggedIn } = useAuth();

    const instance = useMemo(() => { 
        return axios.create({
            baseURL: ENDPOINTS.getTokenUrl,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }, []);

    instance.interceptors.request.use(
        async (config) => {
            const accessToken = await retrieveToken('accessToken');
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const refreshToken = await retrieveToken('refreshToken');
                    const response = await axios.post(ENDPOINTS.refreshTokenUrl, {
                        refresh: refreshToken,
                    });
                    const newAccessToken = response.data.access;
                    const newRefreshToken = response.data.refresh;
                    
                    await storeToken('accessToken', newAccessToken);
                    await storeToken('refreshToken', newRefreshToken);

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    
                    // return axios(originalRequest);
                    return instance(originalRequest);
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError.response ? refreshError.response.data : refreshError);
                    // Handle the error, e.g., log out the user
                    await deleteData('accessToken');
                    await deleteData('refreshToken');
                    setIsLoggedIn(false);
                    router.replace('/sign-in');
                }
            return Promise.reject(error);
            }
        }
    );
    return instance;
};
export default useAxios;