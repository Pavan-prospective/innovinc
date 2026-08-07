import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronRight } from 'lucide-react'
import { Input } from '../components/ui/Input'
import { api } from '../api/apiClient'
import { ALPHABET, formatArticleDate, getFirstLetter } from '../utils/journalUtils'

export default function Journals() {
  const [journals, setJournals] = useState([])
  const [categories, setCategories] = useState([])
  const [popularArticles, setPopularArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeLetter, setActiveLetter] = useState('All')
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [journalsData, articlesData, categoriesData] = await Promise.all([
          api.journals.getAll(),
          api.articles.getMostViewed(),
          api.categories.getAll(),
        ])
        setJournals(journalsData)
        setPopularArticles(articlesData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Failed to fetch data', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    )
  }

  const filteredJournals = journals
    .filter((j) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.description?.toLowerCase().includes(q) ||
        j.category?.toLowerCase().includes(q) ||
        j.chiefEditor?.name?.toLowerCase().includes(q)
      const matchesLetter = activeLetter === 'All' || getFirstLetter(j.title) === activeLetter
      const matchesCategory = activeCategory === 'All' || j.category === activeCategory
      return matchesSearch && matchesLetter && matchesCategory
    })
    .sort((a, b) => a.title.localeCompare(b.title))

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">



      <section className="pt-8 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center w-full bg-white px-3 py-0.5 rounded-lg border border-gray-200 max-w-md shadow-sm">
            <Search className="text-gray-400 w-4 h-4 shrink-0" />
            <Input
              placeholder="Search journals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 bg-transparent border-none text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-0 focus-visible:ring-0 w-full text-sm ml-2 shadow-none px-0"
            />
          </div>
        </div>
      </section>

      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row gap-12">
        <div className="lg:w-[65%]">
          <h2 className="text-2xl font-bold text-navy-950 mb-6">
            {filteredJournals.length} journal{filteredJournals.length !== 1 ? 's' : ''}
          </h2>

          <div className="mb-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Browse by Domain</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory('All')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === 'All'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-navy-950'
                }`}
              >
                All Domains
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                    activeCategory === cat.name
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-navy-950'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">By first letter</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setActiveLetter('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeLetter === 'All'
                    ? 'bg-navy-950 text-primary-400'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-navy-950'
                }`}
              >
                All
              </button>
              {ALPHABET.map((letter) => {
                const hasJournals = journals.some((j) => getFirstLetter(j.title) === letter)
                return (
                  <button
                    key={letter}
                    type="button"
                    disabled={!hasJournals}
                    onClick={() => setActiveLetter(letter)}
                    className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                      activeLetter === letter
                        ? 'bg-primary-500 text-navy-950'
                        : hasJournals
                          ? 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300'
                          : 'bg-gray-50 text-gray-300 border border-gray-100 cursor-not-allowed'
                    }`}
                  >
                    {letter}
                  </button>
                )
              })}
              {activeLetter !== 'All' && (
                <button
                  type="button"
                  onClick={() => setActiveLetter('All')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-primary-700 hover:bg-primary-50 transition-colors"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {filteredJournals.map((journal) => (
              <article 
                key={journal.id} 
                className="flex flex-col sm:flex-row gap-6 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <Link to={`/journals/${journal.id}`} className="shrink-0 flex items-center justify-center sm:justify-start">
                  <div className="w-28 h-36 rounded-xl overflow-hidden bg-gray-50 border border-gray-200/60 shadow-sm relative">
                    <img
                      src={journal.coverImage}
                      alt={journal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <div className="flex flex-col flex-grow">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded uppercase tracking-wider">
                      {journal.category}
                    </span>
                  </div>
                  
                  <Link to={`/journals/${journal.id}`}>
                    <h3 className="text-xl font-bold text-navy-950 mb-2 hover:text-primary-600 transition-colors leading-snug">
                      {journal.title}
                    </h3>
                  </Link>
                  
                  <p className="text-xs text-gray-500 font-light leading-relaxed line-clamp-2 mb-4">
                    {journal.description}
                  </p>

                  {journal.chiefEditor && (
                    <div className="mb-4 text-xs">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Field chief editor</span>
                      <p className="text-gray-600 leading-snug">
                        <strong className="text-navy-950 font-semibold">{journal.chiefEditor.name}</strong> – <span className="text-gray-500">{journal.chiefEditor.affiliation}</span>
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2 mt-auto pt-4 border-t border-gray-50">
                    <span className="px-2.5 py-1 bg-navy-50 text-navy-900 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                      {journal.stats?.articles || 0} Articles
                    </span>
                    {journal.impactFactor && (
                      <span className="px-2.5 py-1 bg-primary-50 text-primary-800 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-primary-100">
                        {journal.impactFactor} IF
                      </span>
                    )}
                    {journal.citeScore && (
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                        {journal.citeScore} CiteScore
                      </span>
                    )}
                    
                    <Link
                      to={`/journals/${journal.id}`}
                      className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-primary-700 hover:text-primary-800 transition-colors"
                    >
                      More details <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}

            {filteredJournals.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
                <p className="text-gray-500 text-sm">No matches to your query could be found. Try another search term.</p>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setActiveLetter('All') }}
                  className="mt-4 text-sm font-semibold text-primary-700 hover:text-primary-800"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>

        <aside className="lg:w-[35%]">
          <h2 className="text-xl font-bold text-navy-950 mb-6">Most viewed</h2>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-44">
            {popularArticles.map((article, idx) => (
              <div key={article.id} className={idx !== popularArticles.length - 1 ? 'border-b border-gray-100 mb-6 pb-6' : ''}>
                <div className="mb-2">
                  <span className="text-[10px] font-bold text-primary-700 uppercase tracking-wider">{article.type}</span>
                  {formatArticleDate(article) && (
                    <span className="text-[10px] text-gray-400 block mt-0.5">{formatArticleDate(article)}</span>
                  )}
                </div>

                <Link to={`/articles/${article.id}`}>
                  <h3 className="text-sm font-semibold text-navy-950 leading-snug mb-2 hover:text-primary-700 transition-colors">
                    {article.title}
                  </h3>
                </Link>

                <p className="text-[11px] text-gray-500 leading-relaxed mb-2">{article.authors?.join(' · ')}</p>
                <Link to={`/journals/${article.journalId}`} className="text-[11px] text-gray-500 font-medium hover:text-primary-700 block mb-2">
                  {article.journalTitle}
                </Link>
                {article.views && (
                  <p className="text-[11px] font-bold text-navy-950">{article.views.toLocaleString()} views</p>
                )}
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  )
}
