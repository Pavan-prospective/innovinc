import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Filter, Search, Eye, BarChart3 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { api } from '../api/apiClient'

export default function Journals() {
  const [journals, setJournals] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [showGallery, setShowGallery] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [journalsData, categoriesData] = await Promise.all([
          api.journals.getAll(),
          api.categories.getAll()
        ])
        setJournals(journalsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Failed to fetch journals", error)
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

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      
      {/* Premium Navy & Gold Header with High-Impact Background Image */}
      <section className="relative bg-navy-950 text-white pt-32 pb-20 overflow-hidden">
        {/* Backdrop Image */}
        <div className="absolute inset-0 select-none pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-40" 
            alt="Library Backdrop" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/60 to-navy-900/30"></div>
        </div>

        {/* Glow blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Browse Academic Journals</h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed">
            Explore our comprehensive collection of peer-reviewed, open access scientific journals delivering high-impact research across major clinical and engineering disciplines.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl bg-white/5 backdrop-blur-md p-2 rounded-xl border border-white/10 shadow-2xl">
            <div className="relative flex-grow flex items-center">
              <Search className="absolute left-3.5 text-gray-400 w-5 h-5 shrink-0" />
              <Input 
                placeholder="Search by journal title, subject, or ISSN..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-11 bg-transparent border-none text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 w-full"
              />
            </div>
            <Button size="lg" className="h-11 px-8 bg-primary-500 hover:bg-primary-600 text-navy-950 font-bold border-none transition-all shadow-md shadow-primary-500/20">Search</Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row gap-10">
        
        {/* Journal List (Left 2/3) */}
        <div className="lg:w-2/3">

           {/* Filters Toggle Widget (Moved from Sidebar) */}
           <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.03)] overflow-hidden mb-6">
             <div 
               className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
               onClick={() => setShowFilters(!showFilters)}
             >
               <h3 className="font-bold text-navy-950 text-sm flex items-center gap-2">
                 <Filter className="w-4 h-4 text-primary-600" /> Filter by Subject
               </h3>
               <span className="text-gray-400 text-xs font-bold">{showFilters ? 'Hide' : 'Show Filters'}</span>
             </div>
             
             {showFilters && (
               <div className="px-4 pb-4 pt-2 border-t border-gray-50 space-y-3">
                 <label className="flex items-center gap-3 cursor-pointer group">
                   <input type="radio" name="category" checked={activeCategory === 'All'} onChange={() => setActiveCategory('All')} className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500 accent-primary-600" />
                   <span className={`text-sm font-semibold transition-colors ${activeCategory === 'All' ? 'text-primary-600' : 'text-navy-950 group-hover:text-primary-600'}`}>All Subjects</span>
                 </label>
                 {categories.map(cat => (
                   <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                     <input type="radio" name="category" checked={activeCategory === cat.name} onChange={() => setActiveCategory(cat.name)} className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500 accent-primary-600" />
                     <span className={`text-sm font-medium transition-colors ${activeCategory === cat.name ? 'text-primary-600 font-bold' : 'text-gray-600 group-hover:text-primary-600'}`}>{cat.name}</span>
                   </label>
                 ))}
               </div>
             )}
           </div>

          <div className="flex flex-col gap-3">
            {journals
              .filter(j => {
                const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                      (j.category && j.category.toLowerCase().includes(searchQuery.toLowerCase()));
                const matchesCat = activeCategory === 'All' || j.category === activeCategory;
                return matchesSearch && matchesCat;
              })
              .map((journal, i) => (
              <motion.div
                key={journal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.5) }}
              >
                <Link to={`/journals/${journal.id}`} className="block">
                  <div className="flex items-center gap-4 sm:gap-6 p-4 bg-white rounded-xl border border-gray-100 hover:border-primary-300 hover:shadow-[0_4px_20px_-4px_rgba(212,163,89,0.15)] transition-all group">
                    
                    {/* Tiny Image */}
                    <div className="w-16 h-20 sm:w-20 sm:h-28 rounded bg-gray-50 overflow-hidden shrink-0 relative border border-gray-100">
                      <img src={journal.coverImage} alt={journal.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    {/* Content */}
                    <div className="flex-grow flex flex-col justify-center min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-navy-950 group-hover:text-primary-600 transition-colors line-clamp-1 mb-1">
                        {journal.title}
                      </h3>
                      
                      <p className="text-xs text-gray-500 font-medium truncate mb-2">Editors: {journal.editors || 'Editorial Board'}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <span className="text-[10px] font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded border border-primary-100/50">
                          {journal.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                          <Eye className="w-3 h-3 text-gray-300" />
                          {(Math.floor(Math.random() * 5000) + 1000).toLocaleString()} <span className="hidden sm:inline">views</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                          <BarChart3 className="w-3 h-3 text-gray-300" />
                          {(Math.floor(Math.random() * 15000) + 5000).toLocaleString()} <span className="hidden sm:inline">impressions</span>
                        </span>
                      </div>
                    </div>
                    
                    {/* Arrow Icon */}
                    <div className="hidden sm:flex shrink-0 pr-2">
                       <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
            
            {journals.filter(j => {
                const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                      (j.category && j.category.toLowerCase().includes(searchQuery.toLowerCase()));
                const matchesCat = activeCategory === 'All' || j.category === activeCategory;
                return matchesSearch && matchesCat;
              }).length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                  <p className="text-gray-500 font-medium">No journals found matching your criteria.</p>
                  <Button variant="outline" className="mt-4 text-xs" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>Clear Filters</Button>
                </div>
            )}
          </div>

          {/* Featured Image Gallery (Fills space below list) */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <h3 className="font-bold text-navy-950 text-lg mb-4 hidden md:block">Cover Gallery</h3>
            
            {/* Mobile Toggle */}
            <div className="md:hidden mb-4">
              <Button variant="outline" className="w-full text-xs font-bold" onClick={() => setShowGallery(!showGallery)}>
                {showGallery ? 'Hide Cover Gallery' : 'View Cover Gallery'}
              </Button>
            </div>
            
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${showGallery ? 'grid' : 'hidden md:grid'}`}>
               {journals.slice(0, 8).map(journal => (
                 <div key={`gallery-${journal.id}`} className="relative rounded-lg overflow-hidden group h-32 md:h-40 cursor-pointer shadow-sm border border-gray-100">
                    <img src={journal.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-navy-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center">
                       <span className="text-[9px] font-bold text-primary-400 uppercase tracking-wider mb-1">{journal.category}</span>
                       <h4 className="text-white text-[10px] font-bold line-clamp-3 leading-snug">{journal.title}</h4>
                    </div>
                 </div>
               ))}
            </div>
          </div>

        </div>

        {/* Sidebar (Right 1/3) */}
        <div className="lg:w-1/3 space-y-8">
           
           {/* Sign Up Widget */}
           <div className="bg-gradient-to-br from-navy-950 to-navy-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
               <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl group-hover:bg-primary-500/30 transition-colors"></div>
               <h3 className="font-bold text-lg mb-2 relative z-10">Publish with InnovInc</h3>
               <p className="text-gray-300 text-sm mb-5 relative z-10">Join our global network of researchers and submit your manuscript today.</p>
               <Button className="w-full bg-primary-500 hover:bg-primary-600 text-navy-950 font-bold border-none shadow-md shadow-primary-500/20 relative z-10">Create Account</Button>
           </div>

           {/* Popular Articles Widget */}
           <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(15,23,42,0.03)] border border-gray-100">
             <h3 className="font-bold text-navy-950 text-base mb-4 pb-3 border-b border-gray-100">Browse journals and books in:</h3>
             <div className="space-y-4">
               <div className="group cursor-pointer border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                 <h4 className="text-sm font-semibold text-navy-900 group-hover:text-primary-600 transition-colors leading-snug">The urokinase receptor: Focused cell surface proteolysis, cell adhesion and signaling</h4>
                 <p className="text-xs text-gray-500 mt-1.5">FEBS Letters, Volume 584, Issue 9</p>
               </div>
               <div className="group cursor-pointer border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                 <h4 className="text-sm font-semibold text-navy-900 group-hover:text-primary-600 transition-colors leading-snug">In vitro neurons learn and exhibit sentience when embodied in a simulated game-world</h4>
                 <p className="text-xs text-gray-500 mt-1.5">Neuron, Volume 110, Issue 23</p>
               </div>
               <div className="group cursor-pointer border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                 <h4 className="text-sm font-semibold text-navy-900 group-hover:text-primary-600 transition-colors leading-snug">Hallmarks of cancer—Then and now, and beyond</h4>
                 <p className="text-xs text-gray-500 mt-1.5">Cell, Volume 189, Issue 8</p>
               </div>
             </div>
           </div>

           {/* Recent Publications Widget */}
           <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(15,23,42,0.03)] border border-gray-100">
             <h3 className="font-bold text-navy-950 text-base mb-4 pb-3 border-b border-gray-100">Recent Publications</h3>
             <ul className="space-y-3">
                <li><Link to="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors block border-l-2 border-transparent hover:border-primary-500 pl-2">Advances in Nanomedicine (2026)</Link></li>
                <li><Link to="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors block border-l-2 border-transparent hover:border-primary-500 pl-2">Global Climate Modeling (2026)</Link></li>
                <li><Link to="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors block border-l-2 border-transparent hover:border-primary-500 pl-2">Next-Gen Sequencing Tech (2026)</Link></li>
                <li><Link to="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors block border-l-2 border-transparent hover:border-primary-500 pl-2">Artificial Intelligence in Healthcare (2026)</Link></li>
             </ul>
           </div>

           {/* Certified Brands Widget */}
           <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.03)]">
              <h3 className="font-bold text-navy-950 text-base mb-4 pb-3 border-b border-gray-100">Certified Brands & Indexing</h3>
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

        </div>

      </section>

      {/* Categories Showcase Section */}
      <section className="py-16 bg-white w-full border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-navy-950 tracking-tight">Explore by Subject Area</h2>
            <p className="text-sm text-gray-500 mt-2">Discover curated collections of research in specific fields.</p>
          </div>

          <div className="space-y-12">
            {categories.slice(0, 3).map((category) => {
              const categoryJournals = journals.filter(j => j.category === category.name).slice(0, 3);
              if (categoryJournals.length === 0) return null;
              
              return (
                <div key={category.id}>
                  <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-2">
                    <h3 className="text-lg font-bold text-navy-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                      {category.name}
                    </h3>
                    <Button variant="ghost" className="text-xs text-primary-600 hover:text-primary-700 h-8" onClick={() => {
                      setActiveCategory(category.name);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}>View All {category.name} <ArrowRight className="w-3 h-3 ml-1" /></Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryJournals.map(journal => (
                      <Link to={`/journals/${journal.id}`} key={journal.id} className="block group">
                        <div className="bg-[#f8fafc] rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md hover:border-primary-200 transition-all h-full flex flex-col relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-16 h-16 bg-primary-500/5 rounded-bl-[100px] -z-0"></div>
                          <div className="h-40 rounded-lg overflow-hidden mb-4 relative z-10 border border-gray-100 shadow-sm">
                             <img src={journal.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="relative z-10 flex flex-col flex-grow">
                             <h4 className="font-bold text-navy-950 text-sm group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">{journal.title}</h4>
                             <p className="text-xs text-gray-500 line-clamp-2 mt-2">{journal.description}</p>
                             <div className="mt-auto pt-4 flex items-center gap-2">
                               <span className="text-[10px] font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded">{journal.category}</span>
                             </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  )
}
