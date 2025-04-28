import { SignupFormValue } from '@/types/Authentication.type';
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const authService = {

    //this api is used for signup for new user with their role
    signup: async (data: SignupFormValue) => {
        const response = await axios.post(`${API_URL}/signup`, data, {
            withCredentials: true
        });
        return response.data;
    },
    // this is login route for both user and admin
    login: async (data: any) => {
        const response = await axios.post(`${API_URL}/login`, data, {
            withCredentials: true
        });
        return response.data
    },
    // this is logout routes which remove the auth token from cookies
    logOut: async () => {
        const response = await axios.post(`${API_URL}/logout`, {}, {
            withCredentials: true
        });
        return response.data
    },
    // forget password email link
    forgetPassword: async (data: any) => {
        const response = await axios.post(`${API_URL}/forgot-password`, data, {
            withCredentials: true
        })
        return response.data
    },
    //reset password throught token
    resetPassword: async (token: string, data: any) => {
        const response = await axios.post(`${API_URL}/forgot-password/${token}`, data, {
            withCredentials: true
        })
        return response.data
    }
}

export default authService 