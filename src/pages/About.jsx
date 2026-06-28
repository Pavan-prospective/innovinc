import React from 'react'
import { CheckCircle2, Globe, Users, BookOpen, ShieldCheck } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'

export default function About() {
  const stats = [
    { label: "Published Articles", value: "50,000+" },
    { label: "Global Authors", value: "15,000+" },
    { label: "Peer Reviewers", value: "5,000+" },
    { label: "Active Journals", value: "45+" },
  ]

  const coreValues = [
    { title: "Open Access First", desc: "We believe scientific knowledge should be freely accessible to everyone, everywhere, without financial barriers." },
    { title: "Rigorous Peer Review", desc: "Maintaining the highest standards of scientific integrity through double-blind peer review by global experts." },
    { title: "Author-Centric", desc: "Providing a seamless, rapid, and transparent publication process designed to support researchers at every step." },
    { title: "Global Reach", desc: "Partnering with international indexing databases to ensure our authors' work achieves maximum visibility and impact." },
  ]

  return (
    <div className="flex flex-col bg-white">
      
      {/* Header */}
      <section className="bg-navy-950 text-white pt-24 pb-20 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            About InnovInc Publishing
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A leading international publisher dedicated to advancing science through high-quality, open-access, peer-reviewed journals.
          </p>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="bg-primary-600 text-white py-8 border-b-4 border-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-primary-500">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-primary-100 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content: Story & Mission */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row gap-16 items-center">
        <div className="md:w-1/2 space-y-6 text-gray-700 leading-relaxed text-lg">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">Our Story & Mission</h2>
          <p>
            InnovInc was founded with a singular, powerful vision: to accelerate the pace of scientific discovery by removing the barriers between researchers and readers. We recognized that traditional publishing models often hindered the rapid dissemination of critical knowledge.
          </p>
          <p>
            Today, InnovInc is a trusted partner to thousands of academics, institutions, and research centers worldwide. We publish a diverse portfolio of journals spanning Medicine, Engineering, Environmental Sciences, and Technology.
          </p>
          <p>
            Our mission is to empower authors by providing a platform that offers rigorous peer review, rapid editorial turnaround times, and unparalleled global visibility through major indexing databases like Scopus, Web of Science, and PubMed.
          </p>
        </div>
        <div className="md:w-1/2">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800&h=600" 
              alt="Research Laboratory" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 backdrop-blur text-navy-900 p-4 rounded-lg shadow-lg font-medium">
                "Advancing human knowledge through accessible, high-quality research."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-50 py-16 md:py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">The principles that guide our publishing process and our commitment to the scientific community.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex gap-6">
                <div className="shrink-0 mt-1">
                  <CheckCircle2 className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-navy-900 mb-6">Ready to publish your research?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
          Join thousands of researchers who trust InnovInc to publish and promote their work to a global audience.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/submit">
            <Button size="lg" className="px-8 h-14 text-base w-full sm:w-auto">Submit Manuscript</Button>
          </Link>
          <Link to="/guidelines">
            <Button variant="outline" size="lg" className="px-8 h-14 text-base w-full sm:w-auto">Read Author Guidelines</Button>
          </Link>
        </div>
      </section>

    </div>
  )
}
