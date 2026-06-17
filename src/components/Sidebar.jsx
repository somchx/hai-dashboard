import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  DollarSign,
  ShoppingCart,
  Award,
  Bell,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield,
  PlusSquare,
  Database,
  GitBranch,
} from 'lucide-react'

const navItems = [
  {
    group: 'หน้าหลัก',
    items: [
      { path: '/', icon: LayoutDashboard, label: 'ภาพรวม', labelEn: 'Overview' },
    ]
  },
  {
    group: 'ข้อมูลหลัก',
    items: [
      { path: '/financial', icon: DollarSign, label: 'ข้อมูลการเงิน', labelEn: 'Financial' },
      { path: '/procurement', icon: ShoppingCart, label: 'ข้อมูลพัสดุ', labelEn: 'Procurement' },
      { path: '/accreditation', icon: Award, label: 'การรับรองคุณภาพ', labelEn: 'Accreditation' },
      { path: '/policy', icon: Shield, label: 'ข้อมูลนโยบาย', labelEn: 'Policy' },
    ]
  },
  {
    group: 'Self-Service',
    items: [
      { path: '/report', icon: PlusSquare, label: 'สร้างรายงาน', labelEn: 'Report' },
    ]
  },
  {
    group: 'เครื่องมือข้อมูล',
    items: [
      { path: '/data-prep', icon: Database, label: 'Data Preparation', labelEn: 'Data Preparation' },
      { path: '/data-modeling', icon: GitBranch, label: 'Data Modeling', labelEn: 'Data Modeling' },
    ]
  },
  {
    group: 'ระบบ',
    items: [
      { path: '/admin', icon: Users, label: 'ผู้ใช้งาน', labelEn: 'Users' },
      { path: '/alerts', icon: Bell, label: 'การแจ้งเตือน', labelEn: 'Alerts' },
      { path: '/settings', icon: Settings, label: 'ตั้งค่า', labelEn: 'Settings' },
    ]
  }
]

export default function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('hai_user')
    navigate('/login')
  }

  return (
    <aside
      className={`fixed left-0 top-0 h-full z-40 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
      style={{ background: 'linear-gradient(180deg, #0D5C8F 0%, #082F49 100%)' }}
    >
      {/* Logo Area */}
      <div className={`flex items-center px-4 py-4 border-b border-white/10 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="flex-shrink-0 w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
          <span className="text-[#0D5C8F] font-black text-sm">HAI</span>
        </div>
        {!collapsed && (
          <div>
            <div className="text-white font-bold text-sm leading-tight">HAI Dashboard</div>
            <div className="text-blue-200 text-xs">Smart BI System</div>
          </div>
        )}
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-14 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors z-50 border border-gray-100"
      >
        {collapsed ? <ChevronRight size={12} className="text-gray-600" /> : <ChevronLeft size={12} className="text-gray-600" />}
      </button>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navItems.map((group) => (
          <div key={group.group} className="mb-4">
            {!collapsed && (
              <p className="text-blue-300/70 text-[10px] font-semibold uppercase tracking-wider px-3 mb-1.5">
                {group.group}
              </p>
            )}
            {group.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `sidebar-item mb-0.5 ${isActive ? 'active' : item.highlight ? 'text-amber-300 font-semibold' : 'text-blue-100/80'} ${collapsed ? 'justify-center px-0' : ''}`
                }
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={18} className="flex-shrink-0" />
                {!collapsed && (
                  <span className="truncate text-sm">{item.label}{item.highlight && <span className="ml-1 text-amber-400">★</span>}</span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={`sidebar-item text-blue-100/80 w-full ${collapsed ? 'justify-center px-0' : ''}`}
          title={collapsed ? 'ออกจากระบบ' : undefined}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm">ออกจากระบบ</span>}
        </button>
      </div>
    </aside>
  )
}
