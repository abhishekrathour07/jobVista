import CustomButton from '@/components/custom/CustomButton/CustomButton';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DialogTitle } from '@radix-ui/react-dialog';
import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ApplyJobDrawer from '../../UserJobDetails/components/ApplyJobDrawer';

type JobsProps = {
  company: string;
  logo: string | null;
  title: string;
  status: string;
  location: string;
  description: string;
};

const JobCards: React.FC<JobsProps> = ({ company, logo, title, status, location, description }) => {

  const router = useRouter();
  const [showUserInfo,setShowUserInfo] = useState(false)
  return (
    <div className="p-6 border rounded-xl shadow-sm space-y-5 h-fit bg-white">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={logo || `https://ui-avatars.com/api/?name=${company}`}
              alt={`${company} logo`}
            />
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{company}</h2>
            <p className="flex items-center text-sm text-gray-600 gap-1">
              <MapPin className="w-4 h-4" />
              {location}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 text-sm rounded-full ${status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
        >
          {status}
        </span>
      </div>

      <h3 className="text-xl font-bold">{title}</h3>

      <p className="text-sm text-gray-700">{description}</p>

      <div className="flex justify-between items-center pt-2 mt-6">
        <Button
          variant="outline"
          className="h-10 border-gray-300 text-gray-800 hover:bg-gray-100"
          onClick={() => router.push("/user/jobs/detail")}
        >
          Learn More..
        </Button>
        <Sheet open={showUserInfo} onOpenChange={setShowUserInfo}>
          <SheetTrigger asChild>
            <CustomButton label='Apply Now' />
          </SheetTrigger>
          <SheetContent side="right" className="bg-white text-black sm:w-[400px] w-full overflow-auto">
            <div className="p-4 space-y-4">
              <DialogTitle className="text-xl font-semibold">Apply for this Job</DialogTitle>
              <ApplyJobDrawer />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default JobCards;
