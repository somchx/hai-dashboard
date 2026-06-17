import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  BarChart2,
  FileText,
  Download,
  Mail,
  Clock,
  Plus,
  X,
  RefreshCw,
  Settings,
  Save,
  Search,
  Share2,
  MessageSquare,
  Send,
  Calendar,
  DollarSign,
  ShoppingCart,
  Award,
  Shield,
} from "lucide-react";
import { reports, scheduledReports, mockComments } from "../data/mockReports";

// ─── Mock Data Sets ───────────────────────────────────────────────────────────

const MOCK_DATA = {
  การเงิน: {
    bar: [
      { name: "ม.ค.", value: 4200, value2: 3800 },
      { name: "ก.พ.", value: 3800, value2: 4100 },
      { name: "มี.ค.", value: 5100, value2: 4700 },
      { name: "เม.ย.", value: 4700, value2: 5200 },
      { name: "พ.ค.", value: 5900, value2: 5400 },
      { name: "มิ.ย.", value: 6200, value2: 5800 },
      { name: "ก.ค.", value: 5800, value2: 6100 },
      { name: "ส.ค.", value: 6500, value2: 6000 },
    ],
    barLabel: "รายรับ (ล้านบาท)",
    barTitle: "รายรับตามเดือน",
    line: [
      { name: "ม.ค.", actual: 4200, budget: 4000 },
      { name: "ก.พ.", actual: 3800, budget: 4000 },
      { name: "มี.ค.", actual: 5100, budget: 4500 },
      { name: "เม.ย.", actual: 4700, budget: 4500 },
      { name: "พ.ค.", actual: 5900, budget: 5000 },
      { name: "มิ.ย.", actual: 6200, budget: 5500 },
      { name: "ก.ค.", actual: 5800, budget: 5500 },
      { name: "ส.ค.", actual: 6500, budget: 6000 },
    ],
    lineTitle: "แนวโน้มรายรับเทียบงบประมาณ",
  },
  พัสดุ: {
    bar: [
      { name: "เวชภัณฑ์", value: 8200, value2: 7600 },
      { name: "ครุภัณฑ์", value: 5400, value2: 4900 },
      { name: "วัสดุสิ้นเปลือง", value: 3100, value2: 2900 },
      { name: "บริการ", value: 4700, value2: 5100 },
      { name: "อาหาร", value: 2200, value2: 2400 },
      { name: "อื่นๆ", value: 1800, value2: 1600 },
    ],
    barLabel: "มูลค่าจัดซื้อ (พันบาท)",
    barTitle: "มูลค่าการจัดซื้อตามหมวดหมู่",
    line: [
      { name: "ม.ค.", actual: 6200, budget: 7000 },
      { name: "ก.พ.", actual: 5800, budget: 7000 },
      { name: "มี.ค.", actual: 7400, budget: 7000 },
      { name: "เม.ย.", actual: 6900, budget: 7000 },
      { name: "พ.ค.", actual: 8100, budget: 7500 },
      { name: "มิ.ย.", actual: 7600, budget: 7500 },
      { name: "ก.ค.", actual: 8400, budget: 8000 },
      { name: "ส.ค.", actual: 7900, budget: 8000 },
    ],
    lineTitle: "แนวโน้มค่าใช้จ่ายพัสดุรายเดือน",
  },
  การรับรอง: {
    bar: [
      { name: "เหนือ", value: 72, value2: 68 },
      { name: "กลาง", value: 85, value2: 80 },
      { name: "อีสาน", value: 64, value2: 70 },
      { name: "ใต้", value: 78, value2: 74 },
      { name: "ตะวันตก", value: 69, value2: 65 },
      { name: "กทม.", value: 92, value2: 88 },
    ],
    barLabel: "คะแนนการรับรอง (%)",
    barTitle: "คะแนนการรับรองแยกตามภาค",
    line: [
      { name: "2562", actual: 68, budget: 70 },
      { name: "2563", actual: 71, budget: 72 },
      { name: "2564", actual: 74, budget: 75 },
      { name: "2565", actual: 79, budget: 78 },
      { name: "2566", actual: 83, budget: 80 },
      { name: "2567", actual: 85, budget: 85 },
    ],
    lineTitle: "แนวโน้มคะแนนการรับรองรายปี",
  },
  นโยบาย: {
    bar: [
      { name: "KPI 1", value: 88, value2: 82 },
      { name: "KPI 2", value: 74, value2: 79 },
      { name: "KPI 3", value: 91, value2: 87 },
      { name: "KPI 4", value: 65, value2: 70 },
      { name: "KPI 5", value: 82, value2: 85 },
      { name: "KPI 6", value: 95, value2: 90 },
    ],
    barLabel: "อัตราบรรลุ (%)",
    barTitle: "อัตราบรรลุเป้าหมาย KPI",
    line: [
      { name: "ม.ค.", actual: 78, budget: 80 },
      { name: "ก.พ.", actual: 80, budget: 80 },
      { name: "มี.ค.", actual: 83, budget: 82 },
      { name: "เม.ย.", actual: 81, budget: 82 },
      { name: "พ.ค.", actual: 86, budget: 84 },
      { name: "มิ.ย.", actual: 88, budget: 85 },
      { name: "ก.ค.", actual: 87, budget: 86 },
      { name: "ส.ค.", actual: 90, budget: 87 },
    ],
    lineTitle: "แนวโน้มการบรรลุนโยบายรายเดือน",
  },
};

const MOCK_DATA_ALT = {
  การเงิน: {
    bar: [
      { name: "ม.ค.", value: 3900, value2: 4100 },
      { name: "ก.พ.", value: 4200, value2: 3900 },
      { name: "มี.ค.", value: 4800, value2: 5000 },
      { name: "เม.ย.", value: 5100, value2: 4800 },
      { name: "พ.ค.", value: 5500, value2: 5700 },
      { name: "มิ.ย.", value: 6000, value2: 6200 },
      { name: "ก.ค.", value: 6300, value2: 5900 },
      { name: "ส.ค.", value: 6800, value2: 6400 },
    ],
    barLabel: "รายรับ (ล้านบาท)",
    barTitle: "รายรับตามเดือน (ชุดที่ 2)",
    line: [
      { name: "ม.ค.", actual: 3900, budget: 4200 },
      { name: "ก.พ.", actual: 4200, budget: 4200 },
      { name: "มี.ค.", actual: 4800, budget: 4600 },
      { name: "เม.ย.", actual: 5100, budget: 4600 },
      { name: "พ.ค.", actual: 5500, budget: 5200 },
      { name: "มิ.ย.", actual: 6000, budget: 5700 },
      { name: "ก.ค.", actual: 6300, budget: 5700 },
      { name: "ส.ค.", actual: 6800, budget: 6200 },
    ],
    lineTitle: "แนวโน้มรายรับเทียบงบประมาณ (ชุดที่ 2)",
  },
  พัสดุ: {
    bar: [
      { name: "เวชภัณฑ์", value: 7900, value2: 8100 },
      { name: "ครุภัณฑ์", value: 5800, value2: 5200 },
      { name: "วัสดุสิ้นเปลือง", value: 2900, value2: 3200 },
      { name: "บริการ", value: 5100, value2: 4800 },
      { name: "อาหาร", value: 2500, value2: 2300 },
      { name: "อื่นๆ", value: 1600, value2: 1900 },
    ],
    barLabel: "มูลค่าจัดซื้อ (พันบาท)",
    barTitle: "มูลค่าการจัดซื้อตามหมวดหมู่ (ชุดที่ 2)",
    line: [
      { name: "ม.ค.", actual: 6500, budget: 6800 },
      { name: "ก.พ.", actual: 6100, budget: 6800 },
      { name: "มี.ค.", actual: 7700, budget: 7200 },
      { name: "เม.ย.", actual: 7200, budget: 7200 },
      { name: "พ.ค.", actual: 8400, budget: 7800 },
      { name: "มิ.ย.", actual: 7900, budget: 7800 },
      { name: "ก.ค.", actual: 8700, budget: 8300 },
      { name: "ส.ค.", actual: 8200, budget: 8300 },
    ],
    lineTitle: "แนวโน้มค่าใช้จ่ายพัสดุรายเดือน (ชุดที่ 2)",
  },
  การรับรอง: {
    bar: [
      { name: "เหนือ", value: 75, value2: 71 },
      { name: "กลาง", value: 88, value2: 83 },
      { name: "อีสาน", value: 67, value2: 72 },
      { name: "ใต้", value: 81, value2: 77 },
      { name: "ตะวันตก", value: 72, value2: 68 },
      { name: "กทม.", value: 94, value2: 91 },
    ],
    barLabel: "คะแนนการรับรอง (%)",
    barTitle: "คะแนนการรับรองแยกตามภาค (ชุดที่ 2)",
    line: [
      { name: "2562", actual: 70, budget: 72 },
      { name: "2563", actual: 73, budget: 74 },
      { name: "2564", actual: 76, budget: 77 },
      { name: "2565", actual: 81, budget: 80 },
      { name: "2566", actual: 85, budget: 82 },
      { name: "2567", actual: 88, budget: 87 },
    ],
    lineTitle: "แนวโน้มคะแนนการรับรองรายปี (ชุดที่ 2)",
  },
  นโยบาย: {
    bar: [
      { name: "KPI 1", value: 90, value2: 85 },
      { name: "KPI 2", value: 77, value2: 81 },
      { name: "KPI 3", value: 93, value2: 89 },
      { name: "KPI 4", value: 68, value2: 73 },
      { name: "KPI 5", value: 85, value2: 88 },
      { name: "KPI 6", value: 97, value2: 93 },
    ],
    barLabel: "อัตราบรรลุ (%)",
    barTitle: "อัตราบรรลุเป้าหมาย KPI (ชุดที่ 2)",
    line: [
      { name: "ม.ค.", actual: 80, budget: 82 },
      { name: "ก.พ.", actual: 82, budget: 82 },
      { name: "มี.ค.", actual: 85, budget: 84 },
      { name: "เม.ย.", actual: 83, budget: 84 },
      { name: "พ.ค.", actual: 88, budget: 86 },
      { name: "มิ.ย.", actual: 90, budget: 87 },
      { name: "ก.ค.", actual: 89, budget: 88 },
      { name: "ส.ค.", actual: 92, budget: 89 },
    ],
    lineTitle: "แนวโน้มการบรรลุนโยบายรายเดือน (ชุดที่ 2)",
  },
};

const PROVINCES = [
  "กรุงเทพฯ",
  "เชียงใหม่",
  "ขอนแก่น",
  "นครราชสีมา",
  "สงขลา",
  "ระยอง",
  "ภูเก็ต",
  "อุดรธานี",
  "เชียงราย",
  "สุราษฎร์ธานี",
];

const SAVED_REPORTS = [
  {
    id: 1,
    name: "รายงานการเงิน Q2/2567",
    topic: "การเงิน",
    lastRun: "10 มิ.ย. 2567",
  },
  {
    id: 2,
    name: "การจัดซื้อเวชภัณฑ์ภาคเหนือ",
    topic: "พัสดุ",
    lastRun: "5 มิ.ย. 2567",
  },
  {
    id: 3,
    name: "ผลการรับรอง รพ.ชุมชน",
    topic: "การรับรอง",
    lastRun: "1 มิ.ย. 2567",
  },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

const categoryColors = {
  'การเงิน': 'bg-blue-100 text-blue-700',
  'พัสดุ': 'bg-teal-100 text-teal-700',
  'การรับรอง': 'bg-green-100 text-green-700',
  'นโยบาย': 'bg-purple-100 text-purple-700',
};
const categoryIcons = {
  'การเงิน': DollarSign,
  'พัสดุ': ShoppingCart,
  'การรับรอง': Award,
  'นโยบาย': Shield,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ChartCard({ chart, onDelete, topic, reportKey }) {
  const [title, setTitle] = useState(chart.title);
  const useAlt = reportKey % 2 === 1;
  const dataSet = useAlt ? MOCK_DATA_ALT : MOCK_DATA;
  const topicData = dataSet[topic] || dataSet["การเงิน"];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <div className="flex items-center gap-2 mb-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 text-sm font-semibold text-gray-700 border border-transparent hover:border-gray-300 focus:border-blue-400 focus:outline-none rounded px-2 py-1 bg-transparent"
        />
        <button
          onClick={onDelete}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="ลบกราฟ"
        >
          <X size={16} />
        </button>
      </div>

      {chart.type === "bar" && (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={topicData.bar} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
              formatter={(val) => [val.toLocaleString(), topicData.barLabel]}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} name={topicData.barLabel} />
            <Bar dataKey="value2" fill="#10b981" radius={[4, 4, 0, 0]} name="เปรียบเทียบ" />
          </BarChart>
        </ResponsiveContainer>
      )}

      {chart.type === "line" && (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={topicData.line} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="ค่าจริง"
            />
            <Line
              type="monotone"
              dataKey="budget"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3 }}
              name="เป้าหมาย"
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      {chart.type === "pie" && (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={topicData.bar}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {topicData.bar.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
          </PieChart>
        </ResponsiveContainer>
      )}

      {chart.type === "area" && (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={topicData.line} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#3b82f6"
              fill="url(#colorActual)"
              strokeWidth={2}
              name="ค่าจริง"
            />
            <Area
              type="monotone"
              dataKey="budget"
              stroke="#10b981"
              fill="url(#colorBudget)"
              strokeWidth={2}
              name="เป้าหมาย"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}

      {chart.type === "radar" && (
        <ResponsiveContainer width="100%" height={220}>
          <RadarChart data={topicData.bar} cx="50%" cy="50%" outerRadius={80}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
            <Radar
              name="ค่าจริง"
              dataKey="value"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.3}
            />
            <Radar
              name="เปรียบเทียบ"
              dataKey="value2"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.2}
            />
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
  const [addXAxis, setAddXAxis] = useState("เดือน");
  const [addYAxis, setAddYAxis] = useState("มูลค่า");

  // Schedule state
  const [scheduleFreq, setScheduleFreq] = useState("รายสัปดาห์");
  const [scheduleEmail, setScheduleEmail] = useState("");
  const [scheduleMsg, setScheduleMsg] = useState("");

  const freqLabel = {
    รายวัน: "วัน",
    รายสัปดาห์: "สัปดาห์",
    รายเดือน: "เดือน",
  };

  const handleProvinceToggle = (province) => {
    setSelectedProvinces((prev) =>
      prev.includes(province) ? prev.filter((p) => p !== province) : [...prev, province]
    );
  };

  const handleReset = () => {
    setSelectedTopic("การเงิน");
    setSelectedProvinces([]);
    setStartMonth("2567-01");
    setEndMonth("2567-08");
    setSelectedHospitalType("ทั้งหมด");
    setSelectedRegion("ทั้งหมด");
  };

  const handleBuildReport = () => {
    setReportKey((prev) => prev + 1);
  };

  const handleDeleteChart = (id) => {
    setCharts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddChart = () => {
    alert(`เพิ่มกราฟ: ${addChartType} | แกน X: ${addXAxis} | แกน Y: ${addYAxis}`);
  };

  const handleSetSchedule = () => {
    if (!scheduleEmail.trim()) {
      alert("กรุณากรอกอีเมลผู้รับ");
      return;
    }
    setScheduleMsg(
      `ตั้งค่าแล้ว ระบบจะส่งรายงานให้ทุก${freqLabel[scheduleFreq] || scheduleFreq}`
    );
  };

  // Reports section state
  const [reportSearch, setReportSearch] = useState('');
  const [reportCategory, setReportCategory] = useState('ทั้งหมด');
  const [commentReport, setCommentReport] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [commentsByReport, setCommentsByReport] = useState(mockComments);

  const reportCategories = ['ทั้งหมด', 'การเงิน', 'พัสดุ', 'การรับรอง', 'นโยบาย'];
  const filteredReports = reports.filter(r =>
    (reportCategory === 'ทั้งหมด' || r.category === reportCategory) &&
    (reportSearch === '' || r.title.toLowerCase().includes(reportSearch.toLowerCase()))
  );
  const getComments = (id) => commentsByReport[id] || [];
  const addComment = (reportId) => {
    if (!newComment.trim()) return;
    setCommentsByReport(prev => ({
      ...prev,
      [reportId]: [...(prev[reportId] || []), { id: Date.now(), author: 'นายแพทย์ สมชาย ใจดี', time: 'เมื่อสักครู่', text: newComment.trim() }]
    }));
    setNewComment('');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ─── Builder Section Header ───────────────────────────────────────── */}
      <div className="px-4 pt-4">
        <h1 className="text-xl font-bold text-gray-900">สร้างรายงาน</h1>
        <p className="text-sm text-gray-500 mt-0.5">Self-Service Analytics — สร้างและจัดการรายงานด้วยตนเอง</p>
      </div>

      {/* ─── 3-Panel Builder ──────────────────────────────────────────────── */}
      <div className="flex gap-4 px-4 min-h-[600px]">
      {/* ─── Left Panel: Filters ──────────────────────────────────────────── */}
      <aside className="w-[280px] flex-shrink-0 flex flex-col gap-4 overflow-y-auto">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-2 mb-4">
            <Settings size={16} className="text-blue-500" />
            <h2 className="text-sm font-bold text-gray-700">ตัวกรองข้อมูล</h2>
          </div>

          {/* Topic */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              เลือกหัวข้อ
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
            >
              <option>การเงิน</option>
              <option>พัสดุ</option>
              <option>การรับรอง</option>
              <option>นโยบาย</option>
            </select>
          </div>

          {/* Provinces */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              จังหวัด
            </label>
            <div className="grid grid-cols-1 gap-1 max-h-48 overflow-y-auto pr-1">
              {PROVINCES.map((prov) => (
                <label key={prov} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedProvinces.includes(prov)}
                    onChange={() => handleProvinceToggle(prov)}
                    className="w-3.5 h-3.5 text-blue-500 rounded border-gray-300 focus:ring-blue-300"
                  />
                  <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">
                    {prov}
                  </span>
                </label>
              ))}
            </div>
            {selectedProvinces.length > 0 && (
              <p className="text-xs text-blue-500 mt-1">เลือก {selectedProvinces.length} จังหวัด</p>
            )}
          </div>

          {/* Date Range */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              ช่วงเวลา
            </label>
            <div className="flex flex-col gap-2">
              <div>
                <span className="text-xs text-gray-400 mb-0.5 block">เริ่มต้น</span>
                <input
                  type="month"
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <span className="text-xs text-gray-400 mb-0.5 block">สิ้นสุด</span>
                <input
                  type="month"
                  value={endMonth}
                  onChange={(e) => setEndMonth(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
          </div>

          {/* Hospital Type */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              ประเภทโรงพยาบาล
            </label>
            <select
              value={selectedHospitalType}
              onChange={(e) => setSelectedHospitalType(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
            >
              <option>ทั้งหมด</option>
              <option>รพ.ทั่วไป</option>
              <option>รพ.ชุมชน</option>
              <option>รพ.เอกชน</option>
            </select>
          </div>

          {/* Region */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              ภาค
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
            >
              <option>ทั้งหมด</option>
              <option>เหนือ</option>
              <option>กลาง</option>
              <option>อีสาน</option>
              <option>ใต้</option>
              <option>ตะวันตก</option>
              <option>กทม.</option>
            </select>
          </div>

          {/* Action Buttons */}
          <button
            onClick={handleBuildReport}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors shadow-sm mb-2 flex items-center justify-center gap-2"
          >
            <BarChart2 size={15} />
            สร้างรายงาน
          </button>
          <button
            onClick={handleReset}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={15} />
            รีเซ็ต
          </button>
        </div>

        {/* Active Filter Summary */}
        <div className="bg-blue-50 rounded-xl border border-blue-100 p-3">
          <p className="text-xs font-semibold text-blue-600 mb-2">ตัวกรองที่ใช้งาน</p>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-blue-700">หัวข้อ: {selectedTopic}</span>
            <span className="text-xs text-blue-700">ประเภท รพ.: {selectedHospitalType}</span>
            <span className="text-xs text-blue-700">ภาค: {selectedRegion}</span>
            {selectedProvinces.length > 0 && (
              <span className="text-xs text-blue-700">
                จังหวัด: {selectedProvinces.slice(0, 2).join(", ")}
                {selectedProvinces.length > 2 && ` +${selectedProvinces.length - 2}`}
              </span>
            )}
            <span className="text-xs text-blue-700">
              ช่วงเวลา: {startMonth} — {endMonth}
            </span>
          </div>
        </div>
      </aside>

      {/* ─── Center Panel: Chart Builder ──────────────────────────────────── */}
      <main className="flex-1 flex flex-col gap-4 overflow-y-auto min-w-0">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 size={16} className="text-blue-500" />
            <h2 className="text-sm font-bold text-gray-700">ตัวสร้างรายงาน</h2>
            {reportKey > 0 && (
              <span className="ml-auto text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">
                อัปเดตแล้ว #{reportKey}
              </span>
            )}
          </div>

          {/* Add Chart Row */}
          <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500 font-medium whitespace-nowrap">ประเภทกราฟ:</span>
              <select
                value={addChartType}
                onChange={(e) => setAddChartType(e.target.value)}
                className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
              >
                <option value="bar">Bar</option>
                <option value="line">Line</option>
                <option value="pie">Pie</option>
                <option value="area">Area</option>
                <option value="radar">Radar</option>
              </select>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500 font-medium whitespace-nowrap">แกน X:</span>
              <select
                value={addXAxis}
                onChange={(e) => setAddXAxis(e.target.value)}
                className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
              >
                <option>เดือน</option>
                <option>หน่วยงาน</option>
                <option>จังหวัด</option>
                <option>ประเภท</option>
              </select>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500 font-medium whitespace-nowrap">แกน Y:</span>
              <select
                value={addYAxis}
                onChange={(e) => setAddYAxis(e.target.value)}
                className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
              >
                <option>มูลค่า</option>
                <option>จำนวน</option>
                <option>คะแนน</option>
                <option>อัตรา</option>
              </select>
            </div>
            <button
              onClick={handleAddChart}
              className="ml-auto flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-sm"
            >
              <Plus size={13} />
              เพิ่มกราฟ
            </button>
          </div>
        </div>

        {/* Chart Canvas */}
        {charts.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 flex flex-col items-center justify-center text-center">
            <BarChart2 size={40} className="text-gray-300 mb-3" />
            <p className="text-sm text-gray-400 font-medium">ไม่มีกราฟในขณะนี้</p>
            <p className="text-xs text-gray-400 mt-1">กด "เพิ่มกราฟ" เพื่อสร้างกราฟใหม่</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {charts.map((chart) => (
              <ChartCard
                key={`${chart.id}-${reportKey}`}
                chart={chart}
                onDelete={() => handleDeleteChart(chart.id)}
                topic={selectedTopic}
                reportKey={reportKey}
              />
            ))}
          </div>
        )}

        {/* Data Summary Strip */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
            สรุปข้อมูลจากตัวกรอง
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "โรงพยาบาลทั้งหมด", value: "1,247" },
              { label: "ข้อมูลที่ตรงเงื่อนไข", value: "863" },
              { label: "ช่วงเวลา (เดือน)", value: "8" },
              { label: "ค่าเฉลี่ยรวม", value: "84.2%" },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-blue-600">{item.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ─── Right Panel: Export & Schedule ──────────────────────────────── */}
      <aside className="w-[220px] flex-shrink-0 flex flex-col gap-4 overflow-y-auto">
        {/* Export */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <Download size={15} className="text-blue-500" />
            <h3 className="text-xs font-bold text-gray-700">ส่งออกรายงาน</h3>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => alert("กำลังส่งออก PDF...")}
              className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs py-2.5 rounded-lg transition-colors border border-red-100"
            >
              <FileText size={14} />
              ส่งออก PDF
            </button>
            <button
              onClick={() => alert("กำลังส่งออก CSV...")}
              className="w-full flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-600 font-semibold text-xs py-2.5 rounded-lg transition-colors border border-green-100"
            >
              <Download size={14} />
              ส่งออก CSV
            </button>
          </div>
        </div>

        {/* Auto Schedule */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={15} className="text-blue-500" />
            <h3 className="text-xs font-bold text-gray-700">กำหนดการส่งอัตโนมัติ</h3>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">ความถี่</label>
              <select
                value={scheduleFreq}
                onChange={(e) => setScheduleFreq(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
              >
                <option>รายวัน</option>
                <option>รายสัปดาห์</option>
                <option>รายเดือน</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">อีเมลผู้รับ</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={scheduleEmail}
                onChange={(e) => setScheduleEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-300"
              />
            </div>
            <button
              onClick={handleSetSchedule}
              className="w-full flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 rounded-lg transition-colors shadow-sm"
            >
              <Mail size={13} />
              ตั้งค่าการส่งอัตโนมัติ
            </button>

            {scheduleMsg && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-2.5">
                <p className="text-xs text-green-700 font-medium leading-relaxed">{scheduleMsg}</p>
              </div>
            )}
          </div>
        </div>

        {/* Saved Reports */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <Save size={15} className="text-blue-500" />
            <h3 className="text-xs font-bold text-gray-700">รายงานที่บันทึกไว้</h3>
          </div>

          <div className="flex flex-col gap-2">
            {SAVED_REPORTS.map((report) => (
              <div
                key={report.id}
                className="bg-gray-50 rounded-lg border border-gray-100 p-3 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
              >
                <p className="text-xs font-semibold text-gray-700 leading-snug mb-1">
                  {report.name}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="inline-block text-[10px] bg-blue-100 text-blue-600 rounded px-1.5 py-0.5 font-medium mb-1">
                      {report.topic}
                    </span>
                    <p className="text-[10px] text-gray-400">{report.lastRun}</p>
                  </div>
                  <button
                    onClick={() => alert(`กำลังโหลดรายงาน: ${report.name}`)}
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 bg-white hover:bg-blue-50 border border-blue-200 rounded-md px-2 py-1 transition-colors"
                  >
                    โหลด
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-white">
          <p className="text-xs font-bold mb-3 opacity-90">สถิติการใช้งาน</p>
          <div className="flex flex-col gap-2">
            {[
              { label: "รายงานทั้งหมด", value: "47" },
              { label: "ส่งออกเดือนนี้", value: "12" },
              { label: "กราฟที่สร้าง", value: "89" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-xs opacity-75">{item.label}</span>
                <span className="text-sm font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
      </div>{/* end 3-panel */}

      {/* ─── Reports Section ──────────────────────────────────────────────── */}
      <div className="px-4 pb-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">รายงานทั้งหมด</h2>
            <p className="text-xs text-gray-400 mt-0.5">Reports Management — {reports.length} รายงาน</p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={reportSearch}
              onChange={e => setReportSearch(e.target.value)}
              placeholder="ค้นหารายงาน..."
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20 focus:border-[#0D5C8F] shadow-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {reportCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setReportCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  reportCategory === cat
                    ? 'bg-[#0D5C8F] text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0D5C8F]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Report Grid */}
        <div>
          <p className="text-xs text-gray-400 mb-3">แสดง {filteredReports.length} รายงาน</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredReports.map(report => {
              const Icon = categoryIcons[report.category] || BarChart2;
              const reportComments = getComments(report.id);
              return (
                <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <Icon size={16} className="text-gray-500" />
                      </div>
                      <span className={`badge text-[10px] ${categoryColors[report.category] || 'bg-gray-100 text-gray-600'}`}>
                        {report.category}
                      </span>
                    </div>
                    <span className="badge bg-gray-100 text-gray-500 text-[10px]">{report.format}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-2 leading-snug line-clamp-2">{report.title}</h3>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-3">
                    <Clock size={11} />
                    อัปเดต {report.lastUpdated}
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                    <span className="text-xs text-gray-400">{report.views} ครั้ง</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setCommentReport(commentReport === report.id ? null : report.id)}
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#0D5C8F] transition-colors p-1.5 rounded-lg hover:bg-blue-50"
                      >
                        <MessageSquare size={13} />
                        <span>{reportComments.length}</span>
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-[#0D5C8F] transition-colors" title="แชร์">
                        <Share2 size={13} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-[#0D5C8F] transition-colors" title="ดาวน์โหลด">
                        <Download size={13} />
                      </button>
                    </div>
                  </div>
                  {commentReport === report.id && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="space-y-2.5 max-h-40 overflow-y-auto mb-3">
                        {reportComments.length === 0 ? (
                          <p className="text-xs text-gray-400 text-center py-2">ยังไม่มีความคิดเห็น</p>
                        ) : (
                          reportComments.map(c => (
                            <div key={c.id} className="bg-gray-50 rounded-lg p-2.5">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-semibold text-gray-700">{c.author}</span>
                                <span className="text-[10px] text-gray-400">{c.time}</span>
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed">{c.text}</p>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newComment}
                          onChange={e => setNewComment(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && addComment(report.id)}
                          placeholder="เขียนความคิดเห็น..."
                          className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
                        />
                        <button
                          onClick={() => addComment(report.id)}
                          className="p-2 bg-[#0D5C8F] text-white rounded-lg hover:bg-[#0a4a73] transition-colors"
                        >
                          <Send size={12} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Scheduled Reports */}
        <div className="chart-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Calendar size={15} className="text-[#0D5C8F]" />
                รายงานอัตโนมัติ
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">ตั้งเวลาส่งรายงานอัตโนมัติ</p>
            </div>
            <button className="btn-primary text-xs">+ เพิ่มตารางรายงาน</button>
          </div>
          <div className="space-y-2">
            {scheduledReports.map(sr => (
              <div key={sr.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className={`p-2 rounded-lg ${sr.status === 'ใช้งาน' ? 'bg-green-100' : 'bg-gray-200'}`}>
                  <Clock size={14} className={sr.status === 'ใช้งาน' ? 'text-green-600' : 'text-gray-500'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{sr.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {sr.frequency} — ครั้งต่อไป: {sr.nextRun} — รับ: {sr.recipients.join(', ')}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="badge bg-blue-100 text-blue-700 text-[10px]">{sr.format}</span>
                  <span className={`badge text-[10px] ${sr.status === 'ใช้งาน' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {sr.status}
                  </span>
                  <button className="text-xs text-gray-400 hover:text-red-500 transition-colors p-1">
                    <X size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
