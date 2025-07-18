"use client"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import authService from "@/services/Auth.services"
import { TokenManager, UserDataManager } from "@/lib/tokenManager"
import { LogOutIcon, Mail, Settings, User, User2 } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { roleEnum } from "../jobCommon/AdminJobCommon"
import { ApiError } from "@/types/Error.type"

type logoutDropdownTypes = {
    name: string,
    email: string,
    role: string,
}
const LogoutDropdown: React.FC<logoutDropdownTypes> = ({ name, email, role }) => {
    const router = useRouter()

    const handleLogOut = async () => {
        try {
            const response = await authService.logOut();
            
            TokenManager.removeToken();
            UserDataManager.removeUserData();
            
            toast.success(response?.message);
            router.push("/login")
        } catch (error: unknown) {
            const err = error as ApiError;
            TokenManager.removeToken();
            UserDataManager.removeUserData();
            toast.error(err?.response?.data?.message || "Logged out successfully");
            router.push("/login")
        }
    }

    return (
        <div className="relative">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border-white text-black hover:bg-indigo-500">
                        <User className="h-4 w-4 mr-2" />
                        {name}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64  absolute right-0 top-0">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                        {email}
                        <DropdownMenuShortcut><Mail /></DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => role === roleEnum.User ? router.push('/user/profile') : router.push('/admin/profile')}>
                        Profile
                        <DropdownMenuShortcut><User2 /></DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => role === roleEnum.User ? router.push('/user/settings') : router.push('/admin/settings')}>
                        Settings
                        <DropdownMenuShortcut><Settings /></DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogOut}>
                        Log out
                        <DropdownMenuShortcut><LogOutIcon /></DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default LogoutDropdown
