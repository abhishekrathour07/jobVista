import CustomButton from '@/components/custom/CustomButton/CustomButton'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'
import React from 'react'

type jobsProps = {
    company: string,
    logo: string,
    title: string,
    status: "Active" | "Expired",
    location: string,
    description: string
}
const JobCards: React.FC<jobsProps> = ({ company, logo, title, status, location, description }) => {
    return (
        <div className='p-6 border rounded-md space-y-4'>
            <div className='flex justify-between items-center'>
                <Avatar className="h-12 w-12">
                    <AvatarImage
                        src={logo !== null
                            ? logo
                            : `https://ui-avatars.com/api/?name=${title}`
                        }
                    />
                </Avatar>
                <h2 className='text-xl'>{company}</h2>
                <p className='px-4 rounded-full bg-green-300 text-green-700'>{status}</p>
                
            </div>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold'>{title}</h2>
                <p className='flex gap-1'><MapPin/>{location}</p>
            </div>
            <p>{description}</p>
            <div className=' flex items-center justify-between'>
                <Button className='bg-transparent h-10 text-black border py-2 hover:bg-transparent cursor-pointer'>Learn More</Button>
                <CustomButton label='Apply Now'/>
            </div>
        </div>
    )
}

export default JobCards
