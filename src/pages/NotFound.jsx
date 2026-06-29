import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Settings, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-ping opacity-20 bg-primary-500 rounded-full"></div>
        <div className="relative bg-primary-100 p-6 rounded-full text-primary-600">
          <Settings className="w-16 h-16 animate-[spin_3s_linear_infinite]" />
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-navy-950 mb-4">Coming Soon!</h1>
      <p className="text-gray-500 mb-8 max-w-md text-lg">
        We're actively working on this feature to bring you the best possible experience. Stay tuned!
      </p>
      <div className="flex gap-4">
        <Button onClick={() => navigate(-1)} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </Button>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  )
}
