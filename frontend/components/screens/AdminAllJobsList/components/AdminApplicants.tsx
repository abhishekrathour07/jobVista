"use client"
import React, { useState } from "react";
import Navbar from "@/components/custom/Navbar/Navbar";
import { ArrowLeft, FileDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ApplicantsTable from "./ApplicantsTable";
import { Button } from "@/components/ui/button";
import applicantServices from "@/services/Applicants.services";
import toast from "react-hot-toast";
import Loader from "@/components/custom/HashLoader/Loader";

const AdminApplicants = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()
    const params = useParams();
    const jobId = params.id;

    const downloadCSVfile = async () => {
        setLoading(true);
        try {
            const response = await applicantServices.downloadApplicantCSV(jobId as string);

            const url = window.URL.createObjectURL(response);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "applicants_list.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            toast.success("File downloaded successfully");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="bg-indigo-50 h-[100vh] overflow-y-scroll hide-scrollbar">
            <Navbar />
            <div className="p-4 flex flex-col justify-center">
                <div className="bg-white p-6 border rounded-lg space-y-6 shadow-sm">
                    <div className="flex justify-between items-center">
                        <button
                            className='flex items-center gap-2 px-2 rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-100 transition-all'
                            onClick={() => router.back()}
                        >
                            <ArrowLeft className='w-4 h-4' />
                            <span>Back</span>
                        </button>
                        <Button className="flex h-11 min-w-32 bg-indigo-700 hover:bg-indigo-800 text-white" onClick={downloadCSVfile}>{loading ? <Loader /> : <span className="flex items-center gap-2 text-lg font-semibold"><FileDown height={16} /> Download</span>}</Button>
                    </div>
                    <h2 className="text-2xl font-bold text-purple-800">Applicants Application</h2>
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    );
};

export default AdminApplicants;
