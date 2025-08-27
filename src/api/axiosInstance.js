import axios from "axios"
const axiosInstance =axios.create({
    baseURL: import.meta.env.VITE_PORT_BACK,
    withCredentials: true,
})

axiosInstance.interceptors.response.use((res)=> res,
(err)=>{
    if(err.response?.status === 401){}
    return Promise.reject(err)
})

export default axiosInstance