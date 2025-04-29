import CustomButton from '@/components/custom/CustomButton/CustomButton';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DialogTitle } from '@radix-ui/react-dialog';
import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ApplyJobDrawer from '../../UserJobDetails/components/ApplyJobDrawer';
import { getStatusColor } from '@/components/custom/jobCommon/jobStatus';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tooltip } from '@radix-ui/react-tooltip';
import { JobsRequestTypes } from '@/types/getPaginatedjobTypes';

const JobCards: React.FC<JobsRequestTypes> = ({
  company,
  logo,
  title,
  status,
  location,
  description,
  jobId,
  isApplied,
  deadline
}) => {
  const router = useRouter();
  const [showUserInfo, setShowUserInfo] = useState(false);
  const todayDate = new Date().toISOString();


  return (
    <div className="flex flex-col  hover:border hover:border-indigo-600 justify-between p-6 border rounded-2xl shadow-md h-full bg-white space-y-4">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage
              src={logo || `https://ui-avatars.com/api/?name=${company}`}
              alt={`${company} logo`}
            />
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold line-clamp-1">{company}</h2>
            <p className="flex items-center text-sm text-gray-600 gap-1 mt-1">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{location}</span>
            </p>
          </div>
        </div>

        <span
          className={`px-3 py-1 w-fit text-xs font-medium rounded-full ${getStatusColor(deadline.toString() < todayDate.toString() ? "closed" : status)}`}
        >
          {deadline.toString() < todayDate.toString() ? "closed" : status}
        </span>
      </div>

      {/* Middle Section */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-700 line-clamp-3">
          {description}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
        <Button
          variant="outline"
          className="h-10 w-full sm:w-auto border-gray-300 text-gray-800 hover:bg-gray-100"
          onClick={() => router.push(`/user/jobs/${jobId}`)}
        >
          Learn More
        </Button>

        <Sheet open={showUserInfo} onOpenChange={setShowUserInfo}>
          <SheetTrigger asChild>

            {isApplied ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    disabled
                    className="border px-4 py-2 rounded-lg cursor-not-allowed bg-gray-300 text-gray-600 text-sm w-full sm:w-auto"
                  >
                    Applied
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Application submitted</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              deadline.toString() < todayDate.toString() || status === "closed" ? <Button className='border px-4 py-2 rounded-lg cursor-not-allowed bg-gray-300 text-gray-600 text-sm w-full sm:w-auto'>Window Closed</Button> :
                < CustomButton label="Apply Now" className="w-full sm:w-auto" />
            )}
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-white text-black sm:w-[400px] w-full overflow-auto"
          >
            <div className="p-4 space-y-4">
              <DialogTitle className="text-xl font-semibold">
                Apply for this Job
              </DialogTitle>
              <ApplyJobDrawer jobId={jobId} onClose={setShowUserInfo} showUserInfo={showUserInfo} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default JobCards;
