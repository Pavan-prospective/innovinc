import React from 'react'
import { Activity, ShieldCheck, Users, Gavel, FileEdit, Database } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../../components/ui/Card'

export default function EditorialQualityProcesses() {
  const steps = [
    {
      step: "1. Initial Screening",
      desc: "Plagiarism detection using iThenticate/Turnitin and editorial scope evaluation.",
      icon: <ShieldCheck className="w-6 h-6 text-primary-600" />
    },
    {
      step: "2. Double-Blind Peer Review",
      desc: "Independent evaluation by at least two subject domain experts.",
      icon: <Users className="w-6 h-6 text-primary-600" />
    },
    {
      step: "3. Editorial Decision",
      desc: "Final decision (Accept, Minor/Major Revisions, or Reject) made by the Editor-in-Chief.",
      icon: <Gavel className="w-6 h-6 text-primary-600" />
    },
    {
      step: "4. Production & Proofreading",
      desc: "Professional copyediting, typesetting, figure optimization, and DOI minting.",
      icon: <FileEdit className="w-6 h-6 text-primary-600" />
    },
    {
      step: "5. Digital Archiving",
      desc: "Online publication and indexing in academic repositories.",
      icon: <Database className="w-6 h-6 text-primary-600" />
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
            Editorial & Quality <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-200">Processes</span>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full">
        
        <Card className="bg-white border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden">
          <CardContent className="p-8 md:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center border border-primary-100 shrink-0">
                <Activity className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-navy-950">Rigorous Quality Control Workflow</h2>
                <p className="text-gray-600 mt-1">To maintain high academic standards, every manuscript submitted to Innovinc undergoes a systematic quality check:</p>
              </div>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
              {steps.map((item, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-primary-50 text-primary-600 shadow-sm z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    {item.icon}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-navy-950 text-lg mb-1">{item.step}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
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
