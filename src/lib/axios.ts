
import axios from "axios";

const BASE_URL=import.meta.env.VITE_BACKEND_URL

export const axiosInstance=axios.create({
    baseURL:BASE_URL
})


axiosInstance.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem('token');
        console.log(token);
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)