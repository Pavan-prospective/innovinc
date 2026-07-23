import React from 'react'
import { FileText, BookOpen, Clock, Activity, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ArticleTypes() {
  const types = [
    {
      title: "Original Research Articles",
      desc: "Full-length scientific reports presenting novel empirical data, theoretical frameworks, or experimental methodology and results.",
      icon: <FileText className="w-8 h-8 text-primary-600" />
    },
    {
      title: "Review Papers",
      desc: "Comprehensive overviews and critical evaluations of current research trends, developments, and future perspectives within a specific field.",
      icon: <BookOpen className="w-8 h-8 text-primary-600" />
    },
    {
      title: "Short Communications",
      desc: "Concise papers designed to rapidly communicate high-priority, preliminary, or time-sensitive scientific findings.",
      icon: <Clock className="w-8 h-8 text-primary-600" />
    },
    {
      title: "Case Studies & Reports",
      desc: "Detailed accounts of specific real-world implementations, clinical observations, or unique practical applications.",
      icon: <Activity className="w-8 h-8 text-primary-600" />
    },
    {
      title: "Letters to the Editor",
      desc: "Short discussions or commentary regarding recently published papers in Innovinc journals.",
      icon: <MessageSquare className="w-8 h-8 text-primary-600" />
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <section className="bg-navy-950 text-white relative py-24 overflow-hidden">
        <div className="absolute inset-0 select-none pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,163,89,0.15),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-navy-900"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
          >
            Article <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-200">Types</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            What We Publish
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full space-y-12">
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center max-w-4xl mx-auto">
          <p className="text-gray-700 text-lg leading-relaxed">
            <strong className="text-navy-900">Innovinc</strong> welcomes diverse scientific and academic contributions across multiple disciplines. Authors can submit manuscripts under the following categories:
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {types.map((type, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-primary-100 transition-all flex flex-col gap-4"
            >
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center border border-primary-100">
                {type.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-950 mb-3">{type.title}</h3>
                <p className="text-gray-600 leading-relaxed">{type.desc}</p>
              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  )
}
