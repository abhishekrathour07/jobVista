import * as yup from 'yup'


export const applySchema = yup.object({
    fullName: yup.string().required('Full name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    resume: yup.mixed().required('Resume is required'),
    message: yup.string().max(500, 'Message must be under 500 characters'),
    phone:yup.string().required("Phone number is required")
  })