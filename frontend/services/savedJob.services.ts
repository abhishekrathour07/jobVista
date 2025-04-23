import { API_URL } from "@/backendRoutes"
import axios from "axios"

const saveJobService = {
    getallSavedJob: async (page?: number, limit?: number) => {
        const response = await axios.get(`${API_URL}/get/saved-job?page${page}&limit${limit}`, {
            withCredentials: true
        })
        return response.data
    },
    saveUnsaveJobs: async (jobId: string) => {
        const response = await axios.post(`${API_URL}/saved-job`, jobId, {
            withCredentials: true
        });
        return response.data
    }
}

export default saveJobService