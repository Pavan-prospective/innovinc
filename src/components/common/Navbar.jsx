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
    { name: 'About', path: '/about' },
  ]

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
