import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { BookOpen, Users, FileText, Settings, LogOut, LayoutDashboard } from 'lucide-react'
import { cn } from '../utils/cn'

export function AdminLayout() {
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Employees', path: '/admin/employees', icon: <Users className="w-5 h-5" /> },
    { name: 'Applications', path: '/admin/applications', icon: <FileText className="w-5 h-5" /> },
    { name: 'Manuscripts', path: '/admin/manuscripts', icon: <FileText className="w-5 h-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-950 text-white flex flex-col fixed h-full z-20">
        <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <BookOpen className="text-white w-5 h-5" />
            </div>
            <span className="font-bold tracking-tight">
              InnovInc <span className="text-primary-500 text-[10px] uppercase tracking-widest ml-1">Admin</span>
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
                (location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path)))
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-600/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl mb-4 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-primary-500 text-navy-950 font-bold flex items-center justify-center text-sm">
              AD
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">Admin User</span>
              <span className="text-[10px] text-gray-400">admin@innovinc.org</span>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors font-medium text-sm">
            <LogOut className="w-5 h-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow ml-64 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shrink-0">
          <h1 className="text-xl font-bold text-navy-950">
            {navItems.find(item => location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path)))?.name || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full font-medium">Internal System</div>
          </div>
        </header>

        <div className="p-8 flex-grow">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
