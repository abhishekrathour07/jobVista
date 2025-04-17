import React from 'react'
import { Briefcase, Bookmark, Send } from 'lucide-react'

type JobStatType = {
  label: string
  value: number
  icon: React.ReactNode
}

const JobStatsCard: React.FC<JobStatType> = ({ label, value, icon }) => {
  return (
    <div className="flex flex-col space-y-4 p-4 items-center  max-w-sm bg-white shadow rounded-lg border">
        <div className={`p-3 rounded-full bg-indigo-100 text-indigo-800`}>
          {icon}
        </div>
        <div className='flex items-center justify-center gap-4'>
          <h4 className="text-sm text-gray-500">{label}</h4>
          <p className="text-xl font-semibold text-black">{value}</p>
        </div>
    </div>
  )
}


const JobDashboardStats = () => {
  const stats = [
    {
      label: "Total Jobs",
      value: 120,
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      label: "Applied Jobs",
      value: 35,
      icon: <Send className="h-6 w-6" />,
    },
    {
      label: "Saved Jobs",
      value: 18,
      icon: <Bookmark className="h-6 w-6" />,
    }
  ]

  return (
    <div className="grid p-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <JobStatsCard key={index} {...stat} />
      ))}
    </div>
  )
}

export default JobDashboardStats
