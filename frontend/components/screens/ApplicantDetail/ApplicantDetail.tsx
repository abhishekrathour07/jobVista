"use client"
import profileService from '@/services/Profile.services';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { ArrowLeft, Calendar, Mail, MapPin, Phone, User, UserCircle } from 'lucide-react'
import Skills from '../Profile/components/Skills';
import moment from 'moment';
import Navbar from '@/components/custom/Navbar/Navbar';
import Loader from '@/components/custom/HashLoader/Loader';
import { applicantsDetailResponseType } from '@/types/applicantsDetail.types';

const ApplicantDetail = () => {
    const [data, setData] = useState<applicantsDetailResponseType>();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const id = params.userId
    const router = useRouter()

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await profileService.getUserById(id as string);
            setData(response?.data);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="min-h-screen bg-indigo-100">
            <Navbar />
            {loading ?
                <div className='flex items-center justify-center mt-8 min-h-[50vh]'>
                    <Loader size={50} color="#0118D8" />
                </div>
                :
                <div className="max-w-2xl mx-auto bg-white rounded-xl mt-8 shadow-md p-6 md:p-8">
                    <button
                        className='flex cursor-pointer items-center gap-2 px-2 rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-100 transition-all'
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className='w-4 h-4' />
                        <span>Back</span>
                    </button>
                    <div className="flex flex-col items-center gap-6">
                        {/* Profile Image */}
                        <div className="relative">
                            {data?.profileImage ? (
                                <img
                                    src={data?.profileImage}
                                    alt={`${data?.name}'s profile`}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center border-4 border-blue-100">
                                    <UserCircle className="w-20 h-20 text-blue-400" />
                                </div>
                            )}
                        </div>

                        {/* Basic Info */}
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">{data?.name}</h1>
                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                <Mail className="w-4 h-4" />
                                <span>{data?.email}</span>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50">
                                <Phone className="w-5 h-5 text-blue-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="font-medium">{data?.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50">
                                <MapPin className="w-5 h-5 text-blue-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Location</p>
                                    <p className="font-medium">{data?.location || "Not Provided"}</p>
                                </div>
                            </div>
                        </div>

                        <Skills skills={data?.skills as string[]} />

                        <div className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50">
                            <Calendar className="w-5 h-5 text-blue-500" />
                            <div>
                                <p className="text-sm text-gray-500">Account Created</p>
                                <p className="font-medium">{moment(data?.createdAt).format("MMM-DD-YY")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default ApplicantDetail;
