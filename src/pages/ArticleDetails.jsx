import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Download, Share2, Bookmark, Eye, Quote, FileText,
  ChevronRight, Mail, Globe, BookOpen, Users, BarChart2, X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../api/apiClient'

const SECTION_TABS = ['Abstract', 'Introduction', 'Methods', 'Results', 'Conclusion', 'References']

export default function ArticleDetails() {
  const { articleId } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Abstract')

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await api.articles.getById(articleId)
        setArticle(data)
      } catch (error) {
        console.error('Failed to fetch article', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [articleId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-navy-950 mb-2">Article not found</h2>
          <Link to="/journals" className="text-primary-600 hover:underline text-sm">
            Browse all journals
          </Link>
        </div>
      </div>
    )
  }


  return (
    <div className="bg-[#f7f8fc] min-h-screen font-sans">

      {/* ─── Journal Strip Banner ─── */}
      <div className="bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-3 text-xs">
          <BookOpen className="w-4 h-4 text-primary-400 shrink-0" />
          <Link
            to={`/journals/${article.journalId}`}
            className="font-semibold text-primary-300 hover:text-primary-200 transition-colors"
          >
            {article.journalTitle}
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-500" />
          <span className="text-gray-400">Articles</span>
          <ChevronRight className="w-3 h-3 text-gray-500" />
          <span className="text-gray-400 truncate max-w-xs">{article.title}</span>
        </div>
      </div>

      {/* ─── Article Header ─── */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0">

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-[11px] font-bold px-3 py-1 rounded-full border border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Open Access
            </span>
            <span className="inline-flex items-center text-[11px] font-bold px-3 py-1 rounded-full border border-gray-200 text-gray-600 bg-gray-50">
              {article.type || 'ORIGINAL RESEARCH'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-950 leading-tight mb-6 max-w-4xl">
            {article.title}
          </h1>

          {/* Authors */}
          <div className="mb-4">
            <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-sm font-semibold text-navy-950">
              {article.authorAffiliations ? (
                article.authorAffiliations.map((author, index) => (
                  <span key={author.name} className="inline-flex items-baseline">
                    <button className="hover:text-primary-600 transition-colors">
                      {author.name}
                    </button>
                    <sup className="text-[10px] text-primary-600 font-bold ml-0.5">
                      {author.indices.join(',')}
                    </sup>
                    {index < article.authorAffiliations.length - 1 && (
                      <span className="text-gray-400 ml-0.5">,</span>
                    )}
                  </span>
                ))
              ) : (
                <span>{article.authors?.join(', ')}</span>
              )}
            </div>

            {/* Affiliations */}
            {article.affiliationsList && (
              <div className="mt-3 space-y-1 text-[11px] text-gray-500 pl-0">
                {article.affiliationsList.map(aff => (
                  <div key={aff.index} className="flex gap-2 items-start leading-relaxed">
                    <sup className="font-bold text-primary-700 shrink-0 mt-1">{aff.index}</sup>
                    <span>{aff.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dates bar */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-gray-500 py-3 border-t border-gray-100 mb-0">
            {article.history?.received && <span>Received: <strong className="text-navy-900">{article.history.received}</strong></span>}
            {article.history?.revised && <span>Revised: <strong className="text-navy-900">{article.history.revised}</strong></span>}
            {article.history?.accepted && <span>Accepted: <strong className="text-navy-900">{article.history.accepted}</strong></span>}
            {article.history?.online && <span>Published: <strong className="text-navy-900">{article.history.online}</strong></span>}
            {article.doi && (
              <span className="ml-auto font-mono text-[10px] bg-gray-50 border border-gray-200 rounded px-2 py-0.5 text-gray-600">
                DOI: {article.doi}
              </span>
            )}
          </div>

          {/* ─── Action Bar ─── */}
          <div className="flex flex-wrap items-center gap-3 py-4 border-t border-gray-100">
            <button className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              Download PDF
            </button>

            <div className="flex items-center gap-1 ml-auto">
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:border-primary-400 hover:bg-primary-50 transition-colors text-gray-500 hover:text-primary-600"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:border-primary-400 hover:bg-primary-50 transition-colors text-gray-500 hover:text-primary-600"
                title="Save"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ─── Section Tabs ─── */}
          <div className="flex items-center gap-0 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            {SECTION_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-5 py-3 text-sm font-semibold border-b-[3px] transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-primary-700 border-primary-600'
                    : 'text-gray-500 border-transparent hover:text-navy-950'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ─── Left Sidebar ─── */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="sticky top-6 space-y-5">

              {/* Article Metrics */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Article Metrics</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-blue-500" /> Views
                    </span>
                    <span className="font-bold text-navy-950 text-sm">{(article.views || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <Download className="w-4 h-4 text-green-500" /> Downloads
                    </span>
                    <span className="font-bold text-navy-950 text-sm">{(article.downloads || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-orange-500" /> Citations
                    </span>
                    <span className="font-bold text-navy-950 text-sm">{article.citations || 0}</span>
                  </div>
                </div>
              </div>

              {/* Keywords */}
              {article.tags && article.tags.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs text-primary-700 bg-primary-50 border border-primary-100 px-2.5 py-1 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Journal Info */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Published in</h3>
                <Link
                  to={`/journals/${article.journalId}`}
                  className="text-sm font-bold text-navy-950 hover:text-primary-600 transition-colors leading-snug block mb-3"
                >
                  {article.journalTitle}
                </Link>
                <Link
                  to={`/journals/${article.journalId}/articles`}
                  className="text-xs font-semibold text-primary-600 hover:text-primary-800 flex items-center gap-1"
                >
                  Browse all articles <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Quick Nav */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Quick Navigation</h3>
                <nav className="space-y-2">
                  {SECTION_TABS.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`block w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors font-medium ${
                        activeTab === tab
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-navy-950'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* ─── Article Body ─── */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="p-8 md:p-10"
                >
                  {activeTab === 'Abstract' && (
                    <section>
                      <h2 className="text-xl font-bold text-navy-950 mb-5 pb-3 border-b border-gray-100">Abstract</h2>
                      <p className="text-gray-700 leading-relaxed text-[15px]">{article.abstract}</p>
                    </section>
                  )}

                  {activeTab === 'Introduction' && (
                    <section>
                      <h2 className="text-xl font-bold text-navy-950 mb-5 pb-3 border-b border-gray-100">1. Introduction</h2>
                      <p className="text-gray-700 leading-relaxed mb-4 text-[15px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-[15px]">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                      </p>
                    </section>
                  )}

                  {activeTab === 'Methods' && (
                    <section>
                      <h2 className="text-xl font-bold text-navy-950 mb-5 pb-3 border-b border-gray-100">2. Methods</h2>
                      <p className="text-gray-700 leading-relaxed text-[15px]">
                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.
                      </p>
                    </section>
                  )}

                  {activeTab === 'Results' && (
                    <section>
                      <h2 className="text-xl font-bold text-navy-950 mb-5 pb-3 border-b border-gray-100">3. Results</h2>
                      <p className="text-gray-700 leading-relaxed text-[15px]">
                        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus.
                      </p>
                    </section>
                  )}

                  {activeTab === 'Conclusion' && (
                    <section>
                      <h2 className="text-xl font-bold text-navy-950 mb-5 pb-3 border-b border-gray-100">Conclusion</h2>
                      <p className="text-gray-700 leading-relaxed text-[15px]">
                        {article.conclusion || 'In conclusion, the clinical datasets demonstrate strong alignment with theoretical models. Future research directions will evaluate scalability, reproducibility, and long-term implications of these diagnostic protocols.'}
                      </p>
                    </section>
                  )}

                  {activeTab === 'References' && (
                    <section>
                      <h2 className="text-xl font-bold text-navy-950 mb-5 pb-3 border-b border-gray-100">
                        References <span className="text-gray-400 text-base font-normal">({article.referencesCount || 0})</span>
                      </h2>
                      <div className="space-y-5">
                        {article.references ? (
                          article.references.map(ref => (
                            <div key={ref.id} className="flex gap-4 items-start group">
                              <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-primary-50 text-primary-700 text-[11px] font-bold border border-primary-100 mt-0.5">
                                {ref.id}
                              </span>
                              <div>
                                <p className="text-[13px] text-gray-700 leading-relaxed">{ref.citation}</p>
                                <Link
                                  to={ref.link}
                                  className="text-[11px] font-semibold text-primary-600 hover:text-primary-800 mt-1 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  View Journal <ChevronRight className="w-3 h-3" />
                                </Link>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">References are being compiled.</p>
                        )}
                      </div>
                    </section>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ─── Right Sidebar ─── */}
          <div className="lg:col-span-3 order-3">
            <div className="sticky top-6 space-y-5">

              {/* Authors Card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Users className="w-3.5 h-3.5" /> Authors
                </h3>
                <ul className="space-y-3">
                  {(article.authorAffiliations || []).map(author => (
                    <li key={author.name} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {author.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy-950 leading-tight">{author.name}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          Affiliation {author.indices.join(', ')}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Correspondence */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Correspondence</h3>
                <div className="space-y-3 text-sm">
                  <a href="mailto:correspondence@innovinc.com" className="flex items-center gap-2 text-primary-600 hover:text-primary-800 font-medium">
                    <Mail className="w-4 h-4" /> Email corresponding author
                  </a>
                  <a href="#" className="flex items-center gap-2 text-primary-600 hover:text-primary-800 font-medium">
                    <Globe className="w-4 h-4" /> View author profile
                  </a>
                </div>
              </div>

              {/* Copyright */}
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 text-[11px] text-gray-500 leading-relaxed">
                <p className="font-semibold text-gray-600 mb-1">© {new Date().getFullYear()} InnovInc</p>
                <p>This is an open-access article distributed under the terms of the Creative Commons Attribution License (CC BY).</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
