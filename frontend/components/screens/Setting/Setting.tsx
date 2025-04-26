"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/custom/Navbar/Navbar"
import PasswordSettingsForm from "./components/UpdatePassword"
import DeleteAccount from "./components/DeleteAccount"

const Settings = () => {
    const [emailNotifs, setEmailNotifs] = useState(true)
    const [inAppNotifs, setInAppNotifs] = useState(false)

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto py-12 bg-indigo-100 px-4 sm:px-6 lg:px-8 overflow-y-scroll h-[90vh]">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Settings</h1>

                {/* Profile Settings */}
                <PasswordSettingsForm />

                <Separator className="my-10" />

                {/* Notification Settings */}
                <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
                    <h2 className="text-xl font-semibold text-indigo-700">Notification Preferences</h2>
                    <div className="flex items-center justify-between">
                        <Label>Email Notifications</Label>
                        <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label>In-App Notifications</Label>
                        <Switch checked={inAppNotifs} onCheckedChange={setInAppNotifs} />
                    </div>
                </div>

                <Separator className="my-10" />
                <DeleteAccount />

            </div>
        </>
    )
}

export default Settings
