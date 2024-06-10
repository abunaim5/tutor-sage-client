import axios from 'axios'
 
const axiosPublic = axios.create({
    baseURL: 'https://tutor-sage-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;