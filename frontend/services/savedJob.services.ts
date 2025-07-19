
import api from "@/lib/api"

const saveJobService = {
    getallSavedJob: async (page?: number, limit?: number) => {
        const response = await api.get(`/get/saved-job?page${page}&limit${limit}`)
        return response.data
    },
    saveUnsaveJobs: async (jobId: string) => {
        const response = await api.post(`/saved-job`, { jobId });
        return response.data
    }
}

export default saveJobService