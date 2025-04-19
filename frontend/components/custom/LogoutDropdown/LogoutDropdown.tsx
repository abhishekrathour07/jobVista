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
import { LogOutIcon, Settings, User, User2 } from "lucide-react"

const LogoutDropdown = () => {
    return (
        <div className="relative">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border-white text-black hover:bg-indigo-500">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56  absolute right-0 top-0">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                        Profile
                        <DropdownMenuShortcut><User2 /></DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        Settings
                        <DropdownMenuShortcut><Settings /></DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator  />
                    <DropdownMenuItem className="text-red-600 cursor-pointer">
                        Log out
                        <DropdownMenuShortcut><LogOutIcon /></DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default LogoutDropdown
