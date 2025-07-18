"use client"
import React, { useEffect, useState } from 'react'
import { ArrowLeft, Bookmark, CalendarDays, Clock, DollarSign, Globe, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CustomButton from '@/components/custom/CustomButton/CustomButton'
import { useParams, useRouter } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DialogTitle } from '@radix-ui/react-dialog'
import ApplyJobDrawer from './components/ApplyJobDrawer'
import FAQquestions from './components/FAQquestions'
import jobServices from '@/services/Job.services'
import toast from 'react-hot-toast'
import moment from 'moment'
import Loader from '@/components/custom/HashLoader/Loader'
import saveJobService from '@/services/savedJob.services'
import { userJobDetailResponseTypes } from '@/types/jobDetail.types'
import { ApiError } from '@/types/Error.type'

const JobDetail = () => {
  const router = useRouter()
  const { id } = useParams();
  const [jobDetailData, setJobDetailData] = useState<userJobDetailResponseTypes>()
  const [showUserInfo, setShowUserInfo] = useState(false)
  const [loading, setloading] = useState(false)

  const fetchJobDetailData = async () => {
    setloading(true);
    try {
      const response = await jobServices.getJobById(id as string)
      setJobDetailData(response?.data);

    } catch (error: unknown) {
      const err = error as ApiError;
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setloading(false)
    }
  }

  const handlSaveUnsaveJobs = async () => {
    try {
      const response = await saveJobService.saveUnsaveJobs(id as string)
      toast.success(response?.message)
      setJobDetailData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          isSaved: !prev.isSaved,
        };
      });
    } catch (error: unknown) {
      const err = error as ApiError;
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  }
  useEffect(() => {
    fetchJobDetailData()
  }, [])

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <p className='text-indigo-700 cursor-pointer flex items-center gap-1 mb-6' onClick={() => router.back()}><ArrowLeft /> Back to Jobs</p>

      {loading || !jobDetailData ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader size={50} color="#0118D8" />
        </div>
      ) : (

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow border">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-semibold capitalize mb-1">{jobDetailData?.job?.jobtitle}</h1>
                  <p className="text-indigo-600 font-medium mb-2">{jobDetailData?.job?.companyname}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 items-center">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {jobDetailData?.job?.location}</span>
                    <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {jobDetailData?.job?.salaryRange}</span>
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {jobDetailData?.job?.jobType}</span>
                    <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {moment(jobDetailData?.job?.postedAt).fromNow()}</span>
                  </div>
                </div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium capitalize">{jobDetailData?.job?.status}</span>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white p-6 rounded-xl shadow border space-y-4">
              <h2 className="text-lg font-semibold text-indigo-700">Job Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{jobDetailData?.job?.jobDescription}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div>
                  <h3 className="font-bold text-sm text-indigo-700">Work Mode</h3>
                  <p className='capitalize'>{jobDetailData?.job?.workplaceType}</p>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-indigo-700">Experience</h3>
                  <p className='capitalize'>{jobDetailData?.job?.experience}</p>
                </div>
                <div>
                  <h3 className=" text-sm text-indigo-700 font-bold">Application Deadline</h3>
                  <p>{moment(jobDetailData?.job?.deadline).format('MMMM D, YYYY')}</p>
                </div>
              </div>

              <div>
                <h3 className=" mt-6 text-indigo-700 font-bold">Requirements</h3>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  {jobDetailData?.job?.requirements?.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className='text-indigo-700 font-bold mb-3'>Skills Required</h3>
                <div className='flex flex-wrap gap-2'>
                  {jobDetailData?.job.skills[0].split(" ").filter(skill => skill.trim()).map((skill: string, index: number) => (
                    <span 
                      key={index} 
                      className='bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm font-medium border border-indigo-200 hover:bg-indigo-200 transition-colors'
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Apply Action */}
            <div className="bg-white p-6 rounded-xl shadow border">
              <Sheet open={showUserInfo} onOpenChange={setShowUserInfo}>
                <SheetTrigger asChild>
                  {jobDetailData?.isApplied ? <Button disabled={jobDetailData?.isApplied} className={`w-full bg-slate-400 text-gray-700 cursor-not-allowed`}>Already Applied</Button> : <CustomButton label='Apply Now' className='w-full' />}
                </SheetTrigger>                <SheetContent side="right" className="bg-white text-black sm:w-[400px] w-full overflow-auto">
                  <div className="p-4 space-y-4">
                    <DialogTitle className="text-xl font-semibold">Apply for this Job</DialogTitle>
                    <ApplyJobDrawer jobId={jobDetailData?.job?._id} onClose={setShowUserInfo} showUserInfo={showUserInfo} />
                  </div>
                </SheetContent>
              </Sheet>
              <Button variant="outline" className="w-full flex gap-2 mt-4 items-center" onClick={handlSaveUnsaveJobs}>
                {jobDetailData?.isSaved ? <span className='flex items-center gap-4'><Bookmark className="h-4 w-4" fill='#0118D8' /> Unsave</span> : <span className='flex gap-4 items-center'><Bookmark className="h-4 w-4" /> Save</span>}
              </Button>
            </div>

            {/* Company Info */}
            <div className="bg-white p-6 rounded-xl shadow border space-y-4">
              <h3 className="text-lg font-semibold">Company Info</h3>
              <p className="text-sm text-gray-700">{jobDetailData?.job?.companyInfo}</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p className='flex gap-1'><span className="font-medium">Website:</span> <a href={jobDetailData?.job?.companyUrl} className="text-blue-600 underline flex items-center gap-1"><Globe className='h-4 w-4' /> Visit</a></p>
                <p><span className="font-medium">Industry:</span> {jobDetailData?.job?.industryType}</p>
                <p><span className="font-medium">Company Size:</span> 51-200 employees</p>
                <p><span className="font-medium">Founded:</span> 2015</p>
              </div>
            </div>

            {/* FAQ */}
            <FAQquestions />
          </div>
        </div>

      )}

    </div>
  )
}

export default JobDetail