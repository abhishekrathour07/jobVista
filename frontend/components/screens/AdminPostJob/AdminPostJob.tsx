import React from 'react'
import AdminPostJobForm from './components/AdminPostJobForm'
import FAQquestions from '../UserJobDetails/components/FAQquestions'

const AdminPostJob = () => {
    return (
        <div className=' flex p-8 gap-6'>
            <div className='w-2/2'>
                <AdminPostJobForm />
            </div>
            <div className='flex flex-col gap-8 w-1/4'>
                <FAQquestions />
                <div className="w-full max-w-md h-fit rounded-lg border mx-auto p-4 bg-white ">
                    <h2 className="text-md font-bold text-red-500 text-center">Instruction While Posting a Job</h2>
                    <div className='text-sm'>
                        <p>1. Go to Admin → Post Job</p>
                        <p>2. Fill in job details & upload logo</p>
                        <p>3. Click Post Job to publish</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPostJob
