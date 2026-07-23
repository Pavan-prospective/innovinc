import React from 'react'
import { Copyright, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../../components/ui/Card'

export default function CopyrightStatement() {
  const policies = [
    {
      title: "Copyright Retention",
      desc: "Authors retain full copyright of their work published with Innovinc."
    },
    {
      title: "Publishing License",
      desc: "Authors grant Innovinc an exclusive or non-exclusive license to publish, display, distribute, and archive the article."
    },
    {
      title: "Reuse Policy",
      desc: "Articles are released under the Creative Commons Attribution (CC BY 4.0) license, allowing free reuse and distribution with proper attribution."
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      {/* Header */}
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
            Copyright <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-200">Statement</span>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full space-y-8">
        
        <Card className="bg-white border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden">
          <CardContent className="p-8 md:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center border border-primary-100 shrink-0">
                <Copyright className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-navy-950">Author Ownership & Licensing Rights</h2>
                <p className="text-gray-600 mt-1">At Innovinc, we believe authors should retain ownership of their intellectual property:</p>
              </div>
            </div>

            <div className="space-y-6">
              {policies.map((policy, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-950">{policy.title}</h3>
                    <p className="text-gray-700 leading-relaxed mt-1">{policy.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
