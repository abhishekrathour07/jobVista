"use client"
import React, { useEffect, useState } from 'react'
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import applicantServices from '@/services/Applicants.services'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import EmptyState from '@/components/custom/EmptyState/EmptyState'
import { getStatusColor } from '@/components/custom/jobCommon/jobStatus'
import { AppliedJob, appliedJobsResponseTypes } from '@/types/appliedJobs.types'
import { ApiError } from '@/types/Error.type'


const AppliedJobs = () => {

  const [data, setData] = useState<appliedJobsResponseTypes>([]);

  const router = useRouter()
  const getAppliedJob = async () => {
    try {
      const response = await applicantServices.getAppliedJobs();
      setData(response?.data)
    } catch (error: unknown) {
      const err = error as ApiError;
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  }
  useEffect(() => {
    getAppliedJob();
  }, []);

  return (
    <div className="p-2 sm:p-6 border border-indigo-700 rounded-lg bg-white">
      <h2 className="text-xl font-semibold mb-4">Applied Jobs</h2>

      {

        data?.length === 0 ?
          <EmptyState title='No applied job found' subtitle='Please navigate to job section and applied for new job' />
          :
          <div className="space-y-4">
            {data?.map((job: AppliedJob, index: number) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border rounded-md p-4 shadow-sm"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-md font-semibold capitalize">{job.jobDetails?.jobtitle}</h3>
                  <p className="text-sm text-gray-600 capitalize">
                    <span className='text-indigo-700'>{job?.jobDetails?.companyname} </span> - {job?.jobDetails?.location}
                  </p>
                  <span
                    className={`text-xs px-3  py-1 mt-2 rounded-full w-fit font-medium ${getStatusColor(job.status)}`}
                  >
                    {job?.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <div className="flex items-center text-sm text-gray-500 gap-1">
                    <Mail className="h-4 w-4" />
                    Applied {moment(job?.appliedAt).fromNow()}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => { router.push(`/user/jobs/${job?.jobDetails._id}`) }}>
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  )
}

export default AppliedJobs
