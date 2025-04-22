"use client"
import React, { useEffect, useState } from 'react'
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
import { Eye } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { applicantHeader, applicantStatusOptions } from '@/components/custom/jobCommon/AdminJobCommon';
import toast from 'react-hot-toast';
import applicantServices from '@/services/Applicants.services';

const ApplicantsTable = () => {

    const [data, setData] = useState<any>()
    const router = useRouter()
    const params = useParams();
    const jobId = params.id;
    console.log(jobId)

    const [currentPage, setCurrnetpage] = useState(1);
    const itemPerPage = 7;
    const totalpages = Math.ceil(data?.length / itemPerPage);
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;

    const handleGetApplicants = async () => {
        try {
            const response = await applicantServices.getapplicantsByJobId(jobId as string)
            setData(response?.data)
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }
    useEffect(() => {
        handleGetApplicants()
    }, [])

    return (
        <div>
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

                    <TableBody>
                        {data && data?.slice(startIndex, endIndex).map((application: any) => (
                            <TableRow key={application._id} className="hover:bg-purple-50 dark:hover:bg-gray-700">
                                <TableCell>{application.applicantId?.name}</TableCell>
                                <TableCell className="w-[300px]">{application.applicantId?.email}</TableCell>
                                <TableCell>{application.applicantId?.location || "N/A"}</TableCell>
                                <TableCell>{new Date(application.createdAt).toLocaleDateString()}</TableCell>
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
                                        onClick={() => router.push(`/admin/all-jobs/applicants/${application._id}`)}
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
    )
}

export default ApplicantsTable
