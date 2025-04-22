import { API_URL } from "@/backendRoutes"
import axios from "axios"


const applicantServices = {
    getapplicantsByJobId: async (jobId: string) => {
        const response = await axios.get(`${API_URL}/apply/applicants/${jobId}`, {
            withCredentials: true
        })
        return response.data
    }
}

export default applicantServices