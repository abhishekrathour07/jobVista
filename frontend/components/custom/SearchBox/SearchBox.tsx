import { Input } from '@/components/ui/input'
import React from 'react'

type SearchBoxProps = {
  placeholder: string
  icon: React.ReactNode
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder, icon, value, onChange, onKeyPress }) => {
  return (
    <div className="relative w-full">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <Input
        placeholder={placeholder}
        className="pl-14 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-indigo-600 "
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </div>
  )
}

export default SearchBox
