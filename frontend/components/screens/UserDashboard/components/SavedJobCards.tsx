"use client"
import React from 'react'
import { Briefcase, MapPin, Building2, CalendarDays, DollarSign, X } from 'lucide-react'
import { getStatusColor } from '@/components/custom/jobCommon/jobStatus'
import CustomButton from '@/components/custom/CustomButton/CustomButton'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import saveJobService from '@/services/savedJob.services'
import toast from 'react-hot-toast'

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
}: any) => {
  const router = useRouter()

  const handlSaveUnsaveJobs = async (jobId: string) => {
    try {
      const response = await saveJobService.saveUnsaveJobs(jobId)
      toast.success(response?.message)
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <div className="p-5 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all bg-white flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 capitalize">{jobtitle}</h2>
          <p className="text-sm text-indigo-500 font-bold capitalize mt-2">{companyname}</p>
        </div>
        <div className='flex justify-center flex-col items-end'>
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(status)}`}>
            {status}
          </span>
          <div className='flex gap-2 mt-4'>
            <CustomButton label='View' onClick={() => { router.push(`/user/jobs/${_id}`) }} />
            <Button className='flex h-10 gap-2' onClick={() => handlSaveUnsaveJobs(_id)}><X /> Remove</Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
        <span className="flex items-center gap-1 capitalize"><MapPin className="w-4 h-4" /> {location}</span>
        <span className="flex items-center gap-1 capitalize"><Building2 className="w-4 h-4" /> {workplaceType}</span>
        <span className="flex items-center gap-1 capitalize"><Briefcase className="w-4 h-4" /> {jobType}</span>
        <span className="flex items-center gap-1 capitalize"><DollarSign className="w-4 h-4" /> {salaryRange}</span>
        <span className="flex items-center gap-1 capitalize"><CalendarDays className="w-4 h-4" /> Deadline: {new Date(deadline).toLocaleDateString()}</span>
      </div>
    </div>
  )
}

export default SavedJobCards
