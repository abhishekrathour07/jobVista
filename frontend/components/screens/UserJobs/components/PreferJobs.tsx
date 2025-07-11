import CustomButton from '@/components/custom/CustomButton/CustomButton'
import SearchBox from '@/components/custom/SearchBox/SearchBox'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Filter, Search } from 'lucide-react'
import React, { useState } from 'react'

interface PreferJobsProps {
  onFilterChange: (filters: {
    search: string;
    jobType: string;
    location: string;
    experience: string;
  }) => void;
}

// Filter options constants
const FILTER_OPTIONS = {
  jobType: [
    { value: 'all', label: 'All Job Types' },
    { value: 'fulltime', label: 'Full-time' },
    { value: 'parttime', label: 'Part-time' },
    { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' }
  ],
  location: [
    { value: 'all', label: 'All Locations' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'pune', label: 'Pune' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'remote', label: 'Remote' }
  ],
  experience: [
    { value: 'all', label: 'All Experience' },
    { value: '0-1', label: '0-1 years' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5+', label: '5+ years' },
    { value: 'fresher', label: 'Fresher' }
  ]
};

// Filter configuration
const FILTER_CONFIG = [
  { key: 'jobType', label: 'Job Type', placeholder: 'Select job type' },
  { key: 'location', label: 'Location', placeholder: 'Select location' },
  { key: 'experience', label: 'Experience', placeholder: 'Select experience' }
] as const;

const PreferJobs: React.FC<PreferJobsProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    jobType: 'all',
    location: 'all',
    experience: 'all'
  });

  const handleSearch = () => {
    onFilterChange(filters);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      jobType: 'all',
      location: 'all',
      experience: 'all'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="flex flex-col px-4 sm:px-8 lg:px-12 bg-indigo-50 justify-center gap-6 h-auto sm:h-[40vh] py-8 sm:py-0">
      <div className="flex flex-col text-center sm:text-start gap-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Find Your <span className="text-indigo-600">Perfect Job</span> Today
        </h1>
      </div>
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-md w-full shadow-xl">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchBox
                placeholder="Search jobs, companies, and press enter"
                icon={<Search />}
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="flex gap-2">
              <CustomButton label="Search" onClick={handleSearch} />
              <Button
                onClick={clearFilters}
                className="bg-transparent text-black border "
              > <Filter />Reset </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FILTER_CONFIG.map((config) => (
              <div key={config.key}>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  {config.label}
                </label>
                <Select
                  value={filters[config.key]}
                  onValueChange={(value) => handleFilterChange(config.key, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={config.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {FILTER_OPTIONS[config.key].map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferJobs
