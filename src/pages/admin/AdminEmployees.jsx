import React, { useState } from 'react'
import { Plus, Search, MoreVertical, Edit2, Trash2, X, User, Mail, Shield } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminEmployees() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Alice Admin', email: 'alice@innovinc.org', role: 'Super Admin', status: 'Active' },
    { id: 2, name: 'Bob Reviewer', email: 'bob@innovinc.org', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Charlie Staff', email: 'charlie@innovinc.org', role: 'Staff', status: 'Inactive' },
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  
  // New Employee Form State
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', role: 'Staff' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddEmployee = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call to add employee
    setTimeout(() => {
      setEmployees([...employees, {
        id: Date.now(),
        name: newEmployee.name,
        email: newEmployee.email,
        role: newEmployee.role,
        status: 'Active'
      }])
      setIsSubmitting(false)
      setIsAddModalOpen(false)
      setNewEmployee({ name: '', email: '', role: 'Staff' })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy-950">Manage Employees</h2>
          <p className="text-gray-500 text-sm mt-1">Create and manage internal employee accounts.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="shadow-sm">
          <Plus className="w-4 h-4 mr-2" /> Add Employee
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 outline-none text-sm font-medium transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Employee</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-navy-950 text-sm">{emp.name}</span>
                      <span className="text-xs text-gray-500">{emp.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700 font-medium">{emp.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                      emp.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" className="h-8 w-8 p-0 border-gray-200 text-gray-600 hover:text-primary-600" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    No employees found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm"
              onClick={() => setIsAddModalOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-xl font-bold text-navy-950">Add New Employee</h3>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddEmployee} className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-navy-900">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none text-sm font-medium text-navy-900 placeholder-gray-400"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-navy-900">Official Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      required
                      pattern=".*@innovinc\.org"
                      title="Must be an @innovinc.org email address"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none text-sm font-medium text-navy-900 placeholder-gray-400"
                      placeholder="j.doe@innovinc.org"
                    />
                  </div>
                  <p className="text-[11px] text-gray-500">Employee emails must end in @innovinc.org.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-navy-900">Role</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Shield className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      value={newEmployee.role}
                      onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})}
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none text-sm font-medium text-navy-900 appearance-none"
                    >
                      <option value="Staff">Staff</option>
                      <option value="Editor">Editor</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex gap-3 justify-end">
                  <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      'Create Employee'
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
