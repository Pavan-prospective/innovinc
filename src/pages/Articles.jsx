import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronDown, FileText } from 'lucide-react'
import { api } from '../api/apiClient'
import { Button } from '../components/ui/Button'

export default function Articles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Most recent')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await api.articles.getAll()
        setArticles(data)
      } catch (error) {
        console.error("Failed to fetch articles:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  const filteredArticles = articles.filter(article => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      article.title.toLowerCase().includes(query) ||
      article.authors.some(a => a.toLowerCase().includes(query)) ||
      (article.tags && article.tags.some(t => t.toLowerCase().includes(query)))
    )
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  const filters = ["Domains", "Journals", "Sections", "Type", "Date", "Part of Research Topics"]
  const tabs = ["Most recent", "Most viewed", "Most cited"]

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Search Bar */}
        <div className="w-full bg-white border border-gray-200 shadow-sm rounded flex items-center mb-10">
          <FileText className="w-5 h-5 text-gray-400 ml-4 shrink-0" />
          <input 
            type="text" 
            placeholder="Enter a keyword or subject to search" 
            className="flex-grow h-14 px-4 text-gray-800 bg-transparent border-none focus:outline-none text-sm placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Count */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">
          {filteredArticles.length.toLocaleString()} articles
        </h1>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[13px] font-medium transition-colors border-b-2 ${
                activeTab === tab 
                  ? 'border-gray-800 text-gray-900' 
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {filters.map((filter) => (
            <button 
              key={filter}
              className="bg-white border border-gray-300 text-gray-600 px-4 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-2 hover:border-gray-400 hover:text-gray-800 transition-colors"
            >
              {filter}
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
          ))}
        </div>

        {/* Articles Grid (4 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArticles.map((article) => (
            <Link key={article.id} to={`/articles/${article.id}`} className="bg-white border border-gray-100 rounded-lg p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow flex flex-col h-full group">
              <div className="flex-grow">
                {/* Type and Date */}
                <div className="mb-4">
                  <div className="text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1">{article.type || 'ORIGINAL RESEARCH'}</div>
                  <div className="text-[11px] text-gray-400">Accepted on {new Date(article.publicationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-semibold text-gray-900 leading-snug mb-4 group-hover:text-primary-600 transition-colors">
                  {article.title}
                </h3>

                {/* Authors */}
                <p className="text-[11px] text-gray-400 leading-relaxed mb-6">
                  {article.authors.join(' · ')}
                </p>
              </div>

              {/* Bottom Section: Journal and Metrics */}
              <div className="mt-auto pt-4 flex flex-col gap-3">
                <div className="text-[12px] font-medium text-gray-600">{article.journalTitle}</div>
                <div className="flex items-center gap-4 text-[10px] text-gray-400 font-medium">
                  <span>{article.views?.toLocaleString()} views</span>
                  {article.impressions && <span>{article.impressions.toLocaleString()} impressions</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Load More (Optional/Dummy) */}
        <div className="flex justify-center mt-12">
           <Button variant="outline" className="border-gray-300 text-gray-600 rounded-full px-8 hover:bg-gray-50 h-10 text-sm">Load More</Button>
        </div>

      </div>
    </div>
  )
}
