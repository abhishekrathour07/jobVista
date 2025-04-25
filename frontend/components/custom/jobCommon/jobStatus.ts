export const getStatusColor = (status: string) => {
    switch (status) {
        case "active":
            return "bg-green-100 text-green-800";
        case "closed":
            return "bg-red-100 text-red-800";
        case "rejected":
            return "bg-red-600 text-white"
        case "accepted":
            return "bg-green-100 text-green-800"
        case "applied":
            return "bg-indigo-200 text-indigo-700"
        default:
            return "bg-gray-100 text-gray-800";
    }
};