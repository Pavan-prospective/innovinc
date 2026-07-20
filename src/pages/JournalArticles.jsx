import React, { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { Search, ChevronDown } from 'lucide-react'
import { api } from '../api/apiClient'
import { formatArticleDate } from '../utils/journalUtils'

export default function JournalArticles() {
  const { journal } = useOutletContext()
  const [articles, setArticles] = useState([])
  const [allArticles, setAllArticles] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Filters and Sorting
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSort, setActiveSort] = useState('Most recent')
  const [activeType, setActiveType] = useState('All')
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const [data, allData] = await Promise.all([
          api.articles.getByJournal(journal.id),
          api.articles.getAll()
        ])
        setArticles(data)
        // Show some articles from other journals (or all if we want, let's limit to 8 for neatness)
        setAllArticles(allData.filter(a => a.journalId !== journal.id).slice(0, 8))
      } catch (error) {
        console.error('Failed to fetch articles', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [journal.id])

  // Extract unique types for the filter
  const articleTypes = ['All', ...new Set(articles.map(a => a.type).filter(Boolean))]

  let filtered = articles.filter((article) => {
    const matchesType = activeType === 'All' || article.type === activeType
    
    let matchesSearch = true
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      matchesSearch = (
        article.title.toLowerCase().includes(q) ||
        article.authors.some((a) => a.toLowerCase().includes(q))
      )
    }

    return matchesType && matchesSearch
  })

  // Sorting
  if (activeSort === 'Most recent') {
    filtered.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate))
  } else if (activeSort === 'Most viewed') {
    filtered.sort((a, b) => (b.views || 0) - (a.views || 0))
  } else if (activeSort === 'Most cited') {
    filtered.sort((a, b) => (b.citations || 0) - (a.citations || 0))
  }

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20 font-sans text-navy-950">
      
      {/* Search Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="relative mb-8 w-full">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary-500 transition-all">
            <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0" />
            <input
              type="text"
              placeholder="Search in this journal"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-4 py-3 text-lg bg-transparent border-none focus:outline-none focus:ring-0 text-navy-950 placeholder-gray-400"
            />
          </div>
        </div>

        <h1 className="text-3xl font-normal mb-8 w-full">
          {filtered.length.toLocaleString()} articles
        </h1>

        {/* Sorting Tabs */}
        <div className="w-full border-b border-gray-200 mb-6 flex gap-6 overflow-x-auto hide-scrollbar">
          {['Most recent', 'Most viewed', 'Most cited'].map((sort) => (
            <button
              key={sort}
              onClick={() => setActiveSort(sort)}
              className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeSort === sort 
                  ? 'border-b-2 border-navy-950 text-navy-950' 
                  : 'text-gray-400 hover:text-navy-950'
              }`}
            >
              {sort}
            </button>
          ))}
        </div>

        {/* Filter Badges */}
        <div className="w-full flex flex-wrap gap-3 mb-10">
           <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-300 text-sm font-medium hover:border-gray-400 transition-colors bg-white">
                Type {activeType !== 'All' ? `: ${activeType}` : ''} <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>
              {/* Simple dropdown for type */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg py-2 hidden group-hover:block z-10">
                {articleTypes.map(type => (
                  <button 
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${activeType === type ? 'font-bold text-navy-950 bg-gray-50' : 'text-gray-700'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
           </div>
           
           <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-300 text-sm font-medium hover:border-gray-400 transition-colors bg-white">
              Date <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
           </button>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
           <div className="text-center py-2 text-gray-500 text-base">
             No articles match your criteria.
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((article) => (
              <Link 
                to={`/articles/${article.id}`} 
                key={article.id}
                className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100 flex flex-col h-full group"
              >
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-navy-950 uppercase tracking-wide">
                    {article.type || 'ORIGINAL RESEARCH'}
                  </span>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Published on {formatArticleDate(article) || 'Unknown date'}
                  </p>
                </div>
                
                <h2 className="text-[17px] font-semibold text-navy-950 leading-snug mb-4 group-hover:text-primary-700 transition-colors line-clamp-4">
                  {article.title}
                </h2>
                
                <p className="text-[13px] text-gray-500 mt-auto pt-4 border-t border-gray-50 leading-relaxed line-clamp-2">
                  {article.authors?.join(' · ')}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* All Articles / Other Journals */}
      {!loading && allArticles.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-navy-950">
              Explore Articles from Other Journals
            </h2>
            <Link to="/journals" className="text-sm font-bold text-primary-600 hover:text-primary-800">
              View all journals &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allArticles.map((article) => (
              <Link 
                to={`/articles/${article.id}`} 
                key={article.id}
                className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100 flex flex-col h-full group"
              >
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-navy-950 uppercase tracking-wide">
                    {article.type || 'ORIGINAL RESEARCH'}
                  </span>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Published on {formatArticleDate(article) || 'Unknown date'}
                  </p>
                </div>
                
                <h3 className="text-[15px] font-bold text-navy-950 leading-snug mb-4 group-hover:text-primary-700 transition-colors line-clamp-3">
                  {article.title}
                </h3>
                
                <p className="text-[12px] text-gray-500 mt-auto pt-4 border-t border-gray-50 leading-relaxed line-clamp-2">
                  {article.authors?.join(' · ')}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
