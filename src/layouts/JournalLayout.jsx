import React, { useEffect, useState } from 'react'
import { Link, useParams, Outlet, useLocation } from 'react-router-dom'
import { Share2, ChevronRight, Activity, BarChart3, BookOpen } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { JournalNavbar } from '../components/common/JournalNavbar'
import { api } from '../api/apiClient'
import { journalPath } from '../utils/journalUtils'

export function JournalLayout() {
  const { journalId } = useParams()
  const location = useLocation()
  const [journal, setJournal] = useState(null)
  const [loading, setLoading] = useState(true)

  const isOverview = location.pathname === journalPath(journalId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const journalData = await api.journals.getById(journalId)
        setJournal(journalData)
      } catch (error) {
        console.error('Failed to fetch journal details', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [journalId])

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    )
  }

  if (!journal) {
    return <div className="text-center py-20 text-2xl font-bold text-navy-950">Journal not found</div>
  }

  return (
    <div className="flex flex-col bg-[#f8fafc] min-h-screen">
      <JournalNavbar journal={journal} />

      {isOverview ? (
        <section className="relative min-h-[400px] flex flex-col justify-center bg-navy-950 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={journal.backgroundImage || "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=2500"}
              className="w-full h-full object-cover opacity-50 mix-blend-overlay"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-900/40" />
          </div>
          
          <div className="relative z-10 w-full flex flex-col">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-12 mb-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-[1.1] drop-shadow-lg">{journal.title}</h1>
              {journal.society && (
                <p className="text-gray-300 text-lg md:text-xl font-medium max-w-2xl leading-relaxed drop-shadow">
                  Published in partnership with <span className="text-white font-bold">{journal.society}</span>.
                </p>
              )}
            </div>

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-8">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 md:gap-16 pl-2 md:pl-4">
                  {journal.impactFactor && (
                    <div className="group flex flex-col items-center md:items-start">
                      <div className="flex items-baseline gap-1.5">
                        <Activity className="w-5 h-5 text-primary-400 group-hover:text-primary-300 transition-colors" />
                        <span className="text-3xl font-black text-white tracking-tight">{journal.impactFactor}</span>
                      </div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Impact Factor</div>
                    </div>
                  )}
                  
                  {journal.impactFactor && journal.citeScore && (
                    <div className="hidden md:block w-px h-12 bg-white/10"></div>
                  )}
                  
                  {journal.citeScore && (
                    <div className="group flex flex-col items-center md:items-start">
                      <div className="flex items-baseline gap-1.5">
                        <BarChart3 className="w-5 h-5 text-primary-400 group-hover:text-primary-300 transition-colors" />
                        <span className="text-3xl font-black text-white tracking-tight">{journal.citeScore}</span>
                      </div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">CiteScore</div>
                    </div>
                  )}

                  <div className="hidden md:block w-px h-12 bg-white/10"></div>
                  
                  <div className="group flex flex-col items-center md:items-start hidden sm:flex">
                    <div className="flex items-baseline gap-1.5">
                      <BookOpen className="w-5 h-5 text-primary-400 group-hover:text-primary-300 transition-colors" />
                      <span className="text-3xl font-black text-white tracking-tight">{journal.stats?.articles?.toLocaleString() || "1,204"}</span>
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Articles</div>
                  </div>
                </div>

                <Link 
                  to={journalPath(journalId, 'submit')} 
                  className="w-full md:w-auto relative group overflow-hidden rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-bold px-8 py-4 flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(212,163,89,0.2)] hover:shadow-[0_0_30px_rgba(212,163,89,0.4)]"
                >
                  <span className="relative z-10 flex items-center gap-2 text-sm uppercase tracking-wide">
                    Submit Manuscript <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <Outlet context={{ journal }} />
    </div>
  )
}
