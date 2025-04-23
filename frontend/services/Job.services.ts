import { API_URL } from '@/backendRoutes';
import axios from 'axios';


const jobServices = {
    // Fetch all jobs are avilable it shows limited detail about job
    getAllJobs: async (page: Number, limit: Number) => {
        const response = await axios.get(`${API_URL}/jobs?page=${page}&limit=${limit}`, {
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
        const response = await axios.put(`$${API_URL}/edit-job/${id}`, jobData);
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