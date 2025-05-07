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
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { BackgroundBeams } from "@/components/ui/background-beams"
import CustomButton from "@/components/custom/CustomButton/CustomButton"
import Link from "next/link"
import { forgotPasswordSchema } from "./validation/password.validation"
import authService from "@/services/Auth.services"
import toast from "react-hot-toast"
import { useState } from "react"


type ForgotPasswordFormValues = {
    email: string
}

const ForgotPassword = () => {
    const [loading,setLoading] = useState<boolean>(false)
    const form = useForm<ForgotPasswordFormValues>({
        defaultValues: {
            email: "",
        },
        resolver: yupResolver(forgotPasswordSchema),
    })

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        try {
            setLoading(true)
            const response = await authService.forgetPassword(data)
            toast.success(response?.message)
        } catch (error:any) {
            toast.error(error.response?.data?.message)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <BackgroundBeams className="absolute inset-0 -z-10 bg-indigo-950" />

            <div className="w-full max-w-md p-6 shadow-xl bg-white dark:bg-gray-900">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
                    Forgot Password
                </h2>

                <Form {...form}>
                    <div className="space-y-5">

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black">
                                        Email <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <CustomButton
                            label="Reset Password"
                            onClick={form.handleSubmit(onSubmit)}
                            className="w-full"
                            isloading={loading}
                        />

                        <div className="flex flex-col gap-2 items-center justify-center">
                            <Link href={"/login"} className="text-sm">
                                <p>
                                    Back to Login?{" "}
                                    <span className="hover:underline text-indigo-500 hover:text-indigo-600">
                                        login
                                    </span>
                                </p>
                            </Link>
                            <h1 className="text-2xl text-indigo-800 font-semibold">JobVista</h1>
                            <div className="text-xs text-gray-500">
                                © {new Date().getFullYear()} JobVista. All rights reserved.
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default ForgotPassword
