import React from 'react'
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export default function Contact() {
  const contacts = [
    {
      title: "General & Editorial Inquiries",
      value: "editor@innovinc.org",
      icon: <Mail className="w-5 h-5 text-primary-600" />
    },
    {
      title: "Author & Submission Support",
      value: "support@innovinc.org",
      icon: <MessageSquare className="w-5 h-5 text-primary-600" />
    },
    {
      title: "Publishing & Permissions",
      value: "permissions@innovinc.org",
      icon: <Mail className="w-5 h-5 text-primary-600" />
    },
    {
      title: "Main Office Address",
      value: "[Insert Company Street Address, City, Country]",
      icon: <MapPin className="w-5 h-5 text-primary-600" />
    },
    {
      title: "Phone / Support Line",
      value: "+1 (XXX) XXX-XXXX",
      icon: <Phone className="w-5 h-5 text-primary-600" />
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
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-200">Us</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Have questions about submitting a paper, joining our editorial board, or partnering with Innovinc? We are here to help.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <Card className="bg-white border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden h-fit">
            <CardContent className="p-8 md:p-10">
              <h2 className="text-2xl font-bold text-navy-950 mb-8">Get in Touch</h2>
              
              <div className="space-y-6">
                {contacts.map((contact, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 border border-primary-100">
                      {contact.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">{contact.title}</h3>
                      <p className="text-navy-950 font-medium text-lg">{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden">
            <CardContent className="p-8 md:p-10">
              <h2 className="text-2xl font-bold text-navy-950 mb-6">Send us a Message</h2>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Subject</label>
                  <Input placeholder="How can we help?" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors bg-white shadow-sm"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <Button type="submit" className="w-full py-6 text-base">Send Message</Button>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
