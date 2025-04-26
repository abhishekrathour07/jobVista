export interface JobDetails {
    _id: string;
    jobtitle: string;
    companyname: string;
    location: string;
}

export interface AppliedJob {
    jobDetails: JobDetails;
    status: string;
    appliedAt: string;
}

export type appliedJobsResponseTypes = AppliedJob[];