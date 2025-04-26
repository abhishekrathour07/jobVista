"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import toast from "react-hot-toast"
import { deleteAccountSchema } from "./validation/deleteAccount.validation"
import settingServices from "@/services/Settings.services"
import { useRouter } from "next/navigation"
import { ApiError } from "@/types/Error.type"

type DeleteAccountFormData = {
    confirm: string
}

const DeleteAccount = () => {
    const router = useRouter();

    const form = useForm<DeleteAccountFormData>({
        resolver: yupResolver(deleteAccountSchema),
        defaultValues: {
            confirm: "",
        },
    })

    const handleDeleteAccount = async () => {
        try {
            const response = await settingServices.deleteAccount();
            toast.success(response?.message)
            form.reset();
            router.push("/login");
        } catch (error: unknown) {
            const err = error as ApiError;
      toast.error(err?.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className="bg-red-50 border border-red-300 p-6 rounded-xl shadow-sm space-y-4">
            <h2 className="text-xl font-semibold text-red-700">Danger Zone</h2>
            <p className="text-red-600">
                Deleting your account is permanent and cannot be undone.
            </p>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete My Account</Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. Please type{" "}
                            <span className="font-medium text-red-500">delete my account</span> to confirm.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <Form {...form}>
                        <div className="space-y-4 mt-4">
                            <FormField
                                control={form.control}
                                name="confirm"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmation</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Type 'delete my account'"
                                                {...field}
                                                autoComplete="off"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <AlertDialogFooter>
                                <AlertDialogCancel type="button" onClick={() => form.reset()}>Cancel</AlertDialogCancel>

                                <AlertDialogAction
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                    onClick={form.handleSubmit(handleDeleteAccount)}
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </div>
                    </Form>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default DeleteAccount
