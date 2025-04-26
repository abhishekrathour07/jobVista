'use client'
import React, { useEffect, useState } from 'react'
import { Briefcase, Bookmark, Send } from 'lucide-react'
import { animate, useMotionValue } from 'framer-motion'
import { JobDashboardStatsProps } from '@/types/savedJobTypes'

type JobStatType = {
  label: string
  value: number
  icon: React.ReactNode
}

const JobStatsCard: React.FC<JobStatType> = ({ label, value, icon }) => {
  const count = useMotionValue(0)
  const [displayCount, setDisplayCount] = useState(0)

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 0.5,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplayCount(Math.round(latest)),
    })
    return () => controls.stop()
  }, [value, count])

  return (
    <div className="flex flex-col hover:border hover:border-indigo-600 border space-y-4 p-6 w-full items-center  bg-indigo-50 rounded-lg">
      <div className="p-4 rounded-full bg-indigo-100 text-indigo-700 shadow-md">
        {icon}
      </div>
      <h4 className="text-md text-gray-500 font-medium tracking-wide">{label}</h4>
      <p className="text-3xl font-bold text-indigo-800">{displayCount}</p>
    </div>
  )
}



const JobDashboardStats: React.FC<JobDashboardStatsProps> = ({ data }) => {
  const stats = [
    {
      label: 'Total Jobs',
      value: data?.totalJobs || 0,
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      label: 'Applied Jobs',
      value: data?.totalAppliedJobs || 0,
      icon: <Send className="h-6 w-6" />,
    },
    {
      label: 'Saved Jobs',
      value: data?.totalSavedJob || 0,
      icon: <Bookmark className="h-6 w-6" />,
    },
  ]

  return (
    <div className="grid p-8 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {stats.map((stat, index) => (
        <JobStatsCard key={index} {...stat} />
      ))}
    </div>
  )
}

export default JobDashboardStats
