"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DialogTitle } from '@radix-ui/react-dialog'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { getStatusColor } from '@/components/custom/jobCommon/jobStatus';
import CustomPagination from '@/components/custom/Pagination/Pagination';
import { Button } from '@/components/ui/button';
import { jobTableHeaders } from '@/components/custom/jobCommon/AdminJobCommon'


const AllJobsTable = () => {
    const router = useRouter()
    const [currentPage, setCurrnetpage] = useState(1)
    const [showUserInfo, setShowUserInfo] = useState(false)


    const jobs = [
        {
            id: 1,
            title: "Senior Software Engineer",
            location: "San Francisco",
            applicants: 12,
            status: "active",
            salary: "$120k - $150k",
            posted: "2024-04-15",
        },
        {
            id: 2,
            title: "Product Manager",
            location: "New York",
            applicants: 8,
            status: "expired",
            salary: "$100k - $130k",
            posted: "2024-04-14",
        },
        {
            id: 3,
            title: "UI/UX Designer",
            location: "Remote",
            applicants: 5,
            status: "active",
            salary: "$70k - $90k",
            posted: "2024-04-13",
        },
        {
            id: 4,
            title: "Data Scientist",
            location: "Seattle",
            applicants: 15,
            status: "active",
            salary: "$110k - $140k",
            posted: "2024-04-12",
        },
        {
            id: 5,
            title: "DevOps Engineer",
            location: "Austin",
            applicants: 10,
            status: "expired",
            salary: "$105k - $125k",
            posted: "2024-04-10",
        },
        {
            id: 6,
            title: "Mobile App Developer",
            location: "Los Angeles",
            applicants: 7,
            status: "active",
            salary: "$95k - $115k",
            posted: "2024-04-09",
        },
        {
            id: 7,
            title: "QA Engineer",
            location: "Chicago",
            applicants: 6,
            status: "active",
            salary: "$85k - $100k",
            posted: "2024-04-08",
        },
        {
            id: 8,
            title: "Technical Recruiter",
            location: "Remote",
            applicants: 9,
            status: "expired",
            salary: "$60k - $80k",
            posted: "2024-04-07",
        },
        {
            id: 9,
            title: "Backend Developer",
            location: "Denver",
            applicants: 11,
            status: "active",
            salary: "$100k - $120k",
            posted: "2024-04-06",
        },
        {
            id: 10,
            title: "Frontend Developer",
            location: "Remote",
            applicants: 14,
            status: "active",
            salary: "$95k - $110k",
            posted: "2024-04-05",
        },
        {
            id: 11,
            title: "IT Support Specialist",
            location: "Miami",
            applicants: 4,
            status: "expired",
            salary: "$50k - $65k",
            posted: "2024-04-04",
        },
        {
            id: 12,
            title: "Cybersecurity Analyst",
            location: "Boston",
            applicants: 13,
            status: "active",
            salary: "$105k - $135k",
            posted: "2024-04-03",
        },
    ];

    const itemPerPage = 7;
    const totalpages = Math.ceil(jobs.length / itemPerPage)
    const startIndex = (currentPage - 1) * itemPerPage
    const endIndex = startIndex + itemPerPage

    return (
        <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Table>
                    <TableHeader className="bg-purple-50">
                        <TableRow >
                            {jobTableHeaders.map((header) => (
                                <TableHead key={header} className="text-purple-900 py-4">
                                    {header}
                                </TableHead>
                            ))}
                        </TableRow>

                    </TableHeader>
                    <TableBody >
                        {jobs.slice(startIndex, endIndex).map((job) => (
                            <TableRow key={job.id} className="hover:bg-purple-50 dark:hover:bg-gray-700">
                                <TableCell className="font-medium cursor-pointer" onClick={() => router.push("/admin/all-jobs/applicants")}>{job.title}</TableCell>
                                <TableCell>{job.location}</TableCell>
                                <TableCell>{job.salary}</TableCell>
                                <TableCell>{job.applicants}</TableCell>
                                <TableCell>{job.posted}</TableCell>
                                <TableCell>
                                    <span className={`${getStatusColor(job.status)} px-4 py-1 rounded-full`}>{job.status}</span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Sheet open={showUserInfo} onOpenChange={setShowUserInfo}>
                                            <SheetTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-purple-600 hover:text-purple-800 hover:bg-purple-100"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </SheetTrigger>


                                            <SheetContent
                                                side="right"
                                                className="bg-white text-black w-full overflow-auto"
                                            >
                                                <div className="p-4 space-y-4">
                                                    <DialogTitle className="text-xl font-semibold">Apply for this Job</DialogTitle>
                                                </div>
                                            </SheetContent>
                                        </Sheet>

                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-100">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
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
    )
}

export default AllJobsTable
