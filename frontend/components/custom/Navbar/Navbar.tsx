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
  Building2,
} from "lucide-react";
import { useEffect, useState } from "react";
import LogoutDropdown from "../LogoutDropdown/LogoutDropdown";
import profileService from "@/services/Profile.services";
import toast from "react-hot-toast";
import { applicantsDetailResponseType } from "@/types/applicantsDetail.types";
import { ApiError } from "@/types/Error.type";
import NavLink from "./NavLink";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState<applicantsDetailResponseType>();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getUserDetail = async () => {
    try {
      const response = await profileService.loggedinUserDetail();
      setUserData(response?.data);
    } catch (error: unknown) {
      const err = error as ApiError;
      toast.error(err?.response?.data?.message || "Something went wrong");
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
          <img src="/image.png" className="h-8 w-8" alt="logo" />
          <span className="text-white">JobVista</span>
        </div>

        {/* Desktop Navigation */}
        {userData?.role === "admin" ? (
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              href="/admin/dashboard"
              className="text-white flex items-center gap-2 hover:text-indigo-300 transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </NavLink>
            <NavLink
              href="/admin/post-job"
              className="text-white flex items-center gap-2 hover:text-indigo-300 transition-colors"
            >
              <CirclePlus className="h-4 w-4" />
              Post Job
            </NavLink>
            <NavLink
              href="/admin/all-jobs"
              className="text-white flex items-center gap-2 hover:text-indigo-300 transition-colors"
            >
              <NotebookTabs className="h-4 w-4" />
              All Jobs
            </NavLink>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-8">
            <NavLink
              href="/user/home"
              className="text-white flex gap-2 items-center hover:text-indigo-300 transition-colors"
            >
              <Home className="h-6 w-6 text-white" />
              Home
            </NavLink>
            <NavLink
              href="/user/jobs"
              className="text-white flex gap-2 items-center hover:text-indigo-300 transition-colors"
            >
              <BriefcaseBusiness className="h-6 w-6 text-white" />
              Jobs
            </NavLink>
            <NavLink href="/user/dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-indigo-200">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </NavLink>
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
        <div className="md:hidden bg-white px-4 py-3 border-t border-gray-300 animate-fade-in">
          <div className="flex flex-col space-y-3">
            <NavLink
              href="/user/home"
              className="text-black py-2 hover:text-indigo-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              href="/user/jobs"
              className="text-black py-2 hover:text-indigo-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Jobs
            </NavLink>
            <NavLink
              href="/user/companies"
              className="text-black py-2 hover:text-indigo-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Companies
            </NavLink>
            <NavLink
              href="/user/dashboard"
              className="text-black py-2 hover:text-indigo-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink
              href="/user/profile"
              className="text-black py-2 sm:border transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
