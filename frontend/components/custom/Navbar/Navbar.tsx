"use client"
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, User, LayoutDashboard, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-indigo-800 shadow-md border-b border-gray-300 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg text-white">
          <BriefcaseBusiness className="h-6 w-6 text-white" />
          <span className="hidden sm:inline text-white">JobVista</span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/user/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-indigo-200">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link href="/user/profile">
            <Button variant="outline" size="sm" className="border-white text-black hover:bg-indigo-500">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </Link>
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