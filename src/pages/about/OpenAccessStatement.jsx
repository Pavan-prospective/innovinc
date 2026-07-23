import React from 'react'
import { Unlock, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../../components/ui/Card'

export default function OpenAccessStatement() {
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
            Open Access <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-200">Statement</span>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full space-y-8">
        
        <Card className="bg-white border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden">
          <CardContent className="p-8 md:p-10 space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center border border-primary-100 shrink-0">
                <Unlock className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-navy-950">Our Commitment to Open Access</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Innovinc is fully committed to the principle of open, unrestricted access to scientific knowledge. All articles published by Innovinc are <strong className="text-navy-900">immediately and permanently free</strong> for anyone to read, download, copy, distribute, print, and search without paywalls or subscription barriers.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden">
          <CardContent className="p-8 md:p-10 space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center border border-primary-100 shrink-0">
                <ShieldCheck className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-navy-950">Licensing Framework</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              All published content is distributed under the terms of the <strong className="text-navy-900">Creative Commons Attribution 4.0 International License (CC BY 4.0)</strong>. This permits unrestricted use, distribution, and reproduction in any medium, provided the original work and source are properly cited.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
