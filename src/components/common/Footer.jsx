import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-navy-950 text-gray-300 py-10 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary-600 rounded flex items-center justify-center">
                <BookOpen className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                InnovInc<span className="text-primary-500">.</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
              InnovInc is a premier platform dedicated to providing researchers, scientists, and academics with a trusted, open-access environment to publish their groundbreaking research and share it with the world.
            </p>
            <div className="flex space-x-4 text-sm font-medium">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">LinkedIn</a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/journals" className="hover:text-primary-400 transition-colors">Browse Journals</Link></li>
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/open-access" className="hover:text-primary-400 transition-colors">Open Access Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-500" />
                <a href="mailto:info@innovinc.org" className="hover:text-primary-400 transition-colors">info@innovinc.org</a>
              </li>
              <li>New York, NY 10012, USA</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-navy-800 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} InnovInc Publishing. All rights reserved.</p>
          <div className="mt-2 md:mt-0">
            <span className="text-gray-600">ISSN 2456-XXXX</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
