import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Download, Share2, Quote, BookOpen, Users } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { api } from '../api/apiClient'

export default function JournalDetails() {
  const { journalId } = useParams()
  const [journal, setJournal] = useState(null)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [journalData, allArticles] = await Promise.all([
          api.journals.getById(journalId),
          api.articles.getAll()
        ])
        setJournal(journalData)
        // Filter articles for this journal
        setArticles(allArticles.filter(a => a.journalId === journalId))
      } catch (error) {
        console.error("Failed to fetch journal details", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [journalId])

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!journal) {
    return <div className="text-center py-20 text-2xl font-bold">Journal not found</div>
  }

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      {/* Journal Banner */}
      <section className="bg-navy-950 text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-48 h-64 shrink-0 rounded-xl overflow-hidden border border-navy-800 shadow-2xl">
              <img src={journal.coverImage} alt={journal.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
              <Badge variant="secondary" className="bg-primary-900/50 text-primary-100 border-primary-800 mb-4">
                {journal.category}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">{journal.title}</h1>
              <div className="flex flex-wrap gap-6 text-sm text-gray-300 mb-8">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">ISSN:</span> {journal.issn}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">Impact Factor:</span> {journal.impactFactor}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">Latest Issue:</span> {journal.latestIssue}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="px-8 rounded-full">Submit Manuscript</Button>
                <Button size="lg" variant="outline" className="px-8 rounded-full text-navy-950 border-white hover:bg-white hover:text-navy-950">
                  Current Issue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row gap-8">
        
        {/* Left Column (Content) */}
        <div className="lg:w-2/3 space-y-12">
          
          {/* Aims & Scope */}
          <div>
            <h2 className="text-2xl font-bold text-navy-950 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary-600" /> Aims & Scope
            </h2>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-gray-700 leading-relaxed">
              {journal.description} 
              <br/><br/>
              The journal welcomes submissions that contribute to the fundamental understanding and practical applications in this domain. All published articles are subject to rigorous peer review to ensure the highest quality of scientific integrity and impact.
            </div>
          </div>

          {/* Latest Articles */}
          <div>
            <h2 className="text-2xl font-bold text-navy-950 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary-600" /> Latest Articles
            </h2>
            <div className="space-y-4">
              {articles.length > 0 ? articles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="hover:border-primary-200 transition-colors">
                    <CardHeader className="pb-4">
                      <Link to={`/articles/${article.id}`}>
                        <CardTitle className="text-xl hover:text-primary-600 transition-colors mb-2">
                          {article.title}
                        </CardTitle>
                      </Link>
                      <p className="text-sm text-gray-600 mb-2">{article.authors.join(', ')}</p>
                      <div className="text-xs text-gray-500">Published: {new Date(article.publicationDate).toLocaleDateString()}</div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        {article.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-gray-100 font-normal">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )) : (
                <div className="text-gray-500 bg-white p-6 rounded-xl border border-gray-100">No recent articles found for this journal.</div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:w-1/3 space-y-6">
          
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
                <Button variant="link" className="px-0 pt-2 w-full justify-start text-primary-600">View full editorial board &rarr;</Button>
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
                <li><a href="#" className="text-primary-600 hover:underline">Author Guidelines (PDF)</a></li>
                <li><a href="#" className="text-primary-600 hover:underline">Manuscript Template (Word)</a></li>
                <li><a href="#" className="text-primary-600 hover:underline">Reviewer Guidelines (PDF)</a></li>
              </ul>
            </CardContent>
          </Card>
          
        </div>
      </section>
    </div>
  )
}
