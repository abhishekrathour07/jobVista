"use client"
import React, { useState } from 'react'
import { ArrowLeft, Bookmark, CalendarDays, Clock, DollarSign, Globe, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CustomButton from '@/components/custom/CustomButton/CustomButton'
import { useRouter } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DialogTitle } from '@radix-ui/react-dialog'
import ApplyJobDrawer from './components/ApplyJobDrawer'
import FAQquestions from './components/FAQquestions'

const JobDetail = () => {
  const router = useRouter()
  const [showUserInfo, setShowUserInfo] = useState(false)
  return (
    <div className="p-6 flex flex-col bg-gray-100 min-h-screen">
      <p className='text-indigo-700 cursor-pointer flex justify-start items-center' onClick={() => router.back()}><ArrowLeft /> back to jobs</p>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">

          {/* Header */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-semibold">Senior Frontend Developer</h1>
                <p className="text-indigo-600 font-semibold">TechGiant Inc.</p>
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500 items-center">
                  <MapPin className="h-4 w-4" /> San Francisco, CA
                  <DollarSign className="h-4 w-4" /> $120,000 - $150,000
                  <Clock className="h-4 w-4" /> Full-time
                  <CalendarDays className="h-4 w-4" /> Posted 2 days ago
                </div>
              </div>
              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-medium">Active</span>
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <h2 className="text-lg font-semibold">Job Description</h2>
            <p>
              We’re looking for a Senior Frontend Developer to join our team at TechGiant Inc.
              You’ll be responsible for creating exceptional web experiences and leading frontend initiatives.
            </p>

            <h3 className="font-medium">Responsibilities:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Design and develop high-quality, responsive web applications</li>
              <li>Work with design and product teams to implement new features</li>
              <li>Optimize applications for maximum speed and scalability</li>
              <li>Mentor junior developers and provide technical leadership</li>
              <li>Stay up-to-date with emerging trends in frontend development</li>
            </ul>

            <h3 className="font-medium">Requirements:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>5+ years of experience in frontend development</li>
              <li>Strong proficiency in JavaScript, React, and modern frontend frameworks</li>
              <li>Experience with responsive design and cross-browser compatibility</li>
              <li>Knowledge of frontend build tools and workflows</li>
              <li>Excellent problem-solving and communication skills</li>
            </ul>

            <h3 className="font-medium">Benefits:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Competitive salary and equity package</li>
              <li>Comprehensive health, dental, and vision insurance</li>
              <li>Flexible work schedule and remote options</li>
              <li>Professional development allowance</li>
              <li>Modern office with snacks and amenities</li>
            </ul>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Action Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <Sheet open={showUserInfo} onOpenChange={setShowUserInfo}>
              <SheetTrigger asChild>
                <CustomButton label='Apply Now' className="w-full mb-4" />
              </SheetTrigger>
              <SheetContent side="right" className="bg-white text-black sm:w-[400px] w-full overflow-auto">
                <div className="p-4 space-y-4">
                  <DialogTitle className="text-xl font-semibold">Apply for this Job</DialogTitle>
                  <ApplyJobDrawer/>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex gap-4 justify-between">
              <Button variant="outline" className="w-full flex gap-2 items-center"><Bookmark className="h-4 w-4" /> Save</Button>
            </div>
          </div>

          {/* Company Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm border space-y-2">
            <h3 className="text-lg font-semibold">Company Info</h3>
            <p className="text-sm text-gray-600">
              TechGiant Inc. is a global technology company focused on creating innovative solutions that empower businesses and individuals. Founded in 2010, we've grown to over 1,000 employees across 5 offices worldwide.
            </p>
            <div className="text-sm text-gray-700">
              <p className='flex '><span className="font-medium">Website:</span> <a href="#" className="text-blue-600 flex items-center gap-2 underline"><Globe className='h-4 w-4' /> Visit</a></p>
              <p><span className="font-medium">Industry:</span> Technology</p>
              <p><span className="font-medium">Company size:</span> 1,000 - 5,000</p>
              <p><span className="font-medium">Founded:</span> 2010</p>
            </div>
          </div>

          {/* Similar Jobs */}
          <div className="bg-white rounded-lg shadow-sm border">
            <FAQquestions/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetail
