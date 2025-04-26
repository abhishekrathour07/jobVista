export interface applicantsDetailResponseType {
    id: string; 
    name: string; 
    email: string; 
    phone?: string; 
    location?: string; 
    profileImage?: string; 
    skills?: string[]; 
    createdAt: string; 
}