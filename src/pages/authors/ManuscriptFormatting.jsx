import React from 'react'
import { FileCode, Type, LayoutTemplate, Layers } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../../components/ui/Card'

export default function ManuscriptFormatting() {
  const structureItems = [
    { title: "Title Page", desc: "Full manuscript title, all author names, affiliations, and contact email of the corresponding author." },
    { title: "Abstract", desc: "A clear summary of the study context, methods, results, and conclusions (maximum 250 words)." },
    { title: "Keywords", desc: "4 to 6 relevant index terms." },
    { title: "Main Text Body", desc: "Structured into Introduction, Materials & Methods, Results, Discussion, and Conclusion." },
    { title: "Declarations", desc: "Ethics approval, funding sources, and conflict of interest statements." },
    { title: "References", desc: "Formatted strictly in standard APA or IEEE style." },
    { title: "Figures and Tables", desc: "High-resolution images (minimum 300 DPI) and tables must be embedded directly inline where they are referenced in the text." },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <section className="bg-navy-950 text-white relative py-24 overflow-hidden">
        <div className="absolute inset-0 select-none pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-navy-900"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
          >
            Manuscript Formatting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-200">Guidelines</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Manuscript Preparation Standards
          </motion.p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full space-y-12">
        <Card className="bg-white border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden">
          <CardContent className="p-8 md:p-10">
            <h2 className="text-2xl font-bold text-navy-950 mb-4">General Formatting</h2>
            <p className="text-gray-600 mb-8">To help expedite the peer-review and copyediting processes, please ensure your manuscript adheres to the following formatting standards before submission:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center border border-primary-100 shrink-0">
                  <FileCode className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy-950">Accepted File Formats</h3>
                  <p className="text-gray-700 mt-1">Microsoft Word (.docx) or LaTeX format.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center border border-primary-100 shrink-0">
                  <Type className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy-950">Typography & Layout</h3>
                  <p className="text-gray-700 mt-1">12 pt Times New Roman or Arial font, 1.5 line spacing, and 1-inch (2.54 cm) margins throughout.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden">
          <CardContent className="p-8 md:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center border border-primary-100 shrink-0">
                <Layers className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-navy-950">Required Document Structure</h2>
            </div>
            
            <div className="space-y-6">
              {structureItems.map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-baseline border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="text-lg font-bold text-navy-950 md:w-1/3 shrink-0">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
