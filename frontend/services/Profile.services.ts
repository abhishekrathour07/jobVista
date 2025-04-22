import { API_URL } from "@/backendRoutes"
import axios from "axios"


const profileService = {
    loggedinUserDetail: async () => {
        const response = await axios.get(`${API_URL}/user-detail`, {
            withCredentials: true
        });
        return response.data;
    },
    getUserById: async (userId: string) => {
        const response = await axios.get(`${API_URL}/user-detail/${userId}`, {
            withCredentials: true
        });
        return response.data;
    },
    editUserDetail: async (formData: FormData) => {
        const response = await axios.put(`${API_URL}/user-detail/edit`, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }
}








export default profileService
