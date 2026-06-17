import React, { useState } from 'react'
import {
  User, Database,
  CheckCircle, XCircle, RefreshCw, Save,
} from 'lucide-react'

const dataSources = [
  { id: 1, name: 'ระบบ HIS (Hospital Information System)', type: 'Database', status: 'connected', lastSync: '17/06/2567 06:00', records: '2.4M' },
  { id: 2, name: 'ระบบบัญชีการเงิน (ERP)', type: 'API', status: 'connected', lastSync: '17/06/2567 05:30', records: '180K' },
  { id: 3, name: 'ระบบพัสดุกลาง (GProcure)', type: 'API', status: 'connected', lastSync: '17/06/2567 04:00', records: '45K' },
  { id: 4, name: 'ฐานข้อมูลการรับรอง HA', type: 'Database', status: 'connected', lastSync: '17/06/2567 03:00', records: '12K' },
  { id: 5, name: 'ระบบรายงาน NHSO', type: 'API', status: 'disconnected', lastSync: '10/06/2567 12:00', records: '-' },
  { id: 6, name: 'ระบบ GIS ภูมิสารสนเทศ', type: 'REST API', status: 'connecting', lastSync: 'กำลังเชื่อมต่อ...', records: '-' },
]

export default function Settings() {
  const userRaw = localStorage.getItem('hai_user')
  const user = userRaw ? JSON.parse(userRaw) : { name: '', email: '' }

  const [profile, setProfile] = useState({
    name: user.name || 'นายแพทย์ สมชาย ใจดี',
    email: user.email || 'admin@hai.or.th',
    language: 'th',
    timezone: 'Asia/Bangkok',
    notifications: true,
  })

  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const handleSave = () => {
    localStorage.setItem('hai_user', JSON.stringify({ ...user, ...profile }))
    localStorage.setItem('hai_language', profile.language)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const tabs = [
    { id: 'profile', label: 'โปรไฟล์', icon: User },
  ]

  return (
    <div className="space-y-6 max-w-4xl p-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">ตั้งค่า</h1>
        <p className="text-sm text-gray-500 mt-0.5">Settings — จัดการการตั้งค่าบัญชี</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === t.id
                ? 'bg-white text-[#0D5C8F] shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <t.icon size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="chart-card">
          <h3 className="text-sm font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <User size={15} className="text-[#0D5C8F]" />
            ข้อมูลโปรไฟล์
          </h3>

          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="w-14 h-14 rounded-full bg-[#0D5C8F] text-white flex items-center justify-center text-lg font-bold">
              {profile.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{profile.name}</p>
              <p className="text-xs text-gray-400">{profile.email}</p>
              <span className="badge bg-purple-100 text-purple-700 text-[10px] mt-1">ผู้ดูแลระบบ (Admin)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">ชื่อ-นามสกุล</label>
              <input
                type="text"
                value={profile.name}
                onChange={e => setProfile({ ...profile, name: e.target.value })}
                className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">อีเมล</label>
              <input
                type="email"
                value={profile.email}
                onChange={e => setProfile({ ...profile, email: e.target.value })}
                className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">ภาษาที่ใช้</label>
              <select
                value={profile.language}
                onChange={e => setProfile({ ...profile, language: e.target.value })}
                className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
              >
                <option value="th">ภาษาไทย</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">เขตเวลา</label>
              <select
                value={profile.timezone}
                onChange={e => setProfile({ ...profile, timezone: e.target.value })}
                className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
              >
                <option value="Asia/Bangkok">เอเชีย/กรุงเทพ (UTC+7)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-gray-100 mt-4">
            <div>
              <p className="text-sm font-medium text-gray-700">การแจ้งเตือนทางอีเมล</p>
              <p className="text-xs text-gray-400">รับการแจ้งเตือนผ่านทางอีเมล</p>
            </div>
            <button
              onClick={() => setProfile({ ...profile, notifications: !profile.notifications })}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${profile.notifications ? 'bg-[#0D5C8F]' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${profile.notifications ? 'translate-x-5' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex gap-2 mt-4">
            <button onClick={handleSave} className="btn-primary text-sm flex items-center gap-2">
              {saved ? <CheckCircle size={14} /> : <Save size={14} />}
              {saved ? 'บันทึกแล้ว!' : 'บันทึกการเปลี่ยนแปลง'}
            </button>
          </div>
        </div>
      )}

      {/* Data Sources Tab */}
      {activeTab === 'datasources' && (
        <div className="chart-card">
          <h3 className="text-sm font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <Database size={15} className="text-[#0D5C8F]" />
            การเชื่อมต่อแหล่งข้อมูล
          </h3>
          <div className="space-y-3">
            {dataSources.map(ds => (
              <div key={ds.id} className={`p-4 rounded-xl border-2 transition-all ${
                ds.status === 'connected' ? 'border-green-100 bg-green-50/30' :
                ds.status === 'connecting' ? 'border-amber-100 bg-amber-50/30' :
                'border-red-100 bg-red-50/20'
              }`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg mt-0.5 ${
                      ds.status === 'connected' ? 'bg-green-100' :
                      ds.status === 'connecting' ? 'bg-amber-100' :
                      'bg-red-100'
                    }`}>
                      <Database size={16} className={
                        ds.status === 'connected' ? 'text-green-600' :
                        ds.status === 'connecting' ? 'text-amber-600' :
                        'text-red-500'
                      } />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{ds.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="badge bg-gray-100 text-gray-600 text-[10px]">{ds.type}</span>
                        <span className="text-[11px] text-gray-400">อัปเดตล่าสุด: {ds.lastSync}</span>
                        {ds.records !== '-' && (
                          <span className="text-[11px] text-gray-400">{ds.records} records</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${
                      ds.status === 'connected' ? 'bg-green-100 text-green-700' :
                      ds.status === 'connecting' ? 'bg-amber-100 text-amber-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {ds.status === 'connected' ? <CheckCircle size={11} /> :
                       ds.status === 'connecting' ? <RefreshCw size={11} className="animate-spin" /> :
                       <XCircle size={11} />}
                      {ds.status === 'connected' ? 'เชื่อมต่อแล้ว' :
                       ds.status === 'connecting' ? 'กำลังเชื่อมต่อ' : 'ไม่ได้เชื่อมต่อ'}
                    </div>
                    {ds.status === 'disconnected' && (
                      <button className="text-xs btn-secondary py-1 px-2.5">เชื่อมต่อ</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
