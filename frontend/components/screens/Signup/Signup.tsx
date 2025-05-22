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
import { Eye, EyeClosed } from "lucide-react"
import { useState } from "react"
import { BackgroundBeams } from "@/components/ui/background-beams"
import CustomButton from "@/components/custom/CustomButton/CustomButton"
import Link from "next/link"
import { signupFormSchema } from "./validation/singup.validation"
import { roleEnum } from "@/components/custom/jobCommon/AdminJobCommon"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { SignupFormValue } from "@/types/Authentication.type"
import toast from "react-hot-toast"
import authService from "@/services/Auth.services"
import { useRouter } from "next/navigation"
import { ApiError } from "@/types/Error.type"



const Signup = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const router = useRouter()
    const form = useForm<SignupFormValue>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: roleEnum.User
        },
        resolver: yupResolver(signupFormSchema),
    })

    const onSubmit = async (data: SignupFormValue) => {
        try {
            const response = await authService.signup(data)
            toast.success(response?.message)
            form.reset();
            router.push("/login")

        } catch (error: unknown) {
            const err = error as ApiError;
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    }



    return (
        <div className="relative min-h-screen flex items-center justify-center ">
            {/* Background */}
            <BackgroundBeams className="absolute inset-0 -z-10 bg-indigo-950" />

            {/* Form Box */}
            <div className="w-full max-w-md p-6  shadow-xl bg-white dark:bg-gray-900">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
                    Register Account
                </h2>

                <Form {...form}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black ">Name <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter your name here" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
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

                        {/* Password Field */}
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

                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <RadioGroup
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className="flex items-center justify-center gap-6"
                                        >
                                            {[
                                                { label: "User", value: roleEnum.User, id: "user-role" },
                                                { label: "Admin", value: roleEnum.Admin, id: "admin-role" }
                                            ].map(({ label, value, id }) => (
                                                <div
                                                    key={id}
                                                    className={cn(
                                                        "flex items-center space-x-2 px-5 py-2 rounded-xl border transition-all duration-300 cursor-pointer",
                                                        "text-lg",
                                                        " hover:border-indigo-600",
                                                        field.value === value
                                                            ? " border-indigo-700"
                                                            : "border-gray-300"
                                                    )}
                                                >
                                                    <RadioGroupItem value={value} id={id} />
                                                    <label htmlFor={id} className="cursor-pointer">
                                                        {label}
                                                    </label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />


                        <CustomButton label="Signup" onClick={form.handleSubmit(onSubmit)} className="w-full" />
                        
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <Link href={"/login"} className="text-sm">
                                <p> Don&apos;t have an account? <span className="hover:underline text-indigo-500 hover:text-indigo-600">Login</span></p>
                            </Link>
                            <h1 className="text-2xl  text-indigo-800 font-semibold ">JobVista</h1>
                            {/* Copyright */}
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

export default Signup
