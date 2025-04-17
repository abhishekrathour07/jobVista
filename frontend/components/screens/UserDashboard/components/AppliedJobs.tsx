import React from 'react'
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'

interface JobApplication {
  title: string
  company: string
  location: string
  status: 'Under Review' | 'Interview' | 'Rejected'
  appliedDate: string
}

const jobs: JobApplication[] = [
  {
    title: 'Product Designer',
    company: 'DesignStudio',
    location: 'Remote',
    status: 'Under Review',
    appliedDate: '3 days ago',
  },
  {
    title: 'UX Researcher',
    company: 'UserFirst Design',
    location: 'Seattle, WA',
    status: 'Interview',
    appliedDate: '1 week ago',
  },
  {
    title: 'Customer Support Specialist',
    company: 'SupportHero',
    location: 'Austin, TX',
    status: 'Rejected',
    appliedDate: '2 weeks ago',
  },
]

const statusStyle = {
  'Under Review': 'bg-gray-100 text-gray-700',
  Interview: 'bg-indigo-600 text-white',
  Rejected: 'bg-red-500 text-white',
}

const AppliedJobs = () => {
  return (
    <div className="p-6 border border-indigo-700 rounded-lg bg-white">
      <h2 className="text-xl font-semibold mb-4">Applied Jobs</h2>
      <div className="space-y-4">
        {jobs.map((job, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border rounded-md p-4 shadow-sm"
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-md font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-600">
                {job.company} · {job.location}
              </p>
              <span
                className={clsx(
                  'text-xs px-3 py-1 mt-2 rounded-full w-fit font-medium',
                  statusStyle[job.status]
                )}
              >
                {job.status}
              </span>
            </div>

            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <div className="flex items-center text-sm text-gray-500 gap-1">
                <Mail className="h-4 w-4" />
                Applied {job.appliedDate}
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AppliedJobs
