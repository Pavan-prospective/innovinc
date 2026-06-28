import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronRight, BookOpen, ShieldCheck, Globe, Activity } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { api } from '../api/apiClient'

export default function Home() {
  const [journals, setJournals] = useState([])
  const [articles, setArticles] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeResourceTab, setActiveResourceTab] = useState('authors')

  const specificStats = [
    { value: "15,000+", label: "authors" },
    { value: "120+", label: "countries" },
    { value: "5M+", label: "downloads" },
    { value: "50,000+", label: "research Papers" },
    { value: "2,500+", label: "editors" },
    { value: "3,000+", label: "institutions" }
  ]

  const dummyEditors = [
    { name: "Dr. Sarah Chen", role: "Editor-in-Chief", institution: "Stanford University", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300" },
    { name: "Prof. Michael Roberts", role: "Associate Editor", institution: "Oxford University", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300" },
    { name: "Dr. Elena Rodriguez", role: "Review Editor", institution: "MIT", image: "https://images.unsplash.com/photo-1594824432420-5c3b1695de93?auto=format&fit=crop&q=80&w=300&h=300" },
    { name: "Prof. David Kim", role: "Guest Editor", institution: "Seoul National University", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300" },
    { name: "Dr. James Wilson", role: "Senior Editor", institution: "Cambridge University", image: "https://images.unsplash.com/photo-1537368910025-7028a609b139?auto=format&fit=crop&q=80&w=300&h=300" }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [journalsData, articlesData, statsData] = await Promise.all([
          api.journals.getAll(),
          api.articles.getTrending(),
          api.stats.get()
        ])
        setJournals(journalsData)
        setArticles(articlesData)
        setStats(statsData)
      } catch (error) {
        console.error("Failed to fetch home data", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  const whyPublish = [
    { title: "Fast Peer Review", icon: <Activity className="w-5 h-5 text-primary-700" />, desc: "Rigorous and expedited review process." },
    { title: "Global Indexing", icon: <Globe className="w-5 h-5 text-primary-700" />, desc: "Maximum visibility in major scientific databases." },
    { title: "Open Access", icon: <BookOpen className="w-5 h-5 text-primary-700" />, desc: "Research freely available to the global community." },
    { title: "Expert Editors", icon: <ShieldCheck className="w-5 h-5 text-primary-700" />, desc: "Guided by renowned international researchers." },
  ]

  return (
    <div className="flex flex-col bg-[#f9fafb]">
      {/* Compact Image Hero with Stats */}
      <section className="relative h-[350px] w-full flex items-center bg-navy-950 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2500&h=800" 
            alt="Research Landscape" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/70 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center h-full pt-6 pb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 max-w-2xl leading-tight">
            Where scientists <br/>empower society
          </h1>
          
          <div className="w-full max-w-xl bg-white/10 backdrop-blur-md p-1 rounded-lg flex items-center border border-white/20">
            <Search className="w-4 h-4 text-white ml-3 shrink-0" />
            <input 
              type="text"
              placeholder="Search articles, authors, DOIs..." 
              className="flex-grow bg-transparent border-none focus:outline-none text-white px-4 h-10 text-sm placeholder-gray-300"
            />
            <Button className="h-10 px-6 rounded bg-white text-navy-950 hover:bg-gray-100 font-bold shrink-0 text-sm">Search</Button>
          </div>
        </div>

        {/* Bottom Right Stats Overlay (Compact) */}
        <div className="absolute bottom-0 right-0 bg-navy-950/80 backdrop-blur-md px-8 py-4 flex gap-8 border-t border-l border-white/10 rounded-tl-2xl">
          <div>
            <div className="text-xl font-bold text-white mb-0.5">3.9 million</div>
            <div className="text-[10px] text-gray-300 uppercase tracking-wider">researchers</div>
          </div>
          <div>
            <div className="text-xl font-bold text-white mb-0.5">16 million</div>
            <div className="text-[10px] text-gray-300 uppercase tracking-wider">citations</div>
          </div>
          <div>
            <div className="text-xl font-bold text-white mb-0.5">5.3 billion</div>
            <div className="text-[10px] text-gray-300 uppercase tracking-wider">views & downloads</div>
          </div>
        </div>
      </section>

      {/* Immediately Display Articles & Indexing */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row gap-12">
        
        {/* Left Column: Recently Published Articles */}
        <div className="lg:w-2/3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-navy-950 tracking-tight">Recently Published</h2>
            <Link to="/articles" className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {articles.slice(0, 5).map((article) => (
              <div key={article.id} className="group bg-white rounded-xl border border-gray-100 p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-lg hover:border-primary-100 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-600"></div>
                  <span className="text-[10px] font-bold text-primary-700 tracking-wider uppercase">
                    {article.type || 'ORIGINAL RESEARCH'} 
                  </span>
                  <span className="text-gray-300 text-[10px]">•</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase">
                    {article.journalTitle}
                  </span>
                </div>
                
                <Link to={`/articles/${article.id}`}>
                  <h3 className="text-lg font-bold text-navy-900 group-hover:text-primary-600 transition-colors mb-2 leading-snug pr-4">
                    {article.title}
                  </h3>
                </Link>
                
                <div className="text-sm text-gray-600 mb-4 line-clamp-1">
                  {article.authors.join(', ')}
                </div>
                
                {/* Clean Metadata Row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-gray-500 font-medium">
                  {article.doi && (
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">DOI:</span>
                      <span className="text-navy-900">{article.doi}</span>
                    </div>
                  )}
                  {article.issn && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-400">ISSN:</span>
                        <span className="text-navy-900">{article.issn}</span>
                      </div>
                    </>
                  )}
                  <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">Published:</span>
                    <span className="text-navy-900">{new Date(article.publicationDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sidebar (Indexing & Trending) */}
        <div className="lg:w-1/3 flex flex-col gap-8">
          
          {/* Indexing Logos - Premium Grayscale */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
            <h2 className="text-sm font-bold text-navy-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary-600" /> Indexed In
            </h2>
            
            <div className="grid grid-cols-2 gap-6 items-center justify-items-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Crossref_logo_2015.svg/1200px-Crossref_logo_2015.svg.png" alt="Crossref" className="h-5 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Scholar_logo.svg/1200px-Google_Scholar_logo.svg.png" alt="Google Scholar" className="h-6 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer" />
              
              <div className="col-span-2 text-center font-serif text-[#0066cc] font-bold text-sm tracking-tight grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
                R<span className="mx-0.5">O</span>OT<span className="text-[#ff6600]">INDEXING</span>
              </div>
              
              <div className="text-base font-bold text-[#4b0082] grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">WorldCat</div>
              <div className="font-bold text-lg text-orange-600 italic grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">J-Gate</div>
              
              <div className="flex flex-col items-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
                <div className="w-5 h-2 border-b-2 border-[#0a1f44] rounded-t-full mb-0.5"></div>
                <span className="font-bold text-sm tracking-widest text-[#0a1f44]">DRJI</span>
              </div>
              <div className="text-[#cc0000] font-black text-[10px] uppercase text-center leading-tight grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">Int'l <br/>Scientific Indexing</div>
            </div>
          </div>

          {/* Trending Articles */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
            <h2 className="text-sm font-bold text-navy-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary-600" /> Trending
            </h2>
            <div className="space-y-5">
              {articles.slice(5, 8).map((article) => (
                <div key={article.id} className="flex gap-4 items-start group cursor-pointer">
                  <div className="w-10 h-14 shrink-0 rounded bg-navy-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-50 transition-colors">
                     <BookOpen className="w-5 h-5 opacity-70" />
                  </div>
                  <div>
                    <Link to={`/articles/${article.id}`}>
                      <h3 className="font-bold text-navy-900 group-hover:text-primary-600 transition-colors leading-snug text-xs mb-1.5 line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{article.type || 'Research'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources & Hub Section (Compact Pills & Cards) */}
      <section className="py-10 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-navy-950">Author Resources</h2>
            <div className="inline-flex bg-gray-50 rounded-full border border-gray-200 p-1">
              <button 
                onClick={() => setActiveResourceTab('authors')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${activeResourceTab === 'authors' ? 'bg-white shadow-sm border border-gray-200 text-navy-900' : 'text-gray-500 hover:text-navy-900'}`}
              >
                Authors
              </button>
              <button 
                onClick={() => setActiveResourceTab('editors')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${activeResourceTab === 'editors' ? 'bg-white shadow-sm border border-gray-200 text-navy-900' : 'text-gray-500 hover:text-navy-900'}`}
              >
                Editors
              </button>
            </div>
          </div>

          {activeResourceTab === 'authors' ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group hover:border-primary-300 transition-all flex flex-col h-full cursor-pointer">
                <div className="h-20 overflow-hidden bg-gray-100">
                  <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400&h=300" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-navy-900 text-sm mb-1">Find an article</h3>
                  <p className="text-gray-500 text-[10px] leading-snug">Browse our extensive collection of research.</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group hover:border-primary-300 transition-all flex flex-col h-full cursor-pointer">
                <div className="h-20 overflow-hidden bg-gray-100">
                  <img src="https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=400&h=300" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-navy-900 text-sm mb-1">Find a topic</h3>
                  <p className="text-gray-500 text-[10px] leading-snug">Research Topics bringing experts together.</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group hover:border-primary-300 transition-all flex flex-col h-full cursor-pointer">
                <div className="h-20 overflow-hidden bg-gray-100">
                  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&h=300" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-navy-900 text-sm mb-1">Submit research</h3>
                  <p className="text-gray-500 text-[10px] leading-snug">Start your publishing journey here.</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group hover:border-primary-300 transition-all flex flex-col h-full cursor-pointer">
                <div className="h-20 overflow-hidden bg-gray-100">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400&h=300" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-navy-900 text-sm mb-1">Peer review</h3>
                  <p className="text-gray-500 text-[10px] leading-snug">Rigorous evaluation by expert panels.</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group hover:border-primary-300 transition-all flex flex-col h-full cursor-pointer">
                <div className="h-20 overflow-hidden bg-gray-100">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=300" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-navy-900 text-sm mb-1">Manage data</h3>
                  <p className="text-gray-500 text-[10px] leading-snug">Transform data into reusable formats.</p>
                </div>
              </div>

            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {dummyEditors.map((editor, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden group hover:border-primary-300 transition-all flex flex-col h-full cursor-pointer text-center">
                  <div className="h-24 overflow-hidden bg-gray-100">
                    <img src={editor.image} alt={editor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3 flex flex-col items-center justify-center h-full">
                    <h3 className="font-bold text-navy-900 text-xs mb-1 leading-tight">{editor.name}</h3>
                    <p className="text-primary-600 text-[9px] font-bold uppercase tracking-wider mb-1">{editor.role}</p>
                    <p className="text-gray-500 text-[9px] leading-snug">{editor.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Specific Stats Section */}
      <section className="bg-white py-8 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center divide-x divide-gray-200">
            {specificStats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center px-4">
                <div className="text-2xl font-bold text-navy-900">{stat.value}</div>
                <div className="text-xs text-gray-600 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section (Frontiers Style Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
        <h2 className="text-2xl font-bold text-navy-950 mb-6">News</h2>
        <div className="flex flex-col gap-6">
          
          {/* Top Featured News (Full Width Split) */}
          <Link to="/news/1" className="block group">
            <div className="bg-white rounded-lg border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col md:flex-row overflow-hidden hover:shadow-md transition-shadow h-[350px]">
              <div className="md:w-1/2 overflow-hidden bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200&h=800" 
                  alt="AI Factory" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">InnovInc News</span>
                <span className="text-[11px] text-gray-400 mb-4">Published on 28 Jun 2026</span>
                <h3 className="text-2xl md:text-3xl font-semibold text-navy-900 leading-tight mb-4 group-hover:text-primary-600 transition-colors">
                  Tech race moves from AI to factories, hospitals, and power grids
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  In the Top 10 Emerging Technologies of 2026 report, cutting-edge technologies act directly on power grids, drug pipelines, food production, cooling systems, and robotics.
                </p>
              </div>
            </div>
          </Link>

          {/* Second Row (Half Width) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
            <Link to="/news/2" className="bg-white rounded-lg border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
              <div className="h-56 overflow-hidden bg-gray-100 shrink-0">
                <img src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=800&h=500" alt="Virus" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Science News</span>
                  <span className="text-[11px] text-gray-400">Published on 25 Jun 2026</span>
                </div>
                <h3 className="text-lg font-semibold text-navy-900 leading-snug mb-2 group-hover:text-primary-600 transition-colors">
                  InnovInc in Science: How 'peacemakers' of the immune system could unlock long-term disease remission
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  'Peacemaker' immune cells could help treat diseases ranging from type 1 diabetes to neurodegeneration.
                </p>
              </div>
            </Link>

            <Link to="/news/3" className="bg-white rounded-lg border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
              <div className="h-56 overflow-hidden bg-gray-100 shrink-0">
                <img src="https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&q=80&w=800&h=500" alt="Whale" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Nature News</span>
                  <span className="text-[11px] text-gray-400">Published on 19 Jun 2026</span>
                </div>
                <h3 className="text-lg font-semibold text-navy-900 leading-snug mb-2 group-hover:text-primary-600 transition-colors">
                  Arabian Sea humpback whale's long-distance trip further highlights species' unique ecology
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  The results showed most whales are homebodies – moving within a narrow latitudinal band.
                </p>
              </div>
            </Link>
          </div>

          <div className="flex justify-center mt-2">
            <Button variant="outline" className="rounded-full px-8 border-gray-300 text-gray-600 hover:bg-gray-50 h-9 text-sm">
              See more news <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>



      {/* Why Publish with Us (Compact Cards) */}
      <section className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-navy-900 mb-6 text-center">Publish with InnovInc</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyPublish.map((item, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Indexing (Trust Building Section) */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row gap-12">
        
        {/* Left: History & Mission */}
        <div className="md:w-1/2 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-1 bg-primary-600 rounded"></span>
            <h2 className="text-lg font-bold text-navy-900 uppercase tracking-widest text-xs">Our Mission & History</h2>
          </div>
          <h3 className="text-2xl font-bold text-navy-950 leading-tight">
            Empowering Authors to Share Knowledge Globally.
          </h3>
          <p className="text-gray-700 leading-relaxed text-sm pt-2">
            Founded with the vision to break down barriers in scientific communication, InnovInc has grown into a trusted home for thousands of researchers worldwide. We believe that critical research should not be locked behind paywalls. 
          </p>
          <p className="text-gray-700 leading-relaxed text-sm pb-4">
            Our commitment is to provide authors with rigorous peer review, rapid publication timelines, and maximum global visibility. When you publish with InnovInc, you are joining a legacy of academic excellence and open-access innovation.
          </p>
          <Button variant="outline" className="text-navy-900 border-gray-300 h-9 text-sm">Read our full story</Button>
        </div>

        {/* Right: Indexed In & Partners */}
        <div className="md:w-1/2 bg-navy-950 rounded-2xl p-8 text-white shadow-xl">
          <h3 className="text-lg font-bold mb-2">Trusted & Indexed Internationally</h3>
          <p className="text-gray-400 text-xs mb-6">
            Our journals meet the highest standards of scientific rigor and are indexed in leading global databases to ensure your work is discoverable.
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            {['Scopus', 'Web of Science', 'PubMed Central', 'Crossref', 'DOAJ', 'Google Scholar'].map((partner) => (
              <div key={partner} className="bg-navy-900 border border-navy-800 rounded-lg p-3 flex items-center justify-center text-center font-medium text-[11px] text-gray-300 hover:text-white hover:border-primary-500 transition-colors cursor-default">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
