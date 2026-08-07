import React, { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { FileText, Users, BookOpen, ClipboardList, DollarSign, Layers, ChevronRight, Activity, Eye, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { api } from '../api/apiClient'
import { formatArticleDate, journalPath } from '../utils/journalUtils'

const QUICK_LINKS = [
  { key: 'submit', title: 'Submit your research', desc: 'Start your submission and get more impact for your research by publishing with us.', icon: FileText, path: null, cta: 'Submit' },
  { key: 'checklist', title: 'Quick submission checklist', desc: 'See our submission checklist for everything you need ahead of submitting your paper.', icon: ClipboardList, segment: 'authors/quick-checklist' },
  { key: 'formatting', title: 'Manuscript formatting guidelines', desc: 'Check our formatting guidelines for everything you need about preparing your manuscript.', icon: BookOpen, segment: 'authors/manuscript-formatting' },
  { key: 'special', title: 'Propose a special issue', desc: 'Special Issues are peer-reviewed collections around cutting-edge research themes.', icon: Layers, segment: 'community/propose-special-issue' },
  { key: 'fees', title: 'Publishing fees', desc: 'Open Access articles accepted after rigorous peer review incur a publishing fee.', icon: DollarSign, segment: 'authors/publishing-fees' },
]

export default function JournalDetails() {
  const { journal } = useOutletContext()
  const [articles, setArticles] = useState([])
  const [otherArticles, setOtherArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const [journalArticles, allArticles] = await Promise.all([
          api.articles.getByJournal(journal.id),
          api.articles.getAll()
        ])
        setArticles(journalArticles)
        setOtherArticles(allArticles.filter(a => a.journalId !== journal.id).slice(0, 4))
      } catch (error) {
        console.error('Failed to fetch articles', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [journal.id])

  const specialIssues = journal.specialIssues || []
  const volumes = journal.volumes || []
  const previewArticles = articles.slice(0, 4)
  const previewEditors = journal.chiefEditor ? [journal.chiefEditor] : []

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-14">
      {/* Welcome Card & Trending Articles Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 flex flex-col gap-8 h-full">
          {/* About the Journal Section */}
          {(() => {
            const paragraphs = journal.descriptionParagraphs || (journal.description ? [journal.description] : []);
            const hasMoreParagraphs = paragraphs.length > 1;
            return (
              <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all flex flex-col md:flex-row items-center md:items-start justify-between gap-10 w-full relative overflow-hidden">
                <div className="md:w-[70%] space-y-5">
                  <h2 className="text-2xl font-extrabold text-navy-955 tracking-tight">About the Journal</h2>
                  <div className="space-y-4 text-gray-500 text-sm leading-relaxed font-light">
                    {/* Render the first paragraph */}
                    <p>{paragraphs[0]}</p>
                    
                    {/* Render the remaining paragraphs if expanded */}
                    {isExpanded && paragraphs.slice(1).map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {hasMoreParagraphs && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary-700 hover:text-primary-800 transition-colors focus:outline-none cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          View less <ChevronUp className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          View more <ChevronDown className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  )}
                </div>
                
                <div className="md:w-[25%] flex justify-center md:justify-end shrink-0 w-full">
                  <div className="w-36 h-48 rounded-r-xl overflow-hidden bg-gray-50 border border-gray-200/70 shadow-lg relative transform hover:rotate-1 hover:scale-102 transition-all duration-500 flex items-center justify-center shrink-0">
                    <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/10 to-transparent border-r border-black/5 z-10"></div>
                    {journal.coverImage ? (
                      <img 
                        src={journal.coverImage} 
                        alt={`${journal.title} Cover`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="p-4 text-center">
                         <Activity className="w-10 h-10 text-navy-900 mx-auto mb-2" />
                         <h4 className="text-xs font-bold text-navy-900 leading-tight line-clamp-3">{journal.title}</h4>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Trending Articles Grid */}
          {previewArticles.length > 0 && (
            <div className="flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-navy-950 tracking-tight flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary-600" /> Trending Research
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">Discover the most read and cited articles in this journal.</p>
                </div>
                <Link to={journalPath(journal.id, 'articles')}>
                  <Button variant="outline" className="h-8 text-xs px-3 border-gray-200 hover:bg-gray-50">View All</Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-grow">
                {previewArticles.map((article, idx) => (
                  <div key={article.id} className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col justify-between hover:shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:border-primary-200 transition-all group h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary-500/5 rounded-bl-[100px] -z-0"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 rounded-md bg-primary-50 text-primary-700 font-black text-[10px] flex items-center justify-center border border-primary-100">
                          {`0${idx + 1}`}
                        </span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{article.type || 'Research'}</span>
                      </div>
                      <h3 className="font-bold text-navy-950 group-hover:text-primary-600 transition-colors leading-snug text-sm line-clamp-3 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium line-clamp-1 mb-4">{article.authors?.join(', ')}</p>
                    </div>
                    
                    <div className="mt-auto relative z-10 pt-4 border-t border-gray-50">
                      <div className="flex items-center justify-between text-[10px] text-gray-400 font-semibold mb-3">
                        <span className="line-clamp-1 flex-1 mr-2 text-navy-900">{article.journalTitle || journal.title}</span>
                        <span className="flex items-center gap-0.5 shrink-0">
                          <Eye className="w-3 h-3 text-gray-400" />
                          {article.views?.toLocaleString() || '0'} views
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/articles/${article.id}`} className="flex-1">
                          <Button variant="outline" className="w-full text-xs h-8 rounded-lg font-bold border-gray-200 text-gray-700 hover:bg-gray-50">
                            Read
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column / Quick Links */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <h2 className="text-xl font-bold text-navy-950">Quick Links</h2>
            <div className="grid grid-cols-1 gap-4">
          {QUICK_LINKS.map((item) => {
            const Icon = item.icon
            const linkPath = item.segment ? journalPath(journal.id, ...item.segment.split('/')) : null
            return (
              <div key={item.key} className="bg-white rounded-xl border border-gray-100 p-5 hover:border-primary-300 hover:shadow-md transition-all group">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-3 group-hover:bg-primary-100 transition-colors">
                  <Icon className="w-5 h-5 text-primary-700" />
                </div>
                <h3 className="font-bold text-navy-950 text-sm mb-1.5">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{item.desc}</p>
                {item.key === 'submit' ? (
                  <Button className="h-8 text-xs px-4 bg-primary-500 hover:bg-primary-600 text-navy-950 font-bold border-none">
                    {item.cta}
                  </Button>
                ) : linkPath ? (
                  <Link to={linkPath} className="text-xs font-bold text-primary-700 hover:text-primary-800 inline-flex items-center gap-1">
                    Learn more <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                ) : null}
              </div>
            )
          })}
        </div>
          </div>
        </div>
      </div>

      {journal.news && journal.news.length > 0 && (
        <section className="space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-navy-950 tracking-tight flex items-center gap-2">
              Latest News & Updates
            </h2>
            <p className="text-xs text-gray-500 mt-1">Stay updated with the latest breakthroughs and announcements related to this journal.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {journal.news.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-primary-200 transition-all group flex flex-col h-full shadow-sm">
                {item.image && (
                  <div className="h-52 overflow-hidden relative bg-gray-50 shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[10px] font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded uppercase tracking-wider self-start">
                    Journal Update
                  </span>
                  <h3 className="font-bold text-navy-950 group-hover:text-primary-600 transition-colors text-base mt-2.5 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed flex-grow">
                    {item.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {specialIssues.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-navy-950">Special issues</h2>
            <Link to={journalPath(journal.id, 'special-issues')} className="text-xs font-bold text-primary-700 hover:text-primary-800 flex items-center gap-1">
              See all ({specialIssues.length}) <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specialIssues.slice(0, 4).map((issue) => (
              <Link
                key={issue.id}
                to={journalPath(journal.id, 'special-issues', issue.id)}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:border-primary-300 hover:shadow-md transition-all block"
              >
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-2 py-0.5 rounded mb-2">
                  {issue.status}
                </span>
                <h3 className="font-semibold text-navy-950 text-sm leading-snug mb-2">{issue.title}</h3>
                <p className="text-xs text-gray-500">{issue.editors?.join(' · ')}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {volumes.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-navy-950">Volumes</h2>
            <Link to={journalPath(journal.id, 'volumes')} className="text-xs font-bold text-primary-700 hover:text-primary-800 flex items-center gap-1">
              See all ({volumes.length}) <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {volumes.map((vol) => (
              <Link
                key={vol.id}
                to={journalPath(journal.id, 'volumes', vol.id)}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:border-primary-300 hover:shadow-md transition-all text-center"
              >
                <BookOpen className="w-5 h-5 text-primary-600 mx-auto mb-2" />
                <h3 className="font-semibold text-navy-950 text-sm">{vol.label}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-10">
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-navy-955">Articles in this Journal</h2>
            <Link to={journalPath(journal.id, 'articles')} className="text-xs font-bold text-primary-700 hover:text-primary-800 flex items-center gap-1">
              See all ({articles.length}) <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center p-8">
              <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            </div>
          ) : previewArticles.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-500 text-sm">No articles published yet.</div>
          ) : (
            <div className="space-y-4">
              {previewArticles.map((article) => (
                <article key={article.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:border-primary-200 hover:shadow-sm transition-all">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-primary-700 uppercase tracking-wider">{article.type}</span>
                    {formatArticleDate(article) && (
                      <span className="text-[10px] text-gray-400">{formatArticleDate(article)}</span>
                    )}
                  </div>
                  <Link to={`/articles/${article.id}`}>
                    <h3 className="font-semibold text-navy-950 text-sm leading-snug mb-2 hover:text-primary-700 transition-colors">{article.title}</h3>
                  </Link>
                  <p className="text-xs text-gray-500 mb-2">{article.authors?.join(' · ')}</p>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500">
                    <span className="font-medium text-navy-900">{article.journalTitle}</span>
                    {article.doi && <span>doi {article.doi}</span>}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {otherArticles.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-navy-955">More Research from the Network</h2>
            </div>
            <div className="space-y-4">
              {otherArticles.map((article) => (
                <article key={article.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:border-primary-200 hover:shadow-sm transition-all opacity-90 hover:opacity-100">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-primary-700 uppercase tracking-wider">{article.type}</span>
                    {formatArticleDate(article) && (
                      <span className="text-[10px] text-gray-400">{formatArticleDate(article)}</span>
                    )}
                  </div>
                  <Link to={`/articles/${article.id}`}>
                    <h3 className="font-semibold text-navy-950 text-sm leading-snug mb-2 hover:text-primary-700 transition-colors">{article.title}</h3>
                  </Link>
                  <p className="text-xs text-gray-500 mb-2">{article.authors?.join(' · ')}</p>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500">
                    <span className="font-medium text-navy-900">{article.journalTitle}</span>
                    {article.doi && <span>doi {article.doi}</span>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-navy-955 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary-600" /> Editors
          </h2>
          <Link to={journalPath(journal.id, 'editorial-board')} className="text-xs font-bold text-primary-700 hover:text-primary-800 flex items-center gap-1">
            See all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {previewEditors.map((editor) => (
            <div key={editor.name} className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:border-primary-300 transition-all flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-200 flex items-center justify-center mb-3 text-sm font-bold text-primary-800 bg-primary-50 shadow-inner shrink-0 relative">
                {editor.image ? (
                  <img src={editor.image} alt={editor.name} className="w-full h-full object-cover" />
                ) : (
                  editor.name.replace(/^(Dr\.|Prof\.)\s*/, '').split(' ').map((p) => p[0]).join('').substring(0, 2)
                )}
              </div>
              <h3 className="font-bold text-navy-950 text-sm mb-1">{editor.name}</h3>
              <p className="text-[11px] text-gray-500 leading-snug">{editor.affiliation}</p>
              <span className="inline-block mt-2 text-[10px] font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded uppercase tracking-wider">
                Chief Editor
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
