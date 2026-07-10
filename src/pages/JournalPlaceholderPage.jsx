import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { FileText, CheckCircle, Info } from 'lucide-react'

export function JournalPlaceholderPage({ title, description }) {
  const { journalId } = useParams()
  const location = useLocation()

  // Generate a display title based on the route if not provided
  let displayTitle = title
  if (!displayTitle) {
    const pathParts = location.pathname.split('/')
    const lastPart = pathParts[pathParts.length - 1]
    displayTitle = lastPart.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-3xl font-bold text-navy-950 mb-4">{displayTitle}</h1>
          <p className="text-lg text-gray-600">
            {description || `Detailed information regarding ${displayTitle.toLowerCase()} for this journal.`}
          </p>
        </div>

        <Card className="bg-white border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Info className="w-5 h-5 text-primary-600" /> Information & Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              This section is currently under review by the editorial office. The content provided here serves as a structural representation of the upcoming guidelines and policies that will be enforced for all submissions to this journal.
            </p>
            <p>
              Our commitment to scientific excellence requires a rigorous approach to peer review, data transparency, and ethical publishing standards. Authors, reviewers, and readers will find comprehensive resources here once finalized.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-6">
              <h3 className="font-semibold text-navy-950 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" /> Key Highlights
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0"></div>
                  <span><strong>Comprehensive Scope:</strong> Expanding the boundaries of research in specialized scientific domains.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0"></div>
                  <span><strong>Open Access:</strong> Ensuring global accessibility and visibility for high-impact discoveries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0"></div>
                  <span><strong>Rigorous Review:</strong> Maintaining academic integrity through blinded peer review processes.</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white border-gray-100 shadow-sm hover:border-primary-200 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-2">Related Resources</h3>
              <p className="text-sm text-gray-500 mb-4">
                Download relevant forms, templates, and comprehensive policy documents in PDF format.
              </p>
              <Button variant="outline" className="w-full">View Documents</Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 shadow-sm hover:border-primary-200 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-2">Next Steps</h3>
              <p className="text-sm text-gray-500 mb-4">
                Ready to contribute? Review our submission checklist to ensure your manuscript meets all criteria.
              </p>
              <Button className="w-full bg-navy-950 hover:bg-navy-900 text-white">Proceed to Submission</Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
