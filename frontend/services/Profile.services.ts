
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const profileService = {

    // fetch logedIn user detail only no id is required used in profile section
    loggedinUserDetail: async () => {
        const response = await axios.get(`${API_URL}/user-detail`, {
            withCredentials: true
        });
        return response.data;
    },
    // it is used for limited detail about the particular user which applied for job 
    getUserById: async (userId: string) => {
        const response = await axios.get(`${API_URL}/user-detail/${userId}`, {
            withCredentials: true
        });
        return response.data;
    },
    
    // it is used to edit the user Detail page such as adding resume and profile Pic 
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
