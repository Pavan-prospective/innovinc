import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadCloud, CheckCircle, FileText, ArrowRight, X, UserCheck } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { JOURNALS } from '../../utils/dummyData'
import { Link } from 'react-router-dom'

export default function AuthorSubmit() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    journalId: '',
    coAuthors: '',
    file: null
  })

  const handleNext = () => setStep(step + 1)
  const handleBack = () => setStep(step - 1)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 2000)
  }

  const handleFileDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, file: e.dataTransfer.files[0] })
    }
  }

  const removeFile = () => {
    setFormData({ ...formData, file: null })
  }

  const resetForm = () => {
    setFormData({
      title: '',
      abstract: '',
      journalId: '',
      coAuthors: '',
      file: null
    })
    setStep(1)
    setIsSuccess(false)
  }

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm max-w-md w-full p-8 text-center"
        >
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-navy-950 mb-2">Manuscript Submitted!</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            Your manuscript "{formData.title || 'Untitled'}" has been successfully uploaded. You can track its progress in the "My Submissions" tab.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/dashboard/submissions">
              <Button className="w-full h-11 rounded-xl shadow-sm">
                View My Submissions
              </Button>
            </Link>
            <Button variant="outline" onClick={resetForm} className="w-full h-11 rounded-xl text-gray-600">
              Submit Another Manuscript
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy-950">Submit New Manuscript</h2>
        <p className="text-gray-500 text-sm mt-1">Upload your research for peer review.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-10">
        
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-100 -translate-y-1/2 z-0 rounded-full"></div>
            <div 
              className="absolute left-0 top-1/2 h-1 bg-primary-500 -translate-y-1/2 z-0 transition-all duration-500 rounded-full"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
            
            {[1, 2, 3].map((num) => (
              <div key={num} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                  step >= num ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20' : 'bg-gray-100 text-gray-400 border border-gray-200'
                }`}>
                  {num < step ? <CheckCircle className="w-5 h-5" /> : num}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block ${
                  step >= num ? 'text-navy-950' : 'text-gray-400'
                }`}>
                  {num === 1 ? 'Details' : num === 2 ? 'Upload' : 'Review'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
          <AnimatePresence mode="wait">
            
            {/* Step 1: Details */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-1.5">Select Journal *</label>
                    <select 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 outline-none text-sm text-navy-900 appearance-none cursor-pointer"
                      value={formData.journalId}
                      onChange={(e) => setFormData({ ...formData, journalId: e.target.value })}
                    >
                      <option value="" disabled>-- Select a Journal --</option>
                      {JOURNALS.map(j => (
                        <option key={j.id} value={j.id}>{j.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-1.5">Manuscript Title *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter the full title of the manuscript"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 outline-none text-sm font-medium text-navy-900"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-1.5">Co-Authors (Optional)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <UserCheck className="h-5 w-5 text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Comma separated names"
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 outline-none text-sm font-medium text-navy-900"
                        value={formData.coAuthors}
                        onChange={(e) => setFormData({ ...formData, coAuthors: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-1.5">Abstract *</label>
                    <textarea 
                      required
                      rows="5"
                      placeholder="Paste the manuscript abstract here..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 outline-none text-sm text-navy-900 resize-none"
                      value={formData.abstract}
                      onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Upload */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-primary-400 transition-colors cursor-pointer group"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  <input 
                    type="file" 
                    id="file-upload" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                  />
                  
                  {!formData.file ? (
                    <>
                      <div className="w-16 h-16 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <UploadCloud className="w-8 h-8" />
                      </div>
                      <p className="text-navy-900 font-semibold mb-1">Click to upload or drag and drop</p>
                      <p className="text-gray-500 text-xs">PDF, DOC, DOCX (Max 10MB)</p>
                    </>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4">
                        <FileText className="w-8 h-8" />
                      </div>
                      <p className="text-navy-900 font-bold text-sm max-w-[250px] truncate">{formData.file.name}</p>
                      <p className="text-gray-500 text-xs mt-1 mb-4">{(formData.file.size / 1024 / 1024).toFixed(2)} MB</p>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        className="h-8 text-xs border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                        onClick={(e) => { e.stopPropagation(); removeFile(); }}
                      >
                        Remove File <X className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-5 text-sm">
                  <div>
                    <span className="block text-gray-500 font-semibold text-xs mb-1 uppercase tracking-wider">Target Journal</span>
                    <p className="font-medium text-navy-900">
                      {JOURNALS.find(j => j.id === formData.journalId)?.title || 'Not Selected'}
                    </p>
                  </div>
                  <div>
                    <span className="block text-gray-500 font-semibold text-xs mb-1 uppercase tracking-wider">Manuscript Title</span>
                    <p className="font-medium text-navy-900">{formData.title}</p>
                  </div>
                  {formData.coAuthors && (
                    <div>
                      <span className="block text-gray-500 font-semibold text-xs mb-1 uppercase tracking-wider">Co-Authors</span>
                      <p className="font-medium text-navy-900">{formData.coAuthors}</p>
                    </div>
                  )}
                  <div>
                    <span className="block text-gray-500 font-semibold text-xs mb-1 uppercase tracking-wider">Attached File</span>
                    <div className="flex items-center gap-2 font-medium text-navy-900 mt-1">
                      <FileText className="w-4 h-4 text-primary-500" />
                      {formData.file ? formData.file.name : <span className="text-red-500">No file uploaded</span>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={handleBack} disabled={isSubmitting} className="h-11 px-6 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50">
                Back
              </Button>
            ) : <div></div>}

            {step < 3 ? (
              <Button 
                type="submit" 
                className="h-11 px-8 rounded-xl shadow-sm transition-all ml-auto"
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="h-11 px-8 rounded-xl bg-green-500 hover:bg-green-600 text-white shadow-sm transition-all"
                disabled={isSubmitting || !formData.file}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>Submit Manuscript <CheckCircle className="w-4 h-4 ml-2" /></>
                )}
              </Button>
            )}
          </div>
        </form>

      </div>
    </div>
  )
}
