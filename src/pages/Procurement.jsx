import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell, RadarChart, Radar,
  PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  ShoppingCart, FileText, Users, TrendingUp,
  Download, ChevronDown, Package
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

// ─── Shared Components ────────────────────────────────────────────────────────

function KPICard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-start gap-3">
      <div className="p-2 rounded-lg" style={{ backgroundColor: color + "1A" }}>
        <Icon size={22} style={{ color }} />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function ExportButton() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-sm font-medium"
        style={{ backgroundColor: PRIMARY }}
      >
        <Download size={14} />
        Export
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => { setOpen(false); alert("กำลังส่งออกไฟล์..."); }}
          >
            PDF
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => { setOpen(false); alert("กำลังส่งออกไฟล์..."); }}
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
    "อนุมัติแล้ว": "bg-green-100 text-green-700",
    "รออนุมัติ": "bg-yellow-100 text-yellow-700",
    "ปฏิเสธ": "bg-red-100 text-red-700",
    "ใช้งานอยู่": "bg-blue-100 text-blue-700",
    "ใกล้หมดอายุ": "bg-orange-100 text-orange-700",
    "หมดอายุ": "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

// ─── Tab 1: การจัดซื้อ ────────────────────────────────────────────────────────

const purchaseMonthly = [
  { month: "ม.ค.", อนุมัติ: 72, รออนุมัติ: 18, ปฏิเสธ: 8 },
  { month: "ก.พ.", อนุมัติ: 65, รออนุมัติ: 22, ปฏิเสธ: 7 },
  { month: "มี.ค.", อนุมัติ: 80, รออนุมัติ: 20, ปฏิเสธ: 10 },
  { month: "เม.ย.", อนุมัติ: 74, รออนุมัติ: 19, ปฏิเสธ: 9 },
  { month: "พ.ค.", อนุมัติ: 69, รออนุมัติ: 21, ปฏิเสธ: 8 },
  { month: "มิ.ย.", อนุมัติ: 78, รออนุมัติ: 23, ปฏิเสธ: 11 },
  { month: "ก.ค.", อนุมัติ: 82, รออนุมัติ: 25, ปฏิเสธ: 9 },
  { month: "ส.ค.", อนุมัติ: 75, รออนุมัติ: 20, ปฏิเสธ: 7 },
  { month: "ก.ย.", อนุมัติ: 68, รออนุมัติ: 24, ปฏิเสธ: 12 },
  { month: "ต.ค.", อนุมัติ: 71, รออนุมัติ: 22, ปฏิเสธ: 8 },
  { month: "พ.ย.", อนุมัติ: 77, รออนุมัติ: 21, ปฏิเสธ: 9 },
  { month: "ธ.ค.", อนุมัติ: 79, รออนุมัติ: 10, ปฏิเสธ: 7 },
];

const purchaseTypes = [
  { name: "วิธีเฉพาะเจาะจง", value: 520 },
  { name: "e-bidding", value: 380 },
  { name: "e-market", value: 220 },
  { name: "พิเศษ", value: 120 },
];

const recentPurchases = [
  { id: "PR-2024-001", name: "ครุภัณฑ์คอมพิวเตอร์", vendor: "บ.เทคโนโลยี จำกัด", amount: "฿1,250,000", type: "e-bidding", status: "อนุมัติแล้ว" },
  { id: "PR-2024-002", name: "วัสดุสำนักงาน", vendor: "บ.ออฟฟิศซัพพลาย จำกัด", amount: "฿85,000", type: "วิธีเฉพาะเจาะจง", status: "อนุมัติแล้ว" },
  { id: "PR-2024-003", name: "ยาและเวชภัณฑ์ Q4", vendor: "บ.เภสัชกรรม จำกัด", amount: "฿3,480,000", type: "e-bidding", status: "รออนุมัติ" },
  { id: "PR-2024-004", name: "ซ่อมบำรุงลิฟต์", vendor: "บ.ลิฟต์ไทย จำกัด", amount: "฿420,000", type: "วิธีเฉพาะเจาะจง", status: "อนุมัติแล้ว" },
  { id: "PR-2024-005", name: "เครื่องมือแพทย์ MRI", vendor: "บ.เมดเทค จำกัด", amount: "฿12,500,000", type: "e-bidding", status: "รออนุมัติ" },
  { id: "PR-2024-006", name: "น้ำยาตรวจทางห้องปฏิบัติการ", vendor: "บ.ไบโอเมด จำกัด", amount: "฿680,000", type: "e-market", status: "อนุมัติแล้ว" },
  { id: "PR-2024-007", name: "อุปกรณ์ป้องกันส่วนบุคคล", vendor: "บ.เซฟตี้เฟิร์ส จำกัด", amount: "฿245,000", type: "e-market", status: "ปฏิเสธ" },
  { id: "PR-2024-008", name: "ระบบ CCTV อาคาร B", vendor: "บ.ซีเคียวริตี้ จำกัด", amount: "฿890,000", type: "วิธีเฉพาะเจาะจง", status: "รออนุมัติ" },
  { id: "PR-2024-009", name: "เฟอร์นิเจอร์สำนักงาน", vendor: "บ.โมเดิร์นเฟอร์ จำกัด", amount: "฿320,000", type: "วิธีเฉพาะเจาะจง", status: "อนุมัติแล้ว" },
  { id: "PR-2024-010", name: "ซอฟต์แวร์ HIS License", vendor: "บ.ซอฟต์แวร์เฮลท์ จำกัด", amount: "฿2,100,000", type: "พิเศษ", status: "รออนุมัติ" },
];

function TabPurchasing() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard icon={ShoppingCart} label="คำขอทั้งหมด" value="1,240" sub="ปีงบประมาณ 2567" color={PRIMARY} />
        <KPICard icon={Package} label="อนุมัติแล้ว" value="890" sub="71.8% ของทั้งหมด" color="#16A34A" />
        <KPICard icon={FileText} label="รออนุมัติ" value="245" sub="19.8% ของทั้งหมด" color="#D97706" />
        <KPICard icon={TrendingUp} label="ปฏิเสธ" value="105" sub="8.5% ของทั้งหมด" color="#DC2626" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SectionCard title="คำขอจัดซื้อรายเดือน (จำแนกตามสถานะ)">
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={purchaseMonthly} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="อนุมัติ" stackId="a" fill="#16A34A" />
                  <Bar dataKey="รออนุมัติ" stackId="a" fill="#F59E0B" />
                  <Bar dataKey="ปฏิเสธ" stackId="a" fill="#EF4444" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        <SectionCard title="ประเภทการจัดซื้อ">
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={purchaseTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {purchaseTypes.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => v.toLocaleString()} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="รายการจัดซื้อล่าสุด">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b">
                <th className="pb-2 text-left">เลขที่คำขอ</th>
                <th className="pb-2 text-left">รายการ</th>
                <th className="pb-2 text-left">Vendor</th>
                <th className="pb-2 text-right">มูลค่า</th>
                <th className="pb-2 text-center">ประเภท</th>
                <th className="pb-2 text-center">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {recentPurchases.map((r) => (
                <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2 text-xs text-gray-500">{r.id}</td>
                  <td className="py-2 font-medium text-gray-800">{r.name}</td>
                  <td className="py-2 text-gray-600 text-xs">{r.vendor}</td>
                  <td className="py-2 text-right font-medium">{r.amount}</td>
                  <td className="py-2 text-center">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{r.type}</span>
                  </td>
                  <td className="py-2 text-center"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── Tab 2: สัญญา ─────────────────────────────────────────────────────────────

const contractVendors = [
  { vendor: "บ.เทคโนโลยี จำกัด", months: 36 },
  { vendor: "บ.เภสัชกรรม จำกัด", months: 24 },
  { vendor: "บ.เมดเทค จำกัด", months: 48 },
  { vendor: "บ.ซอฟต์แวร์เฮลท์ จำกัด", months: 12 },
  { vendor: "บ.ลิฟต์ไทย จำกัด", months: 24 },
  { vendor: "บ.ไบโอเมด จำกัด", months: 18 },
  { vendor: "บ.ซีเคียวริตี้ จำกัด", months: 36 },
  { vendor: "บ.โมเดิร์นเฟอร์ จำกัด", months: 12 },
];

const contractValueYearly = [
  { year: "2563", value: 180 },
  { year: "2564", value: 210 },
  { year: "2565", value: 245 },
  { year: "2566", value: 290 },
  { year: "2567", value: 324 },
];

const expiringContracts = [
  { name: "สัญญาบำรุงรักษาระบบ HIS", vendor: "บ.ซอฟต์แวร์เฮลท์ จำกัด", expiry: "15 ก.ค. 2567", value: "฿2,100,000", days: 28 },
  { name: "สัญญาจัดหายาและเวชภัณฑ์", vendor: "บ.เภสัชกรรม จำกัด", expiry: "22 ก.ค. 2567", value: "฿8,400,000", days: 35 },
  { name: "สัญญาบำรุงรักษาลิฟต์", vendor: "บ.ลิฟต์ไทย จำกัด", expiry: "31 ก.ค. 2567", value: "฿420,000", days: 44 },
  { name: "สัญญาน้ำยาตรวจ Lab", vendor: "บ.ไบโอเมด จำกัด", expiry: "10 ส.ค. 2567", value: "฿1,360,000", days: 54 },
  { name: "สัญญาระบบ CCTV", vendor: "บ.ซีเคียวริตี้ จำกัด", expiry: "20 ส.ค. 2567", value: "฿890,000", days: 64 },
  { name: "สัญญาเช่าเครื่องถ่ายเอกสาร", vendor: "บ.ออฟฟิศซัพพลาย จำกัด", expiry: "05 ก.ย. 2567", value: "฿180,000", days: 80 },
  { name: "สัญญาบำรุงรักษาเครื่องปรับอากาศ", vendor: "บ.แอร์เซอร์วิส จำกัด", expiry: "15 ก.ย. 2567", value: "฿650,000", days: 90 },
];

function TabContracts() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard icon={FileText} label="สัญญาทั้งหมด" value="324" sub="ปีงบประมาณ 2567" color={PRIMARY} />
        <KPICard icon={FileText} label="ใช้งานอยู่" value="218" sub="67.3% ของทั้งหมด" color="#16A34A" />
        <KPICard icon={FileText} label="ใกล้หมดอายุ" value="45" sub="ภายใน 90 วัน" color="#D97706" />
        <KPICard icon={FileText} label="หมดอายุ" value="61" sub="18.8% ของทั้งหมด" color="#6B7280" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="ระยะเวลาสัญญาตาม Vendor (เดือน)">
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={contractVendors} margin={{ top: 4, right: 16, left: 4, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 10 }} unit=" เดือน" />
                <YAxis type="category" dataKey="vendor" tick={{ fontSize: 9 }} width={130} />
                <Tooltip formatter={(v) => `${v} เดือน`} />
                <Bar dataKey="months" fill={ACCENT} radius={[0, 4, 4, 0]} name="ระยะเวลา" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="มูลค่าสัญญารายปี (ล้านบาท)">
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={contractValueYearly} margin={{ top: 4, right: 16, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} unit="M" />
                <Tooltip formatter={(v) => `฿${v}M`} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={PRIMARY}
                  strokeWidth={2.5}
                  dot={{ r: 5, fill: PRIMARY }}
                  name="มูลค่าสัญญา (ล้านบาท)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="สัญญาใกล้หมดอายุ (90 วันข้างหน้า)">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b">
                <th className="pb-2 text-left">ชื่อสัญญา</th>
                <th className="pb-2 text-left">Vendor</th>
                <th className="pb-2 text-center">วันหมดอายุ</th>
                <th className="pb-2 text-right">มูลค่า</th>
                <th className="pb-2 text-center">วันคงเหลือ</th>
              </tr>
            </thead>
            <tbody>
              {expiringContracts.map((c, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2 font-medium text-gray-800">{c.name}</td>
                  <td className="py-2 text-gray-600 text-xs">{c.vendor}</td>
                  <td className="py-2 text-center text-gray-700">{c.expiry}</td>
                  <td className="py-2 text-right font-medium">{c.value}</td>
                  <td className="py-2 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${c.days <= 30 ? "bg-red-100 text-red-700" : c.days <= 60 ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {c.days} วัน
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── Tab 3: Vendor ────────────────────────────────────────────────────────────

const topVendors = [
  { vendor: "บ.เมดเทค จำกัด", value: 42.5 },
  { vendor: "บ.เภสัชกรรม จำกัด", value: 38.4 },
  { vendor: "บ.ซอฟต์แวร์เฮลท์ จำกัด", value: 28.1 },
  { vendor: "บ.เทคโนโลยี จำกัด", value: 22.8 },
  { vendor: "บ.ไบโอเมด จำกัด", value: 18.6 },
  { vendor: "บ.ลิฟต์ไทย จำกัด", value: 12.4 },
  { vendor: "บ.ซีเคียวริตี้ จำกัด", value: 9.8 },
  { vendor: "บ.โมเดิร์นเฟอร์ จำกัด", value: 8.2 },
  { vendor: "บ.ออฟฟิศซัพพลาย จำกัด", value: 6.5 },
  { vendor: "บ.แอร์เซอร์วิส จำกัด", value: 5.1 },
];

const vendorTypes = [
  { name: "IT", value: 18 },
  { name: "ยา", value: 22 },
  { name: "เวชภัณฑ์", value: 15 },
  { name: "ก่อสร้าง", value: 10 },
  { name: "บริการ", value: 24 },
];

const vendorRadar = [
  { dimension: "ราคา", เมดเทค: 85, เภสัชกรรม: 90, ไบโอเมด: 78 },
  { dimension: "คุณภาพ", เมดเทค: 92, เภสัชกรรม: 88, ไบโอเมด: 85 },
  { dimension: "ตรงเวลา", เมดเทค: 80, เภสัชกรรม: 85, ไบโอเมด: 90 },
  { dimension: "บริการ", เมดเทค: 88, เภสัชกรรม: 82, ไบโอเมด: 86 },
  { dimension: "เอกสาร", เมดเทค: 95, เภสัชกรรม: 91, ไบโอเมด: 88 },
];

const vendorList = [
  { name: "บ.เมดเทค จำกัด", type: "เวชภัณฑ์", contracts: 8, value: "฿42.5M", score: 88 },
  { name: "บ.เภสัชกรรม จำกัด", type: "ยา", contracts: 12, value: "฿38.4M", score: 87 },
  { name: "บ.ซอฟต์แวร์เฮลท์ จำกัด", type: "IT", contracts: 5, value: "฿28.1M", score: 92 },
  { name: "บ.เทคโนโลยี จำกัด", type: "IT", contracts: 6, value: "฿22.8M", score: 79 },
  { name: "บ.ไบโอเมด จำกัด", type: "เวชภัณฑ์", contracts: 7, value: "฿18.6M", score: 85 },
  { name: "บ.ลิฟต์ไทย จำกัด", type: "บริการ", contracts: 3, value: "฿12.4M", score: 74 },
  { name: "บ.ซีเคียวริตี้ จำกัด", type: "บริการ", contracts: 4, value: "฿9.8M", score: 91 },
  { name: "บ.โมเดิร์นเฟอร์ จำกัด", type: "บริการ", contracts: 2, value: "฿8.2M", score: 68 },
  { name: "บ.ออฟฟิศซัพพลาย จำกัด", type: "บริการ", contracts: 3, value: "฿6.5M", score: 76 },
  { name: "บ.แอร์เซอร์วิส จำกัด", type: "บริการ", contracts: 2, value: "฿5.1M", score: 82 },
];

function ScoreBadge({ score }) {
  const cls = score >= 90
    ? "bg-green-100 text-green-700"
    : score >= 75
    ? "bg-yellow-100 text-yellow-700"
    : "bg-red-100 text-red-700";
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      {score}/100
    </span>
  );
}

function TabVendor() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard icon={Users} label="Vendor ทั้งหมด" value="89" sub="ที่ลงทะเบียน" color={PRIMARY} />
        <KPICard icon={Users} label="Vendor ที่ใช้งาน" value="67" sub="75.3% ของทั้งหมด" color="#16A34A" />
        <KPICard icon={Users} label="Vendor ใหม่ปีนี้" value="12" sub="เพิ่มขึ้น 4 จากปีก่อน" color={ACCENT} />
        <KPICard icon={TrendingUp} label="Average Vendor Score" value="87/100" sub="ระดับดีมาก" color="#7C3AED" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SectionCard title="Top 10 Vendor by Contract Value (ล้านบาท)">
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={topVendors} margin={{ top: 4, right: 24, left: 8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tick={{ fontSize: 10 }} unit="M" />
                  <YAxis type="category" dataKey="vendor" tick={{ fontSize: 9 }} width={150} />
                  <Tooltip formatter={(v) => `฿${v}M`} />
                  <Bar dataKey="value" fill={PRIMARY} radius={[0, 4, 4, 0]} name="มูลค่าสัญญา" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        <SectionCard title="ประเภท Vendor">
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vendorTypes}
                  cx="50%"
                  cy="45%"
                  outerRadius={85}
                  dataKey="value"
                  label={({ name, value }) => `${name} (${value})`}
                >
                  {vendorTypes.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Vendor Performance Radar (Top 3 Vendors)">
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={vendorRadar} cx="50%" cy="50%" outerRadius={100}>
              <PolarGrid />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11 }} />
              <Radar name="เมดเทค" dataKey="เมดเทค" stroke={PRIMARY} fill={PRIMARY} fillOpacity={0.2} />
              <Radar name="เภสัชกรรม" dataKey="เภสัชกรรม" stroke={ACCENT} fill={ACCENT} fillOpacity={0.2} />
              <Radar name="ไบโอเมด" dataKey="ไบโอเมด" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.2} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title="รายการ Vendor ทั้งหมด">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b">
                <th className="pb-2 text-left">ชื่อ Vendor</th>
                <th className="pb-2 text-center">ประเภท</th>
                <th className="pb-2 text-center">จำนวนสัญญา</th>
                <th className="pb-2 text-right">มูลค่ารวม</th>
                <th className="pb-2 text-center">คะแนน</th>
              </tr>
            </thead>
            <tbody>
              {vendorList.map((v, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2 font-medium text-gray-800">{v.name}</td>
                  <td className="py-2 text-center">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{v.type}</span>
                  </td>
                  <td className="py-2 text-center text-gray-700">{v.contracts}</td>
                  <td className="py-2 text-right font-medium">{v.value}</td>
                  <td className="py-2 text-center"><ScoreBadge score={v.score} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── Tab 4: Budget Utilization ────────────────────────────────────────────────

const budgetByCategory = [
  { category: "เวชภัณฑ์และยา", budget: 95, used: 72 },
  { category: "ครุภัณฑ์การแพทย์", budget: 80, used: 58 },
  { category: "IT & ซอฟต์แวร์", budget: 45, used: 32 },
  { category: "ก่อสร้าง/ซ่อมแซม", budget: 40, used: 24 },
  { category: "วัสดุสำนักงาน", budget: 20, used: 14 },
  { category: "บริการทั่วไป", budget: 40, used: 18 },
];

const cumulativeSpend = [
  { month: "ม.ค.", งบประมาณ: 26.7, ใช้จ่ายจริง: 14.2, คาดการณ์: null },
  { month: "ก.พ.", งบประมาณ: 53.3, ใช้จ่ายจริง: 30.8, คาดการณ์: null },
  { month: "มี.ค.", งบประมาณ: 80.0, ใช้จ่ายจริง: 48.5, คาดการณ์: null },
  { month: "เม.ย.", งบประมาณ: 106.7, ใช้จ่ายจริง: 65.2, คาดการณ์: null },
  { month: "พ.ค.", งบประมาณ: 133.3, ใช้จ่ายจริง: 84.0, คาดการณ์: null },
  { month: "มิ.ย.", งบประมาณ: 160.0, ใช้จ่ายจริง: 102.6, คาดการณ์: null },
  { month: "ก.ค.", งบประมาณ: 186.7, ใช้จ่ายจริง: 120.8, คาดการณ์: 120.8 },
  { month: "ส.ค.", งบประมาณ: 213.3, ใช้จ่ายจริง: null, คาดการณ์: 139.5 },
  { month: "ก.ย.", งบประมาณ: 240.0, ใช้จ่ายจริง: null, คาดการณ์: 158.2 },
  { month: "ต.ค.", งบประมาณ: 266.7, ใช้จ่ายจริง: null, คาดการณ์: 178.6 },
  { month: "พ.ย.", งบประมาณ: 293.3, ใช้จ่ายจริง: null, คาดการณ์: 200.4 },
  { month: "ธ.ค.", งบประมาณ: 320.0, ใช้จ่ายจริง: null, คาดการณ์: 246.0 },
];

function TabBudget() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard icon={TrendingUp} label="งบจัดซื้อรวม" value="฿320M" sub="ปีงบประมาณ 2567" color={PRIMARY} />
        <KPICard icon={TrendingUp} label="ใช้แล้ว" value="฿218M" sub="68% ของงบทั้งหมด" color={ACCENT} />
        <KPICard icon={TrendingUp} label="Savings" value="฿28M" sub="9% ประหยัดได้" color="#16A34A" />
        <KPICard icon={TrendingUp} label="Forecast คงเหลือ" value="฿74M" sub="คาดการณ์ Q4" color="#D97706" />
      </div>

      <SectionCard title="งบประมาณตามหมวดหมู่ (ล้านบาท)">
        <div style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={budgetByCategory} margin={{ top: 4, right: 16, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} unit="M" />
              <Tooltip formatter={(v) => `฿${v}M`} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="budget" fill="#BAE6FD" name="งบประมาณ" radius={[3, 3, 0, 0]} />
              <Bar dataKey="used" fill={PRIMARY} name="ใช้แล้ว" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title="Cumulative Spend vs Budget (ล้านบาท) + Forecast">
        <div className="mb-2 flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="inline-block w-6 h-0.5" style={{ backgroundColor: "#BAE6FD" }}></span>
            งบประมาณสะสม
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-6 h-0.5" style={{ backgroundColor: PRIMARY }}></span>
            ใช้จ่ายจริง
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-6 border-t-2 border-dashed" style={{ borderColor: "#F59E0B" }}></span>
            คาดการณ์
          </span>
        </div>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cumulativeSpend} margin={{ top: 4, right: 16, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="budgetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#BAE6FD" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#BAE6FD" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={PRIMARY} stopOpacity={0.5} />
                  <stop offset="95%" stopColor={PRIMARY} stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} unit="M" />
              <Tooltip formatter={(v) => v !== null ? `฿${v}M` : "-"} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area
                type="monotone"
                dataKey="งบประมาณ"
                stroke="#7DD3FC"
                strokeWidth={2}
                fill="url(#budgetGrad)"
                connectNulls
                name="งบประมาณสะสม"
              />
              <Area
                type="monotone"
                dataKey="ใช้จ่ายจริง"
                stroke={PRIMARY}
                strokeWidth={2.5}
                fill="url(#actualGrad)"
                connectNulls
                name="ใช้จ่ายจริง"
              />
              <Area
                type="monotone"
                dataKey="คาดการณ์"
                stroke="#F59E0B"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#forecastGrad)"
                connectNulls
                name="คาดการณ์"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title="สรุปการใช้งบประมาณตามหมวดหมู่">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b">
                <th className="pb-2 text-left">หมวดหมู่</th>
                <th className="pb-2 text-right">งบประมาณ</th>
                <th className="pb-2 text-right">ใช้แล้ว</th>
                <th className="pb-2 text-right">คงเหลือ</th>
                <th className="pb-2 text-center">% การใช้งาน</th>
              </tr>
            </thead>
            <tbody>
              {budgetByCategory.map((b, i) => {
                const pct = Math.round((b.used / b.budget) * 100);
                const remaining = b.budget - b.used;
                return (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2 font-medium text-gray-800">{b.category}</td>
                    <td className="py-2 text-right text-gray-700">฿{b.budget}M</td>
                    <td className="py-2 text-right font-medium" style={{ color: PRIMARY }}>฿{b.used}M</td>
                    <td className="py-2 text-right text-gray-600">฿{remaining}M</td>
                    <td className="py-2 min-w-32">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: pct >= 90 ? "#EF4444" : pct >= 70 ? "#F59E0B" : "#16A34A"
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 w-8 text-right">{pct}%</span>
                      </div>
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

// ─── Main Component ───────────────────────────────────────────────────────────

const TABS = [
  { id: "purchasing", label: "การจัดซื้อ", icon: ShoppingCart },
  { id: "contracts", label: "สัญญา", icon: FileText },
  { id: "vendor", label: "Vendor", icon: Users },
  { id: "budget", label: "Budget Utilization", icon: TrendingUp },
];

export default function Procurement() {
  const [activeTab, setActiveTab] = useState("purchasing");
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
      case "purchasing": return <TabPurchasing />;
      case "contracts": return <TabContracts />;
      case "vendor": return <TabVendor />;
      case "budget": return <TabBudget />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <DashboardHeroCard
        header={
          <DashboardPageHeader
            icon={ShoppingCart}
            title="ระบบจัดการจัดซื้อจัดจ้าง"
            subtitle={`Procurement Management Dashboard • ข้อมูล ณ วันที่ ${today}`}
          />
        }
        filter={
          <DashboardFilterBar
            actions={
              <>
                <button
                  className="rounded-lg bg-[#0EA5E9] px-3 py-1.5 text-sm font-medium text-white"
                  style={{ backgroundColor: ACCENT }}
                  onClick={() => {}}
                  type="button"
                >
                  ค้นหา
                </button>
                <button
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                  onClick={() => {
                    setDateFrom("2024-01-01");
                    setDateTo("2024-12-31");
                    setFiscalYear("2567");
                    setQuarter("");
                  }}
                  type="button"
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
                className="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
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
                className="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500">ถึง</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500">ไตรมาส</label>
              <select
                value={quarter}
                onChange={(e) => setQuarter(e.target.value)}
                className="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
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

      {/* Tab Content */}
      <div>{renderTab()}</div>

      {/* Footer */}
      <p className="mt-6 text-center text-xs text-gray-400">
        ข้อมูล ณ วันที่ {today} &nbsp;|&nbsp; ปีงบประมาณ {fiscalYear}
        {quarter ? ` | ${quarter}` : ""}
        &nbsp;|&nbsp; ระบบจัดการจัดซื้อจัดจ้าง HAI Dashboard
      </p>
    </div>
  );
}
