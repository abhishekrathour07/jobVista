import { roleEnum } from "@/components/custom/jobCommon/AdminJobCommon";
import * as yup from "yup"

const roles = Object.values(roleEnum) as [string, ...string[]];
export const signupFormSchema = yup.object({
    name: yup.string().min(6, "name atleast 6 charcter is required").required("Name is required"),
    email:
        yup.string().
            required("Email is required "),
    password:
        yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    role: yup
        .string()
        .oneOf(roles, "Role must be either 'user' or 'admin'")
        .required("User role is required"),
})
