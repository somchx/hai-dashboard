import React, { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { DollarSign, TrendingUp, TrendingDown, PieChartIcon, Download, Filter } from 'lucide-react'
import KPICard from '../components/KPICard'
import ChartCard from '../components/ChartCard'
import {
  monthlyBudgetData, revenueTrendData, budgetAllocationData,
  cashFlowData, hospitalBudgetTable, kpiData
} from '../data/mockFinancial'

const statusColor = {
  'สูงมาก': 'bg-red-100 text-red-700',
  'สูง': 'bg-amber-100 text-amber-700',
  'ปกติ': 'bg-green-100 text-green-700',
  'ต่ำ': 'bg-blue-100 text-blue-700',
}

export default function Financial() {
  const [region, setRegion] = useState('ทั้งหมด')
  const [dateRange, setDateRange] = useState('2567')

  const regions = ['ทั้งหมด', 'กลาง', 'เหนือ', 'ตะวันออกเฉียงเหนือ', 'ตะวันออก', 'ตะวันตก', 'ใต้']
  const filteredTable = region === 'ทั้งหมด'
    ? hospitalBudgetTable
    : hospitalBudgetTable.filter(h => h.region === region)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">ข้อมูลด้านการเงิน</h1>
          <p className="text-sm text-gray-500 mt-0.5">Financial Dashboard — ปีงบประมาณ พ.ศ. 2567</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
          >
            <option value="2567">ปี 2567</option>
            <option value="2566">ปี 2566</option>
            <option value="2565">ปี 2565</option>
          </select>
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
          >
            {regions.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard
          title="งบประมาณรวมทั้งหมด"
          value="650 ล้านบาท"
          subtitle="ปีงบประมาณ 2567"
          icon={DollarSign}
          color="blue"
          trend="up"
          trendValue="+8.5%"
          trendLabel="จากปีที่แล้ว"
        />
        <KPICard
          title="งบประมาณที่ใช้แล้ว"
          value="82.4%"
          subtitle="535.6 ล้านบาท"
          icon={PieChartIcon}
          color="amber"
          trend="up"
          trendValue="+4.2%"
          trendLabel="จากเดือนที่แล้ว"
        />
        <KPICard
          title="รายรับประจำปี"
          value="205 ล้านบาท"
          subtitle="ไตรมาส 4/2566"
          icon={TrendingUp}
          color="green"
          trend="up"
          trendValue="+12.3%"
          trendLabel="YoY"
        />
        <KPICard
          title="อัตราส่วนรายจ่าย"
          value="0.68"
          subtitle="ต่อ 1 บาทรายรับ"
          icon={TrendingDown}
          color="teal"
          trend="down"
          trendValue="-0.04"
          trendLabel="ดีขึ้นจากปีที่แล้ว"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <ChartCard title="งบประมาณเทียบกับการใช้จ่ายจริง" subtitle="รายเดือน ปี 2567">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthlyBudgetData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v/1000000).toFixed(0)}M`} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                  formatter={v => [`${(v/1000000).toFixed(1)} ล้านบาท`]}
                />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="budget" name="งบประมาณ" fill="#CBD5E1" radius={[3, 3, 0, 0]} />
                <Bar dataKey="actual" name="ใช้จ่ายจริง" fill="#0D5C8F" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        <div>
          <ChartCard title="การจัดสรรงบประมาณ" subtitle="แยกตามหมวดหมู่">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={budgetAllocationData}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${value}%`}
                  labelLine={false}
                >
                  {budgetAllocationData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={v => [`${v}%`]} />
                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <ChartCard title="แนวโน้มรายรับรายไตรมาส" subtitle="เปรียบเทียบกับเป้าหมาย">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="quarter" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v/1000000).toFixed(0)}M`} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
                formatter={v => [`${(v/1000000).toFixed(0)} ล้านบาท`]}
              />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="revenue" name="รายรับจริง" stroke="#0D5C8F" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="target" name="เป้าหมาย" stroke="#F59E0B" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="กระแสเงินสด (Cash Flow)" subtitle="เปรียบเทียบรายรับและรายจ่าย">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v/1000000).toFixed(0)}M`} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
                formatter={v => [`${(v/1000000).toFixed(1)} ล้านบาท`]}
              />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="inflow" name="รายรับ" stroke="#22C55E" fill="#dcfce7" strokeWidth={2} />
              <Area type="monotone" dataKey="outflow" name="รายจ่าย" stroke="#EF4444" fill="#fee2e2" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Data Table */}
      <div className="chart-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">10 โรงพยาบาลที่ใช้งบประมาณสูงสุด</h3>
            <p className="text-xs text-gray-400 mt-0.5">จัดเรียงตามเปอร์เซ็นต์การใช้งบ</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 btn-secondary text-xs">
              <Download size={13} />
              CSV
            </button>
            <button className="flex items-center gap-1.5 btn-primary text-xs">
              <Download size={13} />
              PDF
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">#</th>
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">โรงพยาบาล</th>
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">ภาค</th>
                <th className="text-right py-2.5 px-3 text-gray-500 font-medium">งบประมาณ</th>
                <th className="text-right py-2.5 px-3 text-gray-500 font-medium">ใช้จ่าย</th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">%</th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {filteredTable.map((row, i) => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-3 text-gray-400">{i + 1}</td>
                  <td className="py-3 px-3 font-medium text-gray-800">{row.hospital}</td>
                  <td className="py-3 px-3 text-gray-500">{row.region}</td>
                  <td className="py-3 px-3 text-right text-gray-600">{(row.budget / 1000000).toFixed(1)} M</td>
                  <td className="py-3 px-3 text-right text-gray-600">{(row.used / 1000000).toFixed(1)} M</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-[#0D5C8F]"
                          style={{ width: `${row.percent}%` }}
                        />
                      </div>
                      <span className="text-gray-700 font-medium w-10 text-right">{row.percent}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`badge ${statusColor[row.status] || 'bg-gray-100 text-gray-600'}`}>
                      {row.status}
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
