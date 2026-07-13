import React, { useEffect, useState } from 'react'
import { useParams, Link, useOutletContext } from 'react-router-dom'
import { ChevronRight, FileText, Filter, BookOpen, Target, Activity, Users, ArrowRight, Eye, Download } from 'lucide-react'
import { api } from '../api/apiClient'
import { formatArticleDate, journalPath } from '../utils/journalUtils'
import { Button } from '../components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '../components/ui/Badge'

export default function JournalSectionDetails() {
  const { journalId, sectionId } = useParams()
  const { journal } = useOutletContext()
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  const section = journal?.sections?.find(s => s.slug === sectionId)

  useEffect(() => {
    if (!journalId || !sectionId) return

    const fetchSectionArticles = async () => {
      try {
        const data = await api.articles.getByJournalAndSection(journalId, sectionId)
        setArticles(data)
      } catch (error) {
        console.error('Failed to fetch section articles', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSectionArticles()
  }, [journalId, sectionId])

  if (!section) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <FileText className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-3xl font-black text-navy-950 mb-4 tracking-tight">Section not found</h2>
        <p className="text-gray-500 mb-8 max-w-md">We couldn't find the section you were looking for. It might have been moved or doesn't exist.</p>
        <Link to={journalPath(journal.id)}>
          <Button className="shadow-lg hover:shadow-xl transition-all">Return to Journal</Button>
        </Link>
      </div>
    )
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      
      {/* Premium Hero Section */}
      <section className="bg-navy-950 relative py-24 overflow-hidden border-b border-navy-900">
        <div className="absolute inset-0 select-none pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=2500" 
            className="w-full h-full object-cover opacity-[0.15] mix-blend-overlay" 
            alt="Abstract scientific background" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-400 mb-6">
                <Link to={journalPath(journal.id)} className="hover:text-primary-300 transition-colors">
                  {journal.title}
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-600" />
                <span className="text-gray-400">Sections</span>
                <ChevronRight className="w-4 h-4 text-gray-600" />
                <span className="text-white">{section.name}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                {section.name}
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed font-light max-w-2xl">
                Advancing the frontiers of {section.name.toLowerCase()} through rigorous, peer-reviewed open access research and clinical breakthroughs.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col gap-4 min-w-[240px]"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-3xl font-black text-white mb-1">
                  {loading ? '-' : articles.length}
                </div>
                <div className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-5">Published Articles</div>
                
                <Link to="/dashboard/submit" className="w-full block mb-3">
                  <Button className="w-full bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-900/50 h-12 text-sm font-bold border-none transition-all hover:scale-[1.02]">
                    Submit Manuscript
                  </Button>
                </Link>
                <Link to={journalPath(journal.id, 'about', 'manuscript-formatting')} className="w-full block">
                  <Button variant="outline" className="w-full h-10 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white text-xs font-semibold">
                    View Guidelines
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Sidebar - Explanation & Bento Box UI */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="sticky top-24 space-y-6"
          >
            {/* About Box */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary-500 to-primary-300"></div>
              <div className="p-8">
                <h3 className="font-black text-navy-950 text-xl mb-4 flex items-center gap-3">
                  <Target className="w-6 h-6 text-primary-500" />
                  Section Scope
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  This specialized section is dedicated to rapid publication of high-impact research. We welcome original articles, comprehensive reviews, and short communications that significantly advance the field.
                </p>
                <ul className="space-y-4 border-t border-gray-100 pt-6">
                  <li>
                    <Link to={journalPath(journal.id, 'about', 'mission-and-scope')} className="group flex items-center justify-between text-sm font-semibold text-navy-900 hover:text-primary-600 transition-colors">
                      <span className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                          <BookOpen className="w-4 h-4 text-gray-500 group-hover:text-primary-500" />
                        </div>
                        Detailed Aims & Scope
                      </span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link to={journalPath(journal.id, 'about', 'editorial-board')} className="group flex items-center justify-between text-sm font-semibold text-navy-900 hover:text-primary-600 transition-colors">
                      <span className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                          <Users className="w-4 h-4 text-gray-500 group-hover:text-primary-500" />
                        </div>
                        Full Editorial Board
                      </span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Stats/Info Box */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                <Activity className="w-6 h-6 text-primary-500 mb-3" />
                <div className="text-2xl font-black text-navy-950 mb-1">14 Days</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Avg. Time to First Decision</div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-navy-950 to-navy-900 text-white">
                <FileText className="w-6 h-6 text-primary-400 mb-3" />
                <div className="text-2xl font-black mb-1">Open</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Access Model</div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Main Content Area - Articles */}
        <div className="lg:col-span-8 space-y-10">
          
          <section>
            <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-black text-navy-950 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-600" />
                </div>
                Latest Publications
              </h2>
              <Button variant="outline" className="h-9 px-4 text-sm font-semibold gap-2 border-gray-200 text-gray-700 hover:bg-gray-50">
                <Filter className="w-4 h-4" /> Filter
              </Button>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin" />
                <p className="text-sm font-medium text-gray-500 animate-pulse">Loading articles...</p>
              </div>
            ) : articles.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-sm"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <FileText className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-black text-navy-950 mb-2">No articles found</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">There are currently no articles published in this specific section. Be the first to submit!</p>
                <Link to="/dashboard/submit">
                  <Button className="shadow-sm">Submit to {section.name}</Button>
                </Link>
              </motion.div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-5"
              >
                {articles.map((article) => (
                  <motion.article 
                    variants={itemVariants}
                    key={article.id} 
                    className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 hover:border-primary-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Decorative side accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-[10px] font-black text-primary-700 uppercase tracking-widest bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-100/50">
                        {article.type}
                      </span>
                      {formatArticleDate(article) && (
                        <span className="text-xs text-gray-500 font-semibold flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                          {formatArticleDate(article)}
                        </span>
                      )}
                    </div>
                    
                    <Link to={`/articles/${article.id}`}>
                      <h3 className="font-black text-navy-950 text-xl sm:text-2xl leading-tight mb-4 group-hover:text-primary-700 transition-colors pr-8">
                        {article.title}
                      </h3>
                    </Link>
                    
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed line-clamp-3">
                      {article.abstract}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gray-50">
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex -space-x-2">
                          {[1,2,3].slice(0, Math.min(3, article.authors?.length || 1)).map((_, i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500">
                              {article.authors?.[i]?.charAt(0) || 'A'}
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 font-semibold max-w-[200px] truncate">
                          {article.authors?.join(', ')}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                        {article.views !== undefined && (
                          <span className="flex items-center gap-1.5 group-hover:text-navy-900 transition-colors">
                            <Eye className="w-4 h-4" />
                            {article.views.toLocaleString()}
                          </span>
                        )}
                        {article.downloads !== undefined && (
                          <span className="flex items-center gap-1.5 group-hover:text-navy-900 transition-colors">
                            <Download className="w-4 h-4" />
                            {article.downloads.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </section>

        </div>
      </div>
    </div>
  )
}
