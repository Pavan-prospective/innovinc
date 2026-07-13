import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { BookOpen, FileText, Settings, LogOut, LayoutDashboard, Send } from 'lucide-react'
import { cn } from '../utils/cn'

export function AuthorLayout() {
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Submit Manuscript', path: '/dashboard/submit', icon: <Send className="w-5 h-5" /> },
    { name: 'My Submissions', path: '/dashboard/submissions', icon: <FileText className="w-5 h-5" /> },
    { name: 'Profile Settings', path: '/dashboard/settings', icon: <Settings className="w-5 h-5" /> },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-20">
        <div className="h-20 flex items-center px-6 border-b border-gray-100 shrink-0">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <BookOpen className="text-white w-5 h-5" />
            </div>
            <span className="font-bold tracking-tight text-navy-950">
              InnovInc <span className="text-primary-500 text-[10px] uppercase tracking-widest ml-1">Author</span>
            </span>
          </Link>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                (location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path)))
                  ? "bg-primary-50 text-primary-600 shadow-sm"
                  : "text-gray-500 hover:text-primary-600 hover:bg-gray-50"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 shrink-0">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl mb-4 border border-gray-100">
            <div className="w-8 h-8 rounded-full bg-navy-950 text-white font-bold flex items-center justify-center text-sm">
              AU
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-navy-950">Author User</span>
              <span className="text-[10px] text-gray-500 truncate">author@example.com</span>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors font-medium text-sm">
            <LogOut className="w-5 h-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow ml-64 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shrink-0 shadow-sm">
          <h1 className="text-xl font-bold text-navy-950">
            {navItems.find(item => location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path)))?.name || 'Dashboard'}
          </h1>
        </header>

        <div className="p-8 flex-grow">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
