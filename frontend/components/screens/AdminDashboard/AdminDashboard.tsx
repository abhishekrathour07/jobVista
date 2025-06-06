"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BriefcaseBusiness, FileCheck, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import SearchJobs from '../UserHome/components/SearchJobs';
import AllJobsTable from '../AdminAllJobsList/components/AllJobsTable';
import applicantServices from '@/services/Applicants.services';
import toast from 'react-hot-toast';

type AdminStats = {
    totalJobs: number;
    totalApplicants: number;
    totalActiveJobs: number;

};

const AdminDashboard = () => {
    const [adminData, setAdminData] = useState<AdminStats | undefined>(undefined);
    const handleAdminStats = async () => {
        try {
            const response = await applicantServices.adminStats();
            setAdminData(response?.data)
        } catch (error: any) {
            toast.error(error?.data?.response?.message)
        }

    }
    useEffect(() => {
        handleAdminStats()
    }, [])

    const stats = [
        {
            title: "Total Jobs Posted",
            value: adminData?.totalJobs,
            icon: BriefcaseBusiness,
            change: "+12% from last month",
        },
        {
            title: "Total Applicants",
            value: adminData?.totalApplicants,
            icon: Users,
            change: "+15% from last month",
        },
        {
            title: "Active Jobs",
            value: adminData?.totalActiveJobs,
            icon: FileCheck,
            change: "+5% from last month",
        },
    ]
    return (
        <div >
            <SearchJobs title='Welcome to Admin ' highlight='Dashboard' subTitle='Efficiently manage job postings, track applicant activity, and oversee platform operations—all from one centralized hub.' />
            <div className="grid p-6 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-300">
                                    {stat.title}
                                </CardTitle>
                                <Icon className="h-4 w-4 text-purple-600" />
                            </CardHeader>
                            <CardContent
                            >
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                                <p className="text-xs text-purple-600 dark:text-purple-400">{stat.change}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
            <div className=' p-8'>
                <AllJobsTable />

            </div>
        </div>
    )
}

export default AdminDashboard
