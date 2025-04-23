import CustomButton from '@/components/custom/CustomButton/CustomButton'
import { getStatusColor } from '@/components/custom/jobCommon/jobStatus'
import { Button } from '@/components/ui/button'
import { Clock, X } from 'lucide-react'
import moment from 'moment'
import React from 'react'

type SavedJobCardProps = {
  jobtitle: string
  companyname: string
  location: string
  updatedAt: string
  salaryRange: string
  maxSalary: string
  status: "active" | "closed"
}

const SavedJobCards: React.FC<SavedJobCardProps> = ({ jobtitle, status, companyname, location, updatedAt, salaryRange }) => {
  return (
    <div className='p-4 space-y-2 border rounded-md'>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg text-start capitalize'>{jobtitle}</h1>
        <h1 className={`text-sm px-3 py-1 rounded-full text-start mb-4 ${getStatusColor(status)}`}>{status}</h1>
      </div>

      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center text-gray-500'>
          <p className='text-indigo-600'>{companyname} -</p>
          <p>{location}</p>
          <div className='flex text-black text-sm items-center'>
            <p> - </p>
            <span>{salaryRange}</span>
          </div>
        </div>
        <div className='hidden sm:flex gap-4'>
          <p className='flex gap-2 text-sm text-gray-500 items-center'><Clock className='h-4 w-4' /> <span>Saved {moment(updatedAt).fromNow()}</span></p>
          <CustomButton label='View' />
          <Button className='flex h-10 gap-2'><X /> Remove</Button>
        </div>
      </div>
      <div className='hidden sm:flex text-black text-sm items-center'>

        <span className='flex md:hidden'>{salaryRange}</span>
      </div>
      <div className='flex justify-between sm:hidden'>
        <p className='flex gap-2 text-sm text-gray-500 items-center'><Clock className='h-4 w-4' /> <span>Saved {moment(updatedAt).fromNow()}</span></p>
        <div className='flex gap-4'>
          <CustomButton label='View' />
          <Button className='flex h-10 gap-2'><X /> Remove</Button>
        </div>
      </div>
    </div>
  )
}

export default SavedJobCards
