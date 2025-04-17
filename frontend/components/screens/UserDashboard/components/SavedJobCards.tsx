import CustomButton from '@/components/custom/CustomButton/CustomButton'
import { Button } from '@/components/ui/button'
import { Clock, X } from 'lucide-react'
import React from 'react'

type SavedJobCardProps = {
  title: string
  company: string
  location: string
  savedAt: string
  minSalary: string
  maxSalary: string
}

const SavedJobCards: React.FC<SavedJobCardProps> = ({ title, company, location, savedAt, minSalary, maxSalary }) => {
  return (
    <div className='p-4 space-y-2 border rounded-md'>
      <h1 className='text-lg text-start'>{title}</h1>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center text-gray-500'>
          <p>{company} -</p>
          <p>{location}</p>
        </div>
        <div className='flex gap-4'>
          <p className='flex gap-2 text-sm text-gray-500 items-center'><Clock className='h-4 w-4' /> <span>Saved {savedAt}</span></p>
          <CustomButton label='View' />
          <Button className='flex h-10 gap-2'><X /> Remove</Button>
        </div>
      </div>
      <div className='flex text-black text-sm items-center'>
        <span>{minSalary}</span>
        <p> - </p>
        <span>{maxSalary}</span>
      </div>
    </div>
  )
}

export default SavedJobCards
