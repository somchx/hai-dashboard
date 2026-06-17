import React, { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { ShoppingCart, Clock, CheckCircle, DollarSign, Download, Filter } from 'lucide-react'
import KPICard from '../components/KPICard'
import ChartCard from '../components/ChartCard'
import {
  procurementByCategory, monthlyProcurementTrend, vendorDistribution,
  procurementByDepartment, recentProcurements, kpiData
} from '../data/mockProcurement'

const statusStyle = {
  'อนุมัติ': 'bg-green-100 text-green-700',
  'รออนุมัติ': 'bg-amber-100 text-amber-700',
  'เสร็จสิ้น': 'bg-blue-100 text-blue-700',
  'ปฏิเสธ': 'bg-red-100 text-red-700',
}

export default function Procurement() {
  const [statusFilter, setStatusFilter] = useState('ทั้งหมด')
  const [categoryFilter, setCategoryFilter] = useState('ทั้งหมด')

  const statuses = ['ทั้งหมด', 'อนุมัติ', 'รออนุมัติ', 'เสร็จสิ้น', 'ปฏิเสธ']
  const categories = ['ทั้งหมด', 'ครุภัณฑ์การแพทย์', 'วัสดุสิ้นเปลือง', 'บริการ', 'เทคโนโลยีสารสนเทศ', 'ยานพาหนะ']

  const filtered = recentProcurements.filter(p =>
    (statusFilter === 'ทั้งหมด' || p.status === statusFilter) &&
    (categoryFilter === 'ทั้งหมด' || p.category === categoryFilter)
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">ข้อมูลด้านพัสดุ</h1>
          <p className="text-sm text-gray-500 mt-0.5">Procurement Dashboard — ปีงบประมาณ พ.ศ. 2567</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
          >
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard
          title="คำขอจัดซื้อทั้งหมด"
          value="2,745"
          subtitle="รายการ ปี 2567"
          icon={ShoppingCart}
          color="blue"
          trend="up"
          trendValue="+15.2%"
          trendLabel="จากปีที่แล้ว"
        />
        <KPICard
          title="รออนุมัติ"
          value="145"
          subtitle="รายการที่รอดำเนินการ"
          icon={Clock}
          color="amber"
          trend="down"
          trendValue="-8"
          trendLabel="จากสัปดาห์ที่แล้ว"
        />
        <KPICard
          title="เสร็จสิ้นแล้ว"
          value="2,312"
          subtitle="84.2% ของทั้งหมด"
          icon={CheckCircle}
          color="green"
          trend="up"
          trendValue="+5.6%"
          trendLabel="อัตราสำเร็จ"
        />
        <KPICard
          title="มูลค่ารวมทั้งหมด"
          value="535 M"
          subtitle="ล้านบาท ปี 2567"
          icon={DollarSign}
          color="teal"
          trend="up"
          trendValue="+22.4%"
          trendLabel="จากปีที่แล้ว"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <ChartCard title="มูลค่าการจัดซื้อแยกตามหมวดหมู่" subtitle="ปี 2567">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={procurementByCategory} layout="vertical" barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `${(v/1000000).toFixed(0)}M`} />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 11 }} width={120} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                  formatter={v => [`${(v/1000000).toFixed(1)} ล้านบาท`]}
                />
                <Bar dataKey="value" name="มูลค่า" fill="#0D5C8F" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        <div>
          <ChartCard title="สัดส่วนผู้จัดจำหน่าย" subtitle="ประเภทผู้ขาย">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={vendorDistribution}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {vendorDistribution.map((entry, i) => (
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
        <ChartCard title="แนวโน้มมูลค่าการจัดซื้อรายเดือน" subtitle="ปี 2567">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyProcurementTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v/1000000).toFixed(0)}M`} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={v => [`${(v/1000000).toFixed(1)} ล้านบาท`]} />
              <Line type="monotone" dataKey="value" name="มูลค่า" stroke="#0D5C8F" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="สถานะการจัดซื้อรายแผนก" subtitle="จำนวนคำขอ">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={procurementByDepartment} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="dept" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="completed" name="เสร็จสิ้น" fill="#22C55E" stackId="a" />
              <Bar dataKey="approved" name="อนุมัติ" fill="#0EA5E9" stackId="a" />
              <Bar dataKey="pending" name="รออนุมัติ" fill="#F59E0B" stackId="a" />
              <Bar dataKey="rejected" name="ปฏิเสธ" fill="#EF4444" stackId="a" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Data Table */}
      <div className="chart-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">รายการจัดซื้อจัดจ้างล่าสุด</h3>
            <p className="text-xs text-gray-400 mt-0.5">แสดง {filtered.length} รายการ</p>
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
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">รหัส PR</th>
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">รายการ</th>
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">หมวดหมู่</th>
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">แผนก</th>
                <th className="text-right py-2.5 px-3 text-gray-500 font-medium">มูลค่า</th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">สถานะ</th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">วันที่</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-3 font-mono text-gray-500">{row.id}</td>
                  <td className="py-3 px-3 font-medium text-gray-800 max-w-[200px] truncate">{row.title}</td>
                  <td className="py-3 px-3 text-gray-500">{row.category}</td>
                  <td className="py-3 px-3 text-gray-500">{row.department}</td>
                  <td className="py-3 px-3 text-right font-medium text-gray-700">
                    {row.value.toLocaleString()} ฿
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`badge ${statusStyle[row.status] || 'bg-gray-100 text-gray-600'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center text-gray-500">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
