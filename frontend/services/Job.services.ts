import { API_URL } from '@/backendRoutes';
import axios from 'axios';


const jobServices = {
    // Fetch all jobs
    getAllJobs: async (page:Number, limit:Number ) => {
        const response = await axios.get(`${API_URL}/jobs?page=${page}&limit=${limit}`, {
            withCredentials: true
        });
        return response.data;
    },

    // Fetch a single job by ID
    getJobById: async (id: string) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    // Create a new job
    createJob: async (jobData: object) => {
        const response = await axios.post(`${API_URL}/post-job`, jobData, {
            withCredentials: true
        });
        return response.data;
    },

    // Update an existing job by ID
    updateJob: async (id: string, jobData: object) => {
        const response = await axios.put(`$${API_URL}/${id}`, jobData);
        return response.data;
    },

    // Delete a job by ID
    deleteJob: async (id: string) => {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    },
};

export default jobServices;