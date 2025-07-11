'use client'

import { useState } from 'react'
import axios from 'axios'

const CookieDebugger = () => {
  const [logs, setLogs] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testCookie = async () => {
    setLoading(true)
    setLogs([])
    
    try {
      addLog(`API URL: ${process.env.NEXT_PUBLIC_API_URL}`)
      addLog('Testing cookie endpoint...')
      
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/test-cookie`, {
        withCredentials: true
      })
      
      addLog(`Response: ${JSON.stringify(response.data)}`)
      addLog('Check browser Application > Storage > Cookies for test_cookie')
    } catch (error: any) {
      addLog(`Error: ${error.message}`)
      if (error.response) {
        addLog(`Status: ${error.response.status}`)
        addLog(`Data: ${JSON.stringify(error.response.data)}`)
      }
    } finally {
      setLoading(false)
    }
  }

  const testLogin = async () => {
    setLoading(true)
    addLog('Testing login...')
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        email: 'test@example.com',
        password: 'testpassword'
      }, {
        withCredentials: true
      })
      
      addLog(`Login Response: ${JSON.stringify(response.data)}`)
      addLog('Check browser Application > Storage > Cookies for auth_token')
    } catch (error: any) {
      addLog(`Login Error: ${error.message}`)
      if (error.response) {
        addLog(`Status: ${error.response.status}`)
        addLog(`Data: ${JSON.stringify(error.response.data)}`)
      }
    } finally {
      setLoading(false)
    }
  }

  // Only show in development or when NODE_ENV is not production
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 bg-gray-900 text-white p-4 rounded-lg max-w-md max-h-96 overflow-y-auto z-50">
      <h4 className="font-bold mb-2">Cookie Debugger</h4>
      <div className="space-y-2 mb-4">
        <button 
          onClick={testCookie}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
        >
          Test Cookie
        </button>
        <button 
          onClick={testLogin}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm"
        >
          Test Login
        </button>
      </div>
      <div className="text-xs space-y-1">
        {logs.map((log, index) => (
          <div key={index} className="border-b border-gray-600 pb-1">
            {log}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CookieDebugger
