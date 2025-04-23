import { API_URL } from "@/backendRoutes"
import axios from "axios"


const applicantServices = {
    // by clicking any particular jo on job table it view the detail of applicants for the job
    getapplicantsByJobId: async (jobId: string) => {
        const response = await axios.get(`${API_URL}/apply/applicants/${jobId}`, {
            withCredentials: true
        })
        return response.data
    },
    getAppliedJobs: async () => {
        const response = await axios.get(`${API_URL}/user-detail/applied`, {
            withCredentials: true,
        });
        return response.data
    },
    applyToJOb: async (jobId: string, payload: any) => {
        const response = await axios.post(`${API_URL}/apply/${jobId}`, payload, {
            withCredentials: true
        })
        return response.data;
    }

}

export default applicantServices