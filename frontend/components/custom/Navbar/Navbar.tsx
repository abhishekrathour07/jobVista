"use client";
import { Button } from "@/components/ui/button";
import {
  BriefcaseBusiness,
  LayoutDashboard,
  Menu,
  X,
  CirclePlus,
  NotebookTabs,
  Home,
  User,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import LogoutDropdown from "../LogoutDropdown/LogoutDropdown";
import profileService from "@/services/Profile.services";
import { TokenManager, UserDataManager } from "@/lib/tokenManager";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { applicantsDetailResponseType } from "@/types/applicantsDetail.types";
import { ApiError } from "@/types/Error.type";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState<applicantsDetailResponseType>();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    TokenManager.removeToken();
    UserDataManager.removeUserData();
    toast.success("Logged out successfully");
    setIsMenuOpen(false);
    router.push("/login");
  };

  const getUserDetail = async () => {
    try {
      const localUserData = UserDataManager.getUserData();
      if (localUserData) {
        setUserData(localUserData);
      }

      const response = await profileService.loggedinUserDetail();
      setUserData(response?.data);

      UserDataManager.setUserData(response?.data);
    } catch (error: unknown) {
      const err = error as ApiError;
      const localUserData = UserDataManager.getUserData();
      if (localUserData) {
        setUserData(localUserData);
      } else {
        toast.error(err?.response?.data?.message || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <nav className="bg-indigo-800 shadow-md border-b border-gray-300 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 font-semibold text-lg text-white">
          <img src="https://res.cloudinary.com/dkndihxkb/image/upload/v1746506542/t1gbxzzo41zrudpjoged.png" className="h-8 w-8" alt="logo" />
          <span className="text-white">JobVista</span>
        </div>

        {/* Desktop Navigation */}
        {userData?.role === "admin" ? (
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/admin/dashboard"
              className="text-white flex items-center gap-2 hover:text-indigo-300 transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/post-job"
              className="text-white flex items-center gap-2 hover:text-indigo-300 transition-colors"
            >
              <CirclePlus className="h-4 w-4" />
              Post Job
            </Link>
            <Link
              href="/admin/all-jobs"
              className="text-white flex items-center gap-2 hover:text-indigo-300 transition-colors"
            >
              <NotebookTabs className="h-4 w-4" />
              All Jobs
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/user/home"
              className="text-white flex gap-2 items-center hover:text-indigo-300 transition-colors"
            >
              <Home className="h-6 w-6 text-white" />
              Home
            </Link>
            <Link
              href="/user/jobs"
              className="text-white flex gap-2 items-center hover:text-indigo-300 transition-colors"
            >
              <BriefcaseBusiness className="h-6 w-6 text-white" />
              Jobs
            </Link>
            <Link href="/user/dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-indigo-200">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
        )}

        <div className="hidden md:flex items-center gap-4">

          <LogoutDropdown
            name={userData?.name as string}
            email={userData?.email as string}
            role={userData?.role as string}
          />
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-indigo-500"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        userData?.role === "admin" ? (
          <div className="md:hidden bg-white px-4 py-3 border-t border-gray-300 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link
                href="/admin/dashboard"
                className="text-black py-2 flex gap-4 items-center hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>

              <Link
                href="/admin/post-job"
                className="text-black py-2 flex gap-4 items-center hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <CirclePlus className="h-4 w-4" />
                Post Job
              </Link>
              <Link
                href="/admin/all-jobs"
                className="text-black py-2 flex gap-4 items-center hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <NotebookTabs className="h-4 w-4" />
                All Jobs
              </Link>
              <Link
                href="/admin/profile"
                className="text-black py-2 flex gap-4 items-center hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              <button
                onClick={handleLogout}
                className="text-red-600 py-2 flex gap-4 items-center hover:text-red-700 transition-colors w-full text-left"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="md:hidden bg-white px-4 py-3 border-t border-gray-300 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link
                href="/user/home"
                className="text-black py-2 flex gap-4 items-center hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="/user/jobs"
                className="text-black py-2 flex gap-4 items-center hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <BriefcaseBusiness className="h-4 w-4" />
                Jobs
              </Link>
              <Link
                href="/user/dashboard"
                className="text-black py-2 flex gap-4 items-center hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/user/profile"
                className="text-black py-2 flex gap-4 items-center hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              <button
                onClick={handleLogout}
                className="text-red-600 py-2 flex gap-4 items-center hover:text-red-700 transition-colors w-full text-left"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        )

      )}
    </nav>
  );
};

export default Navbar;
