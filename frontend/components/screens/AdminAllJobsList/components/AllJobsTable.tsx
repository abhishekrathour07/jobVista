"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
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
import jobServices from '@/services/Job.services'
import moment from 'moment'
import { Loader2 } from 'lucide-react'
import Loader from '@/components/custom/HashLoader/Loader'
import EmptyState from '@/components/custom/EmptyState/EmptyState'


const AllJobsTable = () => {
    const router = useRouter()
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>();
    const [currentPage, setCurrentpage] = useState(1);
    const jobsPerPage = 7;

    const handleGetAllJobs = async () => {
        setLoading(true);
        try {
            const response = await jobServices.getAllJobs(currentPage, jobsPerPage);
            setData(response?.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetAllJobs()
    }, [currentPage])


    return (
        <div>
            <div className="bg-white rounded-lg overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <Loader size={50} color={"#0118D8"}/>
                    </div>
                ) : data?.jobs?.length === 0 ? (
                    <EmptyState/>
                ) : (
                    <Table>
                        <TableHeader className="bg-purple-50 px-4">
                            <TableRow>
                                {jobTableHeaders.map((header) => (
                                    <TableHead key={header} className="text-purple-900 py-4">
                                        {header}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.jobs?.map((job: any) => (
                                <TableRow key={job.id} className="hover:bg-purple-50 dark:hover:bg-gray-700">
                                    <TableCell className="font-medium cursor-pointer" onClick={() => router.push(`/admin/all-jobs/applicants/${job.id}`)}>
                                        {job.companyname}
                                    </TableCell>
                                    <TableCell>{job?.jobtitle}</TableCell>
                                    <TableCell>{job?.location}</TableCell>
                                    <TableCell className='text-indigo-700'>{job?.salaryRange}</TableCell>
                                    <TableCell>{job?.applicationCount}</TableCell>
                                    <TableCell>{moment(job?.postedAt).format("MMM DD, YYYY")}</TableCell>
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
                )}
            </div>

            {!loading && data?.totalPages > 1 && (
                <div className="flex justify-end mt-4">
                    <CustomPagination
                        totalPages={data?.totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentpage}
                    />
                </div>
            )}
        </div>
    )
}

export default AllJobsTable;
