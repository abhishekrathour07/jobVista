
import api from '@/lib/api';

const jobServices = {
    // Fetch all jobs are avilable it shows limited detail about job
    getAllJobs: async (page: Number, limit: Number, filters?: { search?: string, jobType?: string, location?: string, experience?: string }) => {
        let queryParams = `page=${page}&limit=${limit}`;
        
        if (filters) {
            if (filters.search) queryParams += `&search=${encodeURIComponent(filters.search)}`;
            if (filters.jobType) queryParams += `&jobType=${filters.jobType}`;
            if (filters.location) queryParams += `&location=${encodeURIComponent(filters.location)}`;
            if (filters.experience) queryParams += `&experience=${encodeURIComponent(filters.experience)}`;
        }
        
        const response = await api.get(`/jobs?${queryParams}`);
        return response.data;
    },
    //  get job full detail on job detail page 
    getJobById: async (id: string) => {
        const response = await api.get(`/jobs/${id}`);
        return response.data;
    },

    // Accessible by admin only admin can create a new job
    createJob: async (jobData: object) => {
        const response = await api.post(`/post-job`, jobData);
        return response.data;
    },

    //    It is used to edit existing jon it open job edit drawer
    editJob: async (id: string, jobData: object) => {
        const response = await api.put(`/edit-job/${id}`, jobData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    },

    //   this api is used to delete the posted job either is it active or not 
    deleteJob: async (id: string) => {
        const response = await api.delete(`/delete-job/${id}`);
        return response.data;
    },

};

export default jobServices;