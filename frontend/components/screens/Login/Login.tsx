'use client'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginFormSchema } from "./validations/loginform.schema"
import { Eye, EyeClosed } from "lucide-react"
import { useState } from "react"
import { BackgroundBeams } from "@/components/ui/background-beams"
import CustomButton from "@/components/custom/CustomButton/CustomButton"
import Link from "next/link"
import { LoginFormValue } from "@/types/Authentication.type"
import authService from "@/services/Auth.services"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { roleEnum } from "@/components/custom/jobCommon/AdminJobCommon"



const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const form = useForm<LoginFormValue>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(loginFormSchema),
    })

    const onSubmit = async (data: LoginFormValue) => {
        setLoading(true)
        try {
            const response = await authService.login(data)
            toast.success(response?.message)
            form.reset();
            if (response?.data?.role === roleEnum.User) {
                router.push("/user/home")
            } else {
                router.push("/admin/dashboard")
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center ">
            {/* Background */}
            <BackgroundBeams className="absolute inset-0 -z-10 bg-indigo-950" />

            {/* Form Box */}
            <div className="w-full max-w-md p-6  shadow-xl bg-white dark:bg-gray-900">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
                    Welcome back! Login here
                </h2>

                <Form {...form}>
                    <div className="space-y-5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black">Email <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="you@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />

                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black">Password <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={passwordVisible ? "text" : "password"}
                                                placeholder="Enter your password"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setPasswordVisible(!passwordVisible)}
                                                className="absolute right-3 cursor-pointer top-2.5 text-gray-500"
                                            >
                                                {passwordVisible ? <Eye /> : <EyeClosed />}
                                            </button>
                                            <Link href={"/forgot-password"} className="text-indigo-500 hover:text-indigo-600 mt-1 hover:underline ml-2 text-sm">
                                                Forgot password ?
                                            </Link>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-xs" />

                                </FormItem>
                            )}
                        />


                        <CustomButton isloading={loading} label="Login" onClick={form.handleSubmit(onSubmit)} className="w-full" />
                        <Button className="w-full h-10 hover:bg-slate-400 bg-slate-300 text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                                <path fill="#FFC107" d="M43.6,20.5h-1.8V20H24v8h11.3C34,32.4,29.6,36,24,36c-6.6,0-12-5.4-12-12s5.4-12,12-12c3.1,0,5.9,1.2,8,3.1l6-6C34.5,6.5,29.5,4,24,4C12.9,4,4,12.9,4,24s8.9,20,20,20c11,0,20-8,20-20C44,22.7,43.8,21.6,43.6,20.5z" />
                                <path fill="#FF3D00" d="M6.3,14.7l6.6,4.8C14.1,16,18.7,13,24,13c3.1,0,5.9,1.2,8,3.1l6-6C34.5,6.5,29.5,4,24,4C16,4,9,8.7,6.3,14.7z" />
                                <path fill="#4CAF50" d="M24,44c5.3,0,10.3-1.8,14.1-4.9l-6.5-5.3c-2,1.4-4.5,2.2-7.6,2.2c-5.6,0-10.3-3.6-12-8.5l-6.6,5.1C9,38.7,16,44,24,44z" />
                                <path fill="#1976D2" d="M43.6,20.5h-1.8V20H24v8h11.3c-1.4,3.7-4.6,6.6-8.3,8.2l6.5,5.3c3.8-3.5,6-8.7,6-14.5C44,22.7,43.8,21.6,43.6,20.5z" />
                            </svg>
                            Login with Google</Button>

                        <div className="flex flex-col gap-2 items-center justify-center">
                            <Link href={"/signup"} className="text-sm">
                                <p> Don&apos;t have an account? <span className="hover:underline text-indigo-500 hover:text-indigo-600">Signup</span></p>
                            </Link>
                            <h1 className="text-2xl  text-indigo-800 font-semibold ">JobVista</h1>
                            <div className=" text-xs text-gray-500">
                                © {new Date().getFullYear()} JobVista. All rights reserved.
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login
