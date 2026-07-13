import React, { useState } from 'react'
import { Search, Filter, FileText, Download, CheckCircle, XCircle, Clock, Eye, MoreVertical } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { motion } from 'framer-motion'

export default function AdminManuscripts() {
  const [activeTab, setActiveTab] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const mockManuscripts = [
    {
      id: 'MAN-2023-089',
      title: 'Targeted Therapy in Advanced Non-Small Cell Lung Cancer: A Review',
      authors: 'Dr. Jane Smith, Prof. Robert Doe',
      journal: 'Journal of Cancer Genetics',
      status: 'New',
      submittedAt: '2 hours ago',
      type: 'Review Article'
    },
    {
      id: 'MAN-2023-088',
      title: 'Epigenetic Modulators in Pediatric Leukemia',
      authors: 'Dr. Emily Chen, Dr. Michael Wong',
      journal: 'Pediatric Oncology Review',
      status: 'In Review',
      submittedAt: '2 days ago',
      type: 'Original Research'
    },
    {
      id: 'MAN-2023-085',
      title: 'Radiotherapy Sensitization using Gold Nanoparticles',
      authors: 'Prof. Alan Turing, Dr. Marie Curie',
      journal: 'Clinical Oncology Reports',
      status: 'Accepted',
      submittedAt: '1 week ago',
      type: 'Clinical Trial'
    },
    {
      id: 'MAN-2023-081',
      title: 'Early Detection of Pancreatic Cancer Biomarkers',
      authors: 'Dr. Lisa Ray',
      journal: 'Journal of Cancer Genetics',
      status: 'Rejected',
      submittedAt: '2 weeks ago',
      type: 'Short Communication'
    }
  ]

  const getStatusBadge = (status) => {
    switch(status) {
      case 'New':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200"><Clock className="w-3 h-3 mr-1" /> New Submission</Badge>
      case 'In Review':
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200"><Eye className="w-3 h-3 mr-1" /> In Review</Badge>
      case 'Accepted':
        return <Badge className="bg-green-50 text-green-700 border-green-200"><CheckCircle className="w-3 h-3 mr-1" /> Accepted</Badge>
      case 'Rejected':
        return <Badge className="bg-red-50 text-red-700 border-red-200"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const filteredManuscripts = mockManuscripts.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) || m.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === 'All' || m.status === activeTab
    return matchesSearch && matchesTab
  })

  const tabs = ['All', 'New', 'In Review', 'Accepted', 'Rejected']

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy-950">Manuscript Processing</h2>
          <p className="text-gray-500 text-sm mt-1">Review, assign, and manage submitted manuscripts from authors.</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'New Submissions', value: '12', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'In Review', value: '34', color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Accepted (30d)', value: '8', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Avg Time to Decision', value: '14d', color: 'text-purple-600', bg: 'bg-purple-50' }
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-3 font-bold text-lg`}>
              {stat.value}
            </div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</h4>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-200 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-50 p-1 rounded-xl">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === tab 
                      ? 'bg-white text-navy-950 shadow-sm' 
                      : 'text-gray-500 hover:text-navy-900 hover:bg-gray-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search ID or Title..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 outline-none text-sm transition-colors"
              />
            </div>
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-100 bg-gray-50/30">
          {filteredManuscripts.map((manuscript, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              key={manuscript.id} 
              className="p-6 hover:bg-white transition-colors group flex flex-col lg:flex-row lg:items-center gap-6"
            >
              
              <div className="flex-grow space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {manuscript.id}
                  </span>
                  {getStatusBadge(manuscript.status)}
                  <span className="text-xs text-gray-500 font-medium">{manuscript.submittedAt}</span>
                </div>
                
                <h3 className="text-lg font-bold text-navy-950 leading-snug group-hover:text-primary-700 transition-colors cursor-pointer">
                  {manuscript.title}
                </h3>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <FileText className="w-4 h-4 text-gray-400" /> {manuscript.type}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>{manuscript.journal}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="italic">{manuscript.authors}</span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-3 lg:border-l lg:border-gray-100 lg:pl-6">
                <Button variant="outline" className="h-9 px-4 gap-2 text-primary-700 border-primary-200 hover:bg-primary-50">
                  <Download className="w-4 h-4" /> PDF
                </Button>
                {manuscript.status === 'New' && (
                  <Button className="h-9 px-4 bg-navy-950 hover:bg-navy-900">
                    Assign Reviewers
                  </Button>
                )}
                <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          ))}

          {filteredManuscripts.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-sm">
                <FileText className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-1">No manuscripts found</h3>
              <p className="text-gray-500 text-sm">No submissions match the current filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
