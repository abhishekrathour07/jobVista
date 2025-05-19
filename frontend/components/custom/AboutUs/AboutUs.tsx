'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { BackgroundGradient } from '@/components/ui/background-gradient';

interface TeamMember {
    name: string;
    role: string;
    imageUrl?: string;
}

const teamMembers: TeamMember[] = [
    {
        name: 'Abhishek Singh',
        role: ' Backend Developer',
        imageUrl: '/abhi.jpeg',
    },
    {
        name: 'Rahul Kumar Sah',
        role: 'Frontend Developer',
        imageUrl: '/rahul-job.jpeg',
    },
    {
        name: 'Riya Kumari',
        role: 'Frontend Developer',
        imageUrl: '/riya.jpeg',
    },
    {
        name: 'Md. Irfan',
        role: 'API Integration',
        imageUrl: '/miya.png',
    },
];

const AboutUs = () => {
    return (
        <section className="py-8 px-4">
            <h2 className="text-4xl font-semibold text-center text-indigo-700 mb-12 tracking-tight">
                Meet Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                    >
                        <BackgroundGradient className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2">
                            <img src={member.imageUrl} alt={member.name} className='h-[50vh] rounded-md mb-6' />

                            <h3 className="text-xl font-semibold text-center">{member.name}</h3>
                            <p className="text-gray-500 text-center">{member.role}</p>
                        </BackgroundGradient>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AboutUs;
