import React, { useState } from 'react'
import { ClipboardCheck, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../../components/ui/Card'
import { cn } from '../../utils/cn'

export default function SubmissionChecklist() {
  const [checkedItems, setCheckedItems] = useState(new Set())

  const items = [
    "Manuscript file is saved in .docx or LaTeX format according to the formatting guidelines.",
    "Abstract (under 250 words) and 4–6 keywords are prepared.",
    "All co-author details (full names, institutional affiliations, and email addresses) are correctly listed on the title page.",
    "All figures and tables are numbered, cited in sequential order within the text, and high resolution (300+ DPI).",
    "Ethical approval details and funding disclosures are clearly stated.",
    "Reference citations match the required journal style (APA/IEEE) and all cited sources are present in the reference list.",
    "All authors have reviewed, verified, and approved the final manuscript version prior to submission."
  ]

  const toggleCheck = (idx) => {
    const next = new Set(checkedItems)
    if (next.has(idx)) {
      next.delete(idx)
    } else {
      next.add(idx)
    }
    setCheckedItems(next)
  }

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
            Quick Submission <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-200">Checklist</span>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full space-y-12">
        <Card className="bg-white border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden">
          <CardContent className="p-8 md:p-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center border border-primary-100 shrink-0">
                <ClipboardCheck className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-navy-950">Pre-Submission Verification</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Please review this quick checklist to confirm your manuscript is ready for submission through our online editorial manager:
            </p>

            <div className="space-y-4">
              {items.map((item, idx) => {
                const isChecked = checkedItems.has(idx)
                return (
                  <div 
                    key={idx} 
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                      isChecked ? "bg-primary-50/50 border-primary-200 shadow-sm" : "bg-white border-gray-200 hover:border-primary-300 hover:bg-gray-50"
                    )}
                    onClick={() => toggleCheck(idx)}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5 border transition-colors",
                      isChecked ? "bg-primary-600 border-primary-600 text-white" : "bg-white border-gray-300 text-transparent"
                    )}>
                      <Check className="w-4 h-4" />
                    </div>
                    <span className={cn(
                      "text-gray-700 leading-relaxed transition-all",
                      isChecked && "text-navy-900 font-medium"
                    )}>{item}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
