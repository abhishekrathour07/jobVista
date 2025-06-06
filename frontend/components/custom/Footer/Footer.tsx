import { Briefcase } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="bg-secondary py-8 mt-auto">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2 font-semibold text-primary">
                <Briefcase className="h-5 w-5" />
                <span className='text-indigo-700'>JobVista</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                &copy; {new Date().getFullYear()} JobVista. All rights reserved.
              </p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-indigo-700">About</a>
              <a href="#" className="text-muted-foreground hover:text-indigo-700">Contact</a>
              <a href="#" className="text-muted-foreground hover:text-indigo-700">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-indigo-700">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
