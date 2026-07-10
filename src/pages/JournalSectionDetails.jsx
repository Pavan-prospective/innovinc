import React, { useEffect, useState } from 'react'
import { useParams, Link, useOutletContext } from 'react-router-dom'
import { ChevronRight, FileText, Filter } from 'lucide-react'
import { api } from '../api/apiClient'
import { formatArticleDate, journalPath } from '../utils/journalUtils'
import { Button } from '../components/ui/Button'
import { cn } from '../utils/cn'

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
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-navy-950 mb-4">Section not found</h2>
        <Link to={journalPath(journal.id)}>
          <Button variant="outline">Return to Journal</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Section Header */}
      <div className="bg-white border-b border-gray-200 py-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link to={journalPath(journal.id)} className="hover:text-primary-600 transition-colors">
                  {journal.title}
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-navy-950 font-medium">Sections</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-primary-700 font-semibold">{section.name}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-navy-950 mb-4 tracking-tight">
                {section.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Welcome to the {section.name} section of {journal.title}. This section focuses on publishing high-quality, peer-reviewed research advancing the field.
              </p>
            </div>
            
            <div className="flex-shrink-0 flex flex-col gap-3 min-w-[200px]">
              <Link to="/submit-article" className="w-full">
                <Button className="w-full shadow-md bg-primary-600 hover:bg-primary-700 text-white font-bold h-12">
                  Submit to this Section
                </Button>
              </Link>
              <Link to={journalPath(journal.id, 'about', 'manuscript-formatting')} className="w-full">
                <Button variant="outline" className="w-full h-12">
                  Author Guidelines
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-10">
          
          {/* Section Editors */}
          <section className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-navy-950 mb-6 border-b border-gray-100 pb-4">Section Editors</h2>
            {/* Using mock data for editors for now */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-lg">
                  {section.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-navy-950">Dr. Chief Editor</h3>
                  <p className="text-sm text-gray-500">Chief Specialty Editor</p>
                  <p className="text-xs text-gray-400 mt-1">University of Example, Location</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section Articles */}
          <section>
            <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-600" />
                Latest Articles
              </h2>
              <Button variant="outline" className="h-8 text-xs gap-2">
                <Filter className="w-3.5 h-3.5" /> Filter
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
              </div>
            ) : articles.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-navy-950 mb-2">No articles found</h3>
                <p className="text-gray-500">There are currently no articles published in this section.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map((article) => (
                  <article key={article.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-primary-300 hover:shadow-md transition-all group">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-primary-700 uppercase tracking-wider bg-primary-50 px-2.5 py-1 rounded-md">
                        {article.type}
                      </span>
                      {formatArticleDate(article) && (
                        <span className="text-xs text-gray-500 font-medium">{formatArticleDate(article)}</span>
                      )}
                    </div>
                    <Link to={`/articles/${article.id}`}>
                      <h3 className="font-bold text-navy-950 text-lg leading-snug mb-3 group-hover:text-primary-700 transition-colors">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{article.abstract}</p>
                    <p className="text-xs text-gray-500 mb-4 font-medium">{article.authors?.join(' · ')}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500 border-t border-gray-50 pt-4">
                      {article.views !== undefined && (
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          {article.views.toLocaleString()} views
                        </span>
                      )}
                      {article.downloads !== undefined && (
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          {article.downloads.toLocaleString()} downloads
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-bold text-navy-950 mb-4">About this Section</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Dedicated to accelerating the dissemination of high-impact research in {section.name}.
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to={journalPath(journal.id, 'about', 'mission-and-scope')} className="text-primary-600 hover:text-primary-800 font-medium flex items-center justify-between">
                  Mission & Scope <ChevronRight className="w-4 h-4" />
                </Link>
              </li>
              <li className="pt-3 border-t border-gray-100">
                <Link to={journalPath(journal.id, 'authors', 'article-types')} className="text-primary-600 hover:text-primary-800 font-medium flex items-center justify-between">
                  Article Types <ChevronRight className="w-4 h-4" />
                </Link>
              </li>
              <li className="pt-3 border-t border-gray-100">
                <Link to={journalPath(journal.id, 'about', 'editorial-board')} className="text-primary-600 hover:text-primary-800 font-medium flex items-center justify-between">
                  Full Editorial Board <ChevronRight className="w-4 h-4" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}
