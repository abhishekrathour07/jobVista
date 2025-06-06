"use client"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { CATEGORIES, JOB_TYPES } from '@/types/jobtype'
import { SlidersHorizontal } from 'lucide-react'
import React, { useState } from 'react'

const FilterJobs = () => {
    const [category, setCategory] = useState("")
    const [showFilters, setShowFilters] = useState(true) // State to toggle filter visibility

    return (
        <div className="border px-4 py-6 sm:px-6 sm:py-10 space-y-5 rounded-lg w-full h-fit max-w-md">
            {/* Filter Header */}
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <SlidersHorizontal className="h-5 w-5" />
                    <span className="font-semibold text-lg">Filter</span>
                </div>
                <div className="flex gap-2">
                    <Button
                        className="cursor-pointer border bg-transparent rounded-md text-black hover:bg-transparent sm:hidden"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        {showFilters ? "Hide" : "Show"} Filters
                    </Button>
                    <Button className="cursor-pointer border bg-transparent rounded-md text-black hover:bg-transparent hidden sm:block">
                        Reset All
                    </Button>
                </div>
            </div>

            {showFilters && (
                <div className="space-y-6">
                    {/* Categories */}
                    <div className="flex flex-col gap-4 w-full">
                        <h2 className="text-lg text-black font-semibold">Categories</h2>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-full ring-offset-0 focus:ring-offset-0 ring-0 focus:ring-0">
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

                    {/* Job Types */}
                    <div className="flex flex-col gap-4 w-full">
                        <h2 className="text-lg text-black font-semibold">Job Type</h2>
                        {JOB_TYPES.map((jobs) => (
                            <div key={jobs.value} className="flex items-center gap-2">
                                <Checkbox value={jobs.label} />
                                <p>{jobs.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Salary Range */}
                    <div className="flex flex-col gap-4 w-full">
                        <h2 className="text-lg text-black font-semibold">Salary Range</h2>
                        <Slider
                            // value={salaryRange}
                            // onValueChange={(value) => setSalaryRange(value as [number, number])}
                            min={25000}
                            max={250000}
                            step={5000}
                        />
                        <div className="flex text-sm justify-between items-center mt-2">
                            <p>
                                Start <span className="text-gray-500">25k</span>
                            </p>
                            <p>
                                Upto <span className="text-gray-500">250k</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FilterJobs


