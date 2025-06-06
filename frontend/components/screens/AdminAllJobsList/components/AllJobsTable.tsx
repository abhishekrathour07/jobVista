"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button';
import { getStatusColor } from '@/components/custom/jobCommon/jobStatus';
import CustomPagination from '@/components/custom/Pagination/Pagination';
import { jobTableHeaders } from '@/components/custom/jobCommon/AdminJobCommon'
import jobServices from '@/services/Job.services'
import moment from 'moment'
import Loader from '@/components/custom/HashLoader/Loader'
import EmptyState from '@/components/custom/EmptyState/EmptyState'
import toast from 'react-hot-toast'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import EditJobDrawer from './EditjobDrawer';
import { JobTypes, PaginatedJobsResponseTypes } from '@/types/getPaginatedjobTypes';

const AllJobsTable = () => {
    const router = useRouter()
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<PaginatedJobsResponseTypes>();
    const [currentPage, setCurrentpage] = useState(1);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
    const jobsPerPage = 7;
    const todayDate = new Date().toISOString();

    const handleGetAllJobs = async () => {
        setLoading(true);
        try {
            const response = await jobServices.getAllJobs(currentPage, jobsPerPage);
            setData(response?.data || []);
        } catch (error: any) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (jobId: string) => {
        try {
            const response = await jobServices.deleteJob(jobId);
            toast.success(response?.message);
            handleGetAllJobs();
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
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
                        <Loader size={50} color={"#0118D8"} />
                    </div>
                ) : data?.jobs?.length === 0 ? (
                    <EmptyState />
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
                            {data?.jobs?.map((job: JobTypes, index: number) => (
                                <TableRow key={index} className="hover:bg-purple-50 dark:hover:bg-gray-700">
                                    <TableCell className="font-medium cursor-pointer" onClick={() => router.push(`/admin/all-jobs/applicants/${job._id}`)}>
                                        {job.companyname}
                                    </TableCell>
                                    <TableCell>{job?.jobtitle}</TableCell>
                                    <TableCell>{job?.location}</TableCell>
                                    <TableCell className='text-indigo-700'>{job?.salaryRange}</TableCell>
                                    <TableCell>{job?.applicationCount}</TableCell>
                                    <TableCell>{moment(job?.postedAt).format("MMM DD, YYYY")}</TableCell>
                                    <TableCell>
                                        <span className={`${getStatusColor(job?.deadline.toString() < todayDate ? "closed" : job.status)} px-4 py-1 rounded-full`}>{job?.deadline.toString() < todayDate ? "closed" : job.status}</span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Sheet open={showUserInfo} onOpenChange={setShowUserInfo}>
                                                <SheetTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-purple-600 hover:text-purple-800 hover:bg-purple-100"
                                                        onClick={() => setSelectedJobId(job?._id)}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </SheetTrigger>
                                                <SheetContent
                                                    side="right"
                                                    className="bg-white text-black w-full overflow-y-scroll hide-scrollbar"
                                                >
                                                    <div className="p-4 space-y-4">
                                                        <DialogTitle className="text-xl text-center font-semibold">Edit Job Detail</DialogTitle>
                                                        <EditJobDrawer jobId={selectedJobId} setShowUserInfo={setShowUserInfo} showUserInfo={showUserInfo} />
                                                    </div>
                                                </SheetContent>
                                            </Sheet>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                                        onClick={() => setSelectedJobId(job?._id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete this job post.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            className="bg-red-600 hover:bg-red-700 text-white"
                                                            onClick={() => selectedJobId && handleDelete(selectedJobId)}
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>

            {!loading && data?.totalJobs as number > 1 && (
                <div className="flex justify-end mt-4">
                    <CustomPagination
                        totalPages={data?.totalPages as number}
                        currentPage={currentPage}
                        onPageChange={setCurrentpage}
                    />
                </div>
            )}
        </div>
    )
}

export default AllJobsTable;
