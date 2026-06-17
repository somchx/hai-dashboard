import React, { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { Shield, CheckCircle, Clock, RefreshCw, TrendingUp, Download } from 'lucide-react'
import KPICard from '../components/KPICard'
import ChartCard from '../components/ChartCard'
import {
  policies, kpiAchievementData, implementationProgress, policyCategories, ganttData, kpiData
} from '../data/mockPolicy'

const statusStyle = {
  'ดำเนินการ': 'bg-blue-100 text-blue-700',
  'สำเร็จ': 'bg-green-100 text-green-700',
  'ทบทวน': 'bg-amber-100 text-amber-700',
  'ระงับ': 'bg-red-100 text-red-700',
}

const priorityStyle = {
  'สูง': 'bg-red-50 text-red-600',
  'กลาง': 'bg-amber-50 text-amber-600',
  'ต่ำ': 'bg-green-50 text-green-600',
}

const MONTH_LABELS = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.']
const CATEGORY_COLORS = { 'บริการสุขภาพ': '#0D5C8F', 'บุคลากร': '#22C55E', 'เทคโนโลยี': '#0EA5E9', 'ความปลอดภัย': '#F59E0B', 'เภสัชกรรม': '#8B5CF6', 'พัฒนาสถานพยาบาล': '#06B6D4', 'ความเป็นธรรม': '#EC4899' }

function GanttChart({ data }) {
  return (
    <div className="space-y-2.5 mt-2">
      {/* Month headers */}
      <div className="flex items-center">
        <div className="w-40 flex-shrink-0" />
        <div className="flex-1 grid" style={{ gridTemplateColumns: 'repeat(15, 1fr)' }}>
          {MONTH_LABELS.map((m, i) => (
            <div key={i} className="text-[9px] text-gray-400 text-center border-l border-gray-100 py-1">{m}</div>
          ))}
        </div>
      </div>
      {data.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <div className="w-40 flex-shrink-0 text-xs text-gray-600 font-medium truncate">{item.name}</div>
          <div className="flex-1 relative h-7 bg-gray-100 rounded">
            <div
              className="absolute top-0.5 h-6 rounded flex items-center px-2 overflow-hidden"
              style={{
                left: `${((item.start - 1) / 15) * 100}%`,
                width: `${(item.duration / 15) * 100}%`,
                background: CATEGORY_COLORS[item.category] || '#0D5C8F',
                opacity: 0.85,
              }}
            >
              <span className="text-[9px] text-white font-medium truncate">{item.progress}%</span>
            </div>
            <div
              className="absolute top-0.5 h-6 rounded"
              style={{
                left: `${((item.start - 1) / 15) * 100}%`,
                width: `${(item.duration / 15) * (item.progress / 100) * 100}%`,
                background: CATEGORY_COLORS[item.category] || '#0D5C8F',
              }}
            />
          </div>
        </div>
      ))}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 pt-3 border-t border-gray-100">
        {Object.entries(CATEGORY_COLORS).map(([k, v]) => (
          <div key={k} className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: v }} />
            <span className="text-[10px] text-gray-500">{k}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Policy() {
  const [statusFilter, setStatusFilter] = useState('ทั้งหมด')
  const statuses = ['ทั้งหมด', 'ดำเนินการ', 'สำเร็จ', 'ทบทวน']

  const filtered = policies.filter(p => statusFilter === 'ทั้งหมด' || p.status === statusFilter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">ข้อมูลนโยบายสำคัญ</h1>
          <p className="text-sm text-gray-500 mt-0.5">Strategic Policy Dashboard — ปี พ.ศ. 2567</p>
        </div>
        <div className="flex gap-2">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none">
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard
          title="นโยบายที่ดำเนินการอยู่"
          value="8"
          subtitle="กำลังดำเนินการ"
          icon={Shield}
          color="blue"
          trend="up"
          trendValue="+2"
          trendLabel="นโยบายใหม่"
        />
        <KPICard
          title="ดำเนินการสำเร็จ"
          value="2"
          subtitle="เสร็จสิ้นแล้ว"
          icon={CheckCircle}
          color="green"
          trend="up"
          trendValue="+1"
          trendLabel="เดือนนี้"
        />
        <KPICard
          title="อยู่ระหว่างทบทวน"
          value="3"
          subtitle="ต้องได้รับการปรับปรุง"
          icon={RefreshCw}
          color="amber"
        />
        <KPICard
          title="อัตราความสำเร็จ"
          value="72.5%"
          subtitle="เฉลี่ยทุกนโยบาย"
          icon={TrendingUp}
          color="teal"
          trend="up"
          trendValue="+5.2%"
          trendLabel="จากไตรมาสที่แล้ว"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <ChartCard title="ผลสัมฤทธิ์ KPI ตามเป้าหมายยุทธศาสตร์" subtitle="เปรียบเทียบกับเป้าหมาย 100%">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={kpiAchievementData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="goal" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={v => [`${v}%`]} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="target" name="เป้าหมาย" fill="#CBD5E1" radius={[3, 3, 0, 0]} />
                <Bar dataKey="achieved" name="บรรลุแล้ว" fill="#0D5C8F" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        <div>
          <ChartCard title="หมวดหมู่นโยบาย" subtitle="จำแนกตามประเภท">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={policyCategories}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {policyCategories.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Implementation Progress Chart */}
      <ChartCard title="ความคืบหน้าการดำเนินนโยบาย" subtitle="จำนวนนโยบายตามสถานะ รายสองเดือน">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={implementationProgress}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="planned" name="แผนทั้งหมด" stroke="#CBD5E1" strokeWidth={2} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="inProgress" name="กำลังดำเนินการ" stroke="#0EA5E9" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="completed" name="สำเร็จแล้ว" stroke="#22C55E" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Gantt Chart */}
      <ChartCard title="ไทม์ไลน์โครงการยุทธศาสตร์" subtitle="ระยะเวลาการดำเนินงาน (หน่วย: เดือน)">
        <GanttChart data={ganttData} />
      </ChartCard>

      {/* Policy Table */}
      <div className="chart-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">รายการนโยบายสำคัญ</h3>
            <p className="text-xs text-gray-400 mt-0.5">แสดง {filtered.length} นโยบาย</p>
          </div>
          <button className="flex items-center gap-1.5 btn-secondary text-xs">
            <Download size={13} />
            ส่งออก
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">นโยบาย</th>
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">หมวดหมู่</th>
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">ผู้รับผิดชอบ</th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">วันสิ้นสุด</th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">ความคืบหน้า</th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">สถานะ</th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">ความสำคัญ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-3 font-medium text-gray-800 max-w-[200px]">{p.title}</td>
                  <td className="py-3 px-3 text-gray-500">{p.category}</td>
                  <td className="py-3 px-3 text-gray-500">{p.owner}</td>
                  <td className="py-3 px-3 text-center text-gray-500">{p.targetDate}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${p.progress}%`,
                            background: p.progress === 100 ? '#22C55E' : p.progress >= 60 ? '#0D5C8F' : '#F59E0B',
                          }}
                        />
                      </div>
                      <span className="text-gray-600 font-medium w-8 text-right">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`badge ${statusStyle[p.status] || 'bg-gray-100 text-gray-600'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`badge ${priorityStyle[p.priority] || 'bg-gray-100 text-gray-600'}`}>
                      {p.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
