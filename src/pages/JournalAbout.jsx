import React from 'react'
import { useParams, Link, useOutletContext, Navigate } from 'react-router-dom'
import { ChevronRight, Info, Target, Users, BookOpen, Lock, ShieldCheck, Mail } from 'lucide-react'
import { journalPath } from '../utils/journalUtils'
import { cn } from '../utils/cn'
import { motion } from 'framer-motion'
import Editors from './Editors'

const ABOUT_MENU = [
  { id: 'mission-and-scope', label: 'Mission and scope', icon: <Target className="w-4 h-4" /> },
  { id: 'editorial-board', label: 'Editorial and Advisory Boards', component: Editors, icon: <Users className="w-4 h-4" /> },
  { id: 'journal-information', label: 'Journal information', icon: <Info className="w-4 h-4" /> },
  { id: 'open-access-statement', label: 'Open access statement', icon: <Lock className="w-4 h-4" /> },
  { id: 'copyright-statement', label: 'Copyright statement', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'editorial-quality-processes', label: 'Editorial & quality processes', icon: <ShieldCheck className="w-4 h-4" /> },
  { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
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
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="prose prose-navy max-w-none"
      >
        <h2 className="text-3xl font-black text-navy-950 mb-6">{currentItem?.label}</h2>
        
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-8 text-amber-800">
          <h4 className="flex items-center gap-2 font-bold text-amber-900 mb-2">
            <Info className="w-5 h-5" /> Content Coming Soon
          </h4>
          <p className="text-sm leading-relaxed">
            This is a placeholder for the <strong>{currentItem?.label}</strong> content for <em>{journal.title}</em>. 
            In the future, this highly specific journal information will be loaded dynamically from our headless CMS.
          </p>
        </div>
        
        <p className="text-gray-600 leading-relaxed text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="text-gray-600 leading-relaxed text-lg mt-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      
      {/* Premium Hero Section */}
      <section className="bg-navy-950 relative py-20 overflow-hidden border-b border-navy-900">
        <div className="absolute inset-0 select-none pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-400 mb-5">
              <Link to={journalPath(journal.id)} className="hover:text-primary-300 transition-colors">
                {journal.title}
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-600" />
              <span className="text-gray-400">About</span>
              <ChevronRight className="w-4 h-4 text-gray-600" />
              <span className="text-white">{currentItem?.label}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              About the Journal
            </h1>
            <p className="text-lg text-gray-400 font-light max-w-2xl">
              Learn about our scope, governance, publishing policies, and editorial guidelines.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden sticky top-24"
          >
            <div className="h-1.5 bg-gradient-to-r from-primary-500 to-primary-300"></div>
            <div className="p-6">
              <h3 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-4 px-2">Information Menu</h3>
              <ul className="space-y-1.5">
                {ABOUT_MENU.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={journalPath(journal.id, 'about', item.id)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all',
                        aboutId === item.id
                          ? 'bg-primary-50 text-primary-700 shadow-sm'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-navy-950'
                      )}
                    >
                      <span className={cn("shrink-0", aboutId === item.id ? "text-primary-600" : "text-gray-400")}>
                        {item.icon}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={cn(
              "bg-white rounded-3xl shadow-sm min-h-[500px]",
              currentItem?.component ? "bg-transparent shadow-none" : "border border-gray-100 p-8 md:p-12"
            )}
          >
            {renderContent()}
          </motion.div>
        </div>

      </div>
    </div>
  )
}
