import React from 'react'
import { useParams, Link, useOutletContext, Navigate } from 'react-router-dom'
import { ChevronRight, FileText } from 'lucide-react'
import { journalPath } from '../utils/journalUtils'
import { cn } from '../utils/cn'
import Editors from './Editors'

const ABOUT_MENU = [
  { id: 'mission-and-scope', label: 'Mission and scope' },
  { id: 'editorial-board', label: 'Editorial and Advisory Boards', component: Editors },
  { id: 'journal-information', label: 'Journal information' },
  { id: 'open-access-statement', label: 'Open access statement' },
  { id: 'copyright-statement', label: 'Copyright statement' },
  { id: 'editorial-quality-processes', label: 'Editorial & quality processes' },
  { id: 'contact', label: 'Contact' },
]

export default function JournalAbout() {
  const { journalId, aboutId } = useParams()
  const { journal } = useOutletContext()

  const currentItem = ABOUT_MENU.find(item => item.id === aboutId)

  if (!currentItem && aboutId) {
    return <Navigate to={journalPath(journal.id, 'about', 'mission-and-scope')} replace />
  }

  const renderContent = () => {
    if (currentItem?.component) {
      const Component = currentItem.component
      return <Component />
    }

    return (
      <div className="prose prose-navy max-w-none">
        <h2>{currentItem?.label}</h2>
        <p>This is a placeholder for the {currentItem?.label} content for {journal.title}. In the future, this content will be loaded dynamically from a CMS.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to={journalPath(journal.id)} className="hover:text-primary-600 transition-colors">
              {journal.title}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-navy-950 font-medium">About</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary-700 font-semibold">{currentItem?.label}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-950 tracking-tight">
            About the Journal
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm sticky top-24">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3 px-3">Information</h3>
            <ul className="space-y-1">
              {ABOUT_MENU.map((item) => (
                <li key={item.id}>
                  <Link
                    to={journalPath(journal.id, 'about', item.id)}
                    className={cn(
                      'block px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      aboutId === item.id
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-navy-950'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm min-h-[500px]">
            {renderContent()}
          </div>
        </div>

      </div>
    </div>
  )
}
