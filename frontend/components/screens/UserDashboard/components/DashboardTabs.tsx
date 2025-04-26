'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BadgeCheckIcon, Bookmark } from 'lucide-react';
import SavedJobs from './SavedJobs';
import AppliedJobs from './AppliedJobs';

type TabItem = {
    name: React.ReactNode;
    value: string;
    content: React.ReactNode;
};

const DashboardTabs = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentTab = searchParams.get('tabs') || 'saved-jobs';

    const tabsValue = [
        {
            name: <div className='flex gap-2 items-center'><Bookmark /> Saved Jobs</div>,
            value: 'saved-jobs',
            content: <SavedJobs />,
        },
        {
            name: <div className='flex gap-2 items-center'><BadgeCheckIcon /> Applied Jobs</div>,
            value: 'applied-jobs',
            content: <AppliedJobs />,
        },
    ];

    const handleTabChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('tabs', value);
        router.push(`?${params.toString()}`);
    };

    return (
        <Tabs defaultValue={currentTab} value={currentTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="bg-white border border-indigo-700 rounded-md h-12 mb-4 text-black">
                {tabsValue.map((tab: TabItem, index: number) => (
                    <TabsTrigger
                        key={index}
                        value={tab.value}
                        className="data-[state=active]:bg-indigo-800 data-[state=active]:text-white px-4 py-2 rounded-md"
                    >
                        {tab.name}
                    </TabsTrigger>
                ))}
            </TabsList>

            {tabsValue.map((tab: TabItem, index: number) => (
                <TabsContent key={index} value={tab.value} className="space-y-2">
                    <div className="flex flex-col py-2">
                        <span>{tab.content}</span>
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default DashboardTabs;
