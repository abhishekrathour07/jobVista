"use client"
import React from "react";
import Navbar from "@/components/custom/Navbar/Navbar";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ApplicantsTable from "./ApplicantsTable";

const AdminApplicants = () => {

    const router = useRouter()
    return (
        <div className="bg-indigo-50 h-[100vh] overflow-y-scroll hide-scrollbar">
            <Navbar />
            <div className="p-4 flex flex-col justify-center">
                <div className="bg-white p-6 border rounded-lg space-y-6 shadow-sm">
                    <button
                        className='flex items-center gap-2 px-2 rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-100 transition-all'
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className='w-4 h-4' />
                        <span>Back</span>
                    </button>
                    <h2 className="text-2xl font-bold text-purple-800">Applicants Application</h2>
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    );
};

export default AdminApplicants;
