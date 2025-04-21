"use client"
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, User, LayoutDashboard, Menu, X, CirclePlus, NotebookTabs } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LogoutDropdown from "../LogoutDropdown/LogoutDropdown";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const user = 'admin'

  return (
    <nav className="bg-indigo-800 shadow-md border-b border-gray-300 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 font-semibold text-lg text-white">
          <BriefcaseBusiness className="h-6 w-6 text-white" />
          <span className=" text-white">JobVista</span>
        </div>

        {/* Desktop Navigation */}
        {user === 'admin' ?

          (
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
                <CirclePlus  className="h-4 w-4"  />
                post Job
              </Link>
              <Link
                href="/admin/all-jobs"
                className="text-white flex items-center gap-2 hover:text-indigo-300 transition-colors"
              >
                <NotebookTabs className="h-4 w-4"  />
                All jobs
              </Link>
            </div>
          ) :
          (
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/user/home"
                className="text-white hover:text-indigo-300 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/user/jobs"
                className="text-white hover:text-indigo-300 transition-colors"
              >
                
                Jobs
              </Link>
              <Link
                href="/user/companies"
                className="text-white hover:text-indigo-300 transition-colors"
              >
                Companies
              </Link>
            </div>
          )
        }

        <div className="hidden md:flex items-center gap-4">
           {user!=="admin" &&
            <Link href="/user/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-indigo-200">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
           }
          <LogoutDropdown/>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-indigo-500"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-3 border-t border-gray-300 animate-fade-in">
          <div className="flex flex-col space-y-3">
            <Link
              href="/user/home"
              className="text-black py-2 hover:text-indigo-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/user/jobs"
              className="text-black py-2 hover:text-indigo-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link
              href="/user/companies"
              className="text-black py-2 hover:text-indigo-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Companies
            </Link>
            <Link
              href="/user/dashboard"
              className="text-black py-2 hover:text-indigo-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/user/profile"
              className="text-black py-2 sm:border transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;