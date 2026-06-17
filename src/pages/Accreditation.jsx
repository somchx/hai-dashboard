import React, { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { Award, Building2, Clock, Star, Download, Search } from 'lucide-react'
import KPICard from '../components/KPICard'
import ChartCard from '../components/ChartCard'
import {
  hospitals, accreditationTrend, scoresByDimension, scoresByHospitalType,
  hospitalTypeDistribution, regionData, kpiData
} from '../data/mockAccreditation'

const statusStyle = {
  'รับรอง': 'bg-green-100 text-green-700',
  'รอผล': 'bg-amber-100 text-amber-700',
  'หมดอายุ': 'bg-red-100 text-red-700',
}

// Simple Thailand map with colored regions
function ThailandMap({ data }) {
  const maxCount = Math.max(...data.map(d => d.certified))
  const getOpacity = (count) => 0.2 + (count / maxCount) * 0.8

  return (
    <div className="relative bg-blue-50 rounded-xl p-4 h-56 flex items-center justify-center">
      <svg viewBox="0 0 280 320" className="w-full h-full" style={{ maxWidth: 200 }}>
        {/* North */}
        <g transform="translate(60, 10)">
          <rect width="80" height="70" rx="8" fill={`rgba(13, 92, 143, ${getOpacity(52)})`} stroke="white" strokeWidth="2" />
          <text x="40" y="28" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">เหนือ</text>
          <text x="40" y="42" textAnchor="middle" fill="white" fontSize="8">78 แห่ง</text>
          <text x="40" y="55" textAnchor="middle" fill="white" fontSize="8">รับรอง 52</text>
        </g>
        {/* NE */}
        <g transform="translate(150, 10)">
          <rect width="90" height="90" rx="8" fill={`rgba(13, 92, 143, ${getOpacity(88)})`} stroke="white" strokeWidth="2" />
          <text x="45" y="30" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">ตะวันออก</text>
          <text x="45" y="43" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">เฉียงเหนือ</text>
          <text x="45" y="58" textAnchor="middle" fill="white" fontSize="8">125 แห่ง</text>
          <text x="45" y="71" textAnchor="middle" fill="white" fontSize="8">รับรอง 88</text>
        </g>
        {/* Central */}
        <g transform="translate(60, 92)">
          <rect width="80" height="70" rx="8" fill={`rgba(13, 92, 143, ${getOpacity(72)})`} stroke="white" strokeWidth="2" />
          <text x="40" y="28" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">กลาง</text>
          <text x="40" y="42" textAnchor="middle" fill="white" fontSize="8">95 แห่ง</text>
          <text x="40" y="55" textAnchor="middle" fill="white" fontSize="8">รับรอง 72</text>
        </g>
        {/* East */}
        <g transform="translate(150, 112)">
          <rect width="75" height="60" rx="8" fill={`rgba(14, 165, 233, ${getOpacity(35)})`} stroke="white" strokeWidth="2" />
          <text x="37" y="25" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">ตะวันออก</text>
          <text x="37" y="38" textAnchor="middle" fill="white" fontSize="8">45 แห่ง</text>
          <text x="37" y="51" textAnchor="middle" fill="white" fontSize="8">รับรอง 35</text>
        </g>
        {/* West */}
        <g transform="translate(0, 112)">
          <rect width="55" height="60" rx="8" fill={`rgba(14, 165, 233, ${getOpacity(30)})`} stroke="white" strokeWidth="2" />
          <text x="27" y="25" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">ตะวันตก</text>
          <text x="27" y="38" textAnchor="middle" fill="white" fontSize="7">42 แห่ง</text>
          <text x="27" y="51" textAnchor="middle" fill="white" fontSize="7">รับรอง 30</text>
        </g>
        {/* South */}
        <g transform="translate(75, 176)">
          <rect width="65" height="120" rx="8" fill={`rgba(34, 197, 94, ${getOpacity(61)})`} stroke="white" strokeWidth="2" />
          <text x="32" y="40" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">ใต้</text>
          <text x="32" y="58" textAnchor="middle" fill="white" fontSize="8">65 แห่ง</text>
          <text x="32" y="74" textAnchor="middle" fill="white" fontSize="8">รับรอง 61</text>
        </g>
      </svg>
      <div className="absolute bottom-3 right-3 flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded" style={{ background: 'rgba(13, 92, 143, 0.9)' }} />
          <span className="text-xs text-gray-600">ความหนาแน่นสูง</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded" style={{ background: 'rgba(14, 165, 233, 0.5)' }} />
          <span className="text-xs text-gray-600">ความหนาแน่นปานกลาง</span>
        </div>
      </div>
    </div>
  )
}

export default function Accreditation() {
  const [search, setSearch] = useState('')
  const [regionFilter, setRegionFilter] = useState('ทั้งหมด')
  const [statusFilter, setStatusFilter] = useState('ทั้งหมด')

  const regions = ['ทั้งหมด', 'กลาง', 'เหนือ', 'ตะวันออกเฉียงเหนือ', 'ตะวันออก', 'ตะวันตก', 'ใต้']
  const statuses = ['ทั้งหมด', 'รับรอง', 'รอผล', 'หมดอายุ']

  const filteredHospitals = hospitals.filter(h =>
    (regionFilter === 'ทั้งหมด' || h.region === regionFilter) &&
    (statusFilter === 'ทั้งหมด' || h.status === statusFilter) &&
    (search === '' || h.name.includes(search) || h.province.includes(search))
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">ข้อมูลการประเมินและรับรองคุณภาพ</h1>
          <p className="text-sm text-gray-500 mt-0.5">Accreditation Dashboard — ข้อมูล ณ วันที่ 17 มิถุนายน 2567</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard
          title="โรงพยาบาลที่สำรวจทั้งหมด"
          value="450"
          subtitle="ทั่วประเทศ"
          icon={Building2}
          color="blue"
          trend="up"
          trendValue="+18"
          trendLabel="จากปีที่แล้ว"
        />
        <KPICard
          title="ผ่านการรับรอง HA"
          value="338"
          subtitle="75.1% ของทั้งหมด"
          icon={Award}
          color="green"
          trend="up"
          trendValue="+52"
          trendLabel="แห่งใหม่"
        />
        <KPICard
          title="รอผลการประเมิน"
          value="86"
          subtitle="19.1% ของทั้งหมด"
          icon={Clock}
          color="amber"
          trend="down"
          trendValue="-12"
          trendLabel="จากเดือนที่แล้ว"
        />
        <KPICard
          title="คะแนนเฉลี่ยรวม"
          value="83.4"
          subtitle="จาก 100 คะแนน"
          icon={Star}
          color="purple"
          trend="up"
          trendValue="+1.2"
          trendLabel="จากปีที่แล้ว"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <ChartCard title="แนวโน้มการรับรองคุณภาพ 5 ปี" subtitle="จำนวนโรงพยาบาลแยกตามสถานะ">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={accreditationTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="certified" name="รับรอง" stroke="#22C55E" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="pending" name="รอผล" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="expired" name="หมดอายุ" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="total" name="ทั้งหมด" stroke="#0D5C8F" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        <div>
          <ChartCard title="สัดส่วนประเภทโรงพยาบาล">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={hospitalTypeDistribution}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {hospitalTypeDistribution.map((entry, i) => (
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

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <ChartCard title="คะแนนตามประเภทโรงพยาบาล" subtitle="คะแนนเฉลี่ย">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={scoresByHospitalType} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="type" tick={{ fontSize: 10 }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={v => [v, 'คะแนนเฉลี่ย']} />
              <Bar dataKey="avgScore" name="คะแนนเฉลี่ย" fill="#0D5C8F" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="คะแนน 12 มิติคุณภาพ" subtitle="คะแนนเฉลี่ยแต่ละมิติ">
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={scoresByDimension}>
              <PolarGrid />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 8 }} />
              <PolarRadiusAxis domain={[60, 100]} tick={{ fontSize: 8 }} />
              <Radar name="คะแนน" dataKey="score" stroke="#0D5C8F" fill="#0D5C8F" fillOpacity={0.25} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="แผนที่ความหนาแน่นการรับรอง" subtitle="จำแนกตามภูมิภาค">
          <ThailandMap data={regionData} />
        </ChartCard>
      </div>

      {/* Data Table */}
      <div className="chart-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">รายชื่อโรงพยาบาล</h3>
            <p className="text-xs text-gray-400 mt-0.5">แสดง {filteredHospitals.length} จาก {hospitals.length} แห่ง</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="ค้นหาโรงพยาบาล..."
                className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
              />
            </div>
            <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none">
              {regions.map(r => <option key={r}>{r}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none">
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
            <button className="flex items-center gap-1.5 btn-secondary text-xs">
              <Download size={13} /> ส่งออก
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">โรงพยาบาล</th>
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">จังหวัด</th>
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">ภาค</th>
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">ประเภท</th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">คะแนน</th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">สถานะ</th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">วันหมดอายุ</th>
              </tr>
            </thead>
            <tbody>
              {filteredHospitals.map(h => (
                <tr key={h.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-3 font-medium text-gray-800">{h.name}</td>
                  <td className="py-3 px-3 text-gray-500">{h.province}</td>
                  <td className="py-3 px-3 text-gray-500">{h.region}</td>
                  <td className="py-3 px-3 text-gray-500">{h.type}</td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${h.score}%`,
                            background: h.score >= 85 ? '#22C55E' : h.score >= 75 ? '#F59E0B' : '#EF4444'
                          }}
                        />
                      </div>
                      <span className="font-medium text-gray-700">{h.score}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`badge ${statusStyle[h.status] || 'bg-gray-100 text-gray-600'}`}>
                      {h.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center text-gray-500">{h.expireDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
