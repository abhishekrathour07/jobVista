'use client'

import { useEffect, useState } from 'react'

const DebugInfo = () => {
  const [apiUrl, setApiUrl] = useState<string>('')

  useEffect(() => {
    setApiUrl(process.env.NEXT_PUBLIC_API_URL || 'Not set')
  }, [])

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-sm z-50">
      <h4 className="font-bold">Debug Info:</h4>
      <p>API URL: {apiUrl}</p>
      <p>Environment: {process.env.NODE_ENV}</p>
    </div>
  )
}

export default DebugInfo
