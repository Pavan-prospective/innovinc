import React, { useEffect, useState } from 'react'
import { useParams, Outlet } from 'react-router-dom'
import { Share2 } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { JournalNavbar } from '../components/common/JournalNavbar'
import { api } from '../api/apiClient'

export function JournalLayout() {
  const { journalId } = useParams()
  const [journal, setJournal] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const journalData = await api.journals.getById(journalId)
        setJournal(journalData)
      } catch (error) {
        console.error("Failed to fetch journal details", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [journalId])

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!journal) {
    return <div className="text-center py-20 text-2xl font-bold">Journal not found</div>
  }

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <JournalNavbar journal={journal} />
      
      {/* Journal Banner */}
      <section className="bg-navy-950 text-white pt-32 pb-16 relative overflow-hidden">
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          <img 
            src={journal.backgroundImage || 'https://images.unsplash.com/photo-1614935151651-0bea6508abb0?auto=format&fit=crop&q=80&w=2500'} 
            className="w-full h-full object-cover opacity-20" 
            alt="Journal Backdrop" 
          />
          <div className="absolute inset-0 bg-navy-950/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 to-transparent"></div>
        </div>

        {/* Glow effect */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-48 h-64 shrink-0 rounded-xl overflow-hidden border border-navy-800 shadow-2xl relative">
              <img src={journal.coverImage} alt={journal.title} className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tight leading-tight">{journal.title}</h1>
              
              <div className="flex flex-col sm:flex-row gap-x-6 gap-y-2 mb-6 text-sm text-gray-300">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-500 inline-block animate-pulse"></span>
                  <strong className="text-white">Editors:</strong> {journal.editors || 'Editorial Office'}
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-500 inline-block"></span>
                  <strong className="text-white">Lead Authors:</strong> Dr. A. Smith, Dr. B. Johnson
                </p>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-gray-300 mb-8 font-medium">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">ISSN:</span> {journal.issn}
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">Impact Factor:</span> <span className="text-primary-400 font-bold">{journal.impactFactor}</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">Latest Issue:</span> {journal.latestIssue}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="px-6 rounded-xl bg-primary-500 hover:bg-primary-600 text-navy-950 font-bold border-none transition-all shadow-md shadow-primary-500/20"
                >
                  Submit to Journal
                </Button>
                <Button variant="outline" className="px-6 rounded-xl text-white border-white/20 hover:bg-white hover:text-navy-950 transition-colors gap-2">
                  <Share2 className="w-4 h-4" /> Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-page content */}
      <Outlet context={{ journal }} />
    </div>
  )
}
