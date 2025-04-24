import * as yup from 'yup'


export const applySchema = yup.object({
  resume: yup.mixed().required('Resume is required'),
  message: yup.string().max(500, 'Message must be under 500 characters').required("Cover letter is required"),
})