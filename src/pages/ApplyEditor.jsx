import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, User, Building, Link as LinkIcon, FileText, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function ApplyEditor() {
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    email: '',
    institution: '',
    expertise: '',
    scholarUrl: '',
    coverLetter: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-md w-full p-10 text-center"
        >
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-navy-950 mb-3 tracking-tight">Application Received!</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            Thank you for applying to the InnovInc Editorial Board. Our review committee will evaluate your application and get back to you within 2-3 weeks.
          </p>
          <Link to="/">
            <Button className="w-full h-12 rounded-xl shadow-lg shadow-primary-500/20 font-bold">
              Return to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full bg-white p-8 sm:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <Link to="/" className="flex items-center gap-2 group mb-6 inline-flex">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20 group-hover:scale-105 transition-transform">
              <BookOpen className="text-white w-7 h-7" />
            </div>
          </Link>
          <h1 className="text-3xl font-black text-navy-950 tracking-tight mb-2">Join Our Editorial Board</h1>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            We are looking for dedicated researchers to help us maintain the highest standards of scientific rigor. Please fill out your credentials below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5 md:col-span-1">
              <label className="text-sm font-semibold text-navy-900">Title</label>
              <select 
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none text-sm text-navy-900 appearance-none"
              >
                <option value="" disabled>Select</option>
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
              </select>
            </div>
            
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-navy-900">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none text-sm font-medium text-navy-900 placeholder-gray-400"
                  placeholder="Jane Doe"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-navy-900">Primary Institution / Affiliation</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Building className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="institution"
                required
                value={formData.institution}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none text-sm font-medium text-navy-900 placeholder-gray-400"
                placeholder="University or Research Center"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-navy-900">Areas of Expertise</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="expertise"
                  required
                  value={formData.expertise}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none text-sm font-medium text-navy-900 placeholder-gray-400"
                  placeholder="e.g. Oncology, Immunology"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-navy-900">Google Scholar / ORCID URL</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  name="scholarUrl"
                  required
                  value={formData.scholarUrl}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none text-sm font-medium text-navy-900 placeholder-gray-400"
                  placeholder="https://"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-navy-900">Cover Letter / Motivation</label>
            <textarea 
              name="coverLetter"
              required
              rows="4"
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Briefly describe your editorial experience and motivation to join us..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none text-sm text-navy-900 resize-none"
            ></textarea>
          </div>

          <div className="pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
            <Link to="/register" className="w-full sm:w-auto">
              <Button type="button" variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 font-bold">
                Cancel
              </Button>
            </Link>
            <Button 
              type="submit" 
              className="w-full sm:w-auto h-12 px-10 rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Submit Application <ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </div>

        </form>
      </motion.div>
    </div>
  )
}
