"use client";
import React, { useEffect, useState } from "react";
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
import { DownloadCloud, Eye } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { applicantHeader, applicantStatusOptions } from "@/components/custom/jobCommon/AdminJobCommon";
import toast from "react-hot-toast";
import applicantServices from "@/services/Applicants.services";
import moment from "moment";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Loader from "@/components/custom/HashLoader/Loader";
import EmptyState from "@/components/custom/EmptyState/EmptyState";
import { ApplicantsResponseType, Applicant } from "@/types/applicantsTable.types";
import { ApiError } from "@/types/Error.type";

const ApplicantsTable = () => {
    const [data, setData] = useState<ApplicantsResponseType>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const params = useParams();
    const jobId = params.id;

    const [currentPage, setCurrnetpage] = useState(1);
    const itemPerPage = 7;
    const totalpages = Math.ceil(data.length / itemPerPage);
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;

    const handleGetApplicants = async () => {
        setLoading(true);
        try {
            const response = await applicantServices.getapplicantsByJobId(jobId as string);
            setData(response?.data || []);
        } catch (error: unknown) {
            const err = error as ApiError;
            toast.error(err?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };
  
    const handleChangeStatus = async (status: string, applicationId: string) => {
        try {
            const data = {
                status: status,
                applicationId: applicationId,
            };
            const response = await applicantServices.changeApplicantStatus(jobId as string, data);
            toast.success(response?.message);
        } catch (error: unknown) {
            const err = error as ApiError;
            toast.error(err?.response?.data?.message || "Failed to change status of job.");
        }
    };

    useEffect(() => {
        handleGetApplicants();
    }, []);

    const handleDownload = (fileUrl: string) => {
        if (!fileUrl) return;
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileUrl.split("/").pop() || "resume";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <div className="bg-white rounded-lg overflow-hidden  flex flex-col justify-center">
                {loading ? (
                    <div className="flex justify-center min-h-[300px] items-center py-10">
                        <Loader color="#0118D8" size={50} />
                    </div>
                ) : data.length === 0 ? (
                    <EmptyState title="No Applicants Found" subtitle={"Looks like No one is applied for this job yet."} />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {applicantHeader.map((value) => (
                                    <TableHead key={value} className="text-purple-900 px-4">
                                        {value}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {data.slice(startIndex, endIndex).map((application: Applicant, index: number) => (
                                <TableRow key={index} className="hover:bg-purple-50 dark:hover:bg-gray-700">
                                    <TableCell className="flex gap-2 items-center">
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage
                                                src={
                                                    application.applicantId?.profileImage
                                                        ? application.applicantId?.profileImage
                                                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                            application.applicantId?.name || "User"
                                                        )}&background=4676dd&color=ffffff`
                                                }
                                            />
                                        </Avatar>
                                        {application.applicantId?.name}
                                    </TableCell>
                                    <TableCell className="w-[300px]">{application.applicantId?.email}</TableCell>
                                    <TableCell className="font-semibold">{application?.jobId?.companyname || "N/A"}</TableCell>
                                    <TableCell className="flex gap-2 items-center ">
                                        <span className="w-40  truncate overflow-hidden whitespace-nowrap">
                                            {" "}
                                            {application?.resumeUrl}
                                        </span>
                                        <DownloadCloud
                                            className="w-5 text-indigo-600 h-5 cursor-pointer"
                                            onClick={() => handleDownload(application?.resumeUrl)}
                                        />
                                    </TableCell>
                                    <TableCell className="ml-4">{moment(application.createdAt).format("MMM-DD-YY")}</TableCell>
                                    <TableCell>
                                        <Select
                                            defaultValue={application.status}
                                            onValueChange={(value) => handleChangeStatus(value, application?._id)}
                                        >
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
                                            onClick={() =>
                                                router.push(`/admin/all-jobs/applicants-detail/${application?.applicantId._id}`)
                                            }
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>

            {!loading && data.length > 0 && (
                <div className="flex justify-end mt-4">
                    <CustomPagination totalPages={totalpages} currentPage={currentPage} onPageChange={setCurrnetpage} />
                </div>
            )}
        </div>
    );
};

export default ApplicantsTable;
