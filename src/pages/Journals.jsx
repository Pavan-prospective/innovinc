import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { api } from '../api/apiClient'

export default function Journals() {
  const [journals, setJournals] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* Header */}
      <section className="bg-navy-950 text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Browse Journals</h1>
          <p className="text-xl text-gray-400 max-w-2xl mb-8">
            Explore our comprehensive collection of peer-reviewed, open access scientific journals across all major disciplines.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-3xl">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="Search by journal title, subject, or ISSN..." 
                className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white focus:text-navy-900"
              />
            </div>
            <Button size="lg" className="h-12 px-8">Search</Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <div className="lg:w-1/4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
            <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary-600" /> Filter by Subject
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="category" defaultChecked className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">All Subjects</span>
              </label>
              {categories.map(cat => (
                <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="category" className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500" />
                  <span className="text-sm text-gray-600 group-hover:text-primary-600 transition-colors">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Journal List */}
        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {journals.map((journal, i) => (
              <motion.div
                key={journal.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/journals/${journal.id}`} className="block h-full">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-transparent hover:border-primary-100">
                    <div className="h-48 overflow-hidden relative">
                      <img src={journal.coverImage} alt={journal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent"></div>
                      <Badge className="absolute top-4 left-4 bg-white/90 text-navy-900 backdrop-blur-sm border-none shadow-sm">
                        {journal.category}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl leading-tight group-hover:text-primary-600 transition-colors line-clamp-2">
                        {journal.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 mt-2">
                        {journal.description}
                      </CardDescription>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                        <span className="text-sm font-medium text-gray-500">IF: {journal.impactFactor}</span>
                        <span className="text-sm font-medium text-primary-600 flex items-center group-hover:translate-x-1 transition-transform">
                          Explore <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </section>
    </div>
  )
}
