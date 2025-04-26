
export interface userJobDetailResponseTypes {
    job: JobDetailTypes;
    isApplied: boolean;
    isSaved: boolean;
}

export interface JobDetailTypes {
    _id: string;
    jobtitle: string;
    companyname: string;
    companyLogo: string | File ;
    companyUrl: string;
    companyInfo: string;
    industryType: string;
    workplaceType: string;
    companySize: string,
    foundedAt: string,
    location: string;
    status: string;
    jobType: string;
    skills: string[];
    salaryRange: string;
    deadline: Date;
    experience: string;
    jobDescription: string;
    requirements: string[];
    postedBy: string;
    applicants: string[];
    applicationCount: number;
    tags: string[];
    postedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}