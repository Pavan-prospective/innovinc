import React, { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react'
import { cn } from '../../utils/cn'
import { getJournalSections, journalPath } from '../../utils/journalUtils'

export function JournalNavbar({ journal }) {
  const { journalId } = useParams()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  const sections = getJournalSections(journal)
  const basePath = journalPath(journalId)
  const isOverview = location.pathname === basePath

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name))
  }

  const closeAll = () => {
    setOpenDropdown(null)
    setIsMobileMenuOpen(false)
  }

  const navLinkClass = (active) =>
    cn(
      'flex items-center h-full px-4 text-sm font-medium transition-colors border-b-[3px] whitespace-nowrap',
      active
        ? 'text-primary-700 border-primary-500'
        : 'text-gray-600 border-transparent hover:text-navy-950'
    )

  const NavLink = ({ title, path, active }) => (
    <Link to={path} className={navLinkClass(active)} onClick={closeAll}>
      {title}
    </Link>
  )

  const NavDropdown = ({ title, items, isActiveGroup }) => {
    const isOpen = openDropdown === title
    return (
      <div 
        className="relative h-full"
        onMouseEnter={() => setOpenDropdown(title)}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <button
          type="button"
          onClick={() => toggleDropdown(title)}
          className={navLinkClass(isActiveGroup || isOpen)}
        >
          {title}
          {isOpen ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 min-w-[280px] bg-white border border-gray-200 shadow-lg rounded-b-xl z-50 py-4">
            <div className="px-4 space-y-1 max-h-72 overflow-y-auto">
              {items.length === 0 ? (
                <p className="text-sm text-gray-400 px-2 py-1">No sections available</p>
              ) : (
                items.map((item) => (
                  <Link
                    key={item.slug || item.name}
                    to={item.path}
                    onClick={closeAll}
                    className={cn(
                      'block px-3 py-2 text-sm rounded-lg transition-colors',
                      location.pathname === item.path
                        ? 'bg-primary-50 text-primary-800 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-navy-950'
                    )}
                  >
                    {item.name}
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  const aboutLinks = {
    scope: [
      { label: 'Mission and scope', path: journalPath(journalId, 'about', 'mission-and-scope') },
      { label: 'Editorial and Advisory Boards', path: journalPath(journalId, 'about', 'editorial-board') },
      { label: 'Journal information', path: journalPath(journalId, 'about', 'journal-information') },
      { label: 'Open access statement', path: journalPath(journalId, 'about', 'open-access-statement') },
      { label: 'Copyright statement', path: journalPath(journalId, 'about', 'copyright-statement') },
      { label: 'Editorial & quality processes', path: journalPath(journalId, 'about', 'editorial-quality-processes') },
      { label: 'Contact', path: journalPath(journalId, 'about', 'contact') },
    ],
    authors: [
      { label: 'Why publish with us?', path: journalPath(journalId, 'authors', 'why-publish') },
      { label: 'Publishing fees', path: journalPath(journalId, 'authors', 'publishing-fees') },
      { label: 'Article types', path: journalPath(journalId, 'authors', 'article-types') },
      { label: 'Manuscript formatting guidelines', path: journalPath(journalId, 'authors', 'manuscript-formatting') },
      { label: 'Review guidelines', path: journalPath(journalId, 'authors', 'review-guidelines') },
      { label: 'Quick submission checklist', path: journalPath(journalId, 'authors', 'quick-checklist') },
    ],
  }

  const isAboutActive =
    location.pathname.includes('/about/') ||
    location.pathname.includes('/authors/') ||
    location.pathname.includes('/reviewers/') ||
    location.pathname.includes('/community/')

  const AboutJournalDropdown = () => {
    const isOpen = openDropdown === 'About journal'
    return (
      <div 
        className="relative h-full"
        onMouseEnter={() => setOpenDropdown('About journal')}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <button
          type="button"
          onClick={() => toggleDropdown('About journal')}
          className={navLinkClass(isAboutActive || isOpen)}
        >
          About journal
          {isOpen ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />}
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 left-auto min-w-[720px] bg-white border border-gray-200 shadow-xl rounded-b-xl z-50">
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
                          onClick={closeAll}
                          className={cn(
                            'text-sm transition-colors hover:text-primary-700',
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
    )
  }

  return (
    <nav className="relative bg-white border-b border-gray-200 z-40 sticky top-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:hidden flex items-center justify-between py-3 h-14">
          <span className="font-semibold text-navy-950 text-sm truncate max-w-[200px]">{journal?.title}</span>
          <button type="button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <div className="hidden md:flex items-center h-14 gap-1">
          <Link
            to={basePath}
            className={cn(
              'text-sm font-bold text-navy-950 pr-4 mr-2 border-r border-gray-200 whitespace-nowrap hover:text-primary-700 transition-colors',
              isOverview && 'text-primary-700'
            )}
          >
            {journal?.title}
          </Link>

          <div className="flex h-full items-stretch">
            <NavDropdown
              title="Sections"
              items={sections}
              isActiveGroup={location.pathname.includes('/sections/')}
            />
            <NavLink
              title="Articles"
              path={journalPath(journalId, 'articles')}
              active={location.pathname.includes('/articles')}
            />
            <NavLink
              title="Special issues"
              path={journalPath(journalId, 'special-issues')}
              active={location.pathname.includes('/special-issues')}
            />
            <NavLink
              title="Editorial board"
              path={journalPath(journalId, 'editorial-board')}
              active={location.pathname.includes('/editorial-board')}
            />
            <AboutJournalDropdown />
          </div>

          <div className="ml-auto hidden lg:flex items-center">
            <Link to={journalPath(journalId, 'submit')} className="rounded-full text-xs px-6 py-2.5 shadow-sm font-bold bg-primary-600 hover:bg-primary-700 text-white transition-colors">
              Submit your manuscript
            </Link>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-3 bg-white border-t border-gray-100 shadow-md max-h-[70vh] overflow-y-auto">
          <div className="space-y-1 pb-6">
            <Link to={basePath} onClick={closeAll} className="block px-3 py-2 text-sm font-semibold text-primary-700 bg-primary-50 rounded-lg">
              Journal overview
            </Link>

            <div className="pt-2">
              <div className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Sections</div>
              {sections.map((item) => (
                <Link key={item.slug} to={item.path} onClick={closeAll} className="block px-3 py-1.5 pl-6 text-[13px] text-gray-600 hover:text-primary-700 rounded-md">
                  {item.name}
                </Link>
              ))}
            </div>

            <Link to={journalPath(journalId, 'articles')} onClick={closeAll} className="block px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md">Articles</Link>
            <Link to={journalPath(journalId, 'special-issues')} onClick={closeAll} className="block px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md">Special issues</Link>
            <Link to={journalPath(journalId, 'editorial-board')} onClick={closeAll} className="block px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md">Editorial board</Link>

            {Object.entries(aboutLinks).map(([key, links]) => (
              <div key={key} className="pt-3 mt-2 border-t border-gray-100">
                <div className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{key}</div>
                {links.map((link) => (
                  <Link key={link.path} to={link.path} onClick={closeAll} className="block px-3 py-1.5 pl-6 text-[13px] text-gray-600 hover:text-primary-700 rounded-md">
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {openDropdown && (
        <button
          type="button"
          className="fixed inset-0 z-30 cursor-default"
          aria-label="Close menu"
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </nav>
  )
}
