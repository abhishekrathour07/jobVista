import React from 'react'
import AdminPostJobForm from './components/AdminPostJobForm'
import FAQquestions from '../UserJobDetails/components/FAQquestions'

const AdminPostJob = () => {
    return (
        <div className=' flex p-8 gap-6'>
           <div className='w-4/2'>
           <AdminPostJobForm />
           </div>
            <FAQquestions/>
        </div>
    )
}

export default AdminPostJob
