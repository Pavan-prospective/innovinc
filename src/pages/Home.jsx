import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronRight, BookOpen, ShieldCheck, Globe, Activity, Eye, BarChart3, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { api } from '../api/apiClient'

function EditorProfileCard({ editor }) {
  const [hasError, setHasError] = useState(false)
  const initials = editor.name.replace(/^(Dr\.|Prof\.)\s*/, '').split(' ').map(p => p[0]).join('').substring(0, 2)
  
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 group hover:border-primary-300/80 hover:shadow-[0_8px_30px_-6px_rgba(212,163,89,0.08)] transition-all duration-300 flex flex-col items-center text-center cursor-pointer relative">
      <div className="w-16 h-16 rounded-full border-2 border-primary-500/20 group-hover:border-primary-500/80 transition-colors flex items-center justify-center bg-primary-50 overflow-hidden mb-3.5 shadow-sm shrink-0">
        {hasError ? (
          <span className="text-sm font-bold text-primary-700">{initials}</span>
        ) : (
          <img
            src={editor.image}
            alt={editor.name}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>
      <h3 className="font-bold text-navy-950 text-xs mb-1.5 leading-tight">{editor.name}</h3>
      <span className="inline-block text-[9px] font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-md uppercase tracking-wider mb-2">
        {editor.role}
      </span>
      <p className="text-gray-500 text-[10px] leading-snug font-medium">{editor.institution}</p>
    </div>
  )
}

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
    { name: "Dr. Sarah Chen", role: "Editor-in-Chief", institution: "Stanford University", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400" },
    { name: "Prof. Michael Roberts", role: "Associate Editor", institution: "Oxford University", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400" },
    { name: "Dr. Elena Rodriguez", role: "Review Editor", institution: "MIT", image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400&h=400" },
    { name: "Prof. David Kim", role: "Guest Editor", institution: "Seoul National University", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400&h=400" },
    { name: "Dr. James Wilson", role: "Senior Editor", institution: "Cambridge University", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400" }
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
    <div className="flex flex-col bg-[#f8fafc]">
      {/* Premium Gradient Hero with Glassmorphism Overlay */}
      <section className="relative min-h-[420px] w-full flex items-center bg-navy-950 overflow-hidden">
        {/* Glowing Background Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent-600/10 rounded-full blur-[150px] pointer-events-none"></div>

        {/* Background Image with Deep Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=2500" 
            className="w-full h-full object-cover opacity-60" 
            alt="Medical Research Laboratory Background" 
          />
          <div className="absolute inset-0 bg-navy-950/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center pt-12 pb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3 mb-6 max-w-3xl"
          >

            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tight font-extrabold leading-[1.1] drop-shadow-md">
              Journal of <span className="text-primary-500 bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">Global Cancer</span> Research
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md p-1.5 rounded-xl flex items-center border border-white/10 focus-within:border-primary-500/50 shadow-2xl"
          >
            <Search className="w-4 h-4 text-gray-400 ml-3 shrink-0" />
            <input 
              type="text"
              placeholder="Search cancer articles, DOIs, authors..." 
              className="flex-grow bg-transparent border-none focus:outline-none text-white px-3 h-9 text-sm placeholder-gray-400"
            />
            <Button className="h-9 px-5 rounded-lg bg-primary-500 hover:bg-primary-600 text-navy-950 font-bold shrink-0 text-sm transition-all shadow-md shadow-primary-500/20 border-none">Search</Button>
          </motion.div>
        </div>

        {/* Bottom Right Stats Overlay (Compact / Modern Glassmorphism) */}
        <div className="absolute bottom-0 right-0 bg-navy-950/75 backdrop-blur-md px-6 py-4 flex gap-8 border-t border-l border-white/10 rounded-tl-3xl shadow-2xl">
          <div>
            <div className="text-lg font-black text-white mb-0.5 tracking-tight">3.9 million</div>
            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">researchers</div>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div>
            <div className="text-lg font-black text-white mb-0.5 tracking-tight">16 million</div>
            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">citations</div>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div>
            <div className="text-lg font-black text-white mb-0.5 tracking-tight">5.3 billion</div>
            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">downloads</div>
          </div>
        </div>
      </section>

      {/* Greetings & Welcome and Featured Article Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (2/3 width) - Welcome + Trending */}
          <div className="lg:col-span-2 flex flex-col gap-8 h-full">
            
            {/* Welcome Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_25px_-4px_rgba(15,23,42,0.03)] overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-5/12 h-64 md:h-auto overflow-hidden relative shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800" 
                  alt="Laboratory Glassware" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 md:to-white/20"></div>
              </div>
              <div className="md:w-7/12 p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Greetings & Welcome</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-navy-950 tracking-tight leading-tight">Explore Latest Researches</h2>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Journal of Global Cancer Research publishes cutting-edge discoveries, clinical advancements, and translational research in oncology. Our mission is to connect researchers, clinicians, and healthcare professionals worldwide while accelerating innovations that improve cancer.
                  </p>
                </div>
                <div className="mt-6 flex justify-end">
                  <Link to="/journals/j1">
                    <Button className="px-6 rounded-lg bg-navy-900 hover:bg-navy-950 text-white border-none font-bold text-sm h-10 transition-all shadow-sm">
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Trending Articles Grid */}
            <div className="flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-navy-950 tracking-tight flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary-600" /> Trending Research
                </h2>
                <p className="text-xs text-gray-500 mt-1">Discover the most read and cited articles across our journals.</p>
              </div>
              <Link to="/journals">
                <Button variant="outline" className="h-8 text-xs px-3 border-gray-200 hover:bg-gray-50">View All</Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-grow">
              {articles.slice(0, 4).map((article, idx) => (
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
                      <span className="line-clamp-1 flex-1 mr-2 text-navy-900">{article.journalTitle}</span>
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
                      <Link to={`/journals/${article.journalId}`} className="flex-1">
                        <Button className="w-full text-xs h-8 rounded-lg font-bold bg-primary-50 hover:bg-primary-100 text-primary-700 border-none shadow-none">
                          Journal
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>

          {/* Right Column (1/3 width) - Featured Research + Global Indexing */}
          <div className="flex flex-col gap-8">
            
            {/* Featured Recently Published Article */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_25px_-4px_rgba(15,23,42,0.03)] hover:border-primary-200/60 transition-all flex flex-col justify-between h-auto relative overflow-hidden group">
              {/* Accent line on hover */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="space-y-4">
                <div>

                  {articles.length > 0 && (
                    <>
                      <h3 className="text-base font-extrabold text-navy-950 line-clamp-3 leading-snug group-hover:text-primary-600 transition-colors">
                        {articles[0].title}
                      </h3>
                      <p className="text-xs text-gray-500 font-semibold mt-2.5">{articles[0].authors.join(', ')}</p>
                    </>
                  )}
                </div>
                
                {articles.length > 0 && (
                  <div className="space-y-2.5 pt-4 border-t border-gray-100 text-[11px] text-gray-500">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 font-medium">Journal:</span>
                      <span className="text-navy-950 font-bold">{articles[0].journalTitle}</span>
                    </div>
                    <div className="flex items-center gap-4 pt-1 font-semibold">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-50 text-navy-950 border border-gray-100">
                        <Eye className="w-3.5 h-3.5 text-gray-400" />
                        {articles[0].views?.toLocaleString()} <span className="text-gray-400 font-normal ml-0.5">views</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-50 text-navy-950 border border-gray-100">
                        <BarChart3 className="w-3.5 h-3.5 text-gray-400" />
                        {articles[0].impressions?.toLocaleString()} <span className="text-gray-400 font-normal ml-0.5">impressions</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">
                {articles.length > 0 && (
                  <>
                    <Link to={`/articles/${articles[0].id}`} className="flex-grow">
                      <Button variant="outline" className="w-full text-xs h-9 rounded-lg font-bold border-gray-200 text-gray-700 hover:bg-gray-50">
                        Read Article
                      </Button>
                    </Link>
                    <Link to={`/journals/${articles[0].journalId}`} className="flex-grow">
                      <Button className="w-full text-xs h-9 rounded-lg font-bold bg-primary-500 hover:bg-primary-600 text-navy-950 border-none shadow-sm">
                        View Journal
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Global Indexing */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.03)] flex flex-col justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-navy-950 mb-5 flex items-center gap-2 pb-3 border-b border-gray-100">
                  <Globe className="w-4 h-4 text-primary-600" /> Global Indexing
                </h2>
                <div className="grid grid-cols-2 gap-4 items-center justify-items-center py-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Crossref_logo_2015.svg/1200px-Crossref_logo_2015.svg.png" alt="Crossref" className="h-5 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Scholar_logo.svg/1200px-Google_Scholar_logo.svg.png" alt="Google Scholar" className="h-6 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
                  <div className="text-center font-serif text-[#0066cc] font-extrabold text-xs tracking-tight grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                    R<span className="mx-0.5">O</span>OT<span className="text-[#ff6600]">INDEXING</span>
                  </div>
                  <div className="text-sm font-bold text-[#4b0082] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">WorldCat</div>
                  <div className="font-bold text-sm text-primary-600 italic grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">J-Gate</div>
                  <div className="text-[#cc0000] font-black text-[9px] uppercase text-center leading-tight grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">ISI Indexing</div>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 mt-4 leading-relaxed">
                All publications are cataloged across major academic search systems to maximize citations.
              </p>
            </div>

            {/* Sign Up Widget */}
            <div className="bg-gradient-to-br from-navy-950 to-navy-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl group-hover:bg-primary-500/30 transition-colors"></div>
                <h3 className="font-bold text-lg mb-2 relative z-10">Join Our Community</h3>
                <p className="text-gray-300 text-sm mb-5 relative z-10">Register now to submit articles, track reviews, and manage your researcher profile.</p>
                <div className="flex flex-col gap-3 relative z-10">
                   <Button className="w-full bg-primary-500 hover:bg-primary-600 text-navy-950 font-bold border-none shadow-md shadow-primary-500/20">Sign Up</Button>
                   <Button variant="outline" className="w-full text-white border-white/20 hover:bg-white hover:text-navy-950 transition-colors">Sign In</Button>
                </div>
            </div>

          </div>

        </div>
      </section>

      {/* Featured Journals Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-2xl mx-auto mb-12">

            <h2 className="text-3xl font-black text-navy-950 mt-4 tracking-tight">Explore Our Journals</h2>
            <p className="text-gray-500 text-sm mt-2 leading-relaxed">
              Browse our peer-reviewed, open access scientific journals delivering high-impact discoveries and clinical research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {journals.map((journal) => (
              <Link key={journal.id} to={`/journals/${journal.id}`} className="group block h-full">
                <div className="bg-[#f8fafc] rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.03)] hover:shadow-xl hover:border-primary-300/70 transition-all duration-300 flex flex-col h-full overflow-hidden relative">
                  <div className="h-44 overflow-hidden relative shrink-0">
                    <img 
                      src={journal.coverImage} 
                      alt={journal.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent"></div>
                    <span className="absolute top-3.5 left-3.5 bg-navy-950/80 text-primary-400 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider py-0.5 px-2.5 rounded-md">
                      {journal.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-bold text-navy-950 group-hover:text-primary-600 transition-colors text-sm line-clamp-2 leading-snug">
                        {journal.title}
                      </h3>
                      <p className="text-[10px] text-gray-500 font-semibold mt-1">Editors: {journal.editors || 'Editorial Board'}</p>
                      
                      <div className="flex gap-3 mt-2 text-[10px] font-semibold">
                        <span className="inline-flex items-center gap-1 text-gray-500">
                          <Eye className="w-3 h-3 text-gray-400" />
                          {(Math.floor(Math.random() * 5000) + 1000).toLocaleString()} <span className="text-gray-400 font-normal">views</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-gray-500">
                          <BarChart3 className="w-3 h-3 text-gray-400" />
                          {(Math.floor(Math.random() * 15000) + 5000).toLocaleString()} <span className="text-gray-400 font-normal">impressions</span>
                        </span>
                      </div>
                      
                      <p className="text-[11px] text-gray-500 mt-2.5 line-clamp-2 leading-relaxed">
                        {journal.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-gray-100/60 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Impact: <span className="text-primary-700 font-extrabold">{journal.impactFactor}</span>
                      </span>
                      <span className="text-xs font-bold text-primary-600 flex items-center group-hover:text-primary-700">
                        View Details <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group hover:border-primary-300 transition-all flex flex-col h-full cursor-pointer">
                <div className="h-20 overflow-hidden bg-gray-100">
                  <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-navy-900 text-sm mb-1">Find an article</h3>
                  <p className="text-gray-500 text-[10px] leading-snug">Browse our extensive collection of research.</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group hover:border-primary-300 transition-all flex flex-col h-full cursor-pointer">
                <div className="h-20 overflow-hidden bg-gray-100">
                  <img src="https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-navy-900 text-sm mb-1">Find a topic</h3>
                  <p className="text-gray-500 text-[10px] leading-snug">Research Topics bringing experts together.</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group hover:border-primary-300 transition-all flex flex-col h-full cursor-pointer">
                <div className="h-20 overflow-hidden bg-gray-100">
                  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-navy-900 text-sm mb-1">Submit research</h3>
                  <p className="text-gray-500 text-[10px] leading-snug">Start your publishing journey here.</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group hover:border-primary-300 transition-all flex flex-col h-full cursor-pointer">
                <div className="h-20 overflow-hidden bg-gray-100">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-navy-900 text-sm mb-1">Peer review</h3>
                  <p className="text-gray-500 text-[10px] leading-snug">Rigorous evaluation by expert panels.</p>
                </div>
              </div>

            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {dummyEditors.map((editor, i) => (
                <EditorProfileCard key={i} editor={editor} />
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
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" 
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
                <img src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=800" alt="Virus" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
                <img src="https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&q=80&w=800" alt="Whale" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
