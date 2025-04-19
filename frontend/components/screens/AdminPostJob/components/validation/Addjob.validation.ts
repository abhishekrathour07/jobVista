import * as yup from 'yup';

export const jobFormSchema = yup.object().shape({
    jobTitle: yup.string().required('Job title is required'),
    companyName: yup.string().required('Company name is required'),
    companyInfo: yup.string().min(10, 'Company info must be at least 10 characters').required(),
    industryType: yup.string().required('Industry type is required'),
    companySize: yup.string().required('Company size is required'),
    foundedAt: yup
        .string()
        .min(1800, 'Invalid year')
        .max(new Date().getFullYear(), 'Cannot be a future year')
        .required('Founded year is required'),
    jobdescription: yup.string().min(20, 'Description must be at least 20 characters').required(),
    location: yup.string().required('Location is required'),
    jobType: yup.string().oneOf(['full-time', 'part-time', 'internship', 'contract']).required(),
    jobStatus: yup.string().oneOf(['active', 'closed']).required(),
    salaryRange: yup.string().required('Salary range is required'),
    experience: yup.string().required('Experience is required'),
    skills: yup.string().required('Skills are required'),
    deadline: yup.string().required('Application deadline is required'),
    workplace: yup.string().oneOf(['remote', 'onsite', 'hybrid']).required(),
});
