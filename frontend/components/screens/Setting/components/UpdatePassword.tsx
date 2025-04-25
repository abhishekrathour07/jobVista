"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { passwordSchema } from "./validation/Updatepassword.validation";
import settingServices from "@/services/Settings.services";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import { useState } from "react";

type PasswordFormValues = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

const PasswordSettingsForm = () => {

    const [loding, setloading] = useState(false)
    const form = useForm<PasswordFormValues>({
        resolver: yupResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    const onSubmit = async (data: PasswordFormValues) => {
        try {
            setloading(true);
            const response = await settingServices.updatePassword(data);
            toast.success(response?.message)
            form.reset();
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        } finally {
            setloading(false);

        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
            <h2 className="text-xl font-semibold text-indigo-700">Change Password</h2>

            <Form {...form}>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter current password" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                                    <Input placeholder="Confirm new password" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <CustomButton isloading={loding} label="update password" onClick={form.handleSubmit(onSubmit)} />
            </Form>
        </div>
    );
};

export default PasswordSettingsForm;
