"use client";

import React, { useState } from "react";
import Navbar from "@/components/custom/Navbar/Navbar";
import CustomPagination from "@/components/custom/Pagination/Pagination";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Eye } from "lucide-react";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const AdminApplicants = () => {
    const applicantHeader = [
        "Name",
        "Email",
        "Company",
        "Applied Date",
        "Status",
        "Action",
    ];

    const applicantStatusOptions = [
        "pending",
        "reviewed",
        "accepted",
        "rejected",
    ];

    const applicants = [
        { name: "Aarav Patel", email: "aarav.patel@example.com", company: "TCS", appliedDate: "2024-04-10", status: "pending" },
        { name: "Meera Sharma", email: "meera.sharma@example.com", company: "Infosys", appliedDate: "2024-04-12", status: "reviewed" },
        { name: "Rohan Verma", email: "rohan.verma@example.com", company: "Wipro", appliedDate: "2024-04-09", status: "accepted" },
        { name: "Sneha Iyer", email: "sneha.iyer@example.com", company: "Capgemini", appliedDate: "2024-04-11", status: "rejected" },
        { name: "Karan Singh", email: "karan.singh@example.com", company: "Cognizant", appliedDate: "2024-04-14", status: "pending" },
        { name: "Priya Desai", email: "priya.desai@example.com", company: "IBM", appliedDate: "2024-04-13", status: "reviewed" },
        { name: "Aditya Joshi", email: "aditya.joshi@example.com", company: "TCS", appliedDate: "2024-04-10", status: "accepted" },
        { name: "Isha Nair", email: "isha.nair@example.com", company: "HCL", appliedDate: "2024-04-08", status: "rejected" },
        { name: "Vikram Chauhan", email: "vikram.chauhan@example.com", company: "Wipro", appliedDate: "2024-04-07", status: "pending" },
        { name: "Divya Kapoor", email: "divya.kapoor@example.com", company: "Infosys", appliedDate: "2024-04-06", status: "reviewed" },
        { name: "Raj Mehta", email: "raj.mehta@example.com", company: "Capgemini", appliedDate: "2024-04-05", status: "accepted" },
        { name: "Nikita Rao", email: "nikita.rao@example.com", company: "Cognizant", appliedDate: "2024-04-04", status: "rejected" },
        { name: "Arjun Bhat", email: "arjun.bhat@example.com", company: "HCL", appliedDate: "2024-04-03", status: "pending" },
        { name: "Riya Malhotra", email: "riya.malhotra@example.com", company: "IBM", appliedDate: "2024-04-02", status: "reviewed" },
        { name: "Manav Dixit", email: "manav.dixit@example.com", company: "TCS", appliedDate: "2024-04-01", status: "accepted" },
        { name: "Anjali Reddy", email: "anjali.reddy@example.com", company: "Wipro", appliedDate: "2024-03-31", status: "rejected" },
        { name: "Yash Gupta", email: "yash.gupta@example.com", company: "Capgemini", appliedDate: "2024-03-30", status: "pending" },
        { name: "Sara Khan", email: "sara.khan@example.com", company: "Infosys", appliedDate: "2024-03-29", status: "reviewed" },
        { name: "Nikhil Roy", email: "nikhil.roy@example.com", company: "Cognizant", appliedDate: "2024-03-28", status: "accepted" },
        { name: "Pooja Sinha", email: "pooja.sinha@example.com", company: "IBM", appliedDate: "2024-03-27", status: "pending" },
    ];

    const [currentPage, setCurrnetpage] = useState(1);
    const itemPerPage = 7;
    const totalpages = Math.ceil(applicants.length / itemPerPage);
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;

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

                    <div className="bg-white rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {applicantHeader.map((value) => (
                                        <TableHead key={value} className="text-purple-900">
                                            {value}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>

                            <TableBody >
                                {applicants.slice(startIndex, endIndex).map((application) => (
                                    <TableRow key={application.email} className="hover:bg-purple-50 dark:hover:bg-gray-700">
                                        <TableCell>{application.name}</TableCell>
                                        <TableCell className="w-[300px]">{application.email}</TableCell>
                                        <TableCell>{application.company}</TableCell>
                                        <TableCell>{application.appliedDate}</TableCell>
                                        <TableCell>
                                            <Select defaultValue={application.status}>
                                                <SelectTrigger className="w-[130px]">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {applicantStatusOptions.map((status) => (
                                                        <SelectItem value={status} key={status}>
                                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-purple-600 hover:text-purple-800 hover:bg-purple-100"
                                                onClick={() => router.push(`/admin/all-jobs/applicants/${application.name}`)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex justify-end">
                        <CustomPagination
                            totalPages={totalpages}
                            currentPage={currentPage}
                            onPageChange={setCurrnetpage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminApplicants;
