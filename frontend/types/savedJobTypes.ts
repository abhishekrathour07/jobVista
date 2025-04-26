

export interface savedJobResponseType {
    totalsavedJobs: number;
    currentPage: number;
    totalPages: number;
    savedData: SavedData[];
}

export interface SavedData {
    _id: string;
    jobtitle: string;
    companyname: string;
    workplaceType: string;
    location: string;
    status: string;
    jobType: string;
    salaryRange: string;
    deadline: Date;
    updatedAt: Date;
    id: string;
}

export type JobDashboardStatsProps = {
    data: {
        totalJobs: number
        totalAppliedJobs: number
        totalSavedJob: number
    }
}

export type statesTypes  ={
    totalJobs: number
    totalAppliedJobs: number
    totalSavedJob: number
}