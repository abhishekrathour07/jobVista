import { SignupFormValue } from '@/types/Authentication.type';
import axios from 'axios'
import {API_URL} from "@/backendRoutes"

const authService = {

    //this api is used for signup for new user with their role
    signup: async (data: SignupFormValue) => {
        const response = await axios.post(`${API_URL}/auth/signup`, data, {
            withCredentials: true
        });
        return response.data;
    },
    // this is login route for both user and admin
    login: async (data: any) => {
        const response = await axios.post(`${API_URL}/auth/login`, data, {
            withCredentials: true
        });
        return response.data
    },
    // this is logout routes which remove the auth token from cookies
    logOut: async () => {
        const response = await axios.post(`${API_URL}/auth/logout`, {}, {
            withCredentials: true
        });
        return response.data
    }
}

export default authService