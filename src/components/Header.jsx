import React, { useState } from 'react'
import { Bell, Search, ChevronDown, Globe, Menu, LogOut, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const notifications = [
  { id: 1, text: 'โรงพยาบาลสระบุรีส่งเอกสารประเมินแล้ว', time: '5 นาทีที่แล้ว', unread: true },
  { id: 2, text: 'รายงานงบประมาณ Q2 พร้อมแล้ว', time: '1 ชั่วโมงที่แล้ว', unread: true },
  { id: 3, text: 'การแจ้งเตือน: คะแนน HA ต่ำกว่าเกณฑ์', time: '3 ชั่วโมงที่แล้ว', unread: false },
  { id: 4, text: 'ผู้ใช้ใหม่ลงทะเบียน: ดร.กมลา สุขใจ', time: '1 วันที่แล้ว', unread: false },
]

export default function Header({ language, setLanguage, sidebarWidth = 240, onMenuToggle }) {
  const [showNotif, setShowNotif] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const navigate = useNavigate()

  const userRaw = localStorage.getItem('hai_user')
  const user = userRaw ? JSON.parse(userRaw) : { name: 'ผู้ใช้งาน', role: 'viewer' }
  const unreadCount = notifications.filter(n => n.unread).length

  const handleLogout = () => {
    localStorage.removeItem('hai_user')
    navigate('/login')
  }

  const handleLanguageToggle = () => {
    const nextLanguage = language === 'th' ? 'en' : 'th'
    localStorage.setItem('hai_language', nextLanguage)
    setLanguage(nextLanguage)
  }

  return (
    <header
      className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center gap-3 border-b border-gray-200 bg-white px-4 transition-all duration-300 lg:left-[var(--sidebar-width)]"
      style={{ '--sidebar-width': `${sidebarWidth}px` }}
    >
      <button
        onClick={onMenuToggle}
        className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 lg:hidden"
      >
        <Menu size={18} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md ml-1">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหารายงาน โรงพยาบาล นโยบาย..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20 focus:border-[#0D5C8F] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Language Toggle */}
        <button
          onClick={handleLanguageToggle}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Globe size={14} />
          {language === 'th' ? 'ไทย' : 'EN'}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotif(!showNotif); setShowUser(false) }}
            className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotif && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-800">การแจ้งเตือน</span>
                <span className="text-xs text-[#0D5C8F] font-medium cursor-pointer hover:underline">ทำเครื่องหมายว่าอ่านแล้วทั้งหมด</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${n.unread ? 'bg-blue-50/40' : ''}`}>
                    <div className="flex gap-2">
                      {n.unread && <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] flex-shrink-0 mt-1.5" />}
                      <div className={n.unread ? '' : 'pl-3.5'}>
                        <p className="text-xs text-gray-700 leading-relaxed">{n.text}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 text-center">
                <span className="text-xs text-[#0D5C8F] font-medium cursor-pointer hover:underline">ดูการแจ้งเตือนทั้งหมด</span>
              </div>
            </div>
          )}
        </div>

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => { setShowUser(!showUser); setShowNotif(false) }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#0D5C8F] flex items-center justify-center text-white text-xs font-bold">
              {user.name?.charAt(0) || 'U'}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold text-gray-800 leading-tight max-w-[120px] truncate">{user.name}</div>
              <div className="text-[10px] text-gray-400 leading-tight capitalize">{user.role}</div>
            </div>
            <ChevronDown size={13} className="text-gray-400" />
          </button>

          {showUser && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 z-50 py-1">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{user.role === 'admin' ? 'ผู้ดูแลระบบ' : 'นักวิเคราะห์'}</p>
              </div>
              <button
                onClick={() => { navigate('/settings'); setShowUser(false) }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Settings size={15} />
                ตั้งค่าโปรไฟล์
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={15} />
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay to close dropdowns */}
      {(showNotif || showUser) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setShowNotif(false); setShowUser(false) }}
        />
      )}
    </header>
  )
}
