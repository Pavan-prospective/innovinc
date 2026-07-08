import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Download, Share2, Bookmark, Eye, Quote, FileText, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card, CardContent } from '../components/ui/Card'
import { api } from '../api/apiClient'

export default function ArticleDetails() {
  const { articleId } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showDatesInfo, setShowDatesInfo] = useState(false)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await api.articles.getById(articleId)
        setArticle(data)
      } catch (error) {
        console.error("Failed to fetch article", error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [articleId])

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!article) {
    return <div className="text-center py-20 text-2xl font-bold">Article not found</div>
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Breadcrumb & Header */}
      <div className="bg-white border-b border-gray-200 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/journals/${article.journalId}`} className="hover:text-primary-600">{article.journalTitle}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 truncate">Article</span>
          </nav>
 
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-none">Open Access</Badge>
            <Badge variant="outline">Research Article</Badge>
          </div>
 
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-950 leading-tight mb-6">
            {article.title}
          </h1>
 
          {/* Authors with superscript affiliations */}
          <div className="mb-6">
            <div className="text-navy-950 font-semibold text-lg flex flex-wrap items-baseline gap-x-2 gap-y-1">
              {article.authorAffiliations ? (
                article.authorAffiliations.map((author, index) => (
                  <span key={author.name} className="inline-block">
                    {author.name}
                    <sup className="text-[10px] text-primary-600 font-bold ml-0.5">
                      {author.indices.join(', ')}
                    </sup>
                    {index < article.authorAffiliations.length - 1 && <span className="text-gray-400">,</span>}
                  </span>
                ))
              ) : (
                <span>{article.authors.join(', ')}</span>
              )}
            </div>
            
            {/* Numbered Affiliations directory */}
            {article.affiliationsList && (
              <div className="mt-4 space-y-1.5 text-xs text-gray-500 border-l-2 border-primary-500/20 pl-4 py-1">
                {article.affiliationsList.map(aff => (
                  <div key={aff.index} className="flex gap-2 items-start leading-relaxed">
                    <span className="font-bold text-primary-700 w-3.5 shrink-0 text-[10px] mt-0.5">{aff.index}</span>
                    <span>{aff.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
 
          {/* Publishing timeline history with dates info link */}
          <div className="text-xs text-gray-500 py-3 border-t border-gray-100">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <span>Received: <strong className="text-navy-900">{article.history?.received || new Date(article.publicationDate).toLocaleDateString()}</strong></span>
              <span className="hidden sm:inline text-gray-300">|</span>
              <span>Revised: <strong className="text-navy-900">{article.history?.revised || new Date(article.publicationDate).toLocaleDateString()}</strong></span>
              <span className="hidden sm:inline text-gray-300">|</span>
              <span>Accepted: <strong className="text-navy-900">{article.history?.accepted || new Date(article.publicationDate).toLocaleDateString()}</strong></span>
              <span className="hidden sm:inline text-gray-300">|</span>
              <span>Available online: <strong className="text-navy-900">{article.history?.online || new Date(article.publicationDate).toLocaleDateString()}</strong></span>
              
              <button 
                onClick={() => setShowDatesInfo(!showDatesInfo)}
                className="text-primary-600 hover:text-primary-700 font-bold focus:outline-none underline ml-auto text-[11px]"
              >
                {showDatesInfo ? 'Show less' : 'What do these dates mean?'}
              </button>
            </div>
 
            {/* Slide explanation panel for history dates */}
            {showDatesInfo && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200/50 space-y-2 text-[11px] text-gray-600 leading-relaxed shadow-inner"
              >
                <p><strong>Received:</strong> Date of initial manuscript submission to the editorial office for review.</p>
                <p><strong>Revised:</strong> Date when updated manuscript files incorporating peer reviewer modifications were re-submitted.</p>
                <p><strong>Accepted:</strong> Date when final peer validation completed and editor-in-chief approved publication.</p>
                <p><strong>Available online:</strong> Date when peer-validated formatting completed and full text went live on our portal.</p>
              </motion.div>
            )}
          </div>
 
          {/* Action Bar with Mendeley and Share */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-b border-gray-100">
            <div className="flex flex-wrap gap-3">
              <Button className="gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs py-2 px-5">
                <Download className="w-4 h-4" /> Download PDF
              </Button>
              <Button 
                onClick={() => window.open('https://www.mendeley.com/import', '_blank')}
                className="gap-2 bg-[#e65c00] hover:bg-[#cc5200] text-white rounded-xl text-xs py-2 px-5 border-none"
              >
                Add to Mendeley
              </Button>
              <Button variant="outline" className="gap-2 rounded-xl text-xs py-2 px-5">
                <Quote className="w-4 h-4" /> Cite
              </Button>
            </div>
            <div className="flex gap-2 text-gray-500">
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100" title="Share" onClick={() => navigator.clipboard.writeText(window.location.href)}><Share2 className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100" title="Save"><Bookmark className="w-5 h-5" /></Button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Article Content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* Left Sidebar (Sticky TOC / Metrics) */}
        <div className="hidden lg:block lg:w-1/4">
          <div className="sticky top-28 space-y-6">
            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold text-navy-900 mb-4 uppercase tracking-wider text-xs">Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2"><Eye className="w-4 h-4"/> Views</span>
                    <span className="font-medium">{article.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2"><Download className="w-4 h-4"/> Downloads</span>
                    <span className="font-medium">{article.downloads.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold text-navy-900 mb-4 uppercase tracking-wider text-xs">Article Navigation</h3>
                <nav className="space-y-3 text-sm text-gray-600 font-medium">
                  <a href="#abstract" className="block hover:text-primary-600 transition-colors">Abstract</a>
                  <a href="#introduction" className="block hover:text-primary-600 transition-colors">1. Introduction</a>
                  <a href="#methods" className="block hover:text-primary-600 transition-colors">2. Methods</a>
                  <a href="#results" className="block hover:text-primary-600 transition-colors">3. Results</a>
                  <a href="#conclusion" className="block hover:text-primary-600 transition-colors">Conclusion</a>
                  <a href="#references" className="block hover:text-primary-600 transition-colors">References</a>
                </nav>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Article Body */}
        <div className="lg:w-2/3 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          
          <section id="abstract" className="mb-12">
            <h2 className="text-2xl font-bold text-navy-900 mb-4 pb-2 border-b border-gray-100">Abstract</h2>
            <p className="text-gray-700 leading-relaxed text-base mb-6">
              {article.abstract}
            </p>
            <div className="flex gap-2 items-center flex-wrap">
              <span className="font-semibold text-xs text-navy-950 uppercase tracking-wider">Keywords:</span>
              {article.tags.map(tag => (
                <span key={tag} className="text-xs text-primary-700 bg-primary-50 px-2.5 py-1 rounded-md font-medium">{tag}</span>
              ))}
            </div>
          </section>

          <section id="introduction" className="mb-10">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </section>

          <section id="methods" className="mb-10">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">2. Methods</h2>
             <p className="text-gray-700 leading-relaxed">
               Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
             </p>
          </section>

          <section id="results" className="mb-10">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">3. Results</h2>
             <p className="text-gray-700 leading-relaxed">
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
             </p>
          </section>

          <section id="conclusion" className="mb-10 border-t border-gray-100 pt-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">Conclusion</h2>
            <p className="text-gray-700 leading-relaxed">
              {article.conclusion || 'In conclusion, the clinical datasets demonstrate strong alignment with theoretical models. Future research directions will evaluate scalability, reproducibility, and long-term implications of these diagnostic protocols.'}
            </p>
          </section>

          <section id="references" className="mb-6 border-t border-gray-100 pt-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">
              References ({article.referencesCount || 39})
            </h2>
            <div className="space-y-4 text-xs">
              {article.references ? (
                article.references.map(ref => (
                  <div key={ref.id} className="flex gap-3 items-start pb-4 border-b border-gray-50 last:border-none">
                    <span className="font-bold text-primary-700 w-8 shrink-0 text-center bg-gray-50 border border-gray-100 py-1 rounded">[{ref.id}]</span>
                    <div className="space-y-1">
                      <p className="text-gray-700 leading-relaxed">{ref.citation}</p>
                      <Link to={ref.link} className="inline-flex items-center gap-1 text-[11px] font-bold text-primary-600 hover:text-primary-750 transition-colors">
                        View Journal Directory &rarr;
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-3">
                  <p className="text-gray-500 leading-relaxed">Standard academic references list is currently archived.</p>
                </div>
              )}
            </div>
          </section>
        </div>

      </div>
    </div>
  )
}

