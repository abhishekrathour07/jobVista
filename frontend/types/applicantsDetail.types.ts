export interface applicantsDetailResponseType {
    id: string;
    name: string;
    email: string;
    phone?: string;
    location?: string;
    profileImage?: string;
    role:string
    skills?: string[];
    createdAt: string;
}

