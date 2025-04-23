import React from 'react'
import { Briefcase, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  title?: string
  subtitle?: string
  showAddButton?: boolean
  onAddClick?: () => void
  addLabel?: string
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Jobs Found",
  subtitle = "Looks like you have not posted any jobs yet.",
  showAddButton = false,
  onAddClick,
  addLabel = "Post a Job",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center text-gray-600">
      <Briefcase className="w-12 h-12 text-indigo-600 mb-4" />
      <h2 className="text-xl font-semibold text-red-600">{title}</h2>
      <p className="text-sm text-gray-500 mt-2">{subtitle}</p>

      {showAddButton && onAddClick && (
        <Button
          onClick={onAddClick}
          className="mt-6 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
        >
          <PlusCircle className="w-4 h-4" />
          {addLabel}
        </Button>
      )}
    </div>
  )
}

export default EmptyState
