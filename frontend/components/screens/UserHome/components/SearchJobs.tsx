import CustomButton from '@/components/custom/CustomButton/CustomButton'
import SearchBox from '@/components/custom/SearchBox/SearchBox'
import { MapPin, Search } from 'lucide-react'
import React from 'react'

const SearchJobs = () => {
    return (
        <div className='flex flex-col px-6 bg-indigo-50 justify-center items-center gap-6 pt-10 md:mt-0 h-auto md:h-[40vh]'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-6xl font-bold'>Find Your <span className='text-indigo-600'>Dream Job</span> Today</h1>
                <p className='text-gray-400'>Discover thousands of jobs in tech, design, marketing and more. Your next career move is just a few clicks away.</p>
            </div>
           <div className='bg-white p-8 rounded-sm w-full max-w-5xl shadow-xl'>
           <div className='flex flex-col md:flex-row gap-4'>
                <SearchBox placeholder='Search any Job' icon={<Search />} />
                <SearchBox placeholder='Search any location' icon={<MapPin />} />
                <CustomButton label='Search'/> 
            </div>
           </div>
        </div>
    )
}

export default SearchJobs
