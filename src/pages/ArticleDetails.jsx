import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Download, Share2, Bookmark, Eye, Quote, FileText, ChevronRight } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card, CardContent } from '../components/ui/Card'
import { api } from '../api/apiClient'

export default function ArticleDetails() {
  const { articleId } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

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

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-sm mb-8">
            <div className="text-primary-700 font-medium text-lg">
              {article.authors.join(', ')}
            </div>
            <div className="w-full h-px bg-gray-100"></div>
            <div className="text-gray-500 flex items-center gap-4">
              <span>Published: {new Date(article.publicationDate).toLocaleDateString()}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span>DOI: 10.1234/innovinc.{article.id}</span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-b border-gray-100">
            <div className="flex gap-4">
              <Button className="gap-2 bg-red-600 hover:bg-red-700 text-white rounded-full">
                <Download className="w-4 h-4" /> Download PDF
              </Button>
              <Button variant="outline" className="gap-2 rounded-full">
                <Quote className="w-4 h-4" /> Cite
              </Button>
            </div>
            <div className="flex gap-2 text-gray-500">
              <Button variant="ghost" size="icon" className="rounded-full" title="Share"><Share2 className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="rounded-full" title="Save"><Bookmark className="w-5 h-5" /></Button>
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
                <nav className="space-y-3 text-sm text-gray-600">
                  <a href="#abstract" className="block hover:text-primary-600 transition-colors font-medium text-primary-600">Abstract</a>
                  <a href="#introduction" className="block hover:text-primary-600 transition-colors">1. Introduction</a>
                  <a href="#methods" className="block hover:text-primary-600 transition-colors">2. Methods</a>
                  <a href="#results" className="block hover:text-primary-600 transition-colors">3. Results</a>
                  <a href="#discussion" className="block hover:text-primary-600 transition-colors">4. Discussion</a>
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
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {article.abstract}
            </p>
            <div className="flex gap-2 items-center flex-wrap">
              <span className="font-semibold text-sm text-navy-900">Keywords:</span>
              {article.tags.map(tag => (
                <span key={tag} className="text-sm text-primary-700 bg-primary-50 px-2 py-1 rounded-md">{tag}</span>
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
        </div>

      </div>
    </div>
  )
}
