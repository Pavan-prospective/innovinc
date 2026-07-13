import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight, Tag } from 'lucide-react'
import { Button } from '../components/ui/Button'

const dummyNews = [
  {
    id: 1,
    title: "Tech race moves from AI to factories, hospitals, and power grids",
    category: "InnovInc News",
    date: "28 Jun 2026",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    summary: "In the Top 10 Emerging Technologies of 2026 report, cutting-edge technologies act directly on power grids, drug pipelines, food production, cooling systems, and robotics."
  },
  {
    id: 2,
    title: "InnovInc in Science: How 'peacemakers' of the immune system could unlock long-term disease remission",
    category: "Science News",
    date: "25 Jun 2026",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=800",
    summary: "'Peacemaker' immune cells could help treat diseases ranging from type 1 diabetes to neurodegeneration."
  },
  {
    id: 3,
    title: "Arabian Sea humpback whale's long-distance trip further highlights species' unique ecology",
    category: "Nature News",
    date: "19 Jun 2026",
    image: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&q=80&w=800",
    summary: "The results showed most whales are homebodies – moving within a narrow latitudinal band."
  },
  {
    id: 4,
    title: "Breakthrough in Quantum Computing: New Error Correction Protocol",
    category: "Technology",
    date: "15 Jun 2026",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
    summary: "Researchers have demonstrated a novel approach to quantum error correction, paving the way for more stable quantum systems."
  },
  {
    id: 5,
    title: "Global Summit on Climate Change Highlights Urgent Need for Action",
    category: "Environment",
    date: "10 Jun 2026",
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9cce?auto=format&fit=crop&q=80&w=800",
    summary: "World leaders gather to discuss aggressive new targets for reducing carbon emissions by 2030."
  },
  {
    id: 6,
    title: "Advancements in Personalized Medicine Show Promise in Cancer Trials",
    category: "Health",
    date: "05 Jun 2026",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    summary: "Tailored treatments based on individual genetic profiles are showing unprecedented success rates in early-stage trials."
  }
]

export default function News() {
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', 'InnovInc News', 'Science News', 'Nature News', 'Technology', 'Environment', 'Health']

  const filteredNews = activeCategory === 'All' 
    ? dummyNews 
    : dummyNews.filter(news => news.category === activeCategory)

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-navy-950 py-24 overflow-hidden border-b border-white/10">
        <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-50%] right-[-20%] w-[800px] h-[800px] bg-accent-600/10 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-500">News</span> & Insights
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Stay updated with the latest breakthroughs, research highlights, and announcements from the scientific community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-400 hover:text-navy-900 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news, idx) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link to={`/news/${news.id}`} className="group block h-full">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.03)] hover:shadow-xl hover:border-primary-300/70 transition-all duration-300 flex flex-col h-full overflow-hidden">
                  
                  {/* Image */}
                  <div className="h-56 overflow-hidden relative shrink-0">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold text-navy-900 uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                      <Tag className="w-3 h-3 text-primary-600" /> {news.category}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold mb-3">
                      <Calendar className="w-3.5 h-3.5" /> {news.date}
                    </div>
                    
                    <h3 className="font-bold text-navy-950 text-xl leading-snug mb-3 group-hover:text-primary-600 transition-colors line-clamp-3">
                      {news.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow">
                      {news.summary}
                    </p>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-sm font-bold text-primary-600 group-hover:text-primary-700">
                      Read Article <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {filteredNews.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-gray-500">No news articles found in this category.</h3>
          </div>
        )}

      </section>
    </div>
  )
}
