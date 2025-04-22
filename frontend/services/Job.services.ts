import { API_URL } from '@/backendRoutes';
import axios from 'axios';


const jobServices = {
    // Fetch all jobs
    getAllJobs: async (page: Number, limit: Number) => {
        const response = await axios.get(`${API_URL}/jobs?page=${page}&limit=${limit}`, {
            withCredentials: true
        });
        return response.data;
    },

    getJobById: async (id: string) => {
        const response = await axios.get(`${API_URL}/jobs/${id}`,{
            withCredentials:true,
        });
        return response.data;
    },

    createJob: async (jobData: object) => {
        const response = await axios.post(`${API_URL}/post-job`, jobData, {
            withCredentials: true
        });
        return response.data;
    },

    editJob: async (id: string, jobData: object) => {
        const response = await axios.put(`$${API_URL}/edit-job/${id}`, jobData);
        return response.data;
    },

    deleteJob: async (id: string) => {
        const response = await axios.delete(`${API_URL}/delete-job/${id}`, {
            withCredentials: true
        });
        return response.data;
    },
};

export default jobServices;