"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "react-hot-toast"
import Navbar from "@/components/custom/Navbar/Navbar"
import CustomButton from "@/components/custom/CustomButton/CustomButton"

const Settings = () => {
    const [emailNotifs, setEmailNotifs] = useState(true)
    const [inAppNotifs, setInAppNotifs] = useState(false)

    const handleProfileSave = () => {
        toast.success("Profile updated successfully!")
    }

    const handleDeleteAccount = () => {
        toast.error("Account deletion not implemented yet!")
    }

    return (
       <>
       <Navbar/>
       <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 overflow-y-scroll h-[90vh]">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Settings</h1>

            {/* Profile Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                <h2 className="text-xl font-semibold text-indigo-700">Profile Settings</h2>
                <div className="space-y-2">
                    <Label htmlFor="name">Current Password</Label>
                    <Input type="text" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input id="password" placeholder="Enter your email address" type="email" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Confirm New Password</Label>
                    <Input id="text" placeholder="Enter new password" type="password" />
                </div>
                <CustomButton label="Change Password"/>
            </div>

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

            {/* Danger Zone */}
            <div className="bg-red-50 border border-red-300 p-6 rounded-xl shadow-sm space-y-4">
                <h2 className="text-xl font-semibold text-red-700">Danger Zone</h2>
                <p className="text-red-600">Deleting your account is permanent and cannot be undone.</p>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                    Delete My Account
                </Button>
            </div>
        </div>
       </>
    )
}

export default Settings
