import React from 'react'
import { Sparkles, CheckSquare, AlignLeft, ShieldAlert, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../../components/ui/Card'

export default function ReviewGuidelines() {
  const criteria = [
    {
      title: "Originality & Novelty",
      desc: "Does the research present novel insights or significant advancements to existing scientific knowledge?",
      icon: <Sparkles className="w-6 h-6 text-primary-600" />
    },
    {
      title: "Methodological Rigor",
      desc: "Are the research design, statistical models, and data collection procedures scientifically valid and reproducible?",
      icon: <CheckSquare className="w-6 h-6 text-primary-600" />
    },
    {
      title: "Clarity & Structure",
      desc: "Is the narrative clear, well-structured, logically argued, and grammatically accurate?",
      icon: <AlignLeft className="w-6 h-6 text-primary-600" />
    },
    {
      title: "Ethical Compliance",
      desc: "Have human/animal ethics approvals, informed consent, and competing interest disclosures been properly satisfied?",
      icon: <ShieldAlert className="w-6 h-6 text-primary-600" />
    }
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
            Review <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-200">Guidelines</span>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full space-y-12">
        <Card className="bg-white border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden">
          <CardContent className="p-8 md:p-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center border border-primary-100 shrink-0">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-navy-950">Guidance for Peer Reviewers</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-10">
              Peer reviewers play a vital role in maintaining the academic integrity and scientific quality of Innovinc journals. We ask all peer reviewers to provide objective, constructive, and timely feedback.
            </p>

            <h3 className="text-xl font-bold text-navy-950 mb-6">Primary Evaluation Criteria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {criteria.map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/50 transition-colors">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 mb-4">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-navy-950 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-100 p-5 rounded-xl">
              <p className="text-amber-900 font-medium">
                Reviewers are requested to submit their formal evaluation reports within <strong className="font-bold text-amber-950">14 to 21 days</strong> of accepting an invitation to review.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
