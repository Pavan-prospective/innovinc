import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight, Tag, X, BookOpen, ExternalLink } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { JOURNALS } from '../utils/data'

export default function News() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedNews, setSelectedNews] = useState(null)
  const [visibleCount, setVisibleCount] = useState(6)

  // Dynamically compile all news items from all journals
  const allNews = JOURNALS.reduce((acc, journal) => {
    if (journal.news) {
      const journalNews = journal.news.map((item, idx) => ({
        id: `${journal.id}-news-${idx}`,
        title: item.title,
        summary: item.summary,
        image: item.image,
        category: journal.category || 'General Science',
        journalId: journal.id,
        journalTitle: journal.title,
        date: item.date || '13 Aug 2026'
      }))
      return [...acc, ...journalNews]
    }
    return acc
  }, [])

  // Dynamically compile unique categories
  const categories = ['All', ...new Set(allNews.map(news => news.category).filter(Boolean))]

  // Filter news
  const filteredNews = activeCategory === 'All' 
    ? allNews 
    : allNews.filter(news => news.category === activeCategory)

  const displayedNews = filteredNews.slice(0, visibleCount)

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative bg-navy-950 py-24 overflow-hidden border-b border-white/10">
        <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-50%] right-[-20%] w-[800px] h-[800px] bg-accent-600/10 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-500">News</span> & Insights
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Stay updated with the latest breakthroughs, research highlights, and announcements from all Scientra Journals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-400 hover:text-navy-900 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedNews.map((news, idx) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.5) }}
            >
              <button 
                onClick={() => setSelectedNews(news)}
                className="group block text-left w-full h-full"
              >
                <div className="bg-white rounded-2xl border border-gray-200/50 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.03)] hover:shadow-xl hover:border-primary-400/50 transition-all duration-300 flex flex-col h-full overflow-hidden">
                  
                  {/* Image */}
                  <div className="h-52 overflow-hidden relative shrink-0 bg-gray-100">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold text-navy-900 uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                      <Tag className="w-3 h-3 text-primary-600" /> {news.category}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold mb-3">
                      <Calendar className="w-3.5 h-3.5" /> {news.date}
                    </div>
                    
                    <h3 className="font-bold text-navy-950 text-lg leading-snug mb-3 group-hover:text-primary-600 transition-colors line-clamp-3">
                      {news.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-grow">
                      {news.summary}
                    </p>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-sm font-bold text-primary-600 group-hover:text-primary-700">
                      Read Article <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredNews.length && (
          <div className="flex justify-center mt-12">
            <Button 
              onClick={() => setVisibleCount(prev => prev + 6)} 
              variant="outline" 
              className="rounded-full px-8 border-gray-300 text-gray-600 hover:bg-gray-50 h-9 text-sm font-bold shadow-sm hover:border-primary-500 hover:text-primary-600 transition-colors"
            >
              Load more news
            </Button>
          </div>
        )}
        
        {filteredNews.length === 0 && (
          <div className="text-center py-20 bg-white border border-gray-200/60 rounded-2xl max-w-md mx-auto">
            <h3 className="text-lg font-bold text-gray-500">No news articles found in this category.</h3>
          </div>
        )}

      </section>

      {/* --- News Details Modal --- */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 bg-navy-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[85vh] overflow-y-auto relative shadow-2xl border border-gray-200/50 flex flex-col"
            >
              {/* Top Banner Image */}
              <div className="h-64 md:h-72 w-full overflow-hidden relative shrink-0 bg-gray-100">
                <img 
                  src={selectedNews.image} 
                  alt={selectedNews.title} 
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-navy-950 hover:text-primary-600 p-2 rounded-full shadow-md transition-all hover:scale-105 border border-gray-100 shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 bg-navy-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-xs font-bold text-primary-400 uppercase tracking-widest flex items-center gap-1.5 shadow-sm border border-white/10">
                  <Tag className="w-3.5 h-3.5" /> {selectedNews.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 flex-1">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold mb-4">
                  <Calendar className="w-3.5 h-3.5" /> {selectedNews.date}
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-navy-950 leading-snug mb-5">
                  {selectedNews.title}
                </h2>

                {/* Journal Attribution Badge */}
                <div className="mb-6 p-4 bg-navy-50 rounded-2xl border border-navy-100/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-primary-600 shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Source Journal</div>
                      <div className="text-sm font-semibold text-navy-950 leading-snug">{selectedNews.journalTitle}</div>
                    </div>
                  </div>
                  <Link 
                    to={`/journals/${selectedNews.journalId}`}
                    onClick={() => setSelectedNews(null)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-navy-200/80 text-xs font-bold text-navy-950 hover:bg-navy-50 transition-colors shadow-sm shrink-0"
                  >
                    View Journal <ExternalLink className="w-3.5 h-3.5 text-primary-600" />
                  </Link>
                </div>

                <div className="text-gray-700 leading-relaxed text-sm md:text-base font-light space-y-4 whitespace-pre-wrap">
                  {selectedNews.summary}
                </div>
              </div>

              {/* Footer close button */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
                <Button 
                  onClick={() => setSelectedNews(null)} 
                  variant="outline" 
                  className="rounded-xl px-5 border-gray-300 text-gray-600 hover:bg-gray-100 h-9 text-xs"
                >
                  Close
                </Button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
