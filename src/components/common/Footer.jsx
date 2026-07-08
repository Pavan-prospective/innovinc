import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-navy-950 text-gray-400 py-6 border-t border-navy-900 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo & copyright info on the left */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
                <BookOpen className="text-white w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-base tracking-tight text-white">
                InnovInc<span className="text-primary-500">.</span>
              </span>
            </Link>
            <span className="text-gray-700 hidden md:inline">|</span>
            <p className="text-[11px] text-gray-500">
              &copy; {new Date().getFullYear()} InnovInc Publishing. All rights reserved. <span className="ml-2 text-gray-600">ISSN 2456-XXXX</span>
            </p>
          </div>

          {/* Quick links & contact on the right */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/journals" className="hover:text-primary-400 transition-colors font-medium">Journals</Link>
            <Link to="/editorial-board" className="hover:text-primary-400 transition-colors font-medium">Editorial Board</Link>
            <Link to="/about" className="hover:text-primary-400 transition-colors font-medium">About</Link>
            <a href="mailto:info@innovinc.org" className="hover:text-primary-400 transition-colors flex items-center gap-1 font-medium">
              <Mail className="w-3.5 h-3.5 text-primary-500 shrink-0" /> info@innovinc.org
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

