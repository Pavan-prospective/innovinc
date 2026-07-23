import React from 'react'
import { DollarSign, FileText, Gift, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../../components/ui/Card'

export default function PublishingFees() {
  const fees = [
    { label: "Original Research Articles", value: "$ [Insert Amount] USD" },
    { label: "Review Articles", value: "$ [Insert Amount] USD" },
    { label: "Short Communications & Case Reports", value: "$ [Insert Amount] USD" },
    { label: "Manuscript Submission Fee", value: "$0 USD (Free to submit)" },
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
            Publishing <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-200">Fees</span>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full space-y-12">
        <Card className="bg-white border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden">
          <CardContent className="p-8 md:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center border border-primary-100 shrink-0">
                <DollarSign className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-navy-950">Article Processing Charges (APC)</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              As an open-access publisher, Innovinc does not charge subscription fees to readers or academic institutions. To sustain our publishing infrastructure—including peer-review management, copyediting, typesetting, DOI registration, and digital archiving—an Article Processing Charge (APC) is billed <strong className="text-navy-900">only after</strong> a manuscript is formally accepted for publication.
            </p>

            <div className="border border-gray-200 rounded-xl overflow-hidden mb-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-navy-900 text-white">
                    <th className="py-4 px-6 font-bold text-lg border-b border-navy-800">Article Category</th>
                    <th className="py-4 px-6 font-bold text-lg border-b border-navy-800">Standard APC Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {fees.map((fee, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-navy-950 bg-gray-50/50 border-r border-gray-100 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary-500 shrink-0" />
                        {fee.label}
                      </td>
                      <td className="py-4 px-6 text-gray-700">{fee.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden">
          <CardContent className="p-8 md:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100 shrink-0">
                <Gift className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-navy-950">Waivers & Financial Support</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Innovinc is committed to supporting authors from low- and middle-income economies. Article processing fee waivers or discounts are available upon request for eligible primary authors experiencing financial constraints.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
