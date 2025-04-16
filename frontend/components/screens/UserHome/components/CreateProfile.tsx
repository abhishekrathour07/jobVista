import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CreateProfile = () => {
  return (
    <div className=" bg-indigo-800 text-white py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to take the next step in your career?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Create your profile, upload your resume and let the right job find you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/user/dashboard">
              <Button variant="secondary" size="lg">
                Create Profile
              </Button>
            </Link>
            <Link href="/user/jobs">
              <Button variant="outline" size="lg" className="border-white text-black ">
                Browse All Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
  )
}

export default CreateProfile
