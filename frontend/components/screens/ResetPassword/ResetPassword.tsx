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
import { resetPasswordSchema } from "./validation/resetPassword.validation"
import { useParams } from "next/navigation"
import toast from "react-hot-toast"
import authService from "@/services/Auth.services"
import { useState } from "react"


type ForgotPasswordFormValues = {
    newPassword: string
    confirmNewPassword: string
}

const ResetPassword = () => {

    const params = useParams();
    const token = params.token

    const [loading, setLoading] = useState(false)

    const form = useForm<ForgotPasswordFormValues>({
        defaultValues: {
            newPassword: "",
            confirmNewPassword: "",
        },
        resolver: yupResolver(resetPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        console.log("Forgot Password Data:", data);
        try {
            setLoading(true)
            const response = await authService.resetPassword(token as string, data)
            toast.success(response?.message)
        } catch (error: any) {
            toast.error(error?.resonse?.data?.message)
        } finally {
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
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter new password" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmNewPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Confirm new password" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <CustomButton
                            label="Update Password"
                            onClick={form.handleSubmit(onSubmit)}
                            className="w-full"
                            isloading={loading}
                        />

                        <div className="flex flex-col gap-2 items-center justify-center">
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

export default ResetPassword
