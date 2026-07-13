import React from 'react'
import { FileText, Clock, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export default function AuthorDashboard() {
  return (
    <div className="space-y-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-navy-950">Welcome back, Author User!</h2>
          <p className="text-gray-500 text-sm mt-1">Here is a quick overview of your submissions.</p>
        </div>
        <Link to="/dashboard/submit">
          <Button className="shadow-sm">Submit New Manuscript</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Submissions</p>
            <p className="text-2xl font-bold text-navy-950">3</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Under Review</p>
            <p className="text-2xl font-bold text-navy-950">1</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Published</p>
            <p className="text-2xl font-bold text-navy-950">2</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-bold text-navy-950">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-100">
          <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50 transition-colors">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200 mb-2"><Clock className="w-3 h-3"/> Under Review</span>
              <h4 className="font-bold text-navy-950">Novel Approaches in Machine Learning</h4>
              <p className="text-sm text-gray-500 mt-1">Submitted to Journal of Artificial Intelligence • 2 days ago</p>
            </div>
            <Button variant="outline" className="text-sm shrink-0">View Status</Button>
          </div>
          <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50 transition-colors">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-200 mb-2"><CheckCircle className="w-3 h-3"/> Published</span>
              <h4 className="font-bold text-navy-950">CRISPR Applications in Modern Medicine</h4>
              <p className="text-sm text-gray-500 mt-1">Published in Journal of Medical Sciences • Vol 12, Issue 4</p>
            </div>
            <Button variant="outline" className="text-sm shrink-0">View Article</Button>
          </div>
        </div>
      </div>

    </div>
  )
}
