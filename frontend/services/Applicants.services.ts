import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL;


const applicantServices = {
    // by clicking any particular jo on job table it view the detail of applicants for the job
    getapplicantsByJobId: async (jobId: string) => {
        const response = await axios.get(`${API_URL}/apply/applicants/${jobId}`, {
            withCredentials: true
        })
        return response.data
    },
    // it fetched all the applied job for the user 
    getAppliedJobs: async () => {
        const response = await axios.get(`${API_URL}/user-detail/applied`, {
            withCredentials: true,
        });
        return response.data
    },
    // it open the drawer where the api is called to apply in particular job
    applyToJOb: async (jobId: string, payload: any) => {
        const response = await axios.post(`${API_URL}/apply/${jobId}`, payload, {
            withCredentials: true
        })
        return response.data;
    },
    userStats: async () => {
        const response = await axios.get(`${API_URL}/user/stats`, {
            withCredentials: true,
        });
        return response.data
    },
    changeApplicantStatus: async (jobId: string, data: any) => {
        const response = await axios.put(`${API_URL}/applicants/status/${jobId}`, data, {
            withCredentials: true,
        });
        return response.data
    },


}

export default applicantServices