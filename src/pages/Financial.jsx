import { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine
} from 'recharts'
import { DollarSign, TrendingUp, TrendingDown, Target, Download, ChevronDown } from 'lucide-react'

// ─────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────

const departments = [
  { name: 'สพ.1', budget: 120, actual: 95,  remaining: 25,  status: 'เบิกจ่ายแล้ว' },
  { name: 'สพ.2', budget: 95,  actual: 102, remaining: -7,  status: 'เกินงบ' },
  { name: 'สพ.3', budget: 110, actual: 78,  remaining: 32,  status: 'คงเหลือ' },
  { name: 'สพ.4', budget: 130, actual: 95,  remaining: 35,  status: 'คงเหลือ' },
  { name: 'สพ.5', budget: 85,  actual: 72,  remaining: 13,  status: 'เบิกจ่ายแล้ว' },
  { name: 'สพ.6', budget: 100, actual: 88,  remaining: 12,  status: 'เบิกจ่ายแล้ว' },
  { name: 'สพ.7', budget: 115, actual: 48,  remaining: 67,  status: 'คงเหลือ' },
  { name: 'สพ.8', budget: 95,  actual: 34,  remaining: 61,  status: 'คงเหลือ' },
]

const monthlyDisbursement = [
  { month: 'ต.ค.', cumulative: 48 },
  { month: 'พ.ย.', cumulative: 102 },
  { month: 'ธ.ค.', cumulative: 165 },
  { month: 'ม.ค.', cumulative: 230 },
  { month: 'ก.พ.', cumulative: 295 },
  { month: 'มี.ค.', cumulative: 358 },
  { month: 'เม.ย.', cumulative: 412 },
  { month: 'พ.ค.', cumulative: 468 },
  { month: 'มิ.ย.', cumulative: 520 },
  { month: 'ก.ค.', cumulative: 562 },
  { month: 'ส.ค.', cumulative: 590 },
  { month: 'ก.ย.', cumulative: 612 },
]

const revenueMonthly = [
  { month: 'ต.ค.', fee: 32, gov: 28, other: 6 },
  { month: 'พ.ย.', fee: 36, gov: 30, other: 7 },
  { month: 'ธ.ค.', fee: 38, gov: 32, other: 8 },
  { month: 'ม.ค.', fee: 35, gov: 31, other: 7 },
  { month: 'ก.พ.', fee: 37, gov: 33, other: 8 },
  { month: 'มี.ค.', fee: 40, gov: 34, other: 8 },
  { month: 'เม.ย.', fee: 39, gov: 32, other: 7 },
  { month: 'พ.ค.', fee: 41, gov: 35, other: 8 },
  { month: 'มิ.ย.', fee: 38, gov: 31, other: 7 },
  { month: 'ก.ค.', fee: 36, gov: 30, other: 7 },
  { month: 'ส.ค.', fee: 39, gov: 32, other: 8 },
  { month: 'ก.ย.', fee: 39, gov: 32, other: 9 },
]

const revenuePie = [
  { name: 'ค่าธรรมเนียม', value: 450 },
  { name: 'รายรับจากรัฐ', value: 380 },
  { name: 'รายรับอื่น', value: 90 },
]

const revenueYearly = [
  { year: '2562', revenue: 620 },
  { year: '2563', revenue: 680 },
  { year: '2564', revenue: 730 },
  { year: '2565', revenue: 850 },
  { year: '2566', revenue: 920 },
]

const revenueForecasting = [
  { month: 'ต.ค. 67', actual: 76,   forecast: null },
  { month: 'พ.ย. 67', actual: 73,   forecast: null },
  { month: 'ธ.ค. 67', actual: 78,   forecast: null },
  { month: 'ม.ค. 68', actual: 73,   forecast: null },
  { month: 'ก.พ. 68', actual: 78,   forecast: null },
  { month: 'มี.ค. 68', actual: 82,  forecast: null },
  { month: 'เม.ย. 68', actual: 78,  forecast: null },
  { month: 'พ.ค. 68', actual: 84,   forecast: null },
  { month: 'มิ.ย. 68', actual: 76,  forecast: null },
  { month: 'ก.ค. 68', actual: 73,   forecast: null },
  { month: 'ส.ค. 68', actual: 79,   forecast: null },
  { month: 'ก.ย. 68', actual: 79,   forecast: 79 },
  { month: 'ต.ค. 68', actual: null,  forecast: 82 },
  { month: 'พ.ย. 68', actual: null,  forecast: 85 },
  { month: 'ธ.ค. 68', actual: null,  forecast: 88 },
  { month: 'ม.ค. 69', actual: null,  forecast: 86 },
  { month: 'ก.พ. 69', actual: null,  forecast: 90 },
  { month: 'มี.ค. 69', actual: null, forecast: 93 },
]

const expenseMonthly = [
  { month: 'ต.ค.', personnel: 33, operation: 18, other: 9 },
  { month: 'พ.ย.', personnel: 35, operation: 20, other: 10 },
  { month: 'ธ.ค.', personnel: 36, operation: 21, other: 11 },
  { month: 'ม.ค.', personnel: 34, operation: 19, other: 10 },
  { month: 'ก.พ.', personnel: 35, operation: 20, other: 10 },
  { month: 'มี.ค.', personnel: 37, operation: 22, other: 11 },
  { month: 'เม.ย.', personnel: 36, operation: 21, other: 10 },
  { month: 'พ.ค.', personnel: 35, operation: 20, other: 10 },
  { month: 'มิ.ย.', personnel: 34, operation: 19, other: 10 },
  { month: 'ก.ค.', personnel: 33, operation: 18, other: 9 },
  { month: 'ส.ค.', personnel: 36, operation: 21, other: 10 },
  { month: 'ก.ย.', personnel: 36, operation: 21, other: 10 },
]

const expensePie = [
  { name: 'บุคลากร', value: 420 },
  { name: 'ค่าดำเนินงาน', value: 240 },
  { name: 'รายจ่ายอื่น', value: 120 },
]

const expenseForecast = [
  { month: 'ต.ค.', actual: 60,   forecast: null },
  { month: 'พ.ย.', actual: 65,   forecast: null },
  { month: 'ธ.ค.', actual: 68,   forecast: null },
  { month: 'ม.ค.', actual: 63,   forecast: null },
  { month: 'ก.พ.', actual: 65,   forecast: null },
  { month: 'มี.ค.', actual: 70,  forecast: null },
  { month: 'เม.ย.', actual: 67,  forecast: null },
  { month: 'พ.ค.', actual: 65,   forecast: null },
  { month: 'มิ.ย.', actual: 63,  forecast: null },
  { month: 'ก.ค.', actual: 60,   forecast: null },
  { month: 'ส.ค.', actual: 67,   forecast: null },
  { month: 'ก.ย.', actual: 67,   forecast: 67 },
  { month: 'ต.ค.+', actual: null, forecast: 69 },
  { month: 'พ.ย.+', actual: null, forecast: 71 },
  { month: 'ธ.ค.+', actual: null, forecast: 74 },
  { month: 'ม.ค.+', actual: null, forecast: 72 },
  { month: 'ก.พ.+', actual: null, forecast: 75 },
  { month: 'มี.ค.+', actual: null, forecast: 77 },
]

const topExpenses = [
  { category: 'เงินเดือนบุคลากร', amount: 280, pct: '36%', trend: 'up' },
  { category: 'ค่าจ้างเหมา',      amount: 140, pct: '18%', trend: 'up' },
  { category: 'ค่าวัสดุอุปกรณ์', amount: 95,  pct: '12%', trend: 'down' },
  { category: 'ค่าสาธารณูปโภค',   amount: 65,  pct: '8%',  trend: 'stable' },
  { category: 'ค่าซ่อมบำรุง',     amount: 55,  pct: '7%',  trend: 'down' },
  { category: 'ค่าฝึกอบรม',       amount: 45,  pct: '6%',  trend: 'up' },
  { category: 'ค่าเดินทาง',       amount: 40,  pct: '5%',  trend: 'stable' },
  { category: 'รายจ่ายอื่น ๆ',    amount: 60,  pct: '8%',  trend: 'stable' },
]

const costDeptData = [
  { name: 'สพ.1', cost: 95,  score: 82 },
  { name: 'สพ.2', cost: 102, score: 74 },
  { name: 'สพ.3', cost: 78,  score: 88 },
  { name: 'สพ.4', cost: 95,  score: 85 },
  { name: 'สพ.5', cost: 72,  score: 90 },
  { name: 'สพ.6', cost: 88,  score: 86 },
  { name: 'สพ.7', cost: 48,  score: 78 },
  { name: 'สพ.8', cost: 34,  score: 72 },
]

const costEfficiencyByType = [
  { type: 'รพ.ระดับ A',  efficiency: 92 },
  { type: 'รพ.ระดับ S',  efficiency: 88 },
  { type: 'รพ.ชุมชน',   efficiency: 84 },
  { type: 'รพ.ส่งเสริม', efficiency: 80 },
  { type: 'คลินิก',     efficiency: 76 },
]

const costBreakdown = [
  { item: 'ต้นทุนตรง',    amount: 420, perUnit: 42000, efficiency: '89%', roi: '122%' },
  { item: 'ต้นทุนบริหาร', amount: 180, perUnit: 18000, efficiency: '85%', roi: '115%' },
  { item: 'ต้นทุนทางอ้อม', amount: 120, perUnit: 12000, efficiency: '83%', roi: '110%' },
  { item: 'ต้นทุนพัฒนา',  amount: 60,  perUnit: 6000,  efficiency: '91%', roi: '130%' },
]

// ─────────────────────────────────────────────
// COLORS
// ─────────────────────────────────────────────
const PRIMARY    = '#0D5C8F'
const ACCENT     = '#0EA5E9'
const PIE_COLORS = ['#0D5C8F', '#0EA5E9', '#38BDF8', '#7DD3FC', '#BAE6FD']
const GREEN      = '#10B981'
const YELLOW     = '#F59E0B'
const RED        = '#EF4444'

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    'เบิกจ่ายแล้ว': 'bg-blue-100 text-blue-700',
    'คงเหลือ':      'bg-green-100 text-green-700',
    'เกินงบ':       'bg-red-100 text-red-700',
  }
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}

function KpiCard({ label, value, sub, icon: Icon, iconColor, trend }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs text-gray-500">{label}</p>
        {Icon && <Icon size={18} className={iconColor ?? 'text-gray-400'} />}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      {trend && (
        <p className={`text-xs font-medium mt-1 ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
          {trend === 'up' ? '▲ เพิ่มขึ้น' : trend === 'down' ? '▼ ลดลง' : '– คงที่'}
        </p>
      )}
    </div>
  )
}

function ExportButton() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 shadow-sm"
      >
        <Download size={14} />
        Export
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
          {['PDF', 'CSV'].map(f => (
            <button
              key={f}
              onClick={() => { setOpen(false); alert('กำลังส่งออกไฟล์...') }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
            >
              {f}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// TAB 1: งบประมาณ
// ─────────────────────────────────────────────
function BudgetTab() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="งบประมาณทั้งหมด"  value="850M ฿"  icon={DollarSign} iconColor="text-blue-600" />
        <KpiCard label="ใช้ไปแล้ว"        value="612M ฿"  sub="72% ของงบทั้งหมด" icon={TrendingUp} iconColor="text-sky-500" />
        <KpiCard label="คงเหลือ"           value="238M ฿"  icon={Target}      iconColor="text-green-500" />
        <KpiCard label="อัตราการเบิกจ่าย"  value="72%"    icon={TrendingUp}  iconColor="text-yellow-500" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BarChart: Budget vs Actual */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">งบประมาณ vs จ่ายจริง แยกตามหน่วยงาน (ล้านบาท)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={departments} margin={{ top: 4, right: 12, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={v => `${v}M`} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="budget" name="งบประมาณ" fill={PRIMARY} radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" name="จ่ายจริง"  fill={ACCENT}  radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AreaChart: Cumulative Disbursement */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">การเบิกจ่ายสะสมรายเดือน (ล้านบาท)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthlyDisbursement} margin={{ top: 4, right: 12, left: 0, bottom: 4 }}>
              <defs>
                <linearGradient id="gradCumulative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={PRIMARY} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={PRIMARY} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={v => `${v}M`} />
              <Area
                type="monotone" dataKey="cumulative" name="สะสม"
                stroke={PRIMARY} fill="url(#gradCumulative)" strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-700">รายการงบประมาณตามหน่วยงาน</h3>
          <ExportButton />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-left">
                <th className="px-3 py-2 rounded-l-lg">หน่วยงาน</th>
                <th className="px-3 py-2 text-right">งบประมาณ (M)</th>
                <th className="px-3 py-2 text-right">จ่ายจริง (M)</th>
                <th className="px-3 py-2 text-right">คงเหลือ (M)</th>
                <th className="px-3 py-2 text-right">% เบิกจ่าย</th>
                <th className="px-3 py-2 text-center rounded-r-lg">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d, i) => (
                <tr key={d.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-3 py-2 font-medium text-gray-800">{d.name}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{d.budget}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{d.actual}</td>
                  <td className={`px-3 py-2 text-right font-medium ${d.remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {d.remaining}
                  </td>
                  <td className="px-3 py-2 text-right text-gray-700">
                    {Math.round((d.actual / d.budget) * 100)}%
                  </td>
                  <td className="px-3 py-2 text-center">
                    <StatusBadge status={d.status} />
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

// ─────────────────────────────────────────────
// TAB 2: รายรับ
// ─────────────────────────────────────────────
function RevenueTab() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="รายรับรวม"             value="920M ฿"  icon={DollarSign} iconColor="text-blue-600"  trend="up" />
        <KpiCard label="รายรับจากค่าธรรมเนียม" value="450M ฿"  icon={TrendingUp}  iconColor="text-sky-500"   trend="up" />
        <KpiCard label="รายรับจากรัฐ"          value="380M ฿"  icon={TrendingUp}  iconColor="text-green-500" />
        <KpiCard label="รายรับอื่น"             value="90M ฿"   icon={Target}     iconColor="text-yellow-500" />
      </div>

      {/* Line + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LineChart: monthly revenue */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">แนวโน้มรายรับรายเดือน (ล้านบาท)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={revenueMonthly} margin={{ top: 4, right: 12, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={v => `${v}M`} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="fee"   name="ค่าธรรมเนียม" stroke={PRIMARY} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="gov"   name="รัฐ"           stroke={ACCENT}  strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="other" name="อื่น ๆ"        stroke={GREEN}   strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PieChart */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">สัดส่วนแหล่งรายรับ</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={revenuePie}
                cx="50%" cy="50%"
                outerRadius={85}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={true}
              >
                {revenuePie.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={v => `${v}M`} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BarChart: yearly comparison */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-700">รายรับเปรียบเทียบปีงบประมาณ (ล้านบาท)</h3>
          <ExportButton />
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={revenueYearly} margin={{ top: 4, right: 12, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={v => `${v}M`} />
            <Bar dataKey="revenue" name="รายรับ" fill={PRIMARY} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Forecasting LineChart */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-gray-700">แนวโน้มที่คาดการณ์ (ล้านบาท)</h3>
          <ExportButton />
        </div>
        <p className="text-xs text-gray-400 mb-4">ข้อมูลจริง 12 เดือน + คาดการณ์ล่วงหน้า 6 เดือน</p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={revenueForecasting} margin={{ top: 4, right: 16, left: 0, bottom: 48 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} angle={-35} textAnchor="end" interval={0} height={60} />
            <YAxis tick={{ fontSize: 11 }} domain={[60, 100]} />
            <Tooltip formatter={v => v !== null ? `${v}M` : '–'} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <ReferenceLine
              x="ก.ย. 68"
              stroke="#CBD5E1"
              strokeDasharray="4 4"
              label={{ value: 'ปัจจุบัน', fill: '#94A3B8', fontSize: 10, position: 'top' }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke={PRIMARY}
              strokeWidth={2}
              dot={false}
              name="จริง"
              connectNulls={false}
            />
            <Line
              dataKey="forecast"
              stroke="#F59E0B"
              strokeDasharray="5 5"
              name="คาดการณ์"
              strokeWidth={2}
              dot={false}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// TAB 3: รายจ่าย
// ─────────────────────────────────────────────
function ExpenseTab() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="รายจ่ายรวม"     value="780M ฿"  icon={DollarSign}  iconColor="text-red-500"    trend="up" />
        <KpiCard label="รายจ่ายบุคลากร" value="420M ฿"  sub="54% ของรายจ่ายทั้งหมด" icon={TrendingUp}  iconColor="text-sky-500" />
        <KpiCard label="ค่าดำเนินงาน"   value="240M ฿"  sub="31% ของรายจ่ายทั้งหมด" icon={Target}     iconColor="text-yellow-500" />
        <KpiCard label="รายจ่ายอื่น"    value="120M ฿"  icon={TrendingDown} iconColor="text-green-500" trend="down" />
      </div>

      {/* Stacked Bar + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stacked BarChart */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">รายจ่ายแยกประเภทรายเดือน (ล้านบาท)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={expenseMonthly} margin={{ top: 4, right: 12, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={v => `${v}M`} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="personnel" name="บุคลากร"   stackId="a" fill={PRIMARY} />
              <Bar dataKey="operation" name="ดำเนินงาน" stackId="a" fill={ACCENT} />
              <Bar dataKey="other"     name="อื่น ๆ"    stackId="a" fill={GREEN}  radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Pie */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">สัดส่วนรายจ่าย</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={expensePie}
                cx="50%" cy="50%"
                outerRadius={85}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={true}
              >
                {expensePie.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={v => `${v}M`} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense Forecast LineChart */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-gray-700">แนวโน้มรายจ่าย + คาดการณ์ (ล้านบาท)</h3>
          <ExportButton />
        </div>
        <p className="text-xs text-gray-400 mb-4">ข้อมูลจริง 12 เดือน + คาดการณ์ล่วงหน้า 6 เดือน</p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={expenseForecast} margin={{ top: 4, right: 16, left: 0, bottom: 48 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} angle={-35} textAnchor="end" interval={0} height={60} />
            <YAxis tick={{ fontSize: 11 }} domain={[50, 85]} />
            <Tooltip formatter={v => v !== null ? `${v}M` : '–'} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <ReferenceLine
              x="ก.ย."
              stroke="#CBD5E1"
              strokeDasharray="4 4"
              label={{ value: 'ปัจจุบัน', fill: '#94A3B8', fontSize: 10, position: 'top' }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke={RED}
              strokeWidth={2}
              dot={false}
              name="จริง"
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke={YELLOW}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="คาดการณ์"
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Expenses Table */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-700">รายจ่ายหลัก (Top Expenses)</h3>
          <ExportButton />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-left">
                <th className="px-3 py-2 rounded-l-lg">หมวดรายจ่าย</th>
                <th className="px-3 py-2 text-right">จำนวน (M฿)</th>
                <th className="px-3 py-2 text-right">สัดส่วน</th>
                <th className="px-3 py-2 text-center rounded-r-lg">แนวโน้ม</th>
              </tr>
            </thead>
            <tbody>
              {topExpenses.map((e, i) => (
                <tr key={e.category} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-3 py-2 font-medium text-gray-800">{e.category}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{e.amount}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{e.pct}</td>
                  <td className="px-3 py-2 text-center">
                    <span className={`text-base ${e.trend === 'up' ? 'text-red-500' : e.trend === 'down' ? 'text-green-600' : 'text-gray-400'}`}>
                      {e.trend === 'up' ? '▲' : e.trend === 'down' ? '▼' : '–'}
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

// ─────────────────────────────────────────────
// TAB 4: Cost Analysis
// ─────────────────────────────────────────────
function CostAnalysisTab() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="ต้นทุนต่อการรับรอง 1 แห่ง" value="52,000 ฿"  icon={DollarSign} iconColor="text-blue-600" />
        <KpiCard label="Cost Efficiency Index"       value="87%"       icon={Target}     iconColor="text-green-500" trend="up" />
        <KpiCard label="ROI"                         value="118%"      icon={TrendingUp}  iconColor="text-sky-500"  trend="up" />
        <KpiCard label="Break-even Point"            value="บรรลุแล้ว" icon={TrendingUp}  iconColor="text-yellow-500" />
      </div>

      {/* ComposedChart + Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ComposedChart: cost vs outcome */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">ต้นทุน vs คะแนน Outcome ตามหน่วยงาน</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={costDeptData} margin={{ top: 4, right: 28, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis
                yAxisId="left"
                orientation="left"
                tick={{ fontSize: 11 }}
                label={{ value: 'M฿', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#9CA3AF' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 100]}
                tick={{ fontSize: 11 }}
                label={{ value: 'คะแนน', angle: 90, position: 'insideRight', fontSize: 10, fill: '#9CA3AF' }}
              />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar    yAxisId="left"  dataKey="cost"  name="ต้นทุน (M฿)"     fill={PRIMARY} radius={[4, 4, 0, 0]} />
              <Line  yAxisId="right" dataKey="score" name="คะแนน Outcome" stroke={YELLOW} strokeWidth={2} dot={{ r: 4, fill: YELLOW }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* BarChart: Efficiency by hospital type */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Cost Efficiency ตามประเภทโรงพยาบาล (%)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={costEfficiencyByType}
              layout="vertical"
              margin={{ top: 4, right: 24, left: 8, bottom: 4 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
              <YAxis type="category" dataKey="type" tick={{ fontSize: 11 }} width={100} />
              <Tooltip formatter={v => `${v}%`} />
              <Bar dataKey="efficiency" name="Efficiency" radius={[0, 4, 4, 0]}>
                {costEfficiencyByType.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={
                      entry.efficiency >= 90
                        ? GREEN
                        : entry.efficiency >= 85
                        ? ACCENT
                        : PRIMARY
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cost Breakdown Table */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-700">Cost Breakdown พร้อมตัวชี้วัดคำนวณ</h3>
          <ExportButton />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-left">
                <th className="px-3 py-2 rounded-l-lg">ประเภทต้นทุน</th>
                <th className="px-3 py-2 text-right">จำนวน (M฿)</th>
                <th className="px-3 py-2 text-right">ต้นทุนต่อหน่วย (฿)</th>
                <th className="px-3 py-2 text-right">Efficiency</th>
                <th className="px-3 py-2 text-right rounded-r-lg">ROI</th>
              </tr>
            </thead>
            <tbody>
              {costBreakdown.map((row, i) => (
                <tr key={row.item} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-3 py-2 font-medium text-gray-800">{row.item}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{row.amount}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{row.perUnit.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right">
                    <span
                      className={`font-medium ${
                        parseInt(row.efficiency) >= 90
                          ? 'text-green-600'
                          : parseInt(row.efficiency) >= 85
                          ? 'text-sky-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {row.efficiency}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right font-medium text-green-600">{row.roi}</td>
                </tr>
              ))}
              <tr className="bg-blue-50 font-semibold border-t border-blue-100">
                <td className="px-3 py-2 text-gray-800">รวมทั้งหมด</td>
                <td className="px-3 py-2 text-right text-gray-800">780</td>
                <td className="px-3 py-2 text-right text-gray-800">52,000</td>
                <td className="px-3 py-2 text-right text-sky-700">87%</td>
                <td className="px-3 py-2 text-right text-green-700">118%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function Financial() {
  const [activeTab, setActiveTab] = useState(0)
  const [dateFrom, setDateFrom]   = useState('2024-10')
  const [dateTo,   setDateTo]     = useState('2025-09')
  const [fiscalYear, setFiscalYear] = useState('2568')
  const [quarter, setQuarter]     = useState('all')

  const tabs = ['งบประมาณ', 'รายรับ', 'รายจ่าย', 'Cost Analysis']

  const tabContent = [
    <BudgetTab       key="budget" />,
    <RevenueTab      key="revenue" />,
    <ExpenseTab      key="expense" />,
    <CostAnalysisTab key="cost" />,
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold" style={{ color: PRIMARY }}>
          การเงินและงบประมาณ
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          ภาพรวมการเงิน งบประมาณ รายรับ และรายจ่ายขององค์กร
        </p>
      </div>

      {/* Date Range Filter Bar */}
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-600 whitespace-nowrap">กรองข้อมูล:</span>

          {/* Fiscal Year */}
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-gray-500 whitespace-nowrap">ปีงบประมาณ</label>
            <select
              value={fiscalYear}
              onChange={e => setFiscalYear(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              {['2564', '2565', '2566', '2567', '2568'].map(y => (
                <option key={y} value={y}>ปีงบ {y}</option>
              ))}
            </select>
          </div>

          {/* From */}
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-gray-500 whitespace-nowrap">ตั้งแต่</label>
            <input
              type="month"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          {/* To */}
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-gray-500 whitespace-nowrap">ถึง</label>
            <input
              type="month"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          {/* Quarter */}
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-gray-500 whitespace-nowrap">ไตรมาส</label>
            <select
              value={quarter}
              onChange={e => setQuarter(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              <option value="all">ทั้งปี</option>
              <option value="q1">ไตรมาส 1 (ต.ค.–ธ.ค.)</option>
              <option value="q2">ไตรมาส 2 (ม.ค.–มี.ค.)</option>
              <option value="q3">ไตรมาส 3 (เม.ย.–มิ.ย.)</option>
              <option value="q4">ไตรมาส 4 (ก.ค.–ก.ย.)</option>
            </select>
          </div>

          {/* Apply Button */}
          <button
            className="ml-auto text-sm px-4 py-1.5 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: PRIMARY }}
            onClick={() => {}}
          >
            ใช้งานตัวกรอง
          </button>
        </div>
      </div>

      {/* Sub-tab Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
        <div className="flex">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`flex-1 py-3 text-sm font-medium transition-all focus:outline-none border-b-2 ${
                activeTab === i
                  ? 'border-b-2'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              style={
                activeTab === i
                  ? {
                      backgroundColor: PRIMARY,
                      color: '#fff',
                      borderBottomColor: ACCENT,
                    }
                  : {}
              }
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {tabContent[activeTab]}
      </div>
    </div>
  )
}
