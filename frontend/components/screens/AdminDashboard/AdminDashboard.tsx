import Navbar from '@/components/custom/Navbar/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BriefcaseBusiness, FileCheck, Users } from 'lucide-react';
import React from 'react'
import SearchJobs from '../UserHome/components/SearchJobs';

const AdminDashboard = () => {

    const stats = [
        {
            title: "Total Jobs Posted",
            value: "150",
            icon: BriefcaseBusiness,
            change: "+12% from last month",
        },
        {
            title: "Total Applicants",
            value: "2,345",
            icon: Users,
            change: "+15% from last month",
        },
        {
            title: "Active Jobs",
            value: "89",
            icon: FileCheck,
            change: "+5% from last month",
        },
    ]
    return (
        <div>
            <Navbar />
            <SearchJobs />
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
        </div>
    )
}

export default AdminDashboard
