"use client"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { CATEGORIES, JOB_TYPES } from '@/types/jobtype'
import { Filter, SlidersHorizontal, X } from 'lucide-react'
import React, { useState } from 'react'

const FilterJobs = () => {
    const [category,setCategory] =useState("")
    return (
        <div className='border px-6 py-8  space-y-6 rounded-lg w-full h-fit max-w-md'>
            <div className='flex justify-between'>
                <div className='flex gap-2 items-center'>
                    <SlidersHorizontal className='h-5 w-5' />
                    <span className='font-semibold text-lg'>Filter</span>
                </div>
                <Button className='cursor-pointer border bg-transparent rounded-md text-black hover:bg-transparent'>
                   Reset All
                </Button>
            </div>
            <div className='flex flex-col gap-4 w-full'>
                <h2 className='text-lg text-black font-semibold'>Categories</h2>
                <Select  value={category} onValueChange={setCategory}>
                    <SelectTrigger className='w-full ring-offset-0 focus:ring-offset-0 ring-0 focus:ring-0'>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-categories">All Categories</SelectItem>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
            </div>
            <div className='flex flex-col gap-4 w-full'>
                <h2 className='text-lg text-black font-semibold'>Job Type</h2>
                {JOB_TYPES.map((jobs)=>(
                    <div  key={jobs.value} className='flex items-center gap-2'>
                        <Checkbox  value={jobs.label}/>
                        <p>{jobs.label}</p>
                    </div>
                ))}
            </div>
            <div className='flex flex-col gap-4 w-full'>
                <h2 className='text-lg text-black font-semibold'>Salary Range</h2>
                <Slider />
            </div>
        </div>
    )
}

export default FilterJobs


