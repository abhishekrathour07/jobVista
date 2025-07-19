
import api from "@/lib/api"

const settingServices = {
    updatePassword: async (data: any) => {
        const response = await api.post(`/settings/update-password`, data)
        return response.data;
    },
    deleteAccount: async () => {
        const response = await api.delete(`/settings/delete-account`)
        return response.data
    }
}

export default settingServices