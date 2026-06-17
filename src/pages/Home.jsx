import React from 'react'
import { Link } from 'react-router-dom'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import {
  Building2, Award, Database, Users, DollarSign, ShoppingCart, Shield, BarChart3,
  TrendingUp, Clock, CheckCircle, AlertTriangle, ArrowRight, Activity
} from 'lucide-react'
import KPICard from '../components/KPICard'
import ChartCard from '../components/ChartCard'

const monthlyScores = [
  { month: 'ม.ค.', score: 79.2 }, { month: 'ก.พ.', score: 80.1 }, { month: 'มี.ค.', score: 81.5 },
  { month: 'เม.ย.', score: 80.8 }, { month: 'พ.ค.', score: 82.3 }, { month: 'มิ.ย.', score: 83.1 },
  { month: 'ก.ค.', score: 82.7 }, { month: 'ส.ค.', score: 83.9 }, { month: 'ก.ย.', score: 84.2 },
  { month: 'ต.ค.', score: 83.5 }, { month: 'พ.ย.', score: 84.8 }, { month: 'ธ.ค.', score: 85.1 },
]

const hospitalsByRegion = [
  { region: 'กลาง', count: 95 }, { region: 'เหนือ', count: 78 },
  { region: 'ตะวันออกเฉียงเหนือ', count: 125 }, { region: 'ตะวันออก', count: 45 },
  { region: 'ตะวันตก', count: 42 }, { region: 'ใต้', count: 65 },
]

const accreditationStatus = [
  { name: 'รับรอง', value: 338, color: '#22C55E' },
  { name: 'รอผล', value: 86, color: '#F59E0B' },
  { name: 'หมดอายุ', value: 26, color: '#EF4444' },
]

const activities = [
  { id: 1, type: 'accreditation', text: 'โรงพยาบาลนครสวรรค์ผ่านการรับรอง HA ระดับ 3', time: '15 นาทีที่แล้ว', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  { id: 2, type: 'alert', text: 'การแจ้งเตือน: คะแนน HA โรงพยาบาลนราธิวาส < 70', time: '1 ชั่วโมงที่แล้ว', icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
  { id: 3, type: 'report', text: 'รายงานงบประมาณ Q2/2567 พร้อมสำหรับตรวจสอบ', time: '2 ชั่วโมงที่แล้ว', icon: BarChart3, color: 'text-blue-600 bg-blue-50' },
  { id: 4, type: 'user', text: 'ผู้ใช้ใหม่: ดร.กมลา สุขใจ ลงทะเบียนแล้ว', time: '4 ชั่วโมงที่แล้ว', icon: Users, color: 'text-purple-600 bg-purple-50' },
  { id: 5, type: 'procurement', text: 'คำขอจัดซื้อ PR-2567-0892 อนุมัติแล้ว', time: '6 ชั่วโมงที่แล้ว', icon: ShoppingCart, color: 'text-teal-600 bg-teal-50' },
  { id: 6, type: 'report', text: 'ส่งรายงานประจำเดือนพฤษภาคมให้คณะกรรมการแล้ว', time: '1 วันที่แล้ว', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
]

const quickLinks = [
  { path: '/financial', icon: DollarSign, label: 'ข้อมูลการเงิน', desc: 'งบประมาณและรายรับรายจ่าย', color: 'from-blue-500 to-blue-700' },
  { path: '/procurement', icon: ShoppingCart, label: 'ข้อมูลพัสดุ', desc: 'จัดซื้อจัดจ้างและพัสดุ', color: 'from-teal-500 to-teal-700' },
  { path: '/accreditation', icon: Award, label: 'การรับรองคุณภาพ', desc: 'HA และการประเมิน', color: 'from-green-500 to-green-700' },
  { path: '/policy', icon: Shield, label: 'ข้อมูลนโยบาย', desc: 'ยุทธศาสตร์และแผนงาน', color: 'from-purple-500 to-purple-700' },
]

const COLORS = ['#22C55E', '#F59E0B', '#EF4444']

export default function Home() {
  const userRaw = localStorage.getItem('hai_user')
  const user = userRaw ? JSON.parse(userRaw) : { name: 'ผู้ใช้งาน' }
  const today = new Date().toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">สวัสดี, {user.name} 👋</h1>
          <p className="text-sm text-gray-500 mt-0.5">{today}</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-100">
          <Activity size={14} />
          <span className="text-xs font-medium">ระบบทำงานปกติ</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard
          title="จำนวนโรงพยาบาลทั้งหมด"
          value="450"
          subtitle="ในระบบ HAI"
          icon={Building2}
          color="blue"
          trend="up"
          trendValue="+18"
          trendLabel="จากปีที่แล้ว"
        />
        <KPICard
          title="รับรองปีนี้"
          value="338"
          subtitle="ผ่านการรับรอง HA"
          icon={Award}
          color="green"
          trend="up"
          trendValue="+52"
          trendLabel="จากปีที่แล้ว"
        />
        <KPICard
          title="แหล่งข้อมูลเชื่อมต่อ"
          value="4"
          subtitle="ระบบเชื่อมต่อแล้วทั้งหมด"
          icon={Database}
          color="teal"
          trend="up"
          trendValue="+1"
          trendLabel="ใหม่เดือนนี้"
        />
        <KPICard
          title="ผู้ใช้งานที่ใช้งานอยู่"
          value="127"
          subtitle="ออนไลน์ในวันนี้"
          icon={Users}
          color="purple"
          trend="up"
          trendValue="+8%"
          trendLabel="จากสัปดาห์ที่แล้ว"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <ChartCard title="แนวโน้มคะแนน HA รายเดือน" subtitle="ปี พ.ศ. 2567">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthlyScores}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[75, 90]} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                  formatter={(v) => [`${v}`, 'คะแนนเฉลี่ย']}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#0D5C8F"
                  strokeWidth={2.5}
                  dot={{ fill: '#0D5C8F', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        <div>
          <ChartCard title="สถานะการรับรอง" subtitle="ทั้งหมด 450 แห่ง">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={accreditationStatus}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {accreditationStatus.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend iconSize={10} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <ChartCard title="จำนวนโรงพยาบาลรายภาค" subtitle="จำแนกตามภูมิภาค">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={hospitalsByRegion} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="region" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => [v, 'โรงพยาบาล']} />
                <Bar dataKey="count" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Recent Activity */}
        <div className="chart-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-800">กิจกรรมล่าสุด</h3>
            <button className="text-xs text-[#0D5C8F] hover:underline font-medium">ดูทั้งหมด</button>
          </div>
          <div className="space-y-3">
            {activities.map(a => (
              <div key={a.id} className="flex items-start gap-2.5">
                <div className={`p-1.5 rounded-lg ${a.color} flex-shrink-0`}>
                  <a.icon size={12} />
                </div>
                <div>
                  <p className="text-xs text-gray-700 leading-relaxed">{a.text}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                    <Clock size={9} />
                    {a.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">เข้าถึงด่วน</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {quickLinks.map(q => (
            <Link
              key={q.path}
              to={q.path}
              className={`bg-gradient-to-br ${q.color} p-5 rounded-xl text-white hover:opacity-90 transition-opacity group`}
            >
              <q.icon size={28} className="mb-3 opacity-90" />
              <div className="font-semibold text-sm">{q.label}</div>
              <div className="text-xs opacity-80 mt-1">{q.desc}</div>
              <div className="flex items-center gap-1 mt-3 text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                ดูรายละเอียด <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
