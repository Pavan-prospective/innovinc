import React, { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Download, Quote, BookOpen, Users, Eye, BarChart3, Search } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { api } from '../api/apiClient'

export default function JournalDetails() {
  const { journal } = useOutletContext()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const allArticles = await api.articles.getAll()
        setArticles(allArticles.filter(a => a.journalId === journal.id))
      } catch (error) {
        console.error("Failed to fetch articles", error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [journal.id])

  const filteredArticles = articles.filter(article => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      article.title.toLowerCase().includes(query) ||
      article.authors.some(a => a.toLowerCase().includes(query)) ||
      (article.tags && article.tags.some(t => t.toLowerCase().includes(query)))
    )
  })

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row gap-8">
      
      {/* Left Column (Content) */}
      <div className="lg:w-2/3 space-y-12">
        
        {/* Aims & Scope */}
        <div>
          <h2 className="text-2xl font-bold text-navy-950 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary-600" /> Aims & Scope
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-[0_4px_25px_-4px_rgba(0,0,0,0.02)] border border-gray-100 text-gray-700 space-y-4">
            <p className="leading-relaxed text-sm">
              {journal.description}
            </p>
            <p className="leading-relaxed text-xs text-gray-500">
              The publication serves as a key international forum, bridging theoretical molecular discoveries and clinical, patient-centered applications. It welcomes high-impact submissions, reviews, and clinical trial studies that contribute to the fundamental understanding of this domain. All materials are published open access, ensuring maximum accessibility to the global scientific community.
            </p>
            
            <div className="border-t border-gray-100 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <h4 className="font-bold text-navy-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-600"></span> Author Guidelines
                </h4>
                <p className="text-gray-500 leading-relaxed text-[11px]">
                  Authors are expected to submit original research detailing sound methodologies and transparent datasets. All publications must comply with COPE ethics and global licensing policies.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-navy-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-600"></span> Editorial Mandate
                </h4>
                <p className="text-gray-500 leading-relaxed text-[11px]">
                  Our international board coordinates rigorous double-blind evaluations. Editors hold objective screening criteria to ensure reproducibility, clinical safety, and academic integrity.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Articles with Search Filter */}
        <div id="articles-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-bold text-navy-950 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary-600" /> Latest Articles
            </h2>
            
            {/* Clean search bar */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
              <input
                type="text"
                placeholder="Search articles in this journal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center p-8">
                 <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-gray-500 bg-white p-6 rounded-xl border border-gray-100">No recent articles found for this journal.</div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-gray-500 bg-white p-6 rounded-xl border border-gray-100">
                No articles match your search criteria "{searchQuery}".
              </div>
            ) : (
              filteredArticles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Card className="hover:border-primary-300/70 transition-all duration-300 bg-white shadow-[0_4px_20px_-4px_rgba(15,23,42,0.03)] border-gray-100 overflow-hidden relative">
                    <CardHeader className="pb-3 p-6">
                      <Link to={`/articles/${article.id}`}>
                        <CardTitle className="text-xl font-bold text-navy-950 hover:text-primary-600 transition-colors mb-2 leading-snug">
                          {article.title}
                        </CardTitle>
                      </Link>
                      <div className="flex gap-2 text-xs font-semibold mb-3 flex-wrap">
                        {article.authors.map(author => (
                           <span key={author} className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded border border-primary-100">{author}</span>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 mb-4 space-y-2">
                         <p><strong className="text-navy-900">Abstract:</strong> {article.abstract || 'This article discusses the recent advancements in clinical oncology and novel therapeutics. Detailed abstract content is available in the full text.'}</p>
                         <p><strong className="text-navy-900">Conclusion:</strong> {article.conclusion || 'The findings present significant clinical implications for future trials and standard of care.'}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 font-medium">
                        <div>Published: {new Date(article.publicationDate).toLocaleDateString()}</div>
                        {article.doi && (
                          <>
                            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                            <div>DOI: <span className="text-navy-900 font-semibold">{article.doi}</span></div>
                          </>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 p-6 flex flex-wrap justify-between items-center gap-y-3">
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map(tag => (
                          <Badge key={tag} className="bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100 transition-colors font-medium text-xs px-2.5 py-1 shadow-none">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-50 text-[11px] font-bold text-navy-900 border border-gray-100">
                          <Eye className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          {article.views?.toLocaleString() || '0'} <span className="text-gray-400 font-normal">views</span>
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-50 text-[11px] font-bold text-navy-900 border border-gray-100">
                          <BarChart3 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          {article.impressions?.toLocaleString() || '0'} <span className="text-gray-400 font-normal">impressions</span>
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Right Column (Sidebar) */}
      <div className="lg:w-1/3 space-y-6">
        
        <Card className="overflow-hidden border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.04)] bg-white rounded-2xl">
          <div className="h-1.5 bg-gradient-to-r from-primary-500 to-amber-400"></div>
          <CardHeader className="pb-3 p-6">
            <CardTitle className="text-base font-bold text-navy-950 flex items-center gap-2">
              About the publication
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-4 text-xs">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-medium">Published:</span>
              <span className="font-semibold text-navy-950">{journal.publishedYear || '2024'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-medium">Imprint:</span>
              <span className="font-semibold text-navy-950">{journal.imprint || 'InnovInc Press'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-medium">Language:</span>
              <span className="font-semibold text-navy-950">{journal.language || 'English'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-medium">ISBN / ISSN:</span>
              <span className="font-semibold text-navy-950">{journal.isbn || journal.issn}</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-gray-500 font-medium">DOI:</span>
              <span className="font-semibold text-primary-600 truncate max-w-[160px] cursor-pointer" title={journal.doi}>{journal.doi || `10.1016/innovinc.${journal.id}`}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-600" /> Editorial Board
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">JD</div>
                <div>
                  <div className="font-medium text-sm">Dr. Jane Doe</div>
                  <div className="text-xs text-gray-500">Editor-in-Chief</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">JS</div>
                <div>
                  <div className="font-medium text-sm">Prof. John Smith</div>
                  <div className="text-xs text-gray-500">Associate Editor</div>
                </div>
              </div>
              <Link to={`/journals/${journal.id}/editorial-board`} className="block w-full">
                <Button variant="link" className="px-0 pt-2 w-full justify-start text-primary-600">View full editorial board &rarr;</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Download className="w-5 h-5 text-primary-600" /> Downloads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li><Link to={`/journals/${journal.id}/authors/author-guidelines`} className="text-primary-600 hover:underline">Author Guidelines (PDF)</Link></li>
              <li><a href="#" className="text-primary-600 hover:underline">Manuscript Template (Word)</a></li>
              <li><Link to={`/journals/${journal.id}/authors/editor-guidelines`} className="text-primary-600 hover:underline">Reviewer Guidelines (PDF)</Link></li>
            </ul>
          </CardContent>
        </Card>
        
      </div>
    </div>
  )
}
