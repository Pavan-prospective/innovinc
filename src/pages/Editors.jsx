import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useOutletContext, Link } from 'react-router-dom'
import { ShieldCheck, Mail, Globe, Award, BookOpen, Users, GraduationCap, Star, X } from 'lucide-react'
import { Card, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'

// ... editors array is unchanged ...
const editors = [
  {
    name: 'Prof. Nguyen Quang Chinh',
    role: 'Board Member',
    specialty: 'Materials Physics',
    institution: 'Eötvös Loránd University, Hungary',
    bio: 'Doctor of Science (DSc) from the Hungarian Academy of Sciences (HAS), graduated in Physics from Eötvös Loránd University (ELTE) in 1985.\n\nSince then he has been working in various fields of materials science.\n\nHis recent main research topics are: i) Plastic behavior and strengthening mechanisms of metals and alloys, ii) Microstructural and mechanical characteristics of ultrafine-grained and nanocrystalline materials, iii) Development of the depth sensing indentation method.\n\nHe participated in many international collaborations. Currently he is the leader of the Hungarian group in a joint project with Russian researchers entitled “Study of the physical nature and development of ultra-low-temperature superplasticity in ultrafine-grained Al alloys for innovative applications”.',
    image: '/editors/Nguyen Q. Chinh, Hungary.png',
    email: 'contact@sgcr-editorial.org'
  },
  {
    name: 'Dr. Malcolm Xing',
    role: 'Board Member',
    specialty: 'Biomaterials & Tissue Engineering',
    institution: 'University of Manitoba, Canada',
    bio: 'Dr. Malcolm Xing is a Professor at the University of Manitoba, Winnipeg, specializing in biomaterials for tissue engineering, bioadhesives, hemostasis, biofabrication, and implantable biosensors.\n\nWith over 200 publications in leading journals — including Nature Nanotechnology, Nature Biomedical Engineering, Nature Communications, Science Advances, and Advanced Materials — his research has garnered widespread recognition across the scientific community.\n\nHis work on high-performance hydrogels for applications in wound healing, gastrointestinal diseases, and vascular tissue regeneration has been notably featured in Nature Reviews Cardiology, Science, Nature Reviews Materials, ACS Headline News, and the Royal Society of Chemistry.\n\nHis research on sustainable materials has received broad media coverage, including features in Time, Fortune, and Forbes. Dr. Xing is an elected Fellow of the Canadian Academy of Engineering and the American Institute for Medical and Biological Engineering.',
    image: '/editors/Malcolm Xing, Canada.png',
    email: 'contact@sgcr-editorial.org'
  },
  {
    name: 'Prof. Lia Krusin-Elbaum',
    role: 'Board Member',
    specialty: 'Condensed Matter Physics',
    institution: 'The City College of New York - CUNY, USA',
    bio: 'Lia Krusin-Elbaum has been a Professor of Physics at The City College of New York since 2010. Her Ph.D. degree is in Condensed Matter Physics (NYU, 1979) and she was a scientist at the IBM\'s T.J. Watson Research Center, NY (1979-2010).\n\nDr. Krusin-Elbaum is a recipient of ten IBM Invention Achievement Awards and holds over 27 US patents.\n\nShe is a Fellow of the American Physical Society (1993-) and was elected (2022) to serve on the USDOE Basic Energy Sciences Advisory Committee. She is a co-lead of the Columbia U. NSF-MRSEC PAQM (2020-) and of the NSF-CREST IDEALS Centers (2015-).',
    image: '/editors/Lia Krusin-Elbaum (Keynote), USA.png',
    email: 'contact@sgcr-editorial.org'
  },
  {
    name: 'Dr. Gregory A. Hudalla',
    role: 'Board Member',
    specialty: 'Biomedical Engineering',
    institution: 'University of Florida, USA',
    bio: 'Dr. Hudalla is the Integra LifeSciences Term Professor in the J. Crayton Pruitt Family Department of Biomedical Engineering at the University of Florida. Dr. Hudalla’s research applies molecular and materials engineering to advance biotherapeutic delivery.\n\nDr. Hudalla has authored more than 60 publications and holds 8 patents.\n\nDr. Hudalla has received numerous awards and honors, including a National Science Foundation (NSF) RAISE award, the National Institutes of Health (NIH)Trailblazer award, the NSF Career award, the NIH Maximizing Investigators’ Research Award, and was recently recognized with the Invention of the Year by UF Innovate.',
    image: '/editors/Gregory A Hudalla, USA.png',
    email: 'contact@sgcr-editorial.org'
  }
]

export default function Editors() {
  const { journalId } = useParams()
  const outletContext = useOutletContext()
  const journal = outletContext?.journal
  const isJournalContext = !!journalId

  const [selectedEditor, setSelectedEditor] = useState(null)

  return (
    <div className={`min-h-screen ${isJournalContext ? '' : 'bg-gray-50 pb-20'}`}>
      
      {!isJournalContext && (
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
      )}

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isJournalContext ? 'py-10' : 'py-12'} relative z-20`}>
        {isJournalContext && (
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-navy-950">Editorial Board</h1>
            {journal?.chiefEditor && (
              <p className="text-sm text-gray-500 mt-1">
                Field chief editor: <strong className="text-navy-950">{journal.chiefEditor.name}</strong>, {journal.chiefEditor.affiliation}
              </p>
            )}
          </div>
        )}

        <div className="mb-8">
          <div className="bg-primary-50 rounded-xl p-5 border border-primary-100 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-sm">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <BookOpen className="w-5 h-5 text-primary-600" />
            </div>
            <div className="flex-grow">
              <h4 className="text-sm font-bold text-navy-950">Join our Editorial Board</h4>
              <p className="text-xs text-gray-600 mt-0.5">Help shape the future of scientific research.</p>
            </div>
            <Link to="/apply-editor" className="shrink-0">
              <Button variant="outline" className="text-xs h-9 px-4 border-primary-200 text-primary-700 hover:bg-primary-100">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>

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
                  onClick={() => setSelectedEditor(editor)}
                  className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_-5px_rgba(212,163,89,0.1)] hover:border-primary-300/80 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
                >
                  <div className="flex gap-4 p-5 items-start">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm relative cursor-pointer">
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
                    <p className="text-[11px] text-gray-500 leading-relaxed font-normal italic line-clamp-4">
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
                        <span className="text-primary-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-bold cursor-pointer hover:text-primary-800">
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

      <AnimatePresence>
        {selectedEditor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              <button 
                onClick={() => setSelectedEditor(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="p-8">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 border border-gray-100 shadow-sm relative">
                    <img
                      src={selectedEditor.image}
                      alt={selectedEditor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2 pt-2">
                    <h3 className="font-extrabold text-navy-950 text-2xl leading-tight">
                      {selectedEditor.name}
                    </h3>
                    <span className="inline-block text-xs font-bold text-primary-700 bg-primary-50 px-2 py-1 rounded-md uppercase tracking-wider">
                      {selectedEditor.role}
                    </span>
                    <div className="text-sm text-gray-500 font-medium leading-snug flex items-center gap-1.5 mt-2">
                      <Award className="w-4 h-4 text-gray-400" />
                      <span>{selectedEditor.institution}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium mt-1">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{selectedEditor.email}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-sm font-bold text-navy-950 mb-3 border-b border-gray-100 pb-2">Biography</h4>
                  <div className="space-y-3">
                    {selectedEditor.bio.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-[14px] text-gray-700 leading-loose">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-bold text-navy-950 mb-3 border-b border-gray-100 pb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEditor.specialty.split('&').map(spec => (
                      <Badge key={spec} className="bg-gray-50 text-gray-600 border border-gray-100 text-xs px-3 py-1 rounded-lg font-medium">
                        {spec.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
