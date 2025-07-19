import { SignupFormValue } from '@/types/Authentication.type';
import api from '@/lib/api';

const authService = {

    //this api is used for signup for new user with their role
    signup: async (data: SignupFormValue) => {
        const response = await api.post(`/signup`, data);
        return response.data;
    },
    // this is login route for both user and admin
    login: async (data: any) => {
        const response = await api.post(`/login`, data);
        return response.data
    },
    // this is logout routes which remove the auth token from localStorage
    logOut: async () => {
        const response = await api.post(`/logout`, {});
        return response.data
    },
    // forget password email link
    forgetPassword: async (data: any) => {
        const response = await api.post(`/forgot-password`, data)
        return response.data
    },
    //reset password throught token
    resetPassword: async (token: string, data: any) => {
        const response = await api.post(`/forgot-password/${token}`, data)
        return response.data
    }
}

export default authService 