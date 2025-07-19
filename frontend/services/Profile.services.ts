
import api from "@/lib/api"

const profileService = {

    // fetch logedIn user detail only no id is required used in profile section
    loggedinUserDetail: async () => {
        const response = await api.get(`/user-detail`);
        return response.data;
    },
    // it is used for limited detail about the particular user which applied for job 
    getUserById: async (userId: string) => {
        const response = await api.get(`/user-detail/${userId}`);
        return response.data;
    },
    
    // it is used to edit the user Detail page such as adding resume and profile Pic 
    editUserDetail: async (formData: FormData) => {
        const response = await api.put(`/user-detail/edit`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }
}








export default profileService
