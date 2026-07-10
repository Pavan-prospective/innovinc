import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronDown, MoreVertical } from 'lucide-react'
import { Input } from '../components/ui/Input'
import { api } from '../api/apiClient'

export default function Journals() {
  const [journals, setJournals] = useState([])
  const [categories, setCategories] = useState([])
  const [popularArticles, setPopularArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [journalsData, categoriesData, articlesData] = await Promise.all([
          api.journals.getAll(),
          api.categories.getAll(),
          api.articles.getTrending()
        ])
        setJournals(journalsData)
        setCategories(categoriesData)
        setPopularArticles(articlesData)
      } catch (error) {
        console.error("Failed to fetch data", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  const filteredJournals = journals.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (j.category && j.category.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = activeCategory === 'All' || j.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      
      {/* Clean Search Header */}
      <section className="bg-white border-b border-gray-200 pt-28 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center w-full bg-white p-2 rounded-xl border border-gray-200 shadow-sm max-w-4xl">
            <Search className="text-gray-400 w-5 h-5 ml-2 shrink-0" />
            <Input 
              placeholder="Enter a keyword or subject to search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 bg-transparent border-none text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-0 focus-visible:ring-0 w-full text-base ml-2 shadow-none"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row gap-16">
        
        {/* Journal List (Left Side) */}
        <div className="lg:w-[65%]">
          
          <h1 className="text-3xl font-medium text-gray-900 mb-8">{filteredJournals.length} journals</h1>

          {/* Categories Tab */}
          <div className="flex items-center gap-6 border-b border-gray-200 mb-6 pb-2 overflow-x-auto">
            <button 
              onClick={() => setActiveCategory('All')} 
              className={`text-[15px] pb-2 border-b-2 transition-colors whitespace-nowrap ${activeCategory === 'All' ? 'border-gray-900 text-gray-900 font-medium' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
            >
              All
            </button>
            {categories.slice(0, 4).map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)} 
                className={`text-[15px] pb-2 border-b-2 transition-colors whitespace-nowrap ${activeCategory === cat.name ? 'border-gray-900 text-gray-900 font-medium' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
              >
                {cat.name}
              </button>
            ))}
            <button className="text-[15px] pb-2 border-b-2 border-transparent text-gray-500 hover:text-gray-900 transition-colors whitespace-nowrap flex items-center gap-1">
              More <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Dropdown */}
          <div className="mb-10">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              By first letter <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Journal List */}
          <div className="space-y-12">
            {filteredJournals.map((journal) => (
              <div key={journal.id} className="flex flex-col sm:flex-row gap-6 group">
                <Link to={`/journals/${journal.id}`} className="shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-md overflow-hidden bg-gray-100 shadow-sm border border-gray-200">
                    <img src={journal.coverImage} alt={journal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </Link>
                <div className="flex flex-col pt-1">
                  <Link to={`/journals/${journal.id}`}>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">{journal.title}</h2>
                  </Link>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-2xl">{journal.description}</p>
                  
                  {journal.chiefEditor && (
                    <div className="mb-4">
                      <p className="text-xs font-bold text-gray-900 mb-0.5">Field chief editor</p>
                      <p className="text-xs text-gray-500">
                        <strong className="text-gray-800">{journal.chiefEditor.name}</strong>, {journal.chiefEditor.affiliation}
                      </p>
                    </div>
                  )}

                  {journal.stats && (
                    <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-auto font-medium">
                      <span>{journal.stats.sections} sections</span>
                      <span className="text-gray-300">|</span>
                      <span>{journal.stats.articles} articles</span>
                      <span className="text-gray-300">|</span>
                      <span>{journal.stats.views.toLocaleString()} article views</span>
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <Link to={`/journals/${journal.id}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-full transition-colors">
                      More details
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredJournals.length === 0 && (
              <div className="text-gray-500">No journals found.</div>
            )}
          </div>
        </div>

        {/* Sidebar (Right Side) */}
        <div className="lg:w-[35%] lg:pl-10">
          <h2 className="text-2xl font-medium text-gray-900 mb-8">Most viewed</h2>
          
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
            {popularArticles.map((article, idx) => (
              <div key={article.id} className={`${idx !== popularArticles.length - 1 ? 'border-b border-gray-100 mb-6 pb-6' : ''}`}>
                <div className="mb-3">
                  <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider block mb-1">{article.type}</span>
                  {article.history?.accepted && (
                     <span className="text-[10px] text-gray-500 block mb-1">Accepted on {article.history.accepted}</span>
                  )}
                </div>
                
                <h3 className="text-[15px] font-semibold text-gray-900 leading-snug mb-3 cursor-pointer hover:text-primary-600 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                  {article.authors?.join(' · ')}
                </p>
                
                <p className="text-[11px] text-gray-500 font-medium mb-4">
                  {article.journalTitle}
                </p>
                
                {article.views && (
                  <p className="text-[11px] font-bold text-gray-900">
                    {article.views.toLocaleString()} views
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  )
}
