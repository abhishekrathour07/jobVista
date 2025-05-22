"use client"
import React from 'react'
import { Briefcase, MapPin, Building2, CalendarDays, DollarSign, X } from 'lucide-react'
import { getStatusColor } from '@/components/custom/jobCommon/jobStatus'
import CustomButton from '@/components/custom/CustomButton/CustomButton'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import saveJobService from '@/services/savedJob.services'
import toast from 'react-hot-toast'
import { SavedData } from '@/types/savedJobTypes'
import { ApiError } from '@/types/Error.type'

const SavedJobCards = ({
  jobtitle,
  companyname,
  location,
  status,
  jobType,
  workplaceType,
  salaryRange,
  deadline,
  _id
}: SavedData) => {
  const router = useRouter()
  const todayDate = new Date().toISOString();

  const handlSaveUnsaveJobs = async (jobId: string) => {
    try {
      const response = await saveJobService.saveUnsaveJobs(jobId)
      toast.success(response?.message)
      router.refresh()
    } catch (error: unknown) {
      const err = error as ApiError;
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="p-4 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all bg-white flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 capitalize">{jobtitle}</h2>
          <p className="text-sm sm:text-base text-indigo-500 font-bold capitalize mt-2">{companyname}</p>
        </div>
        <div className="flex flex-col  sm:items-end gap-2">
          <span className={`text-sm sm:text-base w-fit font-medium px-3 py-1 rounded-full ${getStatusColor(deadline.toString() < todayDate.toString() ? "closed" : status)}`}>
            {deadline.toString() < todayDate.toString() ? "closed" : status}
          </span>
          <div className="flex flex-col md:flex-row  flex-wrap gap-2 mt-2">
            <CustomButton label="View" onClick={() => { router.push(`/user/jobs/${_id}`) }} />
            <Button
              className="flex h-10 gap-2"
              onClick={() => {
                handlSaveUnsaveJobs(_id);
              }}
            >
              <X /> Remove
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
        <span className="flex items-center gap-1 capitalize">
          <MapPin className="w-4 h-4" /> {location}
        </span>
        <span className="flex items-center gap-1 capitalize">
          <Building2 className="w-4 h-4" /> {workplaceType}
        </span>
        <span className="flex items-center gap-1 capitalize">
          <Briefcase className="w-4 h-4" /> {jobType}
        </span>
        <span className="flex items-center gap-1 capitalize">
          <DollarSign className="w-4 h-4" /> {salaryRange}
        </span>
        <span className="flex items-center gap-1 capitalize">
          <CalendarDays className="w-4 h-4" /> Deadline: {new Date(deadline).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}

export default SavedJobCards
