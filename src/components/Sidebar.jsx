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

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('hai_user')
    navigate('/login')
  }

  return (
    <>
      {mobileOpen ? (
        <button
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          aria-label="Close sidebar overlay"
        />
      ) : null}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-full flex-col transition-all duration-300 ${
          collapsed ? 'lg:w-16' : 'lg:w-60'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} w-72 lg:translate-x-0`}
        style={{ background: 'linear-gradient(180deg, #0D5C8F 0%, #082F49 100%)' }}
      >
        {/* Logo Area */}
        <div className={`flex items-center border-b border-white/10 px-4 py-4 ${collapsed ? 'lg:justify-center' : 'gap-3'}`}>
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
            <span className="text-sm font-black text-[#0D5C8F]">HAI</span>
          </div>
          {(!collapsed || mobileOpen) && (
            <div>
              <div className="text-sm font-bold leading-tight text-white">HAI Dashboard</div>
              <div className="text-xs text-blue-200">Smart BI System</div>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-14 z-50 hidden h-6 w-6 items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition-colors hover:bg-gray-50 lg:flex"
        >
          {collapsed ? <ChevronRight size={12} className="text-gray-600" /> : <ChevronLeft size={12} className="text-gray-600" />}
        </button>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {navItems.map((group) => (
            <div key={group.group} className="mb-4">
              {(!collapsed || mobileOpen) && (
                <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-blue-300/70">
                  {group.group}
                </p>
              )}
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `sidebar-item mb-0.5 ${isActive ? 'active' : item.highlight ? 'text-amber-300 font-semibold' : 'text-blue-100/80'} ${collapsed && !mobileOpen ? 'justify-center px-0' : ''}`
                  }
                  title={collapsed && !mobileOpen ? item.label : undefined}
                >
                  <item.icon size={18} className="flex-shrink-0" />
                  {(!collapsed || mobileOpen) && (
                    <span className="truncate text-sm">{item.label}{item.highlight && <span className="ml-1 text-amber-400">★</span>}</span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-2">
          <button
            onClick={handleLogout}
            className={`sidebar-item w-full text-blue-100/80 ${collapsed && !mobileOpen ? 'justify-center px-0' : ''}`}
            title={collapsed && !mobileOpen ? 'ออกจากระบบ' : undefined}
          >
            <LogOut size={18} className="flex-shrink-0" />
            {(!collapsed || mobileOpen) && <span className="text-sm">ออกจากระบบ</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
