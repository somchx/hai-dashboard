import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  ComposedChart, ReferenceLine, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Target, TrendingUp, FileText, CheckCircle, AlertCircle,
  Clock, Download, ChevronDown
} from 'lucide-react';
import {
  DashboardFilterBar,
  DashboardHeroCard,
  DashboardPageHeader,
  DashboardTabs,
} from '../components/DashboardTheme';

// ─── Color constants ───────────────────────────────────────────────────────────
const PRIMARY = '#0D5C8F';
const ACCENT  = '#0EA5E9';

// ─── Hardcoded data ────────────────────────────────────────────────────────────
const kpiTableData = [
  { kpi: 'มาตรฐาน HA',                  current: 88,   target: 85,  status: 'บรรลุ',    owner: 'ฝ่ายคุณภาพ' },
  { kpi: 'งบประมาณ',                     current: 72,   target: 80,  status: 'ไม่บรรลุ',  owner: 'ฝ่ายการเงิน' },
  { kpi: 'รายรับ',                       current: 95,   target: 90,  status: 'บรรลุ',    owner: 'ฝ่ายรายได้' },
  { kpi: 'Vendor Score',                 current: 87,   target: 85,  status: 'บรรลุ',    owner: 'ฝ่ายจัดซื้อ' },
  { kpi: 'ความพึงพอใจ',                  current: 82,   target: 80,  status: 'บรรลุ',    owner: 'ฝ่ายบริการ' },
  { kpi: 'การประเมิน',                   current: 91,   target: 88,  status: 'บรรลุ',    owner: 'ฝ่ายบุคคล' },
  { kpi: 'อัตราครองเตียง',               current: 78,   target: 80,  status: 'ใกล้เป้า', owner: 'ฝ่ายพยาบาล' },
  { kpi: 'การติดเชื้อในโรงพยาบาล',       current: 0.8,  target: 1.0, status: 'บรรลุ',    owner: 'ฝ่ายการแพทย์' },
  { kpi: 'ระยะเวลารอคิว OPD',            current: 32,   target: 30,  status: 'ใกล้เป้า', owner: 'ฝ่ายผู้ป่วยนอก' },
  { kpi: 'อัตราการเสียชีวิต',            current: 1.2,  target: 1.5, status: 'บรรลุ',    owner: 'ฝ่ายการแพทย์' },
  { kpi: 'ความครอบคลุมวัคซีน',           current: 92,   target: 90,  status: 'บรรลุ',    owner: 'ฝ่ายส่งเสริมสุขภาพ' },
  { kpi: 'จำนวนผู้ป่วย IPD',             current: 1850, target: 1800,status: 'บรรลุ',    owner: 'ฝ่ายผู้ป่วยใน' },
  { kpi: 'อัตราการกลับมารักษาซ้ำ',       current: 4.2,  target: 4.0, status: 'ใกล้เป้า', owner: 'ฝ่ายการแพทย์' },
  { kpi: 'ค่าใช้จ่ายต่อหัว',             current: 1200, target: 1100,status: 'ไม่บรรลุ',  owner: 'ฝ่ายการเงิน' },
  { kpi: 'ความพึงพอใจบุคลากร',           current: 78,   target: 75,  status: 'บรรลุ',    owner: 'ฝ่ายบุคคล' },
  { kpi: 'อัตราการลาออก',                current: 6.5,  target: 7.0, status: 'บรรลุ',    owner: 'ฝ่ายบุคคล' },
  { kpi: 'การพัฒนาบุคลากร',              current: 85,   target: 80,  status: 'บรรลุ',    owner: 'ฝ่ายพัฒนา' },
  { kpi: 'ดิจิทัลทรานส์ฟอร์ม',           current: 55,   target: 60,  status: 'ใกล้เป้า', owner: 'ฝ่าย IT' },
  { kpi: 'การใช้ระบบ HIS',               current: 94,   target: 90,  status: 'บรรลุ',    owner: 'ฝ่าย IT' },
  { kpi: 'Green Hospital',               current: 72,   target: 70,  status: 'บรรลุ',    owner: 'ฝ่ายสิ่งแวดล้อม' },
  { kpi: 'ISO 9001',                     current: 88,   target: 85,  status: 'บรรลุ',    owner: 'ฝ่ายคุณภาพ' },
  { kpi: 'คะแนน ITA',                    current: 91,   target: 85,  status: 'บรรลุ',    owner: 'ฝ่ายธรรมาภิบาล' },
  { kpi: 'ร้องเรียน',                    current: 3,    target: 5,   status: 'บรรลุ',    owner: 'ฝ่ายบริการ' },
  { kpi: 'รายได้รวม',                    current: 285,  target: 290, status: 'ใกล้เป้า', owner: 'ฝ่ายรายได้' },
];

const kpiByGoalData = [
  { goal: 'ยุทธศาสตร์ 1', achieved: 78 },
  { goal: 'ยุทธศาสตร์ 2', achieved: 65 },
  { goal: 'ยุทธศาสตร์ 3', achieved: 82 },
  { goal: 'ยุทธศาสตร์ 4', achieved: 45 },
  { goal: 'ยุทธศาสตร์ 5', achieved: 70 },
];

const bulletData = [
  { name: 'มาตรฐาน HA',  actual: 88, target: 85 },
  { name: 'งบประมาณ',    actual: 72, target: 80 },
  { name: 'รายรับ',      actual: 95, target: 90 },
  { name: 'Vendor Score', actual: 87, target: 85 },
  { name: 'ความพึงพอใจ', actual: 82, target: 80 },
  { name: 'การประเมิน',  actual: 91, target: 88 },
];

const strategyPillars = [
  { id: 1, title: 'ยุทธศาสตร์ที่ 1: พัฒนาคุณภาพระบบสุขภาพ',          progress: 78, color: ACCENT,    bg: 'bg-sky-50',    border: 'border-sky-200',    kpis: 8, achieved: 6 },
  { id: 2, title: 'ยุทธศาสตร์ที่ 2: เสริมสร้างขีดความสามารถองค์กร',   progress: 65, color: '#22C55E',  bg: 'bg-green-50',  border: 'border-green-200',  kpis: 6, achieved: 4 },
  { id: 3, title: 'ยุทธศาสตร์ที่ 3: บริหารทรัพยากรอย่างมีประสิทธิภาพ', progress: 82, color: '#A855F7',  bg: 'bg-purple-50', border: 'border-purple-200', kpis: 6, achieved: 5 },
  { id: 4, title: 'ยุทธศาสตร์ที่ 4: ส่งเสริมนวัตกรรมและดิจิทัล',      progress: 45, color: '#F97316',  bg: 'bg-orange-50', border: 'border-orange-200', kpis: 4, achieved: 2 },
];

const budgetData = [
  { goal: 'ยุทธศาสตร์ 1', budget: 45.2 },
  { goal: 'ยุทธศาสตร์ 2', budget: 32.8 },
  { goal: 'ยุทธศาสตร์ 3', budget: 58.5 },
  { goal: 'ยุทธศาสตร์ 4', budget: 22.1 },
];

const ganttProjects = [
  { name: 'โครงการ HA Re-accreditation', start: 0,  duration: 18, progress: 75, color: ACCENT },
  { name: 'โครงการพัฒนา HIS',            start: 3,  duration: 12, progress: 60, color: '#22C55E' },
  { name: 'โครงการ Green Hospital',       start: 0,  duration: 24, progress: 55, color: '#16A34A' },
  { name: 'โครงการ Digital Transform',    start: 6,  duration: 18, progress: 40, color: '#F97316' },
  { name: 'โครงการพัฒนาบุคลากร',          start: 0,  duration: 12, progress: 80, color: PRIMARY },
  { name: 'โครงการลดต้นทุน',              start: 3,  duration: 9,  progress: 65, color: '#A855F7' },
  { name: 'โครงการ Telemedicine',         start: 9,  duration: 15, progress: 30, color: '#EC4899' },
  { name: 'โครงการ ISO 9001',             start: 0,  duration: 8,  progress: 90, color: '#EAB308' },
];

const policyTableData = [
  { name: 'นโยบายควบคุมคุณภาพ HA',      dept: 'ฝ่ายคุณภาพ',      owner: 'นพ.สมชาย',  deadline: '31/03/2025', progress: 85,  status: 'ดำเนินการ' },
  { name: 'นโยบายบริหารงบประมาณ',         dept: 'ฝ่ายการเงิน',      owner: 'คุณสุดา',    deadline: '31/12/2024', progress: 100, status: 'เสร็จ' },
  { name: 'นโยบายพัฒนา HIS',             dept: 'ฝ่าย IT',          owner: 'คุณวิชัย',   deadline: '30/06/2025', progress: 60,  status: 'ดำเนินการ' },
  { name: 'นโยบายสิ่งแวดล้อม',            dept: 'ฝ่ายสิ่งแวดล้อม',  owner: 'คุณมาลี',    deadline: '30/09/2025', progress: 72,  status: 'ดำเนินการ' },
  { name: 'นโยบายพัฒนาบุคลากร',           dept: 'ฝ่ายบุคคล',        owner: 'คุณพรรณี',   deadline: '31/12/2024', progress: 100, status: 'เสร็จ' },
  { name: 'นโยบาย Telemedicine',         dept: 'ฝ่าย IT',          owner: 'นพ.กิตติ',   deadline: '30/06/2026', progress: 30,  status: 'ดำเนินการ' },
  { name: 'นโยบายลดของเสีย',              dept: 'ฝ่ายสิ่งแวดล้อม',  owner: 'คุณมาลี',    deadline: '31/03/2025', progress: 15,  status: 'ล่าช้า' },
  { name: 'นโยบายดูแลผู้สูงอายุ',         dept: 'ฝ่ายการแพทย์',     owner: 'นพ.วรวิทย์', deadline: '30/09/2024', progress: 100, status: 'เสร็จ' },
  { name: 'นโยบายป้องกันการติดเชื้อ',      dept: 'ฝ่ายการแพทย์',     owner: 'พญ.สุภา',    deadline: '30/06/2025', progress: 88,  status: 'ดำเนินการ' },
  { name: 'นโยบายบริหารความเสี่ยง',        dept: 'ฝ่ายบริหาร',       owner: 'คุณธีระ',    deadline: '31/12/2025', progress: 55,  status: 'ดำเนินการ' },
  { name: 'นโยบายดิจิทัลทรานส์ฟอร์ม',      dept: 'ฝ่าย IT',          owner: 'คุณวิชัย',   deadline: '31/12/2026', progress: 40,  status: 'ดำเนินการ' },
  { name: 'นโยบายความปลอดภัยผู้ป่วย',      dept: 'ฝ่ายคุณภาพ',      owner: 'นพ.สมชาย',  deadline: '30/03/2025', progress: 92,  status: 'ดำเนินการ' },
  { name: 'นโยบาย ITA',                  dept: 'ฝ่ายธรรมาภิบาล',   owner: 'คุณอนันต์',  deadline: '31/12/2024', progress: 100, status: 'เสร็จ' },
  { name: 'นโยบายจัดซื้อจัดจ้าง',          dept: 'ฝ่ายจัดซื้อ',      owner: 'คุณศิริ',    deadline: '30/06/2025', progress: 78,  status: 'ดำเนินการ' },
  { name: 'นโยบายการแพทย์ฉุกเฉิน',         dept: 'ฝ่ายการแพทย์',     owner: 'นพ.กฤษณะ',  deadline: '30/09/2025', progress: 20,  status: 'ล่าช้า' },
];

const stackedBarData = [
  { dept: 'ฝ่ายการแพทย์', เสร็จ: 8,  ดำเนินการ: 5, ล่าช้า: 1 },
  { dept: 'ฝ่าย IT',      เสร็จ: 3,  ดำเนินการ: 6, ล่าช้า: 2 },
  { dept: 'ฝ่ายบุคคล',    เสร็จ: 6,  ดำเนินการ: 2, ล่าช้า: 0 },
  { dept: 'ฝ่ายการเงิน',  เสร็จ: 7,  ดำเนินการ: 3, ล่าช้า: 1 },
  { dept: 'ฝ่ายคุณภาพ',   เสร็จ: 5,  ดำเนินการ: 4, ล่าช้า: 0 },
];

const policyTimeline = [
  { date: '10 มิ.ย. 2025', desc: 'อนุมัตินโยบาย Telemedicine สำหรับผู้ป่วยเรื้อรัง',    color: 'bg-sky-500' },
  { date: '02 มิ.ย. 2025', desc: 'ปรับปรุงนโยบายควบคุมการติดเชื้อในโรงพยาบาล',          color: 'bg-green-500' },
  { date: '25 พ.ค. 2025', desc: 'ประกาศนโยบาย Digital Transform ระยะที่ 2',              color: 'bg-purple-500' },
  { date: '18 พ.ค. 2025', desc: 'ทบทวนนโยบายบริหารความเสี่ยงองค์กร',                    color: 'bg-amber-500' },
  { date: '05 พ.ค. 2025', desc: 'เพิ่มนโยบายดูแลผู้ป่วยสูงอายุระยะยาว (LTC)',            color: 'bg-red-500' },
];

// ─── Shared helper components ─────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    'บรรลุ':    'bg-green-100 text-green-800',
    'ใกล้เป้า': 'bg-yellow-100 text-yellow-800',
    'ไม่บรรลุ': 'bg-red-100 text-red-800',
    'เสร็จ':    'bg-green-100 text-green-800',
    'ดำเนินการ': 'bg-blue-100 text-blue-800',
    'ล่าช้า':   'bg-red-100 text-red-800',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${map[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
}

function ExportButton() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-white"
        style={{ backgroundColor: PRIMARY }}
      >
        <Download size={14} />
        <span>ส่งออก</span>
        <ChevronDown size={13} />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          {['PDF', 'CSV'].map(fmt => (
            <button
              key={fmt}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              onClick={() => { setOpen(false); alert('กำลังส่งออกไฟล์...'); }}
            >
              {fmt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
      <div className="rounded-full p-3 shrink-0" style={{ backgroundColor: `${color}22` }}>
        <Icon size={22} style={{ color }} />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Tab 1: KPI องค์กร ────────────────────────────────────────────────────────
function TabKPI() {
  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard icon={Target}      label="KPI ทั้งหมด" value="24"  color={PRIMARY} />
        <KpiCard icon={CheckCircle} label="บรรลุเป้า"   value="18"  sub="75%"       color="#22C55E" />
        <KpiCard icon={Clock}       label="ใกล้เป้า"    value="4"   sub="17%"       color="#EAB308" />
        <KpiCard icon={AlertCircle} label="ไม่บรรลุ"   value="2"   sub="8%"        color="#EF4444" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI achievement by strategic goal */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700 text-sm">อัตราบรรลุ KPI ตามยุทธศาสตร์ (%)</h3>
            <ExportButton />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={kpiByGoalData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="goal" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
              <Tooltip formatter={v => [`${v}%`, 'อัตราบรรลุ']} />
              <Bar dataKey="achieved" name="อัตราบรรลุ" fill={ACCENT} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bullet / actual vs target */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700 text-sm">ค่าจริง vs เป้าหมาย KPI</h3>
            <ExportButton />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart
              data={bulletData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" domain={[0, 110]} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={90} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="actual"  name="ค่าจริง"    fill={ACCENT}          barSize={14} radius={[0, 4, 4, 0]} />
              <Bar dataKey="target"  name="เป้าหมาย"   fill={`${PRIMARY}55`}  barSize={6}  radius={[0, 2, 2, 0]} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* KPI table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-700 text-sm">รายการ KPI ทั้งหมด (24 รายการ)</h3>
          <ExportButton />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-left text-xs">
                <th className="px-3 py-2 font-medium rounded-tl-lg">KPI</th>
                <th className="px-3 py-2 font-medium text-right">ค่าปัจจุบัน</th>
                <th className="px-3 py-2 font-medium text-right">เป้าหมาย</th>
                <th className="px-3 py-2 font-medium">สถานะ</th>
                <th className="px-3 py-2 font-medium rounded-tr-lg">หน่วยงานรับผิดชอบ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {kpiTableData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 text-sm">
                  <td className="px-3 py-2 text-gray-800">{row.kpi}</td>
                  <td className="px-3 py-2 text-right font-medium text-gray-700">{row.current}</td>
                  <td className="px-3 py-2 text-right text-gray-500">{row.target}</td>
                  <td className="px-3 py-2"><StatusBadge status={row.status} /></td>
                  <td className="px-3 py-2 text-gray-600">{row.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 2: ยุทธศาสตร์ ───────────────────────────────────────────────────────
function PillarCard({ pillar }) {
  return (
    <div className={`rounded-xl p-5 border ${pillar.bg} ${pillar.border}`}>
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-gray-800 text-sm leading-snug pr-2">{pillar.title}</h4>
        <span className="text-2xl font-bold shrink-0" style={{ color: pillar.color }}>
          {pillar.progress}%
        </span>
      </div>
      {/* CSS progress bar */}
      <div className="w-full bg-white rounded-full h-3 border border-gray-200 mb-2">
        <div
          className="h-3 rounded-full transition-all duration-500"
          style={{ width: `${pillar.progress}%`, backgroundColor: pillar.color }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mb-3">
        <span>KPI บรรลุ: {pillar.achieved}/{pillar.kpis}</span>
        <span>ความคืบหน้า {pillar.progress}%</span>
      </div>
      {/* Donut mini-chart */}
      <div className="flex justify-center">
        <PieChart width={80} height={80}>
          <Pie
            data={[{ value: pillar.progress }, { value: 100 - pillar.progress }]}
            cx={35} cy={35}
            innerRadius={22} outerRadius={35}
            startAngle={90} endAngle={-270}
            dataKey="value"
            strokeWidth={0}
          >
            <Cell fill={pillar.color} />
            <Cell fill="#E5E7EB" />
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}

function GanttBar({ project, totalMonths }) {
  const leftPct      = (project.start    / totalMonths) * 100;
  const widthPct     = (project.duration / totalMonths) * 100;
  const progressFill = (project.progress / 100) * widthPct;
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="text-xs text-gray-600 w-48 shrink-0 truncate" title={project.name}>
        {project.name}
      </div>
      <div className="flex-1 relative h-6 bg-gray-100 rounded overflow-hidden">
        {/* track */}
        <div
          className="absolute top-0 h-full rounded opacity-25"
          style={{ left: `${leftPct}%`, width: `${widthPct}%`, backgroundColor: project.color }}
        />
        {/* filled progress */}
        <div
          className="absolute top-0 h-full rounded"
          style={{ left: `${leftPct}%`, width: `${progressFill}%`, backgroundColor: project.color }}
        />
        {/* label */}
        <div
          className="absolute inset-y-0 flex items-center px-1.5 pointer-events-none"
          style={{ left: `${leftPct}%` }}
        >
          <span className="text-xs text-white font-semibold drop-shadow">
            {project.progress}%
          </span>
        </div>
      </div>
    </div>
  );
}

const QUARTER_LABELS = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'];
const TOTAL_MONTHS   = 24;

function TabStrategy() {
  return (
    <div className="space-y-6">
      {/* Pillars */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-700 text-sm">ความคืบหน้ายุทธศาสตร์</h3>
          <ExportButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {strategyPillars.map(p => <PillarCard key={p.id} pillar={p} />)}
        </div>
      </div>

      {/* Budget + Gantt */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700 text-sm">งบประมาณแต่ละยุทธศาสตร์ (ล้านบาท)</h3>
            <ExportButton />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={budgetData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="goal" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} unit="M" />
              <Tooltip formatter={v => [`${v} ล้านบาท`, 'งบประมาณ']} />
              <Bar dataKey="budget" name="งบประมาณ" fill={PRIMARY} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gantt timeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-700 text-sm">แผนโครงการยุทธศาสตร์ (2024–2026)</h3>
            <ExportButton />
          </div>
          {/* Quarter header */}
          <div className="flex ml-[12rem] mb-1">
            {QUARTER_LABELS.map((q, i) => (
              <div
                key={i}
                className="flex-1 text-center text-[10px] text-gray-400 border-l border-gray-200 first:border-0 truncate px-0.5"
              >
                {q}
              </div>
            ))}
          </div>
          <div className="space-y-0.5">
            {ganttProjects.map((p, i) => (
              <GanttBar key={i} project={p} totalMonths={TOTAL_MONTHS} />
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-3">
            * แถบสีอ่อน = ช่วงเวลาทั้งหมด  |  แถบสีเข้ม = ความคืบหน้า
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 3: Policy Tracking ───────────────────────────────────────────────────
function TabPolicy() {
  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard icon={FileText}    label="นโยบายทั้งหมด"  value="48"  color={PRIMARY} />
        <KpiCard icon={CheckCircle} label="ดำเนินการแล้ว"  value="32"  sub="67%"       color="#22C55E" />
        <KpiCard icon={TrendingUp}  label="อยู่ระหว่าง"    value="12"  sub="25%"       color={ACCENT} />
        <KpiCard icon={AlertCircle} label="ล่าช้า"         value="4"   sub="8%"        color="#EF4444" />
      </div>

      {/* Stacked bar + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stacked bar by department */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700 text-sm">ความคืบหน้านโยบายแยกตามหน่วยงาน</h3>
            <ExportButton />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={stackedBarData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="dept" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="เสร็จ"     stackId="a" fill="#22C55E" />
              <Bar dataKey="ดำเนินการ" stackId="a" fill={ACCENT} />
              <Bar dataKey="ล่าช้า"    stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Policy change timeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700 text-sm">การเปลี่ยนแปลงนโยบายล่าสุด</h3>
            <ExportButton />
          </div>
          <div className="relative pl-6 space-y-5 mt-2">
            {/* vertical line */}
            <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-200" />
            {policyTimeline.map((item, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-5 top-1 w-3 h-3 rounded-full ${item.color} ring-2 ring-white`} />
                <p className="text-xs text-gray-400 mb-0.5">{item.date}</p>
                <p className="text-sm text-gray-700 leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Policy table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-700 text-sm">รายการนโยบายทั้งหมด</h3>
          <ExportButton />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-left text-xs">
                <th className="px-3 py-2 font-medium rounded-tl-lg">ชื่อนโยบาย</th>
                <th className="px-3 py-2 font-medium">หน่วยงาน</th>
                <th className="px-3 py-2 font-medium">ผู้รับผิดชอบ</th>
                <th className="px-3 py-2 font-medium">กำหนดเสร็จ</th>
                <th className="px-3 py-2 font-medium">ความคืบหน้า (%)</th>
                <th className="px-3 py-2 font-medium rounded-tr-lg">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {policyTableData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 text-sm">
                  <td className="px-3 py-2 text-gray-800 max-w-[180px] truncate" title={row.name}>
                    {row.name}
                  </td>
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{row.dept}</td>
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{row.owner}</td>
                  <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{row.deadline}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-100 rounded-full h-1.5 shrink-0">
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${row.progress}%`,
                            backgroundColor:
                              row.progress === 100 ? '#22C55E'
                                : row.progress >= 70 ? ACCENT
                                : '#EF4444',
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 w-8 shrink-0">{row.progress}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Main page component ──────────────────────────────────────────────────────
const TABS = [
  { label: 'KPI องค์กร',       icon: Target },
  { label: 'ยุทธศาสตร์',       icon: TrendingUp },
  { label: 'Policy Tracking',  icon: FileText },
];

export default function Policy() {
  const [activeTab, setActiveTab] = useState(0);
  const [dateFrom,  setDateFrom]  = useState('2025-01');
  const [dateTo,    setDateTo]    = useState('2025-12');
  const today = new Date().toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <DashboardHeroCard
        header={
          <DashboardPageHeader
            icon={Target}
            title="นโยบายและยุทธศาสตร์"
            subtitle={`ติดตาม KPI องค์กร แผนยุทธศาสตร์ และนโยบายสำคัญ • ข้อมูล ณ วันที่ ${today}`}
          />
        }
        filter={
          <DashboardFilterBar
            label="ช่วงวันที่"
            actions={
              <>
                {['ไตรมาสนี้', 'ครึ่งปีแรก', 'ทั้งปี'].map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    {label}
                  </button>
                ))}
                <button
                  type="button"
                  className="rounded-lg bg-[#0EA5E9] px-4 py-1.5 text-xs font-medium text-white"
                >
                  กรอง
                </button>
              </>
            }
          >
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500">จาก</label>
              <input
                type="month"
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500">ถึง</label>
              <input
                type="month"
                value={dateTo}
                onChange={e => setDateTo(e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
            </div>
          </DashboardFilterBar>
        }
      />

      <DashboardTabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        getKey={(_, index) => index}
      />

      {/* Tab content */}
      {activeTab === 0 && <TabKPI />}
      {activeTab === 1 && <TabStrategy />}
      {activeTab === 2 && <TabPolicy />}
    </div>
  );
}
