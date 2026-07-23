import React from 'react'
import { Globe, Zap, Copyright, Headset, Database } from 'lucide-react'
import { motion } from 'framer-motion'

export default function WhyPublishWithUs() {
  const advantages = [
    {
      title: "Global Reach & High Visibility",
      description: "Immediate open-access availability ensures your research is free to read, download, and cite worldwide from day one.",
      icon: <Globe className="w-8 h-8 text-primary-600" />
    },
    {
      title: "Fast & Rigorous Peer Review",
      description: "Our streamlined editorial workflows ensure a quick decision process without compromising scientific rigor or evaluation quality.",
      icon: <Zap className="w-8 h-8 text-primary-600" />
    },
    {
      title: "Retain Your Copyright",
      description: "Authors retain 100% copyright ownership of their published work under the flexible Creative Commons Attribution (CC BY 4.0) license.",
      icon: <Copyright className="w-8 h-8 text-primary-600" />
    },
    {
      title: "Dedicated Author Support",
      description: "Responsive editorial assistance and guidance at every stage of the submission, review, and publication journey.",
      icon: <Headset className="w-8 h-8 text-primary-600" />
    },
    {
      title: "Permanent Digital Archiving",
      description: "Every article receives a unique Digital Object Identifier (DOI) and is permanently preserved in digital repositories for long-term accessibility.",
      icon: <Database className="w-8 h-8 text-primary-600" />
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <section className="bg-navy-950 text-white relative py-24 overflow-hidden">
        <div className="absolute inset-0 select-none pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 to-navy-900/50"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
          >
            Why Publish <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-200">With Us?</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            The Innovinc Advantage
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full space-y-16">
        <section className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 text-center max-w-4xl mx-auto">
          <p className="text-gray-700 text-lg leading-relaxed">
            Publishing with <strong className="text-navy-900">Innovinc</strong> offers researchers a high-impact global platform to maximize the reach, readership, and real-world application of their work.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-primary-100 transition-all flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center border border-primary-100">
                {adv.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-950 mb-3">{adv.title}</h3>
                <p className="text-gray-600 leading-relaxed">{adv.description}</p>
              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  )
}
