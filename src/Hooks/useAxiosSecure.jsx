import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOutUser } = useAuth();

    // request interceptor
    axiosSecure.interceptors.request.use((config) => {
        // console.log('stopped')
        const token = localStorage.getItem('access-token');
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    // response interceptor
    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            await logOutUser();
            navigate('/login');
        }

        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;