import React, { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react'
import { cn } from '../../utils/cn'

export function JournalNavbar({ journal }) {
  const { journalId } = useParams()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  const toggleDropdown = (name) => {
    if (openDropdown === name) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(name)
    }
  }

  const sections = journal?.sections || []

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  const NavLink = ({ title, path, activePath }) => {
    const active = location.pathname.includes(activePath || path)
    return (
      <Link
        to={path}
        className={cn(
          "flex items-center h-full px-5 text-[14px] font-medium transition-colors border-b-[3px]",
          active 
            ? "text-[#0088cc] border-[#0088cc]" 
            : "text-gray-600 border-transparent hover:text-gray-900"
        )}
      >
        {title}
      </Link>
    )
  }

  const NavDropdown = ({ title, items, isActiveGroup }) => {
    const isOpen = openDropdown === title
    return (
      <>
        <button
          onClick={() => toggleDropdown(title)}
          className={cn(
            "flex items-center gap-1.5 h-full px-5 text-[14px] font-medium transition-colors border-b-[3px]",
            isActiveGroup || isOpen
              ? "text-[#0088cc] border-[#0088cc]" 
              : "text-gray-600 border-transparent hover:text-gray-900"
          )}
        >
          {title} 
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
                {items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setOpenDropdown(null)}
                    className={cn(
                      "text-[14px] transition-colors hover:text-primary-600",
                      location.pathname === item.path ? "text-gray-900 font-semibold" : "text-gray-500"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  const AboutJournalDropdown = () => {
    const isOpen = openDropdown === 'About journal'
    const isActiveGroup = location.pathname.includes('/about') || location.pathname.includes('/authors') || location.pathname.includes('/reviewers') || location.pathname.includes('/community')
    
    return (
      <>
        <button
          onClick={() => toggleDropdown('About journal')}
          className={cn(
            "flex items-center gap-1.5 h-full px-5 text-[14px] font-medium transition-colors border-b-[3px]",
            isActiveGroup || isOpen
              ? "text-[#0088cc] border-[#0088cc]" 
              : "text-gray-600 border-transparent hover:text-gray-900"
          )}
        >
          About journal 
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                
                {/* Column 1 */}
                <div>
                  <h4 className="font-bold text-gray-900 text-[15px] mb-5 pb-1 border-b-[2px] border-gray-900 inline-block">Scope</h4>
                  <ul className="space-y-4">
                    <li><Link to={`/journals/${journalId}/about/mission-and-scope`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Mission and scope</Link></li>
                    <li><Link to={`/journals/${journalId}/about/editorial-board`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Editorial and Advisory Boards</Link></li>
                    <li><Link to={`/journals/${journalId}/about/journal-information`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Journal information</Link></li>
                    <li><Link to={`/journals/${journalId}/about/open-access-statement`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Open access statement</Link></li>
                    <li><Link to={`/journals/${journalId}/about/copyright-statement`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Copyright statement</Link></li>
                    <li><Link to={`/journals/${journalId}/about/editorial-quality-processes`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Editorial & quality processes</Link></li>
                    <li><Link to={`/journals/${journalId}/about/contact`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Contact</Link></li>
                  </ul>
                </div>

                {/* Column 2 */}
                <div>
                  <h4 className="font-bold text-gray-900 text-[15px] mb-5 pb-1 border-b-[2px] border-gray-900 inline-block">For authors</h4>
                  <ul className="space-y-4">
                    <li><Link to={`/journals/${journalId}/authors/why-publish`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Why publish with us?</Link></li>
                    <li><Link to={`/journals/${journalId}/authors/publishing-fees`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Publishing fees</Link></li>
                    <li><Link to={`/journals/${journalId}/authors/article-types`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Article types</Link></li>
                    <li><Link to={`/journals/${journalId}/authors/manuscript-formatting`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Manuscript formatting guidelines</Link></li>
                    <li><Link to={`/journals/${journalId}/authors/review-guidelines`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Review guidelines</Link></li>
                    <li><Link to={`/journals/${journalId}/authors/policies-ethics`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Policies and publication ethics</Link></li>
                    <li><Link to={`/journals/${journalId}/authors/quick-checklist`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Quick submission checklist</Link></li>
                    <li><Link to={`/journals/${journalId}/authors/journal-awards`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Journal Awards</Link></li>
                    <li><Link to={`/journals/${journalId}/authors/contact-editorial`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Contact editorial office</Link></li>
                  </ul>
                </div>

                {/* Column 3 */}
                <div>
                  <h4 className="font-bold text-gray-900 text-[15px] mb-5 pb-1 border-b-[2px] border-gray-900 inline-block">For reviewers</h4>
                  <ul className="space-y-4">
                    <li><Link to={`/journals/${journalId}/reviewers/for-reviewers`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">For reviewers</Link></li>
                    <li><Link to={`/journals/${journalId}/reviewers/become-reviewer`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Become a reviewer</Link></li>
                  </ul>
                </div>

                {/* Column 4 */}
                <div>
                  <h4 className="font-bold text-gray-900 text-[15px] mb-5 pb-1 border-b-[2px] border-gray-900 inline-block">For the community</h4>
                  <ul className="space-y-4">
                    <li><Link to={`/journals/${journalId}/community/retrospective-ebooks`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Retrospective eBooks</Link></li>
                    <li><Link to={`/journals/${journalId}/community/newsletter`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Newsletter</Link></li>
                    <li><Link to={`/journals/${journalId}/community/propose-special-issue`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Propose a special issue</Link></li>
                    <li><Link to={`/journals/${journalId}/community/ai-in-research`} onClick={() => setOpenDropdown(null)} className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">AI in Research</Link></li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <nav className="relative bg-[#f8fafc] border-b border-gray-200 z-40 sticky top-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center justify-between py-3 h-14">
          <span className="font-semibold text-gray-800 text-sm truncate max-w-[200px]">{journal?.title || 'Journal'}</span>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center h-14 gap-2">
          <div className="text-gray-600 font-medium text-[16px] pr-4 whitespace-nowrap">
            {journal?.title || 'Journal Title'}
          </div>

          <div className="flex h-full">
            <NavDropdown title="Sections" items={sections} isActiveGroup={location.pathname.includes('/sections')} />
            <NavLink title="Articles" path={`/journals/${journalId}/articles`} activePath="/articles" />
            <NavLink title="Special issues" path={`/journals/${journalId}/special-issues`} activePath="/special-issues" />
            <NavLink title="Editorial board" path={`/journals/${journalId}/editorial-board`} activePath="/editorial-board" />
            
            <AboutJournalDropdown />
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-white border-t border-gray-200 shadow-md h-[calc(100vh-140px)] overflow-y-auto">
          <div className="space-y-1 pb-6">
            <Link to={`/journals/${journalId}`} className="block px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md">Overview</Link>

            <div className="pt-2">
              <div className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Sections</div>
              {sections.map(item => (
                <Link key={item.name} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-1.5 pl-6 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-md">{item.name}</Link>
              ))}
            </div>

            <Link to={`/journals/${journalId}/articles`} className="block px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md">Articles</Link>
            <Link to={`/journals/${journalId}/special-issues`} className="block px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md">Special issues</Link>
            <Link to={`/journals/${journalId}/editorial-board`} className="block px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md">Editorial board</Link>

            <div className="pt-4 mt-2 border-t border-gray-100">
              <div className="px-3 text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-2">Scope</div>
              <Link to={`/journals/${journalId}/about/mission-and-scope`} className="block px-3 py-1.5 pl-6 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-md">Mission and scope</Link>
              <Link to={`/journals/${journalId}/about/editorial-board`} className="block px-3 py-1.5 pl-6 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-md">Editorial and Advisory Boards</Link>
              <Link to={`/journals/${journalId}/about/journal-information`} className="block px-3 py-1.5 pl-6 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-md">Journal information</Link>
            </div>

            <div className="pt-4">
              <div className="px-3 text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-2">For authors</div>
              <Link to={`/journals/${journalId}/authors/why-publish`} className="block px-3 py-1.5 pl-6 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-md">Why publish with us?</Link>
              <Link to={`/journals/${journalId}/authors/publishing-fees`} className="block px-3 py-1.5 pl-6 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-md">Publishing fees</Link>
              <Link to={`/journals/${journalId}/authors/article-types`} className="block px-3 py-1.5 pl-6 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-md">Article types</Link>
            </div>
            
            <div className="pt-4">
              <div className="px-3 text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-2">For reviewers</div>
              <Link to={`/journals/${journalId}/reviewers/for-reviewers`} className="block px-3 py-1.5 pl-6 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-md">For reviewers</Link>
              <Link to={`/journals/${journalId}/reviewers/become-reviewer`} className="block px-3 py-1.5 pl-6 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-md">Become a reviewer</Link>
            </div>

            <div className="pt-4">
              <div className="px-3 text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-2">For the community</div>
              <Link to={`/journals/${journalId}/community/retrospective-ebooks`} className="block px-3 py-1.5 pl-6 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-md">Retrospective eBooks</Link>
              <Link to={`/journals/${journalId}/community/newsletter`} className="block px-3 py-1.5 pl-6 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-md">Newsletter</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

