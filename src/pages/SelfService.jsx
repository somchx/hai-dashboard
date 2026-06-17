import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {
  BarChart2, FileText, Download, Mail, Clock, Plus, X,
  RefreshCw, Settings, Save, Bell, CheckCircle2,
  AlertTriangle, Send, Calendar,
} from "lucide-react";
import { scheduledReports } from "../data/mockReports";

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_DATA = {
  การเงิน: {
    bar: [
      { name: "ม.ค.", value: 4200, value2: 3800 }, { name: "ก.พ.", value: 3800, value2: 4100 },
      { name: "มี.ค.", value: 5100, value2: 4700 }, { name: "เม.ย.", value: 4700, value2: 5200 },
      { name: "พ.ค.", value: 5900, value2: 5400 }, { name: "มิ.ย.", value: 6200, value2: 5800 },
      { name: "ก.ค.", value: 5800, value2: 6100 }, { name: "ส.ค.", value: 6500, value2: 6000 },
    ],
    barLabel: "รายรับ (ล้านบาท)", barTitle: "รายรับตามเดือน",
    line: [
      { name: "ม.ค.", actual: 4200, budget: 4000 }, { name: "ก.พ.", actual: 3800, budget: 4000 },
      { name: "มี.ค.", actual: 5100, budget: 4500 }, { name: "เม.ย.", actual: 4700, budget: 4500 },
      { name: "พ.ค.", actual: 5900, budget: 5000 }, { name: "มิ.ย.", actual: 6200, budget: 5500 },
      { name: "ก.ค.", actual: 5800, budget: 5500 }, { name: "ส.ค.", actual: 6500, budget: 6000 },
    ],
    lineTitle: "แนวโน้มรายรับเทียบงบประมาณ",
  },
  พัสดุ: {
    bar: [
      { name: "เวชภัณฑ์", value: 8200, value2: 7600 }, { name: "ครุภัณฑ์", value: 5400, value2: 4900 },
      { name: "วัสดุสิ้นเปลือง", value: 3100, value2: 2900 }, { name: "บริการ", value: 4700, value2: 5100 },
      { name: "อาหาร", value: 2200, value2: 2400 }, { name: "อื่นๆ", value: 1800, value2: 1600 },
    ],
    barLabel: "มูลค่าจัดซื้อ (พันบาท)", barTitle: "มูลค่าการจัดซื้อตามหมวดหมู่",
    line: [
      { name: "ม.ค.", actual: 6200, budget: 7000 }, { name: "ก.พ.", actual: 5800, budget: 7000 },
      { name: "มี.ค.", actual: 7400, budget: 7000 }, { name: "เม.ย.", actual: 6900, budget: 7000 },
      { name: "พ.ค.", actual: 8100, budget: 7500 }, { name: "มิ.ย.", actual: 7600, budget: 7500 },
      { name: "ก.ค.", actual: 8400, budget: 8000 }, { name: "ส.ค.", actual: 7900, budget: 8000 },
    ],
    lineTitle: "แนวโน้มค่าใช้จ่ายพัสดุรายเดือน",
  },
  การรับรอง: {
    bar: [
      { name: "เหนือ", value: 72, value2: 68 }, { name: "กลาง", value: 85, value2: 80 },
      { name: "อีสาน", value: 64, value2: 70 }, { name: "ใต้", value: 78, value2: 74 },
      { name: "ตะวันตก", value: 69, value2: 65 }, { name: "กทม.", value: 92, value2: 88 },
    ],
    barLabel: "คะแนนการรับรอง (%)", barTitle: "คะแนนการรับรองแยกตามภาค",
    line: [
      { name: "2562", actual: 68, budget: 70 }, { name: "2563", actual: 71, budget: 72 },
      { name: "2564", actual: 74, budget: 75 }, { name: "2565", actual: 79, budget: 78 },
      { name: "2566", actual: 83, budget: 80 }, { name: "2567", actual: 85, budget: 85 },
    ],
    lineTitle: "แนวโน้มคะแนนการรับรองรายปี",
  },
  นโยบาย: {
    bar: [
      { name: "KPI 1", value: 88, value2: 82 }, { name: "KPI 2", value: 74, value2: 79 },
      { name: "KPI 3", value: 91, value2: 87 }, { name: "KPI 4", value: 65, value2: 70 },
      { name: "KPI 5", value: 82, value2: 85 }, { name: "KPI 6", value: 95, value2: 90 },
    ],
    barLabel: "อัตราบรรลุ (%)", barTitle: "อัตราบรรลุเป้าหมาย KPI",
    line: [
      { name: "ม.ค.", actual: 78, budget: 80 }, { name: "ก.พ.", actual: 80, budget: 80 },
      { name: "มี.ค.", actual: 83, budget: 82 }, { name: "เม.ย.", actual: 81, budget: 82 },
      { name: "พ.ค.", actual: 86, budget: 84 }, { name: "มิ.ย.", actual: 88, budget: 85 },
      { name: "ก.ค.", actual: 87, budget: 86 }, { name: "ส.ค.", actual: 90, budget: 87 },
    ],
    lineTitle: "แนวโน้มการบรรลุนโยบายรายเดือน",
  },
};

const MOCK_DATA_ALT = {
  การเงิน: {
    bar: [
      { name: "ม.ค.", value: 3900, value2: 4100 }, { name: "ก.พ.", value: 4200, value2: 3900 },
      { name: "มี.ค.", value: 4800, value2: 5000 }, { name: "เม.ย.", value: 5100, value2: 4800 },
      { name: "พ.ค.", value: 5500, value2: 5700 }, { name: "มิ.ย.", value: 6000, value2: 6200 },
      { name: "ก.ค.", value: 6300, value2: 5900 }, { name: "ส.ค.", value: 6800, value2: 6400 },
    ],
    barLabel: "รายรับ (ล้านบาท)", barTitle: "รายรับตามเดือน (ชุดที่ 2)",
    line: [
      { name: "ม.ค.", actual: 3900, budget: 4200 }, { name: "ก.พ.", actual: 4200, budget: 4200 },
      { name: "มี.ค.", actual: 4800, budget: 4600 }, { name: "เม.ย.", actual: 5100, budget: 4600 },
      { name: "พ.ค.", actual: 5500, budget: 5200 }, { name: "มิ.ย.", actual: 6000, budget: 5700 },
      { name: "ก.ค.", actual: 6300, budget: 5700 }, { name: "ส.ค.", actual: 6800, budget: 6200 },
    ],
    lineTitle: "แนวโน้มรายรับเทียบงบประมาณ (ชุดที่ 2)",
  },
  พัสดุ: {
    bar: [
      { name: "เวชภัณฑ์", value: 7900, value2: 8100 }, { name: "ครุภัณฑ์", value: 5800, value2: 5200 },
      { name: "วัสดุสิ้นเปลือง", value: 2900, value2: 3200 }, { name: "บริการ", value: 5100, value2: 4800 },
      { name: "อาหาร", value: 2500, value2: 2300 }, { name: "อื่นๆ", value: 1600, value2: 1900 },
    ],
    barLabel: "มูลค่าจัดซื้อ (พันบาท)", barTitle: "มูลค่าการจัดซื้อ (ชุดที่ 2)",
    line: [
      { name: "ม.ค.", actual: 6500, budget: 6800 }, { name: "ก.พ.", actual: 6100, budget: 6800 },
      { name: "มี.ค.", actual: 7700, budget: 7200 }, { name: "เม.ย.", actual: 7200, budget: 7200 },
      { name: "พ.ค.", actual: 8400, budget: 7800 }, { name: "มิ.ย.", actual: 7900, budget: 7800 },
      { name: "ก.ค.", actual: 8700, budget: 8300 }, { name: "ส.ค.", actual: 8200, budget: 8300 },
    ],
    lineTitle: "แนวโน้มค่าใช้จ่ายพัสดุ (ชุดที่ 2)",
  },
  การรับรอง: {
    bar: [
      { name: "เหนือ", value: 75, value2: 71 }, { name: "กลาง", value: 88, value2: 83 },
      { name: "อีสาน", value: 67, value2: 72 }, { name: "ใต้", value: 81, value2: 77 },
      { name: "ตะวันตก", value: 72, value2: 68 }, { name: "กทม.", value: 94, value2: 91 },
    ],
    barLabel: "คะแนนการรับรอง (%)", barTitle: "คะแนนการรับรองแยกตามภาค (ชุดที่ 2)",
    line: [
      { name: "2562", actual: 70, budget: 72 }, { name: "2563", actual: 73, budget: 74 },
      { name: "2564", actual: 76, budget: 77 }, { name: "2565", actual: 81, budget: 80 },
      { name: "2566", actual: 85, budget: 82 }, { name: "2567", actual: 88, budget: 87 },
    ],
    lineTitle: "แนวโน้มคะแนนการรับรองรายปี (ชุดที่ 2)",
  },
  นโยบาย: {
    bar: [
      { name: "KPI 1", value: 90, value2: 85 }, { name: "KPI 2", value: 77, value2: 81 },
      { name: "KPI 3", value: 93, value2: 89 }, { name: "KPI 4", value: 68, value2: 73 },
      { name: "KPI 5", value: 85, value2: 88 }, { name: "KPI 6", value: 97, value2: 93 },
    ],
    barLabel: "อัตราบรรลุ (%)", barTitle: "อัตราบรรลุ KPI (ชุดที่ 2)",
    line: [
      { name: "ม.ค.", actual: 80, budget: 82 }, { name: "ก.พ.", actual: 82, budget: 82 },
      { name: "มี.ค.", actual: 85, budget: 84 }, { name: "เม.ย.", actual: 83, budget: 84 },
      { name: "พ.ค.", actual: 88, budget: 86 }, { name: "มิ.ย.", actual: 90, budget: 87 },
      { name: "ก.ค.", actual: 89, budget: 88 }, { name: "ส.ค.", actual: 92, budget: 89 },
    ],
    lineTitle: "แนวโน้มการบรรลุนโยบาย (ชุดที่ 2)",
  },
};

const PROVINCES = ["กรุงเทพฯ", "เชียงใหม่", "ขอนแก่น", "นครราชสีมา", "สงขลา", "ระยอง", "ภูเก็ต", "อุดรธานี", "เชียงราย", "สุราษฎร์ธานี"];

const ALERT_METRICS = [
  "คะแนน HA เฉลี่ย", "งบประมาณที่ใช้ (%)", "คำขอจัดซื้อค้าง",
  "โรงพยาบาลใบรับรองหมดอายุ", "รายรับประจำเดือน", "Hospital Risk Score",
  "Budget Utilization", "อัตราการรับรอง (%)",
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

// ─── Toggle Switch Component ──────────────────────────────────────────────────

function Toggle({ enabled, onChange, label, description }) {
  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative flex-shrink-0 inline-flex h-5 w-9 items-center rounded-full transition-colors mt-0.5 ${
          enabled ? "bg-[#0D5C8F]" : "bg-gray-200"
        }`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-4" : "translate-x-0.5"}`} />
      </button>
      <div>
        <p className="text-xs font-semibold text-gray-700 leading-tight">{label}</p>
        {description && <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{description}</p>}
      </div>
    </div>
  );
}

// ─── Chart Card Component ─────────────────────────────────────────────────────

function ChartCard({ chart, onDelete, topic, reportKey }) {
  const [title, setTitle] = useState(chart.title);
  const useAlt = reportKey % 2 === 1;
  const topicData = (useAlt ? MOCK_DATA_ALT : MOCK_DATA)[topic] || MOCK_DATA["การเงิน"];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <div className="flex items-center gap-2 mb-3">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="flex-1 text-sm font-semibold text-gray-700 border border-transparent hover:border-gray-300 focus:border-[#0D5C8F]/40 focus:outline-none rounded-lg px-2 py-1 bg-transparent"
        />
        <button onClick={onDelete} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
          <X size={14} />
        </button>
      </div>

      {chart.type === "bar" && (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={topicData.bar} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={v => [v.toLocaleString(), topicData.barLabel]} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} name={topicData.barLabel} />
            <Bar dataKey="value2" fill="#10b981" radius={[4, 4, 0, 0]} name="เปรียบเทียบ" />
          </BarChart>
        </ResponsiveContainer>
      )}
      {chart.type === "line" && (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={topicData.line} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="ค่าจริง" />
            <Line type="monotone" dataKey="budget" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="เป้าหมาย" />
          </LineChart>
        </ResponsiveContainer>
      )}
      {chart.type === "pie" && (
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={topicData.bar} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
              {topicData.bar.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
          </PieChart>
        </ResponsiveContainer>
      )}
      {chart.type === "area" && (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={topicData.line} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
            <defs>
              <linearGradient id="ga1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ga2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Area type="monotone" dataKey="actual" stroke="#3b82f6" fill="url(#ga1)" strokeWidth={2} name="ค่าจริง" />
            <Area type="monotone" dataKey="budget" stroke="#10b981" fill="url(#ga2)" strokeWidth={2} name="เป้าหมาย" />
          </AreaChart>
        </ResponsiveContainer>
      )}
      {chart.type === "radar" && (
        <ResponsiveContainer width="100%" height={200}>
          <RadarChart data={topicData.bar} cx="50%" cy="50%" outerRadius={75}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="name" tick={{ fontSize: 10 }} />
            <Radar name="ค่าจริง" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            <Radar name="เปรียบเทียบ" dataKey="value2" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SelfService() {
  // Filter state
  const [selectedTopic, setSelectedTopic] = useState("การเงิน");
  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [startMonth, setStartMonth] = useState("2567-01");
  const [endMonth, setEndMonth] = useState("2567-08");
  const [selectedHospitalType, setSelectedHospitalType] = useState("ทั้งหมด");
  const [selectedRegion, setSelectedRegion] = useState("ทั้งหมด");

  // Chart builder state
  const [reportKey, setReportKey] = useState(0);
  const [charts, setCharts] = useState([
    { id: 1, type: "bar", title: "กราฟแท่ง — ภาพรวมข้อมูล" },
    { id: 2, type: "line", title: "กราฟเส้น — แนวโน้มรายเดือน" },
  ]);
  const [addChartType, setAddChartType] = useState("bar");

  // Alert & Schedule (right panel) state
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [alertMetric, setAlertMetric] = useState(ALERT_METRICS[0]);
  const [alertOperator, setAlertOperator] = useState(">");
  const [alertValue, setAlertValue] = useState("");
  const [alertChannel, setAlertChannel] = useState({ email: true, system: true });

  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleFreq, setScheduleFreq] = useState("รายสัปดาห์");
  const [scheduleEmail, setScheduleEmail] = useState("");

  const [saveStatus, setSaveStatus] = useState(null); // null | 'success' | 'error'
  const [scheduledList, setScheduledList] = useState(scheduledReports);

  const handleProvinceToggle = p =>
    setSelectedProvinces(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  const handleReset = () => {
    setSelectedTopic("การเงิน"); setSelectedProvinces([]);
    setStartMonth("2567-01"); setEndMonth("2567-08");
    setSelectedHospitalType("ทั้งหมด"); setSelectedRegion("ทั้งหมด");
  };

  const handleBuildReport = () => setReportKey(k => k + 1);

  const handleAddChart = () => {
    const titles = { bar: "กราฟแท่ง", line: "กราฟเส้น", pie: "กราฟวงกลม", area: "กราฟพื้นที่", radar: "กราฟเรดาร์" };
    setCharts(prev => [...prev, { id: Date.now(), type: addChartType, title: `${titles[addChartType]} — ${selectedTopic}` }]);
  };

  const handleSave = () => {
    if (scheduleEnabled && !scheduleEmail.trim()) {
      setSaveStatus("error");
      return;
    }
    const freqLabel = { รายวัน: "วัน", รายสัปดาห์: "สัปดาห์", รายเดือน: "เดือน" };
    if (scheduleEnabled) {
      setScheduledList(prev => [{
        id: Date.now(),
        title: `รายงาน${selectedTopic} — ${selectedTopic}`,
        frequency: scheduleFreq,
        nextRun: "พรุ่งนี้",
        recipients: [scheduleEmail],
        format: "PDF",
        status: "ใช้งาน",
      }, ...prev]);
    }
    setSaveStatus("success");
    setTimeout(() => setSaveStatus(null), 4000);
  };

  const channels = [
    { key: "email", label: "อีเมล", icon: Mail },
    { key: "system", label: "แจ้งเตือนในระบบ", icon: Bell },
  ];

  return (
    <div className="flex flex-col gap-0 h-full">
      {/* ─── Page Header ────────────────────────────────────────────────────── */}
      <div className="px-6 py-4 border-b border-gray-100 bg-white flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">สร้างรายงาน</h1>
          <p className="text-xs text-gray-400 mt-0.5">Self-Service Analytics — กรองข้อมูล สร้างกราฟ และตั้งค่าการแจ้งเตือน</p>
        </div>
        {saveStatus === "success" && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-medium px-3 py-2 rounded-xl">
            <CheckCircle2 size={14} />
            บันทึกการตั้งค่าเรียบร้อยแล้ว
          </div>
        )}
        {saveStatus === "error" && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-3 py-2 rounded-xl">
            <AlertTriangle size={14} />
            กรุณากรอกอีเมลผู้รับ
          </div>
        )}
      </div>

      {/* ─── 3-Panel Layout ─────────────────────────────────────────────────── */}
      <div className="flex flex-1 gap-0 min-h-0 overflow-hidden">

        {/* LEFT: Filters */}
        <aside className="w-60 flex-shrink-0 border-r border-gray-100 bg-white overflow-y-auto p-4 flex flex-col gap-4">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">ตัวกรองข้อมูล</p>

            <label className="block text-xs font-medium text-gray-600 mb-1">หัวข้อ</label>
            <select value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20 bg-white mb-3">
              <option>การเงิน</option><option>พัสดุ</option><option>การรับรอง</option><option>นโยบาย</option>
            </select>

            <label className="block text-xs font-medium text-gray-600 mb-1">ภาค</label>
            <select value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20 bg-white mb-3">
              <option>ทั้งหมด</option><option>เหนือ</option><option>กลาง</option>
              <option>อีสาน</option><option>ใต้</option><option>ตะวันตก</option><option>กทม.</option>
            </select>

            <label className="block text-xs font-medium text-gray-600 mb-1">ประเภทโรงพยาบาล</label>
            <select value={selectedHospitalType} onChange={e => setSelectedHospitalType(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20 bg-white mb-3">
              <option>ทั้งหมด</option><option>รพ.ทั่วไป</option><option>รพ.ชุมชน</option><option>รพ.เอกชน</option>
            </select>

            <label className="block text-xs font-medium text-gray-600 mb-1">ช่วงเวลา</label>
            <div className="flex gap-2 mb-3">
              <input type="month" value={startMonth} onChange={e => setStartMonth(e.target.value)}
                className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20" />
              <input type="month" value={endMonth} onChange={e => setEndMonth(e.target.value)}
                className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20" />
            </div>

            <label className="block text-xs font-medium text-gray-600 mb-1.5">จังหวัด</label>
            <div className="space-y-1 max-h-36 overflow-y-auto pr-0.5 mb-4">
              {PROVINCES.map(p => (
                <label key={p} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={selectedProvinces.includes(p)} onChange={() => handleProvinceToggle(p)}
                    className="w-3.5 h-3.5 rounded border-gray-300 text-[#0D5C8F] focus:ring-[#0D5C8F]/20" />
                  <span className="text-xs text-gray-600">{p}</span>
                </label>
              ))}
            </div>
            {selectedProvinces.length > 0 && (
              <p className="text-[11px] text-[#0D5C8F] mb-2">เลือก {selectedProvinces.length} จังหวัด</p>
            )}
          </div>

          <div className="flex flex-col gap-2 mt-auto">
            <button onClick={handleBuildReport}
              className="w-full bg-[#0D5C8F] hover:bg-[#0a4a73] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
              <BarChart2 size={15} />
              สร้างรายงาน
            </button>
            <button onClick={handleReset}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium text-sm py-2 rounded-xl transition-colors flex items-center justify-center gap-2">
              <RefreshCw size={14} />
              รีเซ็ต
            </button>
          </div>

          {/* Active filter badge */}
          <div className="bg-[#0D5C8F]/5 rounded-xl p-3 text-[11px] space-y-1 border border-[#0D5C8F]/10">
            <p className="font-semibold text-[#0D5C8F] mb-1.5">ตัวกรองที่ใช้</p>
            <p className="text-gray-600">หัวข้อ: <span className="font-medium text-gray-800">{selectedTopic}</span></p>
            <p className="text-gray-600">ภาค: <span className="font-medium text-gray-800">{selectedRegion}</span></p>
            <p className="text-gray-600">ประเภท: <span className="font-medium text-gray-800">{selectedHospitalType}</span></p>
            <p className="text-gray-600">ช่วงเวลา: <span className="font-medium text-gray-800">{startMonth} – {endMonth}</span></p>
          </div>
        </aside>

        {/* CENTER: Chart Builder */}
        <main className="flex-1 overflow-y-auto bg-[#F0F4F8] p-4 flex flex-col gap-4 min-w-0">
          {/* Add chart row */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">เพิ่มกราฟ:</span>
              <select value={addChartType} onChange={e => setAddChartType(e.target.value)}
                className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20">
                <option value="bar">Bar — แท่ง</option>
                <option value="line">Line — เส้น</option>
                <option value="pie">Pie — วงกลม</option>
                <option value="area">Area — พื้นที่</option>
                <option value="radar">Radar — เรดาร์</option>
              </select>
              <button onClick={handleAddChart}
                className="flex items-center gap-1.5 bg-[#0D5C8F] hover:bg-[#0a4a73] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                <Plus size={13} />
                เพิ่มกราฟ
              </button>
              {reportKey > 0 && (
                <span className="ml-auto text-[11px] bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                  ✓ อัปเดตแล้ว #{reportKey}
                </span>
              )}
            </div>
          </div>

          {/* Charts canvas */}
          {charts.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center py-20 text-center">
              <BarChart2 size={36} className="text-gray-300 mb-3" />
              <p className="text-sm text-gray-400 font-medium">ยังไม่มีกราฟ</p>
              <p className="text-xs text-gray-400 mt-1">กด "เพิ่มกราฟ" ด้านบน</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {charts.map(chart => (
                <ChartCard key={`${chart.id}-${reportKey}`} chart={chart}
                  onDelete={() => setCharts(prev => prev.filter(c => c.id !== chart.id))}
                  topic={selectedTopic} reportKey={reportKey} />
              ))}
            </div>
          )}

          {/* Summary strip */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">สรุปข้อมูล</p>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "โรงพยาบาลทั้งหมด", value: "1,247" },
                { label: "ตรงเงื่อนไข", value: "863" },
                { label: "ช่วงเวลา (เดือน)", value: "8" },
                { label: "ค่าเฉลี่ยรวม", value: "84.2%" },
              ].map(item => (
                <div key={item.label} className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-base font-bold text-[#0D5C8F]">{item.value}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* RIGHT: Alert & Schedule */}
        <aside className="w-64 flex-shrink-0 border-l border-gray-100 bg-white overflow-y-auto flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">ส่งออกและแจ้งเตือน</p>
          </div>

          <div className="flex-1 p-4 flex flex-col gap-5">
            {/* Export */}
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1.5">
                <Download size={13} className="text-gray-400" />
                ส่งออกรายงาน
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => alert("กำลังส่งออก PDF...")}
                  className="flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs py-2 rounded-lg border border-red-100 transition-colors">
                  <FileText size={13} />
                  PDF
                </button>
                <button onClick={() => alert("กำลังส่งออก CSV...")}
                  className="flex items-center justify-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-600 font-semibold text-xs py-2 rounded-lg border border-green-100 transition-colors">
                  <Download size={13} />
                  CSV
                </button>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Alert condition */}
            <div className="space-y-3">
              <Toggle
                enabled={alertEnabled}
                onChange={setAlertEnabled}
                label="เปิดการแจ้งเตือน"
                description="แจ้งเตือนเมื่อข้อมูลถึงเกณฑ์ที่กำหนด"
              />

              {alertEnabled && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 space-y-2.5">
                  <p className="text-[11px] font-semibold text-amber-700 flex items-center gap-1">
                    <Bell size={11} />
                    เงื่อนไข
                  </p>
                  <div className="space-y-2">
                    <div>
                      <label className="text-[10px] text-gray-500 block mb-1">ตัวชี้วัด</label>
                      <select value={alertMetric} onChange={e => setAlertMetric(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-amber-200">
                        {ALERT_METRICS.map(m => <option key={m}>{m}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <select value={alertOperator} onChange={e => setAlertOperator(e.target.value)}
                        className="w-16 border border-gray-200 rounded-lg px-2 py-1.5 text-xs bg-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-200">
                        <option>{">"}</option><option>{"<"}</option>
                        <option>{"="}</option><option>{">="}</option><option>{"<="}</option>
                      </select>
                      <input type="number" value={alertValue} onChange={e => setAlertValue(e.target.value)}
                        placeholder="ค่าเกณฑ์" className="flex-1 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-200" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 block mb-1.5">แจ้งเตือนผ่าน</label>
                    <div className="space-y-1.5">
                      {channels.map(ch => (
                        <label key={ch.key} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={alertChannel[ch.key]}
                            onChange={() => setAlertChannel(prev => ({ ...prev, [ch.key]: !prev[ch.key] }))}
                            className="w-3.5 h-3.5 rounded border-gray-300 text-[#0D5C8F] focus:ring-[#0D5C8F]/20" />
                          <ch.icon size={11} className="text-gray-400" />
                          <span className="text-xs text-gray-600">{ch.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100" />

            {/* Auto schedule */}
            <div className="space-y-3">
              <Toggle
                enabled={scheduleEnabled}
                onChange={setScheduleEnabled}
                label="ส่งออกอัตโนมัติ"
                description="ส่งรายงานทางอีเมลตามกำหนด"
              />

              {scheduleEnabled && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 space-y-2.5">
                  <p className="text-[11px] font-semibold text-blue-700 flex items-center gap-1">
                    <Calendar size={11} />
                    กำหนดการส่ง
                  </p>
                  <div>
                    <label className="text-[10px] text-gray-500 block mb-1">ความถี่</label>
                    <div className="flex gap-1">
                      {["รายวัน", "รายสัปดาห์", "รายเดือน"].map(f => (
                        <button key={f} onClick={() => setScheduleFreq(f)}
                          className={`flex-1 py-1.5 text-[11px] font-medium rounded-lg transition-colors border ${
                            scheduleFreq === f
                              ? "bg-[#0D5C8F] text-white border-[#0D5C8F]"
                              : "bg-white text-gray-500 border-gray-200 hover:border-[#0D5C8F]/40"
                          }`}>
                          {f.replace("ราย", "")}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 block mb-1">อีเมลผู้รับ</label>
                    <input type="email" value={scheduleEmail} onChange={e => setScheduleEmail(e.target.value)}
                      placeholder="example@hai.go.th"
                      className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder-gray-300" />
                  </div>
                </div>
              )}
            </div>

            {/* Save button */}
            {(alertEnabled || scheduleEnabled) && (
              <button onClick={handleSave}
                className="w-full bg-[#0D5C8F] hover:bg-[#0a4a73] text-white font-semibold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm">
                <Save size={13} />
                บันทึกการตั้งค่า
              </button>
            )}
          </div>
        </aside>
      </div>

      {/* ─── Scheduled Reports Table ──────────────────────────────────────────── */}
      <div className="border-t border-gray-100 bg-white px-6 py-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={14} className="text-[#0D5C8F]" />
          <h3 className="text-sm font-semibold text-gray-800">รายงานอัตโนมัติที่ตั้งไว้</h3>
          <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
            {scheduledList.filter(s => s.status === "ใช้งาน").length} ใช้งาน
          </span>
        </div>

        {scheduledList.length === 0 ? (
          <p className="text-xs text-gray-400 py-3">ยังไม่มีรายงานอัตโนมัติ — ตั้งค่าด้านบนแล้วกด "บันทึกการตั้งค่า"</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 px-3 text-gray-400 font-medium">ชื่อรายงาน</th>
                  <th className="text-left py-2 px-3 text-gray-400 font-medium">ความถี่</th>
                  <th className="text-left py-2 px-3 text-gray-400 font-medium">ครั้งต่อไป</th>
                  <th className="text-left py-2 px-3 text-gray-400 font-medium">ผู้รับ</th>
                  <th className="text-center py-2 px-3 text-gray-400 font-medium">รูปแบบ</th>
                  <th className="text-center py-2 px-3 text-gray-400 font-medium">สถานะ</th>
                  <th className="py-2 px-3" />
                </tr>
              </thead>
              <tbody>
                {scheduledList.map(sr => (
                  <tr key={sr.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-gray-800">{sr.title}</td>
                    <td className="py-2.5 px-3 text-gray-500">{sr.frequency}</td>
                    <td className="py-2.5 px-3 text-gray-500">{sr.nextRun}</td>
                    <td className="py-2.5 px-3 text-gray-500">{sr.recipients?.join(", ") || "—"}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{sr.format}</span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full font-medium ${sr.status === "ใช้งาน" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {sr.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button onClick={() => setScheduledList(prev => prev.filter(x => x.id !== sr.id))}
                        className="text-gray-300 hover:text-red-400 transition-colors p-1">
                        <X size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
