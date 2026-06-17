import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine
} from "recharts";
import {
  Award, MapPin, Users, Star, MessageCircle, Send,
  Download, ChevronDown, TrendingUp
} from "lucide-react";

const PRIMARY = "#0D5C8F";
const ACCENT = "#0EA5E9";

// ─────────────────────────── shared helpers ────────────────────────────────

function KpiCard({ title, value, sub, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
      <div className="rounded-full p-3" style={{ backgroundColor: color + "20" }}>
        <Icon size={24} style={{ color }} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold" style={{ color }}>{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function ExportDropdown() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium"
        style={{ backgroundColor: PRIMARY }}
      >
        <Download size={15} />
        ส่งออก
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 w-36">
          {["PDF", "CSV"].map((fmt) => (
            <button
              key={fmt}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
              onClick={() => { alert("กำลังส่งออกไฟล์..."); setOpen(false); }}
            >
              ส่งออก {fmt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SectionHeader({ title, children }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-semibold" style={{ color: PRIMARY }}>{title}</h2>
      {children}
    </div>
  );
}

// ─────────────────────────── date filter bar ───────────────────────────────

function DateFilterBar() {
  return (
    <div className="bg-white rounded-xl shadow px-5 py-3 flex flex-wrap items-center gap-4 mb-6">
      <span className="text-sm font-medium text-gray-600">ช่วงเวลา:</span>
      <select className="text-sm border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2" style={{ borderColor: ACCENT }}>
        {["2020", "2021", "2022", "2023", "2024", "2025"].map(y => <option key={y}>{y}</option>)}
      </select>
      <span className="text-gray-400">ถึง</span>
      <select className="text-sm border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2" style={{ borderColor: ACCENT }}>
        {["2020", "2021", "2022", "2023", "2024", "2025"].map(y => <option key={y} defaultValue={y === "2025"}>{y}</option>)}
      </select>
      <select className="text-sm border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2" style={{ borderColor: ACCENT }}>
        <option>ทุกภูมิภาค</option>
        <option>เหนือ</option>
        <option>กลาง</option>
        <option>อีสาน</option>
        <option>ใต้</option>
        <option>ตะวันตก</option>
        <option>กทม.</option>
      </select>
      <select className="text-sm border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2" style={{ borderColor: ACCENT }}>
        <option>ทุกประเภทโรงพยาบาล</option>
        <option>โรงพยาบาลศูนย์</option>
        <option>โรงพยาบาลทั่วไป</option>
        <option>โรงพยาบาลชุมชน</option>
      </select>
      <button
        className="ml-auto text-sm px-4 py-1.5 rounded-lg text-white font-medium"
        style={{ backgroundColor: ACCENT }}
      >
        กรอง
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  TAB 1 — การรับรอง HA
// ════════════════════════════════════════════════════════════════════════════

const certTrendData = [
  { year: "2020", certified: 265 },
  { year: "2021", certified: 285 },
  { year: "2022", certified: 302 },
  { year: "2023", certified: 318 },
  { year: "2024", certified: 338 },
];

const donutData = [
  { name: "ผ่านการรับรอง", value: 338, color: "#22C55E" },
  { name: "อยู่ระหว่างประเมิน", value: 78, color: ACCENT },
  { name: "หมดอายุ", value: 34, color: "#EF4444" },
];

const levelData = [
  { name: "Level 1", value: 120 },
  { name: "Level 2", value: 98 },
  { name: "Level 3", value: 75 },
  { name: "Advanced", value: 45 },
];

const regionData = [
  { name: "เหนือ", hospitals: 68, rate: 78, color: "#22C55E" },
  { name: "กลาง", hospitals: 89, rate: 82, color: "#16A34A" },
  { name: "อีสาน", hospitals: 112, rate: 71, color: "#EAB308" },
  { name: "ใต้", hospitals: 54, rate: 74, color: "#F59E0B" },
  { name: "ตะวันตก", hospitals: 28, rate: 86, color: "#10B981" },
  { name: "กทม.", hospitals: 34, rate: 88, color: ACCENT },
];

const forecastData = [
  { month: "ม.ค.", actual: 320, forecast: null },
  { month: "ก.พ.", actual: 322, forecast: null },
  { month: "มี.ค.", actual: 325, forecast: null },
  { month: "เม.ย.", actual: 327, forecast: null },
  { month: "พ.ค.", actual: 329, forecast: null },
  { month: "มิ.ย.", actual: 331, forecast: null },
  { month: "ก.ค.", actual: 333, forecast: null },
  { month: "ส.ค.", actual: 335, forecast: null },
  { month: "ก.ย.", actual: 336, forecast: null },
  { month: "ต.ค.", actual: 337, forecast: null },
  { month: "พ.ย.", actual: 338, forecast: null },
  { month: "ธ.ค.", actual: 338, forecast: 338 },
  { month: "ม.ค. 68", actual: null, forecast: 341 },
  { month: "ก.พ. 68", actual: null, forecast: 344 },
  { month: "มี.ค. 68", actual: null, forecast: 347 },
  { month: "เม.ย. 68", actual: null, forecast: 351 },
  { month: "พ.ค. 68", actual: null, forecast: 355 },
  { month: "มิ.ย. 68", actual: null, forecast: 360 },
];

const INITIAL_COMMENTS = [
  { id: 1, author: "นพ.สมชาย ใจดี", time: "10:32 น.", text: "แนวโน้มการรับรองปีนี้ดีขึ้นชัดเจน โดยเฉพาะภาคอีสานที่เพิ่มขึ้นถึง 8%" },
  { id: 2, author: "พญ.สุภา รักษ์สุข", time: "14:15 น.", text: "ควรเร่งติดตามโรงพยาบาลที่ใบรับรองหมดอายุ 34 แห่ง โดยเร่งด่วน" },
];

function TabHACert() {
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [commentInput, setCommentInput] = useState("");

  function addComment() {
    if (!commentInput.trim()) return;
    setComments(prev => [...prev, {
      id: Date.now(),
      author: "ผู้ใช้งาน",
      time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }) + " น.",
      text: commentInput.trim()
    }]);
    setCommentInput("");
  }

  return (
    <div className="space-y-6">
      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="รพ.ทั้งหมด" value="450" sub="แห่ง" icon={Award} color={PRIMARY} />
        <KpiCard title="ผ่านการรับรอง" value="338" sub="75% ของทั้งหมด" icon={Star} color="#22C55E" />
        <KpiCard title="อยู่ระหว่างประเมิน" value="78" sub="แห่ง" icon={TrendingUp} color={ACCENT} />
        <KpiCard title="หมดอายุ" value="34" sub="แห่ง" icon={Users} color="#EF4444" />
      </div>

      {/* Area Chart + Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-5">
          <SectionHeader title="แนวโน้มจำนวนโรงพยาบาลที่ผ่านการรับรอง (2020–2024)">
            <ExportDropdown />
          </SectionHeader>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={certTrendData}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={PRIMARY} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={PRIMARY} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis domain={[240, 360]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="certified" stroke={PRIMARY} strokeWidth={3} fill="url(#areaGrad)" name="รพ.ที่ผ่านการรับรอง" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <SectionHeader title="สถานะการรับรอง" />
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={donutData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3}>
                {donutData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Level BarChart + Region Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-5">
          <SectionHeader title="จำนวน รพ. แยกตามระดับการรับรอง">
            <ExportDropdown />
          </SectionHeader>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={levelData} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" name="จำนวน รพ." radius={[6, 6, 0, 0]}>
                {levelData.map((_, i) => (
                  <Cell key={i} fill={[PRIMARY, ACCENT, "#22C55E", "#F59E0B"][i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <SectionHeader title="แผนที่ภูมิภาค — อัตราการรับรอง">
            <span className="flex items-center gap-1 text-xs text-gray-400"><MapPin size={13} />6 ภูมิภาค</span>
          </SectionHeader>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {regionData.map(r => (
              <div
                key={r.name}
                className="rounded-xl p-4 text-white flex flex-col items-center justify-center text-center shadow-md"
                style={{ backgroundColor: r.color, minHeight: 100 }}
              >
                <p className="font-bold text-lg">{r.name}</p>
                <p className="text-2xl font-extrabold mt-1">{r.rate}%</p>
                <p className="text-xs opacity-80 mt-1">{r.hospitals} รพ.</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div className="bg-white rounded-xl shadow p-5">
        <SectionHeader title="การพยากรณ์จำนวนโรงพยาบาลที่ผ่านการรับรอง (12 เดือนย้อนหลัง + 6 เดือนคาดการณ์)">
          <ExportDropdown />
        </SectionHeader>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis domain={[310, 375]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <ReferenceLine x="ธ.ค." stroke="#CBD5E1" strokeDasharray="4 4" label={{ value: "ปัจจุบัน", position: "top", fontSize: 11 }} />
            <Line type="monotone" dataKey="actual" stroke={PRIMARY} strokeWidth={2.5} dot={{ r: 3 }} name="ข้อมูลจริง" connectNulls={false} />
            <Line type="monotone" dataKey="forecast" stroke="#F59E0B" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 3 }} name="คาดการณ์" connectNulls={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Comments */}
      <div className="bg-white rounded-xl shadow p-5">
        <SectionHeader title="ความคิดเห็น & บันทึก">
          <MessageCircle size={18} style={{ color: PRIMARY }} />
        </SectionHeader>
        <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-1">
          {comments.map(c => (
            <div key={c.id} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold" style={{ color: PRIMARY }}>{c.author}</span>
                <span className="text-xs text-gray-400">{c.time}</span>
              </div>
              <p className="text-sm text-gray-700">{c.text}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
            style={{ borderColor: "#CBD5E1" }}
            placeholder="เพิ่มความคิดเห็น..."
            value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addComment()}
          />
          <button
            onClick={addComment}
            className="px-4 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-1"
            style={{ backgroundColor: ACCENT }}
          >
            <Send size={14} />
            ส่ง
          </button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  TAB 2 — ผลประเมิน
// ════════════════════════════════════════════════════════════════════════════

const radarStandards = [
  { subject: "I-ENV", score: 82 },
  { subject: "I-GOV", score: 85 },
  { subject: "II-STF", score: 79 },
  { subject: "II-INFO", score: 84 },
  { subject: "II-ENV", score: 81 },
  { subject: "III-PTC", score: 88 },
  { subject: "III-MED", score: 86 },
  { subject: "III-NUR", score: 83 },
  { subject: "III-MED-SUPP", score: 80 },
  { subject: "III-IMD", score: 85 },
  { subject: "III-AMB", score: 78 },
  { subject: "IV-ORG", score: 90 },
];

const scoreDist = [
  { range: "60-70", count: 18 },
  { range: "70-80", count: 95 },
  { range: "80-90", count: 198 },
  { range: "90-100", count: 47 },
];

const scoreTrend = [
  { month: "ม.ค.", avg: 81.2 },
  { month: "ก.พ.", avg: 81.8 },
  { month: "มี.ค.", avg: 82.1 },
  { month: "เม.ย.", avg: 82.5 },
  { month: "พ.ค.", avg: 82.9 },
  { month: "มิ.ย.", avg: 83.0 },
  { month: "ก.ค.", avg: 83.2 },
  { month: "ส.ค.", avg: 83.4 },
  { month: "ก.ย.", avg: 83.5 },
  { month: "ต.ค.", avg: 83.6 },
  { month: "พ.ย.", avg: 83.5 },
  { month: "ธ.ค.", avg: 83.5 },
];

const HOSPITALS = [
  { name: "รพ.จุฬาลงกรณ์", province: "กรุงเทพฯ", score: 98, level: "Advanced", status: "ผ่าน" },
  { name: "รพ.รามาธิบดี", province: "กรุงเทพฯ", score: 96, level: "Advanced", status: "ผ่าน" },
  { name: "รพ.ศิริราช", province: "กรุงเทพฯ", score: 95, level: "Advanced", status: "ผ่าน" },
  { name: "รพ.เชียงรายประชานุเคราะห์", province: "เชียงราย", score: 91, level: "Level 3", status: "ผ่าน" },
  { name: "รพ.มหาราชนครเชียงใหม่", province: "เชียงใหม่", score: 90, level: "Level 3", status: "ผ่าน" },
  { name: "รพ.ขอนแก่น", province: "ขอนแก่น", score: 88, level: "Level 3", status: "ผ่าน" },
  { name: "รพ.อุดรธานี", province: "อุดรธานี", score: 85, level: "Level 2", status: "ผ่าน" },
  { name: "รพ.นครราชสีมา", province: "นครราชสีมา", score: 83, level: "Level 2", status: "ผ่าน" },
  { name: "รพ.สงขลานครินทร์", province: "สงขลา", score: 79, level: "Level 2", status: "ผ่าน" },
  { name: "รพ.หาดใหญ่", province: "สงขลา", score: 76, level: "Level 1", status: "ผ่าน" },
  { name: "รพ.พระนครศรีอยุธยา", province: "อยุธยา", score: 73, level: "Level 1", status: "ผ่าน" },
  { name: "รพ.สมุทรปราการ", province: "สมุทรปราการ", score: 68, level: "Level 1", status: "อยู่ระหว่าง" },
  { name: "รพ.ลำปาง", province: "ลำปาง", score: 65, level: "Level 1", status: "อยู่ระหว่าง" },
  { name: "รพ.ระยอง", province: "ระยอง", score: 61, level: "Level 1", status: "อยู่ระหว่าง" },
];

function scoreToRange(score) {
  if (score >= 90) return "90-100";
  if (score >= 80) return "80-90";
  if (score >= 70) return "70-80";
  return "60-70";
}

function TabAssessment() {
  const [selectedRange, setSelectedRange] = useState(null);

  const filtered = selectedRange
    ? HOSPITALS.filter(h => scoreToRange(h.score) === selectedRange)
    : HOSPITALS;

  function handleBarClick(data) {
    if (data && data.activePayload && data.activePayload[0]) {
      const range = data.activePayload[0].payload.range;
      setSelectedRange(prev => prev === range ? null : range);
    }
  }

  return (
    <div className="space-y-6">
      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="เฉลี่ยคะแนน" value="83.5" sub="คะแนน" icon={Star} color={PRIMARY} />
        <KpiCard title="คะแนนสูงสุด" value="98" sub="รพ.จุฬาฯ" icon={Award} color="#22C55E" />
        <KpiCard title="คะแนนต่ำสุด" value="61" sub="รพ.ระยอง" icon={TrendingUp} color="#EF4444" />
        <KpiCard title="ผ่านเกณฑ์" value="87%" sub="ของทั้งหมด" icon={Users} color={ACCENT} />
      </div>

      {/* Radar + Score Dist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-5">
          <SectionHeader title="คะแนนตามมาตรฐาน HA 12 หมวด">
            <ExportDropdown />
          </SectionHeader>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarStandards}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[60, 100]} tick={{ fontSize: 9 }} />
              <Radar name="คะแนน" dataKey="score" stroke={PRIMARY} fill={PRIMARY} fillOpacity={0.25} strokeWidth={2} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <SectionHeader title="การกระจายของคะแนน (คลิกเพื่อกรอง)">
            {selectedRange && (
              <button
                className="text-xs px-3 py-1 rounded-full border"
                style={{ borderColor: PRIMARY, color: PRIMARY }}
                onClick={() => setSelectedRange(null)}
              >
                ล้างตัวกรอง ✕
              </button>
            )}
          </SectionHeader>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={scoreDist} barSize={50} onClick={handleBarClick}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" name="จำนวน รพ." radius={[6, 6, 0, 0]} cursor="pointer">
                {scoreDist.map((entry) => (
                  <Cell key={entry.range} fill={selectedRange === entry.range ? "#F59E0B" : ACCENT} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Score Trend */}
      <div className="bg-white rounded-xl shadow p-5">
        <SectionHeader title="แนวโน้มคะแนนเฉลี่ยรายเดือน">
          <ExportDropdown />
        </SectionHeader>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={scoreTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis domain={[79, 86]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="avg" stroke={PRIMARY} strokeWidth={2.5} dot={{ r: 3 }} name="คะแนนเฉลี่ย" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Hospital Table */}
      <div className="bg-white rounded-xl shadow p-5">
        <SectionHeader title={`ตารางผลประเมิน${selectedRange ? ` — ช่วงคะแนน ${selectedRange}` : ""} (${filtered.length} แห่ง)`}>
          <ExportDropdown />
        </SectionHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ backgroundColor: PRIMARY + "10" }}>
                <th className="text-left py-2 px-3 font-semibold text-gray-600">ชื่อโรงพยาบาล</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-600">จังหวัด</th>
                <th className="text-center py-2 px-3 font-semibold text-gray-600">คะแนน</th>
                <th className="text-center py-2 px-3 font-semibold text-gray-600">ระดับ</th>
                <th className="text-center py-2 px-3 font-semibold text-gray-600">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((h, i) => (
                <tr key={h.name} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-2 px-3 font-medium" style={{ color: PRIMARY }}>{h.name}</td>
                  <td className="py-2 px-3 text-gray-600">{h.province}</td>
                  <td className="py-2 px-3 text-center">
                    <span className="font-bold" style={{ color: h.score >= 90 ? "#22C55E" : h.score >= 80 ? PRIMARY : h.score >= 70 ? "#F59E0B" : "#EF4444" }}>
                      {h.score}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center text-gray-600">{h.level}</td>
                  <td className="py-2 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${h.status === "ผ่าน" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                      {h.status}
                    </span>
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

// ════════════════════════════════════════════════════════════════════════════
//  TAB 3 — Survey
// ════════════════════════════════════════════════════════════════════════════

const surveyByQuarter = [
  { quarter: "Q4/2567", planned: 42, done: 42 },
  { quarter: "Q1/2568", planned: 38, done: 35 },
  { quarter: "Q2/2568", planned: 36, done: 28 },
  { quarter: "Q3/2568", planned: 29, done: 0 },
];

const teamWorkload = [
  { team: "ทีม A", surveys: 14 },
  { team: "ทีม B", surveys: 12 },
  { team: "ทีม C", surveys: 11 },
  { team: "ทีม D", surveys: 13 },
  { team: "ทีม E", surveys: 9 },
  { team: "ทีม F", surveys: 10 },
  { team: "ทีม G", surveys: 11 },
  { team: "ทีม H", surveys: 8 },
];

const upcomingSurveys = [
  { hospital: "รพ.นครพิงค์", province: "เชียงใหม่", team: "ทีม B", date: "25 มิ.ย. 2568", status: "ยืนยันแล้ว" },
  { hospital: "รพ.พระมงกุฎ", province: "กรุงเทพฯ", team: "ทีม A", date: "27 มิ.ย. 2568", status: "ยืนยันแล้ว" },
  { hospital: "รพ.สุราษฎร์ธานี", province: "สุราษฎร์ธานี", team: "ทีม F", date: "28 มิ.ย. 2568", status: "รอยืนยัน" },
  { hospital: "รพ.ร้อยเอ็ด", province: "ร้อยเอ็ด", team: "ทีม D", date: "30 มิ.ย. 2568", status: "ยืนยันแล้ว" },
  { hospital: "รพ.อ่างทอง", province: "อ่างทอง", team: "ทีม C", date: "2 ก.ค. 2568", status: "รอยืนยัน" },
  { hospital: "รพ.ลพบุรี", province: "ลพบุรี", team: "ทีม E", date: "4 ก.ค. 2568", status: "ยืนยันแล้ว" },
  { hospital: "รพ.เพชรบุรี", province: "เพชรบุรี", team: "ทีม G", date: "7 ก.ค. 2568", status: "รอนัดหมาย" },
  { hospital: "รพ.ตราด", province: "ตราด", team: "ทีม H", date: "10 ก.ค. 2568", status: "รอนัดหมาย" },
  { hospital: "รพ.นราธิวาส", province: "นราธิวาส", team: "ทีม F", date: "12 ก.ค. 2568", status: "ยืนยันแล้ว" },
  { hospital: "รพ.สมุทรสาคร", province: "สมุทรสาคร", team: "ทีม B", date: "15 ก.ค. 2568", status: "รอยืนยัน" },
];

function TabSurvey() {
  return (
    <div className="space-y-6">
      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="Survey รอบนี้" value="145" sub="รายการ" icon={Award} color={PRIMARY} />
        <KpiCard title="เสร็จแล้ว" value="89" sub="61%" icon={Star} color="#22C55E" />
        <KpiCard title="อยู่ระหว่าง" value="38" sub="26%" icon={TrendingUp} color={ACCENT} />
        <KpiCard title="รอนัดหมาย" value="18" sub="12%" icon={MapPin} color="#F59E0B" />
      </div>

      {/* Quarter schedule + Team workload */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-5">
          <SectionHeader title="แผนการ Survey รายไตรมาส">
            <ExportDropdown />
          </SectionHeader>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={surveyByQuarter} layout="vertical" barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="quarter" type="category" width={80} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="planned" name="แผน" fill={PRIMARY} radius={[0, 4, 4, 0]} />
              <Bar dataKey="done" name="เสร็จ" fill="#22C55E" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <SectionHeader title="ภาระงานทีมผู้ประเมิน">
            <ExportDropdown />
          </SectionHeader>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={teamWorkload} barSize={30}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="team" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="surveys" name="จำนวน Survey" fill={ACCENT} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming surveys table */}
      <div className="bg-white rounded-xl shadow p-5">
        <SectionHeader title="การ Survey ที่กำลังจะเกิดขึ้น (30 วันข้างหน้า)">
          <ExportDropdown />
        </SectionHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ backgroundColor: PRIMARY + "10" }}>
                <th className="text-left py-2 px-3 font-semibold text-gray-600">โรงพยาบาล</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-600">จังหวัด</th>
                <th className="text-center py-2 px-3 font-semibold text-gray-600">ทีมผู้ประเมิน</th>
                <th className="text-center py-2 px-3 font-semibold text-gray-600">วันที่</th>
                <th className="text-center py-2 px-3 font-semibold text-gray-600">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {upcomingSurveys.map((s, i) => (
                <tr key={s.hospital} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-2 px-3 font-medium" style={{ color: PRIMARY }}>{s.hospital}</td>
                  <td className="py-2 px-3 text-gray-600">{s.province}</td>
                  <td className="py-2 px-3 text-center text-gray-600">{s.team}</td>
                  <td className="py-2 px-3 text-center text-gray-600">{s.date}</td>
                  <td className="py-2 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      s.status === "ยืนยันแล้ว" ? "bg-green-100 text-green-700"
                      : s.status === "รอยืนยัน" ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-600"
                    }`}>
                      {s.status}
                    </span>
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

// ════════════════════════════════════════════════════════════════════════════
//  TAB 4 — Hospital Quality
// ════════════════════════════════════════════════════════════════════════════

const qualityRadar = [
  { subject: "ความปลอดภัย", score: 91 },
  { subject: "คลินิก", score: 86 },
  { subject: "บริการ", score: 88 },
  { subject: "ประสิทธิภาพ", score: 83 },
  { subject: "นวัตกรรม", score: 79 },
];

const qualityByType = [
  { type: "รพ.ศูนย์", score: 91.5 },
  { type: "รพ.ทั่วไป", score: 88.2 },
  { type: "รพ.ชุมชน", score: 84.7 },
  { type: "รพ.เอกชน", score: 90.1 },
  { type: "รพ.มหาวิทยาลัย", score: 93.4 },
];

const qualityTrend = [
  { month: "ม.ค.", qi: 85.1 },
  { month: "ก.พ.", qi: 85.5 },
  { month: "มี.ค.", qi: 85.8 },
  { month: "เม.ย.", qi: 86.2 },
  { month: "พ.ค.", qi: 86.5 },
  { month: "มิ.ย.", qi: 86.8 },
  { month: "ก.ค.", qi: 87.0 },
  { month: "ส.ค.", qi: 87.1 },
  { month: "ก.ย.", qi: 87.2 },
  { month: "ต.ค.", qi: 87.3 },
  { month: "พ.ย.", qi: 87.2 },
  { month: "ธ.ค.", qi: 87.2 },
];

const allHospitalsQuality = [
  { name: "รพ.ศิริราช", province: "กรุงเทพฯ", qi: 96.8, safety: 98, clinical: 95, service: 97 },
  { name: "รพ.จุฬาลงกรณ์", province: "กรุงเทพฯ", qi: 96.2, safety: 97, clinical: 96, service: 95 },
  { name: "รพ.รามาธิบดี", province: "กรุงเทพฯ", qi: 95.5, safety: 96, clinical: 95, service: 95 },
  { name: "รพ.มหาราชนครเชียงใหม่", province: "เชียงใหม่", qi: 94.1, safety: 95, clinical: 93, service: 94 },
  { name: "รพ.เชียงรายประชานุเคราะห์", province: "เชียงราย", qi: 93.7, safety: 94, clinical: 93, service: 93 },
  { name: "รพ.ขอนแก่น", province: "ขอนแก่น", qi: 92.8, safety: 93, clinical: 92, service: 93 },
  { name: "รพ.สงขลานครินทร์", province: "สงขลา", qi: 92.3, safety: 92, clinical: 92, service: 92 },
  { name: "รพ.อุดรธานี", province: "อุดรธานี", qi: 91.5, safety: 91, clinical: 91, service: 92 },
  { name: "รพ.นครราชสีมา", province: "นครราชสีมา", qi: 90.9, safety: 91, clinical: 90, service: 91 },
  { name: "รพ.หาดใหญ่", province: "สงขลา", qi: 90.1, safety: 90, clinical: 89, service: 91 },
  { name: "รพ.สมุทรปราการ", province: "สมุทรปราการ", qi: 72.5, safety: 73, clinical: 71, service: 73 },
  { name: "รพ.ลำปาง", province: "ลำปาง", qi: 71.8, safety: 72, clinical: 71, service: 72 },
  { name: "รพ.ตาก", province: "ตาก", qi: 70.4, safety: 70, clinical: 69, service: 71 },
  { name: "รพ.แม่ฮ่องสอน", province: "แม่ฮ่องสอน", qi: 69.2, safety: 69, clinical: 68, service: 70 },
  { name: "รพ.นราธิวาส", province: "นราธิวาส", qi: 68.5, safety: 68, clinical: 67, service: 70 },
  { name: "รพ.ระยอง", province: "ระยอง", qi: 67.9, safety: 67, clinical: 67, service: 69 },
  { name: "รพ.ยะลา", province: "ยะลา", qi: 66.3, safety: 66, clinical: 65, service: 68 },
  { name: "รพ.ปัตตานี", province: "ปัตตานี", qi: 65.1, safety: 65, clinical: 64, service: 66 },
  { name: "รพ.สตูล", province: "สตูล", qi: 63.8, safety: 63, clinical: 63, service: 65 },
  { name: "รพ.บึงกาฬ", province: "บึงกาฬ", qi: 62.4, safety: 62, clinical: 61, service: 63 },
];

function TabHospitalQuality() {
  const [showBottom, setShowBottom] = useState(false);

  const sorted = [...allHospitalsQuality].sort((a, b) => b.qi - a.qi);
  const displayed = showBottom ? [...sorted].reverse().slice(0, 10) : sorted.slice(0, 10);

  return (
    <div className="space-y-6">
      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="Quality Index" value="87.2" sub="คะแนนรวม" icon={Star} color={PRIMARY} />
        <KpiCard title="Patient Safety Score" value="91.4" sub="คะแนน" icon={Award} color="#22C55E" />
        <KpiCard title="Clinical Excellence" value="85.6" sub="คะแนน" icon={TrendingUp} color={ACCENT} />
        <KpiCard title="Service Excellence" value="88.1" sub="คะแนน" icon={Users} color="#F59E0B" />
      </div>

      {/* Radar + Type Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-5">
          <SectionHeader title="มิติคุณภาพ 5 ด้าน">
            <ExportDropdown />
          </SectionHeader>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={qualityRadar}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={18} domain={[60, 100]} tick={{ fontSize: 9 }} />
              <Radar name="คุณภาพ" dataKey="score" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.25} strokeWidth={2} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <SectionHeader title="คะแนนคุณภาพแยกตามประเภทโรงพยาบาล">
            <ExportDropdown />
          </SectionHeader>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={qualityByType} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="type" tick={{ fontSize: 11 }} />
              <YAxis domain={[78, 96]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="score" name="คะแนน" radius={[6, 6, 0, 0]}>
                {qualityByType.map((_, i) => (
                  <Cell key={i} fill={[PRIMARY, ACCENT, "#22C55E", "#F59E0B", "#8B5CF6"][i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quality Trend */}
      <div className="bg-white rounded-xl shadow p-5">
        <SectionHeader title="แนวโน้ม Quality Index รายเดือน">
          <ExportDropdown />
        </SectionHeader>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={qualityTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis domain={[83, 90]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="qi" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 3 }} name="Quality Index" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top / Bottom 10 Table */}
      <div className="bg-white rounded-xl shadow p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold" style={{ color: PRIMARY }}>
            {showBottom ? "Bottom 10 โรงพยาบาล" : "Top 10 โรงพยาบาล"} — Quality Index
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: PRIMARY }}>
              <button
                onClick={() => setShowBottom(false)}
                className="px-3 py-1.5 text-sm font-medium transition-colors"
                style={!showBottom ? { backgroundColor: PRIMARY, color: "white" } : { color: PRIMARY }}
              >
                Top 10
              </button>
              <button
                onClick={() => setShowBottom(true)}
                className="px-3 py-1.5 text-sm font-medium transition-colors"
                style={showBottom ? { backgroundColor: "#EF4444", color: "white" } : { color: "#EF4444" }}
              >
                Bottom 10
              </button>
            </div>
            <ExportDropdown />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ backgroundColor: PRIMARY + "10" }}>
                <th className="text-center py-2 px-3 font-semibold text-gray-600">อันดับ</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-600">ชื่อโรงพยาบาล</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-600">จังหวัด</th>
                <th className="text-center py-2 px-3 font-semibold text-gray-600">Quality Index</th>
                <th className="text-center py-2 px-3 font-semibold text-gray-600">Safety</th>
                <th className="text-center py-2 px-3 font-semibold text-gray-600">Clinical</th>
                <th className="text-center py-2 px-3 font-semibold text-gray-600">Service</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((h, i) => {
                const rank = showBottom ? allHospitalsQuality.length - i : i + 1;
                return (
                  <tr key={h.name} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-2 px-3 text-center">
                      <span
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: showBottom ? "#EF4444" : PRIMARY }}
                      >
                        {rank}
                      </span>
                    </td>
                    <td className="py-2 px-3 font-medium" style={{ color: PRIMARY }}>{h.name}</td>
                    <td className="py-2 px-3 text-gray-600">{h.province}</td>
                    <td className="py-2 px-3 text-center font-bold" style={{ color: h.qi >= 85 ? "#22C55E" : h.qi >= 75 ? "#F59E0B" : "#EF4444" }}>
                      {h.qi.toFixed(1)}
                    </td>
                    <td className="py-2 px-3 text-center text-gray-600">{h.safety}</td>
                    <td className="py-2 px-3 text-center text-gray-600">{h.clinical}</td>
                    <td className="py-2 px-3 text-center text-gray-600">{h.service}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "ha-cert", label: "การรับรอง HA" },
  { id: "assessment", label: "ผลประเมิน" },
  { id: "survey", label: "Survey" },
  { id: "quality", label: "Hospital Quality" },
];

export default function Accreditation() {
  const [activeTab, setActiveTab] = useState("ha-cert");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Award size={28} style={{ color: PRIMARY }} />
          <h1 className="text-2xl font-bold" style={{ color: PRIMARY }}>ระบบการรับรองคุณภาพโรงพยาบาล (HA)</h1>
        </div>
        <p className="text-sm text-gray-500 ml-10">Hospital Accreditation — ข้อมูล ณ วันที่ 17 มิถุนายน 2568</p>
      </div>

      {/* Date Filter Bar */}
      <DateFilterBar />

      {/* Sub-tabs */}
      <div className="flex gap-1 mb-6 bg-white rounded-xl shadow p-1.5 w-fit">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-all"
            style={
              activeTab === tab.id
                ? { backgroundColor: PRIMARY, color: "white" }
                : { color: "#6B7280" }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "ha-cert" && <TabHACert />}
      {activeTab === "assessment" && <TabAssessment />}
      {activeTab === "survey" && <TabSurvey />}
      {activeTab === "quality" && <TabHospitalQuality />}
    </div>
  );
}
