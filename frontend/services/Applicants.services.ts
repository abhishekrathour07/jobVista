import api from "@/lib/api"

const applicantServices = {
    // by clicking any particular jo on job table it view the detail of applicants for the job
    getapplicantsByJobId: async (jobId: string) => {
        const response = await api.get(`/apply/applicants/${jobId}`)
        return response.data
    },
    // it fetched all the applied job for the user 
    getAppliedJobs: async () => {
        const response = await api.get(`/user-detail/applied`);
        return response.data
    },
    // it open the drawer where the api is called to apply in particular job
    applyToJOb: async (jobId: string, payload: any) => {
        const response = await api.post(`/apply/${jobId}`, payload)
        return response.data;
    },
    userStats: async () => {
        const response = await api.get(`/user/stats`);
        return response.data
    },
    adminStats: async () => {
        const response = await api.get(`/admin/stats`);
        return response.data
    },
    changeApplicantStatus: async (jobId: string, data: any) => {
        const response = await api.put(`/applicants/status/${jobId}`, data);
        return response.data
    },
    downloadApplicantCSV: async (jobId: string) => {
        const response = await api.get(`/download/applicant-list/${jobId}`, {
            responseType: "blob",
        });
        return response.data
    },


}

export default applicantServices