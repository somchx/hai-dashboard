import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const NO_PADDING_PATHS = [
  '/financial', '/procurement', '/accreditation', '/policy',
  '/report', '/data-prep',
]

export default function Layout({ language, setLanguage }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const sidebarWidth = collapsed ? 64 : 240
  const noPadding = NO_PADDING_PATHS.includes(pathname)

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className="min-h-screen flex flex-col transition-all duration-300 lg:ml-[var(--sidebar-width)]"
        style={{ '--sidebar-width': `${sidebarWidth}px` }}
      >
        <Header
          language={language}
          setLanguage={setLanguage}
          sidebarWidth={sidebarWidth}
          onMenuToggle={() => setMobileOpen(true)}
        />

        <main className={`flex-1 pt-14 flex flex-col ${noPadding ? '' : 'p-6'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
