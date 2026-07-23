import React from 'react'
import { Target, Globe, BookOpen, Atom, Microscope, HeartPulse, BookMarked } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MissionAndScope() {
  const scopeItems = [
    {
      title: "Physical Sciences & Engineering",
      description: "Physics, Chemistry, Materials Science, Computer Science, and Engineering innovation.",
      icon: <Atom className="w-8 h-8 text-primary-600" />
    },
    {
      title: "Life Sciences & Biotechnology",
      description: "Biology, Agricultural Sciences, Genetics, and Environmental Sciences.",
      icon: <Microscope className="w-8 h-8 text-primary-600" />
    },
    {
      title: "Health & Medical Sciences",
      description: "Clinical Medicine, Public Health, Pharmacy, and Biomedical Research.",
      icon: <HeartPulse className="w-8 h-8 text-primary-600" />
    },
    {
      title: "Social Sciences & Humanities",
      description: "Economics, Management, Education, and Interdisciplinary Social Studies.",
      icon: <BookMarked className="w-8 h-8 text-primary-600" />
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <section className="bg-navy-950 text-white relative py-24 overflow-hidden">
        <div className="absolute inset-0 select-none pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2500" 
            className="w-full h-full object-cover opacity-20" 
            alt="Mission Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 to-navy-900/50"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
          >
            Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-200">and Scope</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Empowering researchers, academics, and industry professionals by providing an open, rigorous, and rapid platform.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full space-y-16">
        
        {/* Mission Statement */}
        <section className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-10 items-center">
          <div className="shrink-0">
            <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center">
              <Target className="w-10 h-10 text-primary-600" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-navy-950 mb-4">Mission Statement</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              At <strong className="text-navy-900">Innovinc</strong>, our mission is to empower researchers, academics, and industry professionals by providing an open, rigorous, and rapid platform for disseminating groundbreaking scientific research. We are dedicated to fostering global knowledge sharing, advancing interdisciplinary collaboration, and ensuring that high-quality scholarly work reaches the widest possible audience.
            </p>
          </div>
        </section>

        {/* Scope of the Journal */}
        <section>
          <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-navy-950 mb-3 flex items-center justify-center md:justify-start gap-3">
                <Globe className="w-8 h-8 text-primary-600" /> Scope of the Journal
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl">
                Innovinc publishes peer-reviewed scholarly research across a broad spectrum of disciplines.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scopeItems.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-primary-100 transition-all flex gap-5"
              >
                <div className="shrink-0 mt-1">
                  <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-950 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 bg-primary-50 rounded-xl p-6 border border-primary-100 flex gap-4 items-start">
            <BookOpen className="w-6 h-6 text-primary-600 shrink-0 mt-0.5" />
            <p className="text-navy-950 font-medium">
              We welcome original research articles, comprehensive review papers, short communications, and case studies that contribute significantly to the global scientific community.
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}
