export interface ApplicantId {
    _id: string;
    name: string;
    email: string;
    profileImage?: string; // Optional profile image URL
}

export interface JobId {
    _id: string;
    companyname: string;
}

export interface Applicant {
    _id: string;
    applicantId: ApplicantId;
    jobId: JobId;
    resumeUrl: string;
    status: string;
    createdAt: string;
}

export type ApplicantsResponseType = Applicant[];