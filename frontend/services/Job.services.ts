
import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
        
        const response = await axios.get(`${API_URL}/jobs?${queryParams}`, {
            withCredentials: true
        });
        return response.data;
    },
    //  get job full detail on job detail page 
    getJobById: async (id: string) => {
        const response = await axios.get(`${API_URL}/jobs/${id}`, {
            withCredentials: true,
        });
        return response.data;
    },

    // Accessible by admin only admin can create a new job
    createJob: async (jobData: object) => {
        const response = await axios.post(`${API_URL}/post-job`, jobData, {
            withCredentials: true
        });
        return response.data;
    },

    //    It is used to edit existing jon it open job edit drawer
    editJob: async (id: string, jobData: object) => {
        const response = await axios.put(`${API_URL}/edit-job/${id}`, jobData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    },

    //   this api is used to delete the posted job either is it active or not 
    deleteJob: async (id: string) => {
        const response = await axios.delete(`${API_URL}/delete-job/${id}`, {
            withCredentials: true
        });
        return response.data;
    },

};

export default jobServices;