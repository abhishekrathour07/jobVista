import React from 'react'

type searchJobsProps = {
    title?: string,
    highlight?: string,
    subTitle?: string
}
const SearchJobs: React.FC<searchJobsProps> = ({ title
    , subTitle, highlight
}) => {
    return (
        <div className='flex flex-col px-6 bg-indigo-50 justify-center items-center gap-6 pt-10 md:mt-0 h-auto md:h-[30vh]'>
            {title && subTitle && highlight ? 
                (
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-2xl sm:text-4xl md:text-6xl  font-bold'>{title} <span className='text-indigo-600'>{highlight}</span></h1>
                        <p className='text-gray-400'>{subTitle}</p>
                    </div>
                )
                 :
               ( <div className='flex flex-col gap-2'>
                    <h1 className='text-3xl sm:text-4xl md:text-6xl font-bold'>Find Your <span className='text-indigo-600'>Dream Job</span> Today</h1>
                    <p className='text-gray-400'>Discover thousands of jobs in tech, design, marketing and more. Your next career move is just a few clicks away.</p>
                </div>)
                }
        </div>
    )
}

export default SearchJobs
