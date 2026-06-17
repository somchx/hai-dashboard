import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";
import {
  DollarSign, TrendingUp, TrendingDown, PieChart as PieIcon,
  BarChart2, CreditCard, Wallet, Download, ChevronDown
} from "lucide-react";
import {
  DashboardFilterBar,
  DashboardHeroCard,
  DashboardPageHeader,
  DashboardTabs,
} from "../components/DashboardTheme";

const PRIMARY = "#0D5C8F";
const ACCENT = "#0EA5E9";
const COLORS = ["#0D5C8F", "#0EA5E9", "#38BDF8", "#7DD3FC", "#BAE6FD", "#0369A1"];

function KPICard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
      <div className="rounded-lg p-2 flex-shrink-0" style={{ backgroundColor: color + "1A" }}>
        <Icon size={22} style={{ color }} />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-lg font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-400">{sub}</p>
      </div>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">{title}</h2>
      {children}
    </div>
  );
}

function ExportButton() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 shadow-sm"
      >
        <Download size={15} />
        ส่งออก
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <button
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => { alert("กำลังส่งออกไฟล์..."); setOpen(false); }}
          >
            PDF
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => { alert("กำลังส่งออกไฟล์..."); setOpen(false); }}
          >
            CSV
          </button>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    "ปกติ": "bg-green-100 text-green-700",
    "ใกล้เกิน": "bg-yellow-100 text-yellow-700",
    "เกินงบ": "bg-red-100 text-red-700",
    "บรรลุ": "bg-green-100 text-green-700",
    "ใกล้เป้า": "bg-yellow-100 text-yellow-700",
    "ไม่บรรลุ": "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const budgetDepts = [
  { name: "สพ.1", budget: 120, actual: 95 },
  { name: "สพ.2", budget: 95, actual: 102 },
  { name: "สพ.3", budget: 110, actual: 78 },
  { name: "สพ.4", budget: 130, actual: 95 },
  { name: "สพ.5", budget: 85, actual: 72 },
  { name: "สพ.6", budget: 100, actual: 88 },
  { name: "สพ.7", budget: 115, actual: 48 },
  { name: "สพ.8", budget: 95, actual: 34 },
];

const cumulativeDisbursement = [
  { month: "ต.ค.", cumulative: 48 },
  { month: "พ.ย.", cumulative: 102 },
  { month: "ธ.ค.", cumulative: 165 },
  { month: "ม.ค.", cumulative: 230 },
  { month: "ก.พ.", cumulative: 295 },
  { month: "มี.ค.", cumulative: 358 },
  { month: "เม.ย.", cumulative: 412 },
  { month: "พ.ค.", cumulative: 468 },
  { month: "มิ.ย.", cumulative: 520 },
  { month: "ก.ค.", cumulative: 562 },
  { month: "ส.ค.", cumulative: 590 },
  { month: "ก.ย.", cumulative: 612 },
];

const revenueMonthly = [
  { month: "ต.ค.", fee: 32, gov: 28, other: 6 },
  { month: "พ.ย.", fee: 36, gov: 30, other: 7 },
  { month: "ธ.ค.", fee: 38, gov: 32, other: 8 },
  { month: "ม.ค.", fee: 35, gov: 31, other: 7 },
  { month: "ก.พ.", fee: 37, gov: 33, other: 8 },
  { month: "มี.ค.", fee: 40, gov: 34, other: 8 },
  { month: "เม.ย.", fee: 39, gov: 32, other: 7 },
  { month: "พ.ค.", fee: 41, gov: 35, other: 8 },
  { month: "มิ.ย.", fee: 38, gov: 31, other: 7 },
  { month: "ก.ค.", fee: 36, gov: 30, other: 7 },
  { month: "ส.ค.", fee: 39, gov: 32, other: 8 },
  { month: "ก.ย.", fee: 40, gov: 32, other: 8 },
];

const revenueSources = [
  { name: "ค่าธรรมเนียม", value: 450 },
  { name: "รัฐ", value: 380 },
  { name: "อื่น", value: 90 },
];

const revenueForecast = [
  { month: "ต.ค.", actual: 66, forecast: null },
  { month: "พ.ย.", actual: 73, forecast: null },
  { month: "ธ.ค.", actual: 78, forecast: null },
  { month: "ม.ค.", actual: 73, forecast: null },
  { month: "ก.พ.", actual: 78, forecast: null },
  { month: "มี.ค.", actual: 82, forecast: null },
  { month: "เม.ย.", actual: 78, forecast: null },
  { month: "พ.ค.", actual: 84, forecast: null },
  { month: "มิ.ย.", actual: 76, forecast: null },
  { month: "ก.ค.", actual: 73, forecast: null },
  { month: "ส.ค.", actual: 79, forecast: null },
  { month: "ก.ย.", actual: 80, forecast: 80 },
  { month: "ต.ค.(F)", actual: null, forecast: 84 },
  { month: "พ.ย.(F)", actual: null, forecast: 86 },
  { month: "ธ.ค.(F)", actual: null, forecast: 88 },
  { month: "ม.ค.(F)", actual: null, forecast: 85 },
  { month: "ก.พ.(F)", actual: null, forecast: 87 },
  { month: "มี.ค.(F)", actual: null, forecast: 90 },
];

const expenseMonthly = [
  { month: "ต.ค.", personnel: 35, ops: 20, other: 10 },
  { month: "พ.ย.", personnel: 36, ops: 20, other: 10 },
  { month: "ธ.ค.", personnel: 34, ops: 21, other: 11 },
  { month: "ม.ค.", personnel: 35, ops: 19, other: 10 },
  { month: "ก.พ.", personnel: 36, ops: 20, other: 10 },
  { month: "มี.ค.", personnel: 37, ops: 21, other: 10 },
  { month: "เม.ย.", personnel: 35, ops: 20, other: 10 },
  { month: "พ.ค.", personnel: 36, ops: 21, other: 10 },
  { month: "มิ.ย.", personnel: 34, ops: 19, other: 10 },
  { month: "ก.ค.", personnel: 35, ops: 20, other: 10 },
  { month: "ส.ค.", personnel: 36, ops: 20, other: 10 },
  { month: "ก.ย.", personnel: 35, ops: 19, other: 9 },
];

const expenseSources = [
  { name: "บุคลากร", value: 420 },
  { name: "ดำเนินงาน", value: 240 },
  { name: "อื่น", value: 120 },
];

const expenseForecast = [
  { month: "ต.ค.", actual: 65, forecast: null },
  { month: "พ.ย.", actual: 66, forecast: null },
  { month: "ธ.ค.", actual: 66, forecast: null },
  { month: "ม.ค.", actual: 64, forecast: null },
  { month: "ก.พ.", actual: 66, forecast: null },
  { month: "มี.ค.", actual: 68, forecast: null },
  { month: "เม.ย.", actual: 65, forecast: null },
  { month: "พ.ค.", actual: 67, forecast: null },
  { month: "มิ.ย.", actual: 63, forecast: null },
  { month: "ก.ค.", actual: 65, forecast: null },
  { month: "ส.ค.", actual: 66, forecast: null },
  { month: "ก.ย.", actual: 63, forecast: 63 },
  { month: "ต.ค.(F)", actual: null, forecast: 66 },
  { month: "พ.ย.(F)", actual: null, forecast: 67 },
  { month: "ธ.ค.(F)", actual: null, forecast: 68 },
  { month: "ม.ค.(F)", actual: null, forecast: 65 },
  { month: "ก.พ.(F)", actual: null, forecast: 67 },
  { month: "มี.ค.(F)", actual: null, forecast: 69 },
];

const costOutcome = [
  { month: "ต.ค.", cost: 4.2, outcome: 82 },
  { month: "พ.ย.", cost: 4.5, outcome: 84 },
  { month: "ธ.ค.", cost: 4.8, outcome: 85 },
  { month: "ม.ค.", cost: 4.3, outcome: 83 },
  { month: "ก.พ.", cost: 4.4, outcome: 86 },
  { month: "มี.ค.", cost: 4.7, outcome: 88 },
  { month: "เม.ย.", cost: 4.5, outcome: 87 },
  { month: "พ.ค.", cost: 4.6, outcome: 89 },
  { month: "มิ.ย.", cost: 4.3, outcome: 86 },
  { month: "ก.ค.", cost: 4.4, outcome: 87 },
  { month: "ส.ค.", cost: 4.5, outcome: 88 },
  { month: "ก.ย.", cost: 4.2, outcome: 87 },
];

const efficiencyByType = [
  { type: "รพ.ศูนย์", efficiency: 91 },
  { type: "รพ.ทั่วไป", efficiency: 87 },
  { type: "รพ.ชุมชน", efficiency: 84 },
  { type: "รพ.เอกชน", efficiency: 89 },
  { type: "รพ.สต.", efficiency: 78 },
];

const costBreakdown = [
  { item: "ค่าบุคลากรสำรวจ", cost: "฿18.5M", pct: "32%", note: "Surveyor fees" },
  { item: "ค่าเดินทาง", cost: "฿8.2M", pct: "14%", note: "Travel & accommodation" },
  { item: "ค่าระบบ IT", cost: "฿12.4M", pct: "21%", note: "HIS, software licenses" },
  { item: "ค่าฝึกอบรม", cost: "฿9.8M", pct: "17%", note: "Training programs" },
  { item: "ค่าวัสดุ", cost: "฿4.6M", pct: "8%", note: "Materials & supplies" },
  { item: "อื่นๆ", cost: "฿4.5M", pct: "8%", note: "Miscellaneous" },
];

// ─── Tab Components ───────────────────────────────────────────────────────────

function TabBudget() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard icon={DollarSign} label="งบประมาณทั้งหมด" value="850M" sub="ปีงบประมาณ 2567" color={PRIMARY} />
        <KPICard icon={TrendingUp} label="ใช้ไปแล้ว" value="612M" sub="72% ของงบทั้งหมด" color="#D97706" />
        <KPICard icon={Wallet} label="คงเหลือ" value="238M" sub="28% ของงบทั้งหมด" color="#16A34A" />
        <KPICard icon={BarChart2} label="อัตราเบิกจ่าย" value="72%" sub="เป้าหมาย 80%" color={ACCENT} />
      </div>

      <SectionCard title="งบ vs จ่ายจริง รายหน่วยงาน (ล้านบาท)">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={budgetDepts} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="budget" name="งบประมาณ" fill={PRIMARY} radius={[4, 4, 0, 0]} />
            <Bar dataKey="actual" name="จ่ายจริง" fill={ACCENT} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard title="การเบิกจ่ายสะสม (ล้านบาท)">
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={cumulativeDisbursement} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={PRIMARY} stopOpacity={0.2} />
                <stop offset="95%" stopColor={PRIMARY} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="cumulative"
              name="สะสม"
              stroke={PRIMARY}
              fill="url(#colorCumulative)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard title="สรุปงบประมาณรายหน่วยงาน">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 px-3 text-gray-500 font-medium">หน่วยงาน</th>
                <th className="text-right py-2 px-3 text-gray-500 font-medium">งบประมาณ</th>
                <th className="text-right py-2 px-3 text-gray-500 font-medium">เบิกจ่าย</th>
                <th className="text-right py-2 px-3 text-gray-500 font-medium">คงเหลือ</th>
                <th className="text-right py-2 px-3 text-gray-500 font-medium">%</th>
                <th className="text-center py-2 px-3 text-gray-500 font-medium">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {budgetDepts.map((d) => {
                const remaining = d.budget - d.actual;
                const pct = Math.round((d.actual / d.budget) * 100);
                const status = pct >= 100 ? "เกินงบ" : pct >= 85 ? "ใกล้เกิน" : "ปกติ";
                return (
                  <tr key={d.name} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium text-gray-700">{d.name}</td>
                    <td className="py-2 px-3 text-right text-gray-600">{d.budget}M</td>
                    <td className="py-2 px-3 text-right text-gray-600">{d.actual}M</td>
                    <td className="py-2 px-3 text-right text-gray-600">{remaining}M</td>
                    <td className="py-2 px-3 text-right text-gray-600">{pct}%</td>
                    <td className="py-2 px-3 text-center">
                      <StatusBadge status={status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

function TabRevenue() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard icon={DollarSign} label="รายรับรวม" value="920M" sub="ปีงบประมาณ 2567" color={PRIMARY} />
        <KPICard icon={CreditCard} label="ค่าธรรมเนียม" value="450M" sub="48.9% ของรายรับ" color={ACCENT} />
        <KPICard icon={TrendingUp} label="เงินอุดหนุนรัฐ" value="380M" sub="41.3% ของรายรับ" color="#16A34A" />
        <KPICard icon={Wallet} label="รายรับอื่น" value="90M" sub="9.8% ของรายรับ" color="#7C3AED" />
      </div>

      <SectionCard title="แนวโน้มรายรับรายเดือน (ล้านบาท)">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={revenueMonthly} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="fee" name="ค่าธรรมเนียม" stroke={PRIMARY} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="gov" name="รัฐ" stroke={ACCENT} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="other" name="อื่น" stroke="#7C3AED" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard title="สัดส่วนแหล่งรายรับ">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={revenueSources}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
            >
              {revenueSources.map((entry, index) => (
                <Cell key={`cell-rev-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}M`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard title="แนวโน้มรายรับ + คาดการณ์ (ล้านบาท)">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={revenueForecast} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} interval={2} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              name="รายรับจริง"
              stroke={PRIMARY}
              strokeWidth={2}
              dot={false}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="forecast"
              name="คาดการณ์"
              stroke="#F59E0B"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </SectionCard>
    </div>
  );
}

function TabExpense() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard icon={TrendingDown} label="รายจ่ายรวม" value="780M" sub="ปีงบประมาณ 2567" color="#DC2626" />
        <KPICard icon={DollarSign} label="บุคลากร" value="420M" sub="53.8% ของรายจ่าย" color={PRIMARY} />
        <KPICard icon={CreditCard} label="ดำเนินงาน" value="240M" sub="30.8% ของรายจ่าย" color={ACCENT} />
        <KPICard icon={Wallet} label="อื่นๆ" value="120M" sub="15.4% ของรายจ่าย" color="#7C3AED" />
      </div>

      <SectionCard title="รายจ่ายแยกประเภทรายเดือน (ล้านบาท)">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={expenseMonthly} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="personnel" name="บุคลากร" stackId="a" fill={PRIMARY} />
            <Bar dataKey="ops" name="ดำเนินงาน" stackId="a" fill={ACCENT} />
            <Bar dataKey="other" name="อื่น" stackId="a" fill="#7C3AED" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard title="สัดส่วนรายจ่าย">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={expenseSources}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
            >
              {expenseSources.map((entry, index) => (
                <Cell key={`cell-exp-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}M`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard title="แนวโน้มรายจ่าย + คาดการณ์ (ล้านบาท)">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={expenseForecast} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorExpActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={PRIMARY} stopOpacity={0.15} />
                <stop offset="95%" stopColor={PRIMARY} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} interval={2} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="actual"
              name="รายจ่ายจริง"
              stroke={PRIMARY}
              fill="url(#colorExpActual)"
              strokeWidth={2}
              dot={false}
              connectNulls
            />
            <Area
              type="monotone"
              dataKey="forecast"
              name="คาดการณ์"
              stroke="#F59E0B"
              fill="url(#colorExpForecast)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              connectNulls
            />
          </AreaChart>
        </ResponsiveContainer>
      </SectionCard>
    </div>
  );
}

function TabCostAnalysis() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard icon={BarChart2} label="Cost per Accreditation" value="52,000฿" sub="ต่อการรับรอง 1 ครั้ง" color={PRIMARY} />
        <KPICard icon={TrendingUp} label="Efficiency Index" value="87%" sub="ระดับดีมาก" color="#16A34A" />
        <KPICard icon={DollarSign} label="ROI" value="118%" sub="Return on Investment" color={ACCENT} />
        <KPICard icon={Wallet} label="Savings" value="28M" sub="ประหยัดได้จากปีก่อน" color="#7C3AED" />
      </div>

      <SectionCard title="Cost vs Outcome รายเดือน">
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={costOutcome} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} domain={[70, 95]} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="cost" name="Cost (ล้าน฿)" fill={PRIMARY} radius={[4, 4, 0, 0]} />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="outcome"
              name="Outcome Score"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard title="Efficiency by Hospital Type">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={efficiencyByType}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} unit="%" />
            <YAxis type="category" dataKey="type" tick={{ fontSize: 12 }} width={70} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Bar dataKey="efficiency" name="Efficiency" fill={ACCENT} radius={[0, 4, 4, 0]}>
              {efficiencyByType.map((entry, index) => (
                <Cell key={`cell-eff-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard title="Cost Breakdown">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 px-3 text-gray-500 font-medium">รายการ</th>
                <th className="text-right py-2 px-3 text-gray-500 font-medium">ต้นทุน</th>
                <th className="text-right py-2 px-3 text-gray-500 font-medium">สัดส่วน</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              {costBreakdown.map((row) => (
                <tr key={row.item} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2 px-3 font-medium text-gray-700">{row.item}</td>
                  <td className="py-2 px-3 text-right text-gray-600">{row.cost}</td>
                  <td className="py-2 px-3 text-right">
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                      {row.pct}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-gray-400 text-xs">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const TABS = [
  { id: "budget", label: "งบประมาณ", icon: DollarSign },
  { id: "revenue", label: "รายรับ", icon: TrendingUp },
  { id: "expense", label: "รายจ่าย", icon: TrendingDown },
  { id: "cost", label: "Cost Analysis", icon: PieIcon },
];

export default function Financial() {
  const [activeTab, setActiveTab] = useState("budget");
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-12-31");
  const [fiscalYear, setFiscalYear] = useState("2567");
  const [quarter, setQuarter] = useState("");
  const today = new Date().toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const renderTab = () => {
    switch (activeTab) {
      case "budget":
        return <TabBudget />;
      case "revenue":
        return <TabRevenue />;
      case "expense":
        return <TabExpense />;
      case "cost":
        return <TabCostAnalysis />;
      default:
        return <TabBudget />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <DashboardHeroCard
        header={
          <DashboardPageHeader
            icon={DollarSign}
            title="ระบบการเงินและงบประมาณ"
            subtitle={`Financial Management Dashboard • ข้อมูล ณ วันที่ ${today}`}
          />
        }
        filter={
          <DashboardFilterBar
            actions={
              <>
                <button
                  type="button"
                  className="rounded-lg bg-[#0EA5E9] px-3 py-1.5 text-sm font-medium text-white"
                >
                  ค้นหา
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                  onClick={() => {
                    setDateFrom("2024-01-01");
                    setDateTo("2024-12-31");
                    setFiscalYear("2567");
                    setQuarter("");
                  }}
                >
                  รีเซ็ต
                </button>
              </>
            }
          >
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500">ปีงบประมาณ</label>
              <select
                value={fiscalYear}
                onChange={(e) => setFiscalYear(e.target.value)}
                className="rounded-lg border border-gray-200 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
              >
                <option value="2565">2565</option>
                <option value="2566">2566</option>
                <option value="2567">2567</option>
                <option value="2568">2568</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500">ตั้งแต่</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="rounded-lg border border-gray-200 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500">ถึง</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="rounded-lg border border-gray-200 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500">ไตรมาส</label>
              <select
                value={quarter}
                onChange={(e) => setQuarter(e.target.value)}
                className="rounded-lg border border-gray-200 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
              >
                <option value="">ทั้งหมด</option>
                <option value="Q1">Q1 (ต.ค. - ธ.ค.)</option>
                <option value="Q2">Q2 (ม.ค. - มี.ค.)</option>
                <option value="Q3">Q3 (เม.ย. - มิ.ย.)</option>
                <option value="Q4">Q4 (ก.ค. - ก.ย.)</option>
              </select>
            </div>
          </DashboardFilterBar>
        }
      />

      <DashboardTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      <div className="space-y-4">
        {renderTab()}
        <p className="pb-2 text-center text-xs text-gray-400">
          ข้อมูล ณ วันที่ {today} | ระบบการเงินและงบประมาณ HAI Dashboard
        </p>
      </div>
    </div>
  );
}
