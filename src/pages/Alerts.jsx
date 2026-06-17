import React, { useState } from 'react'
import { Bell, Plus, Trash2, Mail, Clock, AlertTriangle, Info } from 'lucide-react'

const initialAlerts = [
  { id: 1, metric: 'คะแนน HA เฉลี่ย', condition: '<', threshold: 75, channel: 'email', active: true, createdAt: '01/06/2567' },
  { id: 2, metric: 'งบประมาณที่ใช้', condition: '>', threshold: 90, channel: 'email', active: true, createdAt: '15/05/2567' },
  { id: 3, metric: 'คำขอจัดซื้อค้าง', condition: '>', threshold: 200, channel: 'email', active: false, createdAt: '10/05/2567' },
  { id: 4, metric: 'โรงพยาบาลใบรับรองหมดอายุ', condition: '>', threshold: 10, channel: 'email', active: true, createdAt: '05/05/2567' },
  { id: 5, metric: 'ผู้ใช้งานออนไลน์', condition: '>', threshold: 150, channel: 'email', active: false, createdAt: '01/05/2567' },
]

const alertHistory = [
  { id: 1, metric: 'คะแนน HA เฉลี่ย', value: 72.3, threshold: 75, triggered: '15/06/2567 10:23', channel: 'email', type: 'warning', sentTo: 'admin@hai.go.th' },
  { id: 2, metric: 'งบประมาณที่ใช้', value: 92.1, threshold: 90, triggered: '12/06/2567 09:15', channel: 'email', type: 'critical', sentTo: 'finance@hai.go.th' },
  { id: 3, metric: 'คะแนน HA เฉลี่ย', value: 73.8, threshold: 75, triggered: '10/06/2567 14:42', channel: 'email', type: 'warning', sentTo: 'admin@hai.go.th' },
  { id: 4, metric: 'โรงพยาบาลใบรับรองหมดอายุ', value: 12, threshold: 10, triggered: '08/06/2567 08:00', channel: 'email', type: 'info', sentTo: 'quality@hai.go.th' },
  { id: 5, metric: 'งบประมาณที่ใช้', value: 91.5, threshold: 90, triggered: '05/06/2567 15:30', channel: 'email', type: 'critical', sentTo: 'finance@hai.go.th' },
  { id: 6, metric: 'คำขอจัดซื้อค้าง', value: 215, threshold: 200, triggered: '03/06/2567 11:00', channel: 'email', type: 'warning', sentTo: 'procurement@hai.go.th' },
]

const metrics = [
  'คะแนน HA เฉลี่ย',
  'งบประมาณที่ใช้ (%)',
  'คำขอจัดซื้อค้าง',
  'โรงพยาบาลใบรับรองหมดอายุ',
  'ผู้ใช้งานออนไลน์',
  'รายรับประจำเดือน',
  'อัตราส่วนรายจ่าย',
  'Hospital Risk Score',
  'Budget Utilization',
]

const historyTypeStyle = {
  critical: { icon: AlertTriangle, cls: 'text-red-600 bg-red-50' },
  warning: { icon: AlertTriangle, cls: 'text-amber-600 bg-amber-50' },
  info: { icon: Info, cls: 'text-blue-600 bg-blue-50' },
}

const pinnedAlerts = [
  {
    id: 'pinned-1',
    label: 'Hospital Risk Score > 80',
    channels: 'Email',
    channelColor: 'bg-blue-100 text-blue-700',
    description: 'แจ้งเตือนเมื่อโรงพยาบาลมีคะแนนความเสี่ยงสูงกว่า 80 คะแนน',
  },
  {
    id: 'pinned-2',
    label: 'Budget Utilization > 85%',
    channels: 'Email',
    channelColor: 'bg-blue-100 text-blue-700',
    description: 'แจ้งเตือนเมื่ออัตราการใช้งบประมาณเกิน 85% ของวงเงินที่ได้รับ',
  },
]

export default function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ metric: metrics[0], condition: '>', threshold: '', channel: 'email' })
  const [builderForm, setBuilderForm] = useState({ metric: metrics[0], operator: '>', value: '', channel: 'email' })

  const toggleAlert = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a))
  }

  const deleteAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id))
  }

  const handleCreate = (e) => {
    e.preventDefault()
    if (!form.threshold) return
    setAlerts(prev => [...prev, {
      id: Date.now(),
      ...form,
      threshold: Number(form.threshold),
      active: true,
      createdAt: new Date().toLocaleDateString('th-TH'),
    }])
    setForm({ metric: metrics[0], condition: '>', threshold: '', channel: 'email' })
    setShowForm(false)
  }

  const handleBuilderAdd = (e) => {
    e.preventDefault()
    if (!builderForm.value) return
    alert(`เพิ่มเงื่อนไขแล้ว: ${builderForm.metric} ${builderForm.operator} ${builderForm.value} → ${builderForm.channel.toUpperCase()}`)
    setBuilderForm({ metric: metrics[0], operator: '>', value: '', channel: 'email' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">การแจ้งเตือน</h1>
          <p className="text-sm text-gray-500 mt-0.5">Alerts & Notifications</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary text-xs flex items-center gap-1.5"
        >
          <Plus size={14} />
          สร้างการแจ้งเตือน
        </button>
      </div>

      {/* Alert Condition Builder */}
      <div className="chart-card border border-[#0D5C8F]/15">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Bell size={15} className="text-[#0D5C8F]" />
          เงื่อนไขการแจ้งเตือน
          <span className="text-xs font-normal text-gray-400 ml-1">Alert Condition Builder</span>
        </h3>
        <form onSubmit={handleBuilderAdd} className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600 font-medium whitespace-nowrap">เมื่อ</span>
          <select
            value={builderForm.metric}
            onChange={e => setBuilderForm({ ...builderForm, metric: e.target.value })}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20 bg-white"
          >
            {metrics.map(m => <option key={m}>{m}</option>)}
          </select>
          <select
            value={builderForm.operator}
            onChange={e => setBuilderForm({ ...builderForm, operator: e.target.value })}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20 bg-white font-mono w-20"
          >
            <option value=">">{'>'}</option>
            <option value="<">{'<'}</option>
            <option value="=">{'='}</option>
            <option value=">=">{'>='}</option>
            <option value="<=">{'<='}</option>
          </select>
          <input
            type="number"
            value={builderForm.value}
            onChange={e => setBuilderForm({ ...builderForm, value: e.target.value })}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20 w-24"
            placeholder="ค่า"
            required
          />
          <span className="text-sm text-gray-600 font-medium whitespace-nowrap">ส่งแจ้งเตือนทาง</span>
          <select
            value={builderForm.channel}
            onChange={e => setBuilderForm({ ...builderForm, channel: e.target.value })}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20 bg-white"
          >
            <option value="email">Email</option>
            <option value="system">แจ้งเตือนในระบบ</option>
            <option value="both">Email + แจ้งเตือนในระบบ</option>
          </select>
          <button
            type="submit"
            className="btn-primary text-sm px-4 py-2 whitespace-nowrap"
          >
            เพิ่ม
          </button>
        </form>
      </div>

      {/* Create Alert Form */}
      {showForm && (
        <div className="chart-card border-2 border-[#0D5C8F]/20">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">สร้างการแจ้งเตือนใหม่</h3>
          <form onSubmit={handleCreate}>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">ตัวชี้วัด (Metric)</label>
                <select
                  value={form.metric}
                  onChange={e => setForm({ ...form, metric: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
                >
                  {metrics.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">เงื่อนไข</label>
                <select
                  value={form.condition}
                  onChange={e => setForm({ ...form, condition: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
                >
                  <option value=">">{'> มากกว่า'}</option>
                  <option value="<">{'< น้อยกว่า'}</option>
                  <option value="=">=  เท่ากับ</option>
                  <option value=">=">{'>= มากกว่าหรือเท่ากับ'}</option>
                  <option value="<=">{'<= น้อยกว่าหรือเท่ากับ'}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">ค่าเกณฑ์ (Threshold)</label>
                <input
                  type="number"
                  value={form.threshold}
                  onChange={e => setForm({ ...form, threshold: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
                  placeholder="เช่น 80"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">ช่องทางแจ้งเตือน</label>
                <select
                  value={form.channel}
                  onChange={e => setForm({ ...form, channel: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
                >
                  <option value="email">อีเมล</option>
                  <option value="system">แจ้งเตือนในระบบ</option>
                  <option value="both">อีเมล + แจ้งเตือนในระบบ</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="btn-primary text-sm">บันทึกการแจ้งเตือน</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">ยกเลิก</button>
            </div>
          </form>
        </div>
      )}

      {/* Active Alerts */}
      <div className="chart-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <Bell size={15} className="text-[#0D5C8F]" />
            การแจ้งเตือนที่ตั้งไว้
            <span className="badge bg-blue-100 text-blue-700">{alerts.filter(a => a.active).length} ใช้งาน</span>
          </h3>
        </div>
        <div className="space-y-2">
          {/* Pre-populated pinned alert cards */}
          {pinnedAlerts.map(pinned => (
            <div
              key={pinned.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-blue-200 bg-blue-50/60"
              style={{ borderLeft: '4px solid #0D5C8F' }}
            >
              <div className="p-2 rounded-lg bg-[#0D5C8F] text-white flex-shrink-0">
                <Mail size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{pinned.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{pinned.description}</p>
              </div>
              <div className="flex-shrink-0">
                <span className={`badge text-xs font-medium px-2 py-1 rounded-full ${pinned.channelColor}`}>
                  {pinned.channels}
                </span>
              </div>
            </div>
          ))}

          {/* Dynamic alerts */}
          {alerts.map(alert => (
            <div key={alert.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${alert.active ? 'bg-blue-50/40 border-blue-100' : 'bg-gray-50 border-gray-100 opacity-60'}`}>
              <div className={`p-2 rounded-lg ${alert.active ? 'bg-[#0D5C8F] text-white' : 'bg-gray-200 text-gray-500'}`}>
                {alert.channel === 'email' || alert.channel === 'both' ? <Mail size={16} /> : <Bell size={16} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">
                  {alert.metric} <span className="font-mono text-[#0D5C8F]">{alert.condition}</span> {alert.threshold}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  ช่องทาง: {alert.channel === 'email' ? 'อีเมล' : alert.channel === 'system' ? 'แจ้งเตือนในระบบ' : 'อีเมล + แจ้งเตือนในระบบ'} — สร้าง {alert.createdAt}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => toggleAlert(alert.id)}
                  className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${alert.active ? 'bg-[#0D5C8F]' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${alert.active ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
                <button
                  onClick={() => deleteAlert(alert.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {alerts.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">ยังไม่มีการแจ้งเตือน กดปุ่ม "สร้างการแจ้งเตือน" เพื่อเริ่มต้น</p>
          )}
        </div>
      </div>

      {/* Alert History */}
      <div className="chart-card">
        <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Clock size={15} className="text-[#0D5C8F]" />
          ประวัติการแจ้งเตือน
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">เวลา</th>
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">เงื่อนไข</th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">ค่าที่ตรวจพบ</th>
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">ส่งถึง</th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {alertHistory.map(h => {
                const { icon: HIcon, cls } = historyTypeStyle[h.type] || historyTypeStyle.info
                return (
                  <tr key={h.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-3 text-gray-500 whitespace-nowrap">{h.triggered}</td>
                    <td className="py-3 px-3 font-medium text-gray-800">
                      {h.metric} <span className="font-mono text-[#0D5C8F]">{'>'}</span> {h.threshold}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-semibold text-gray-700">{h.value}</td>
                    <td className="py-3 px-3 text-gray-500">{h.sentTo}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-flex items-center gap-1 badge ${cls}`}>
                        <HIcon size={10} />
                        {h.type === 'critical' ? 'วิกฤต' : h.type === 'warning' ? 'เตือน' : 'ข้อมูล'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
