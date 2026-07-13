import React, { useState } from 'react'
import { Check, X, Eye, Clock, ShieldCheck, Search, Filter } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'

const DUMMY_APPLICATIONS = [
  {
    id: 'APP-1001',
    name: 'Dr. Sarah Jenkins',
    email: 's.jenkins@stanford.edu',
    institution: 'Stanford University',
    expertise: 'Molecular Biology, Genetics',
    status: 'PENDING',
    date: '2026-07-10',
  },
  {
    id: 'APP-1002',
    name: 'Prof. Marcus Chen',
    email: 'm.chen@mit.edu',
    institution: 'MIT',
    expertise: 'Artificial Intelligence, Bioinformatics',
    status: 'PENDING',
    date: '2026-07-12',
  },
  {
    id: 'APP-1003',
    name: 'Dr. Elena Rodriguez',
    email: 'elena.r@oxford.ac.uk',
    institution: 'Oxford University',
    expertise: 'Clinical Oncology',
    status: 'APPROVED',
    date: '2026-07-05',
  },
  {
    id: 'APP-1004',
    name: 'Dr. James Wilson',
    email: 'jwilson@cambridge.ac.uk',
    institution: 'Cambridge University',
    expertise: 'Theoretical Physics',
    status: 'REJECTED',
    date: '2026-07-01',
  }
]

export default function AdminApplications() {
  const [applications, setApplications] = useState(DUMMY_APPLICATIONS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const handleApprove = (id) => {
    setApplications(apps => apps.map(app => app.id === id ? { ...app, status: 'APPROVED' } : app))
  }

  const handleReject = (id) => {
    setApplications(apps => apps.map(app => app.id === id ? { ...app, status: 'REJECTED' } : app))
  }

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.institution.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Applications</p>
              <p className="text-2xl font-bold text-navy-950">{applications.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending Review</p>
              <p className="text-2xl font-bold text-navy-950">{applications.filter(a => a.status === 'PENDING').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Approved</p>
              <p className="text-2xl font-bold text-navy-950">{applications.filter(a => a.status === 'APPROVED').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <X className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Rejected</p>
              <p className="text-2xl font-bold text-navy-950">{applications.filter(a => a.status === 'REJECTED').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or institution..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 outline-none text-sm font-medium transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Filter className="w-4 h-4" /> Status:
            </div>
            <select 
              className="px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none cursor-pointer"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Applications</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Applicant</th>
                <th className="px-6 py-4 font-semibold">Expertise</th>
                <th className="px-6 py-4 font-semibold">Date Applied</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <AnimatePresence>
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      No applications found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => (
                    <motion.tr 
                      key={app.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-navy-950 text-sm">{app.name}</span>
                          <span className="text-xs text-gray-500">{app.institution} • {app.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">{app.expertise}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">{app.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        {app.status === 'PENDING' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200"><Clock className="w-3 h-3"/> Pending</span>}
                        {app.status === 'APPROVED' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-200"><Check className="w-3 h-3"/> Approved</span>}
                        {app.status === 'REJECTED' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200"><X className="w-3 h-3"/> Rejected</span>}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" className="h-8 px-2 border-gray-200 text-gray-600" title="View Details">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {app.status === 'PENDING' && (
                            <>
                              <Button 
                                onClick={() => handleApprove(app.id)}
                                className="h-8 px-2 bg-green-500 hover:bg-green-600 text-white border-none shadow-none" 
                                title="Approve"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button 
                                onClick={() => handleReject(app.id)}
                                variant="outline" 
                                className="h-8 px-2 border-red-200 text-red-600 hover:bg-red-50" 
                                title="Reject"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
