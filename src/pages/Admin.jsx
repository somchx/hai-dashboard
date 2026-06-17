import React, { useState } from 'react'
import { Users, Plus, Search, Edit2, Trash2, Shield, Eye, BarChart3, X, Check, Lock, MapPin } from 'lucide-react'

const initialUsers = [
  { id: 1, name: 'นายแพทย์ สมชาย ใจดี', email: 'somchai@hai.or.th', role: 'admin', lastLogin: '17/06/2567 08:32', status: 'ใช้งาน', dept: 'ผู้บริหาร' },
  { id: 2, name: 'ดร.วิชัย ศรีสมบัติ', email: 'wichai@hai.or.th', role: 'analyst', lastLogin: '17/06/2567 07:45', status: 'ใช้งาน', dept: 'วิชาการ' },
  { id: 3, name: 'นาง จิรา ทองดี', email: 'jira@hai.or.th', role: 'viewer', lastLogin: '16/06/2567 16:20', status: 'ใช้งาน', dept: 'การเงิน' },
  { id: 4, name: 'พญ.มาลี จันทร์เพ็ง', email: 'malee@hai.or.th', role: 'analyst', lastLogin: '16/06/2567 14:00', status: 'ใช้งาน', dept: 'การรับรอง' },
  { id: 5, name: 'นาย ประทีป สุวรรณ', email: 'prateep@hai.or.th', role: 'viewer', lastLogin: '15/06/2567 11:30', status: 'ใช้งาน', dept: 'IT' },
  { id: 6, name: 'นาย สิทธิชัย ประทุมทอง', email: 'sittichai@hai.or.th', role: 'viewer', lastLogin: '14/06/2567 09:15', status: 'ระงับ', dept: 'พัสดุ' },
  { id: 7, name: 'นพ.กิตติพงศ์ มีสุข', email: 'kittipong@hai.or.th', role: 'analyst', lastLogin: '13/06/2567 16:45', status: 'ใช้งาน', dept: 'คุณภาพ' },
  { id: 8, name: 'ดร.กมลา สุขใจ', email: 'kamala@hai.or.th', role: 'viewer', lastLogin: '12/06/2567 10:00', status: 'ใช้งาน', dept: 'วิชาการ' },
]

const roleConfig = {
  admin: { label: 'Admin', cls: 'status-badge-admin', icon: Shield },
  analyst: { label: 'Analyst', cls: 'status-badge-analyst', icon: BarChart3 },
  viewer: { label: 'Viewer', cls: 'status-badge-viewer', icon: Eye },
}

const permissions = [
  { name: 'ดูแดชบอร์ดภาพรวม', admin: true, analyst: true, viewer: true },
  { name: 'ดูข้อมูลการเงิน', admin: true, analyst: true, viewer: true },
  { name: 'แก้ไขข้อมูลการเงิน', admin: true, analyst: true, viewer: false },
  { name: 'ดูข้อมูลพัสดุ', admin: true, analyst: true, viewer: true },
  { name: 'อนุมัติการจัดซื้อ', admin: true, analyst: false, viewer: false },
  { name: 'ดูข้อมูลการรับรอง', admin: true, analyst: true, viewer: true },
  { name: 'แก้ไขข้อมูลการรับรอง', admin: true, analyst: true, viewer: false },
  { name: 'จัดการผู้ใช้', admin: true, analyst: false, viewer: false },
  { name: 'ตั้งค่าระบบ', admin: true, analyst: false, viewer: false },
  { name: 'ดาวน์โหลดรายงาน', admin: true, analyst: true, viewer: true },
  { name: 'สร้างรายงาน', admin: true, analyst: true, viewer: false },
  { name: 'ตั้งค่าการแจ้งเตือน', admin: true, analyst: true, viewer: false },
]

const rowLevelPolicies = [
  { id: 1, scope: 'จังหวัด', target: 'เชียงใหม่, ลำพูน, ลำปาง', role: 'analyst', type: 'Row-level' },
  { id: 2, scope: 'กลุ่มโรงพยาบาล', target: 'รพ.ศูนย์ภาคใต้', role: 'viewer', type: 'User-level' },
  { id: 3, scope: 'Dataset', target: 'financial_data เฉพาะ read-only', role: 'viewer', type: 'Role-based' },
]

export default function Admin() {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('ทั้งหมด')
  const [showModal, setShowModal] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'viewer', dept: '' })

  const filtered = users.filter(u =>
    (roleFilter === 'ทั้งหมด' || u.role === roleFilter) &&
    (search === '' || u.name.includes(search) || u.email.includes(search))
  )

  const handleAddUser = (e) => {
    e.preventDefault()
    if (!newUser.name || !newUser.email) return
    setUsers(prev => [...prev, {
      id: Date.now(),
      ...newUser,
      lastLogin: 'ยังไม่เคยเข้าสู่ระบบ',
      status: 'ใช้งาน',
    }])
    setNewUser({ name: '', email: '', role: 'viewer', dept: '' })
    setShowModal(false)
  }

  const toggleStatus = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'ใช้งาน' ? 'ระงับ' : 'ใช้งาน' } : u))
  }

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">จัดการผู้ใช้งาน</h1>
          <p className="text-sm text-gray-500 mt-0.5">User Management — {users.length} บัญชีผู้ใช้</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary text-xs flex items-center gap-1.5"
        >
          <Plus size={14} />
          เพิ่มผู้ใช้งาน
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {['admin', 'analyst', 'viewer'].map(role => {
          const { label, cls, icon: RoleIcon } = roleConfig[role]
          const count = users.filter(u => u.role === role).length
          return (
            <div key={role} className="kpi-card flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gray-100">
                <RoleIcon size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-800">{count}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* User Table */}
      <div className="chart-card">
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ค้นหาผู้ใช้..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none"
            />
          </div>
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
          >
            <option>ทั้งหมด</option>
            <option value="admin">Admin</option>
            <option value="analyst">Analyst</option>
            <option value="viewer">Viewer</option>
          </select>
          <p className="text-xs text-gray-400">{filtered.length} ผู้ใช้</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">ชื่อ-นามสกุล</th>
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">อีเมล</th>
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">แผนก</th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">บทบาท</th>
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">เข้าสู่ระบบล่าสุด</th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">สถานะ</th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => {
                const { label, cls } = roleConfig[u.role] || roleConfig.viewer
                return (
                  <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#0D5C8F] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-800">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-gray-500">{u.email}</td>
                    <td className="py-3 px-3 text-gray-500">{u.dept}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`badge ${cls}`}>{label}</span>
                    </td>
                    <td className="py-3 px-3 text-gray-500">{u.lastLogin}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`badge ${u.status === 'ใช้งาน' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => toggleStatus(u.id)}
                          className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-500 transition-colors"
                          title={u.status === 'ใช้งาน' ? 'ระงับบัญชี' : 'เปิดใช้งาน'}
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => deleteUser(u.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                          title="ลบบัญชี"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="chart-card">
        <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Shield size={15} className="text-[#0D5C8F]" />
          เมทริกซ์สิทธิ์การใช้งาน
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">สิทธิ์</th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">Admin</th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">Analyst</th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">Viewer</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-2.5 px-3 text-gray-700">{perm.name}</td>
                  {['admin', 'analyst', 'viewer'].map(role => (
                    <td key={role} className="py-2.5 px-3 text-center">
                      {perm[role] ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-green-100 rounded-full">
                          <Check size={11} className="text-green-600" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-red-50 rounded-full">
                          <X size={11} className="text-red-400" />
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)]">
        <div className="chart-card">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-800">
            <Lock size={15} className="text-[#0D5C8F]" />
            Data Access Control
          </h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-xs font-semibold text-blue-700">User-level</p>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">กำหนดสิทธิ์รายบุคคล เช่น จำกัดให้เห็นเฉพาะโรงพยาบาลหรือจังหวัดที่รับผิดชอบ</p>
            </div>
            <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
              <p className="text-xs font-semibold text-purple-700">Role-based</p>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">ควบคุมความสามารถตามบทบาท Admin, Analyst และ Viewer เพื่อแยกหน้าที่การใช้งาน</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-xs font-semibold text-emerald-700">Row-level Security</p>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">กรองข้อมูลระดับ record เช่น จังหวัด, เครือข่ายโรงพยาบาล หรือ dataset ที่ได้รับอนุญาต</p>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-800">
            <MapPin size={15} className="text-[#0D5C8F]" />
            ตัวอย่าง Policy ที่ใช้งาน
          </h3>
          <div className="space-y-3">
            {rowLevelPolicies.map(policy => (
              <div key={policy.id} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="badge bg-slate-100 text-slate-700">{policy.type}</span>
                  <span className="badge bg-blue-100 text-blue-700">{roleConfig[policy.role]?.label || policy.role}</span>
                </div>
                <p className="mt-2 text-xs font-medium text-gray-800">{policy.scope}</p>
                <p className="mt-1 text-xs text-gray-500">{policy.target}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800">เพิ่มผู้ใช้งานใหม่</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                <X size={15} />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">ชื่อ-นามสกุล</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
                  placeholder="นายแพทย์ สมชาย ใจดี"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">อีเมล</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
                  placeholder="user@hai.or.th"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">แผนก</label>
                <input
                  type="text"
                  value={newUser.dept}
                  onChange={e => setNewUser({ ...newUser, dept: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
                  placeholder="เช่น การเงิน, วิชาการ, IT"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">บทบาท</label>
                <select
                  value={newUser.role}
                  onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
                >
                  <option value="admin">Admin — ผู้ดูแลระบบ</option>
                  <option value="analyst">Analyst — นักวิเคราะห์</option>
                  <option value="viewer">Viewer — ผู้ดูข้อมูล</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 btn-primary text-sm py-2.5">เพิ่มผู้ใช้งาน</button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 btn-secondary text-sm py-2.5">ยกเลิก</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
