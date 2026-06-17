import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout({ language, setLanguage }) {
  const [collapsed, setCollapsed] = useState(false)

  const sidebarWidth = collapsed ? 64 : 240

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className="transition-all duration-300 min-h-screen"
        style={{ marginLeft: sidebarWidth }}
      >
        <Header language={language} setLanguage={setLanguage} sidebarWidth={sidebarWidth} />

        <main className="pt-14 min-h-screen">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
