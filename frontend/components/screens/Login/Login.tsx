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
import {  Eye, EyeClosed } from "lucide-react"
import { useState } from "react"
import { BackgroundBeams } from "@/components/ui/background-beams"
import CustomButton from "@/components/custom/CustomButton/CustomButton"
import Link from "next/link"

type LoginFormValues = {
    email: string
    password: string
}

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)

    const form = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(loginFormSchema),
    })

    const onSubmit = (data: LoginFormValues) => {
        console.log("Login Data:", data)
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
                                    <FormLabel  className="text-black">Email <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="you@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage  className="text-xs"/>

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
                                    <FormMessage  className="text-xs"/>

                                </FormItem>
                            )}
                        />


                        <CustomButton label="Login" onClick={form.handleSubmit(onSubmit)} className="w-full" />
                        <Button className="w-full h-10 hover:bg-slate-400 bg-slate-300 text-black">Login with Google</Button>

                        <div className="flex flex-col gap-2 items-center justify-center">
                            <Link href={"/signup"} className="text-sm">
                                <p> Don't have an account? <span className="hover:underline text-indigo-500 hover:text-indigo-600">Signup</span></p>
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
