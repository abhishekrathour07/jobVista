import { SignupFormValue } from '@/types/Authentication.type';
import axios from 'axios'
import {API_URL} from "@/backendRoutes"

const authService = {
    signup: async (data: SignupFormValue) => {
        const response = await axios.post(`${API_URL}/auth/signup`, data, {
            withCredentials: true
        });
        return response.data;
    },
    login: async (data: any) => {
        const response = await axios.post(`${API_URL}/auth/login`, data, {
            withCredentials: true
        });
        return response.data
    },
    logOut: async () => {
        const response = await axios.post(`${API_URL}/auth/logout`, {}, {
            withCredentials: true
        });
        return response.data
    }
}

export default authService