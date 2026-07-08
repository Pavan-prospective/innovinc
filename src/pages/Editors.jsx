import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Mail, Globe, Award, BookOpen, Users, GraduationCap, Star } from 'lucide-react'
import { Card, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'

const editors = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Editor-in-Chief',
    specialty: 'Molecular Oncology & Genomics',
    institution: 'Stanford University School of Medicine',
    bio: 'Dr. Chen leads our editorial strategy with over 15 years of oncology research, focusing on target identification and genomic alterations in solid tumors.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400',
    email: 's.chen@sgcr-editorial.org'
  },
  {
    name: 'Prof. Michael Roberts',
    role: 'Associate Editor',
    specialty: 'Clinical Immunotherapy & Trials',
    institution: 'University of Oxford Research Hospital',
    bio: 'Professor Roberts leads clinical trials in immune checkpoint inhibitors and cellular therapeutics, aiming to bridge clinical innovations to patient bedside care.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400',
    email: 'm.roberts@sgcr-editorial.org'
  },
  {
    name: 'Dr. Elena Rodriguez',
    role: 'Review Editor',
    specialty: 'Cancer Epigenetics & Genetics',
    institution: 'MIT Koch Institute for Integrative Cancer Research',
    bio: 'Dr. Rodriguez\'s research addresses epigenetic mechanisms of tumor growth and hereditary cancer predisposition diagnostics.',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400&h=400',
    email: 'e.rodriguez@sgcr-editorial.org'
  },
  {
    name: 'Prof. David Kim',
    role: 'Guest Editor',
    specialty: 'Hematologic Oncology & Biomarkers',
    institution: 'Seoul National University Hospital',
    bio: 'Professor Kim specializes in leukemia biomarkers, chimeric antigen receptor T-cell trials, and bone marrow microenvironments.',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400&h=400',
    email: 'd.kim@sgcr-editorial.org'
  },
  {
    name: 'Dr. James Wilson',
    role: 'Senior Editor',
    specialty: 'Pediatric Oncology & Stem Cells',
    institution: 'Cambridge Stem Cell Institute',
    bio: 'Dr. Wilson focuses on pediatric neuro-oncology, cancer stem cell niche plasticity, and developmental medicine advancements.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400',
    email: 'j.wilson@sgcr-editorial.org'
  },
  {
    name: 'Prof. Jane Doe',
    role: 'Senior Advisor',
    specialty: 'Radiation Oncology & Regimens',
    institution: 'Harvard Medical School',
    bio: 'Prof. Doe designs advanced stereotactic radiotherapy regimens and conducts clinical protocols for multi-modal cancer care.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
    email: 'j.doe@sgcr-editorial.org'
  },
  {
    name: 'Prof. John Smith',
    role: 'Senior Board Member',
    specialty: 'Breast Cancer Therapeutics',
    institution: 'Johns Hopkins Medicine',
    bio: 'Prof. Smith leads translational labs identifying drug resistance mechanisms in hormone-positive breast malignancies.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
    email: 'j.smith@sgcr-editorial.org'
  }
]

export default function Editors() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Premium Hero Header */}
      <section className="bg-navy-950 text-white relative py-20 overflow-hidden">
        <div className="absolute inset-0 select-none pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=2500" 
            className="w-full h-full object-cover opacity-30" 
            alt="Editorial Board Backdrop" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 to-navy-900/50"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,163,89,0.15),transparent_50%)]"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-primary-950/40 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-4"
          >
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
          >
            Editorial <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-300 to-amber-200">Board</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Led by globally recognized oncology researchers, clinical practitioners, and academic leaders dedicated to advancing clinical oncology and cancer science.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Explanation Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] rounded-2xl sticky top-24 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary-500 to-amber-400"></div>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2 mb-3">
                    <BookOpen className="w-5 h-5 text-primary-600" /> Standards & Governance
                  </h2>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Our Editorial Board members maintain scientific integrity by enforcing rigorous peer-review guidelines, verifying experimental methodologies, and promoting open-access transparency.
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-5 space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 border border-primary-100">
                      <ShieldCheck className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-navy-950 mb-0.5">Double-Blind Peer Review</h4>
                      <p className="text-[11px] text-gray-500 leading-snug">All research submissions undergo rigorous scrutiny to eliminate evaluation bias.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 border border-primary-100">
                      <GraduationCap className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-navy-950 mb-0.5">Ethical Compliance</h4>
                      <p className="text-[11px] text-gray-500 leading-snug">Strict adherence to COPE (Committee on Publication Ethics) principles.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 border border-primary-100">
                      <Star className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-navy-950 mb-0.5">Global Citations</h4>
                      <p className="text-[11px] text-gray-500 leading-snug">Committed to maximizing citation impact across major index registries.</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-5">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/60 text-center">
                    <p className="text-xs font-medium text-gray-500 mb-2">Interested in joining our board or review panels?</p>
                    <a href="mailto:governance@sgcr-editorial.org">
                      <Button className="w-full text-xs py-2 bg-navy-950 hover:bg-navy-900 text-white font-bold rounded-lg transition-colors">
                        Contact Governance
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Editors Profile Grid */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-navy-950 flex items-center gap-2 mb-2">
              <Users className="w-6 h-6 text-primary-600" /> Lead Board Members
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {editors.map((editor, index) => (
                <motion.div
                  key={editor.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_-5px_rgba(212,163,89,0.1)] hover:border-primary-300/80 transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  <div className="flex gap-4 p-5 items-start">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm relative">
                      <img
                        src={editor.image}
                        alt={editor.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/20 to-transparent"></div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-navy-950 text-base leading-tight group-hover:text-primary-700 transition-colors">
                        {editor.name}
                      </h3>
                      <span className="inline-block text-[10px] font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {editor.role}
                      </span>
                      <div className="text-[10px] text-gray-500 font-medium leading-snug flex items-start gap-1">
                        <Award className="w-3 h-3 text-gray-400 shrink-0 mt-0.5" />
                        <span>{editor.institution}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-5 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-[11px] text-gray-500 leading-relaxed font-normal italic">
                      "{editor.bio}"
                    </p>
                    
                    <div className="space-y-3 pt-2 border-t border-gray-50">
                      <div className="flex flex-wrap gap-1.5">
                        {editor.specialty.split('&').map(spec => (
                          <Badge key={spec} className="bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100 transition-colors font-medium text-[9px] px-2 py-0.5 rounded">
                            {spec.trim()}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-gray-300" />
                          {editor.email}
                        </span>
                        <span className="text-primary-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-bold cursor-pointer">
                          Profile <Globe className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
