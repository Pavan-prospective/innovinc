import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Menu, X, ChevronDown, BookOpen } from 'lucide-react'
import { Button } from '../ui/Button'
import { cn } from '../../utils/cn'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Journals', path: '/journals' },
  ]

  const aboutLinks = {
    scope: [
      { label: 'Mission and scope', path: '/about/mission-and-scope' },
      { label: 'Editorial and Advisory Boards', path: '/about/editorial-board' },
      { label: 'Open access statement', path: '/about/open-access-statement' },
      { label: 'Copyright statement', path: '/about/copyright-statement' },
      { label: 'Editorial & quality processes', path: '/about/editorial-quality-processes' },
      { label: 'Contact', path: '/about/contact' },
    ],
    authors: [
      { label: 'Why publish with us?', path: '/authors/why-publish-with-us' },
      { label: 'Publishing fees', path: '/authors/publishing-fees' },
      { label: 'Article types', path: '/authors/article-types' },
      { label: 'Manuscript formatting guidelines', path: '/authors/manuscript-formatting-guidelines' },
      { label: 'Review guidelines', path: '/authors/review-guidelines' },
      { label: 'Quick submission checklist', path: '/authors/submission-checklist' },
    ],
  }

  const [isAboutOpen, setIsAboutOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-700 transition-colors">
              <BookOpen className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-navy-950">
              InnovInc<span className="text-primary-600">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary-600",
                    location.pathname === link.path ? "text-primary-600" : "text-gray-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}

              {/* About Dropdown */}
              <div 
                className="relative flex items-center"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
              >
                <Link
                  to="/about"
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary-600 h-full",
                    location.pathname === '/about' || location.pathname.startsWith('/about/') || location.pathname.startsWith('/authors/') ? "text-primary-600" : "text-gray-600"
                  )}
                >
                  About Journal <ChevronDown className="w-4 h-4" />
                </Link>
                {isAboutOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 min-w-[720px] bg-white border border-gray-200 shadow-xl rounded-b-xl z-50">
                    <div className="max-w-7xl px-8 py-8 grid grid-cols-2 gap-8">
                      {[
                        { title: 'Scope', links: aboutLinks.scope },
                        { title: 'For authors', links: aboutLinks.authors },
                      ].map((col) => (
                        <div key={col.title}>
                          <h4 className="font-bold text-navy-950 text-sm mb-4 pb-1 border-b-2 border-primary-500 inline-block">
                            {col.title}
                          </h4>
                          <ul className="space-y-2.5">
                            {col.links.map((link) => (
                              <li key={link.path}>
                                <Link
                                  to={link.path}
                                  onClick={() => setIsAboutOpen(false)}
                                  className={cn(
                                    'text-sm transition-colors hover:text-primary-700 block',
                                    location.pathname === link.path ? 'text-navy-950 font-semibold' : 'text-gray-500'
                                  )}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 border-l border-gray-200 pl-6">
              <button className="text-gray-500 hover:text-primary-600 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <Link to="/login">
                <Button>Sign In</Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-primary-600 transition-colors p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-4 shadow-lg absolute w-full">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "px-3 py-2 rounded-md text-base font-medium transition-colors",
                  location.pathname === link.path ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile About Menu */}
            <Link 
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "block px-3 py-2 text-base font-semibold transition-colors rounded-md mt-2",
                location.pathname === '/about' ? "bg-primary-50 text-primary-600" : "text-gray-900 border-t border-gray-100 hover:text-primary-600"
              )}
            >
              About Journal Overview
            </Link>
            {Object.entries(aboutLinks).map(([key, links]) => (
              <div key={key} className="pt-2">
                <div className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{key}</div>
                {links.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="block px-3 py-1.5 pl-6 text-[13px] text-gray-600 hover:text-primary-700 rounded-md"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className="pt-4 flex flex-col space-y-3 border-t border-gray-100">
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full justify-center">Sign In</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
