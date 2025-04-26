import CustomButton from '@/components/custom/CustomButton/CustomButton'
import SearchBox from '@/components/custom/SearchBox/SearchBox'
import { MapPin, Search } from 'lucide-react'
import React from 'react'

const PreferJobs = () => {
  return (
    <div className="flex flex-col px-4 sm:px-8 lg:px-12 bg-indigo-50 justify-center gap-6 h-auto sm:h-[30vh] py-8 sm:py-0">
      <div className="flex flex-col text-center sm:text-start gap-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Find Your <span className="text-indigo-600">Perfect Job</span> Today
        </h1>
      </div>
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-md w-full shadow-xl">
        <div className="flex flex-col md:flex-row gap-4">
          <SearchBox placeholder="Search any Job" icon={<Search />} />
          <SearchBox placeholder="Search any location" icon={<MapPin />} />
          <CustomButton label="Search" />
        </div>
      </div>
    </div>
  )
}

export default PreferJobs
