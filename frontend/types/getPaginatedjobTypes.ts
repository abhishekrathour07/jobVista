export type JobsRequestTypes = {
  jobId: string,
  company: string;
  logo: string | null;
  title: string;
  status: string;
  location: string;
  description: string;
  isApplied: boolean
  deadline:Date
};

export interface PaginatedJobsResponseTypes {
    totalJobs: number;
    currentPage: number;
    totalPages: number;
    jobs: JobTypes[];
}

export interface JobTypes {
    _id: string;
    jobtitle: string;
    companyname: string;
    companyLogo: string;
    companyInfo: string;
    location: string;
    status: string;
    jobType: string;
    experience: string;
    skills: string[];
    salaryRange: string;
    deadline: Date;
    applicants: string[];
    applicationCount: number;
    tags: string[];
    postedAt: Date;
    isApplied: boolean;
}