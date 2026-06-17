import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BarChart2,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Download,
  FileText,
  FlaskConical,
  Plus,
  Save,
  Settings2,
  Sigma,
  Smartphone,
  Tablet,
  AlertTriangle,
  X,
} from "lucide-react";
import { scheduledReports } from "../data/mockReports";

const MOCK_DATA = {
  การเงิน: {
    barLabel: "รายรับ (ล้านบาท)",
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
  },
  พัสดุ: {
    barLabel: "มูลค่าจัดซื้อ (พันบาท)",
    bar: [
      { name: "เวชภัณฑ์", value: 8200, value2: 7600 },
      { name: "ครุภัณฑ์", value: 5400, value2: 4900 },
      { name: "วัสดุสิ้นเปลือง", value: 3100, value2: 2900 },
      { name: "บริการ", value: 4700, value2: 5100 },
      { name: "อาหาร", value: 2200, value2: 2400 },
      { name: "อื่นๆ", value: 1800, value2: 1600 },
    ],
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
  },
  การรับรอง: {
    barLabel: "คะแนนการรับรอง (%)",
    bar: [
      { name: "เหนือ", value: 72, value2: 68 },
      { name: "กลาง", value: 85, value2: 80 },
      { name: "อีสาน", value: 64, value2: 70 },
      { name: "ใต้", value: 78, value2: 74 },
      { name: "ตะวันตก", value: 69, value2: 65 },
      { name: "กทม.", value: 92, value2: 88 },
    ],
    line: [
      { name: "2562", actual: 68, budget: 70 },
      { name: "2563", actual: 71, budget: 72 },
      { name: "2564", actual: 74, budget: 75 },
      { name: "2565", actual: 79, budget: 78 },
      { name: "2566", actual: 83, budget: 80 },
      { name: "2567", actual: 85, budget: 85 },
    ],
  },
  นโยบาย: {
    barLabel: "อัตราบรรลุ (%)",
    bar: [
      { name: "KPI 1", value: 88, value2: 82 },
      { name: "KPI 2", value: 74, value2: 79 },
      { name: "KPI 3", value: 91, value2: 87 },
      { name: "KPI 4", value: 65, value2: 70 },
      { name: "KPI 5", value: 82, value2: 85 },
      { name: "KPI 6", value: 95, value2: 90 },
    ],
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

const STAT_FUNCTIONS = [
  { key: "running_total", label: "Running Total", description: "สะสมค่าต่อเนื่องตามลำดับเวลา" },
  { key: "difference", label: "Difference", description: "เปรียบเทียบค่ากับรายการก่อนหน้า" },
  { key: "percent_of_total", label: "Percent of Total", description: "คำนวณสัดส่วนต่อยอดรวมทั้งหมด" },
  { key: "moving_average", label: "Moving Average", description: "หาแนวโน้มเฉลี่ยแบบเคลื่อนที่ 3 ช่วง" },
];

const CALC_TEMPLATES = {
  "Budget Variance %": {
    formula: "((actual - budget) / budget) * 100",
    dataType: "Percentage",
  },
  "Performance Gap": {
    formula: "actual - budget",
    dataType: "Number",
  },
  "Risk Index": {
    formula: "(100 - actual) + difference",
    dataType: "Score",
  },
};

const ANALYTICS_CONNECTORS = [
  {
    name: "Python Notebook",
    icon: Code2,
    status: "พร้อมเชื่อมต่อ",
    detail: "เรียกใช้โมเดลพยากรณ์, clustering และ script สำหรับ ETL/ML",
  },
  {
    name: "R Script",
    icon: FlaskConical,
    status: "พร้อมเชื่อมต่อ",
    detail: "รองรับสถิติขั้นสูง, control chart และ regression model",
  },
];

const DEFAULT_CALC_FIELDS = [
  {
    id: 1,
    name: "Budget Variance %",
    formula: "((actual - budget) / budget) * 100",
    dataType: "Percentage",
  },
  {
    id: 2,
    name: "Performance Gap",
    formula: "actual - budget",
    dataType: "Number",
  },
];

function Toggle({ enabled, onChange, label, description }) {
  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative mt-0.5 inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors ${
          enabled ? "bg-[#0D5C8F]" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </button>
      <div>
        <p className="text-xs font-semibold text-gray-700">{label}</p>
        {description ? <p className="mt-0.5 text-[11px] leading-tight text-gray-400">{description}</p> : null}
      </div>
    </div>
  );
}

function buildStatSeries(rows, mode) {
  const total = rows.reduce((sum, row) => sum + row.actual, 0);

  return rows.map((row, index) => {
    const previous = rows[index - 1]?.actual ?? row.actual;
    const runningTotal = rows.slice(0, index + 1).reduce((sum, item) => sum + item.actual, 0);
    const difference = row.actual - previous;
    const percentOfTotal = total === 0 ? 0 : (row.actual / total) * 100;
    const movingWindow = rows.slice(Math.max(0, index - 2), index + 1);
    const movingAverage = movingWindow.reduce((sum, item) => sum + item.actual, 0) / movingWindow.length;

    return {
      name: row.name,
      base: row.actual,
      budget: row.budget,
      running_total: runningTotal,
      difference,
      percent_of_total: Number(percentOfTotal.toFixed(2)),
      moving_average: Number(movingAverage.toFixed(2)),
      activeValue:
        mode === "running_total"
          ? runningTotal
          : mode === "difference"
            ? difference
            : mode === "percent_of_total"
              ? Number(percentOfTotal.toFixed(2))
              : Number(movingAverage.toFixed(2)),
    };
  });
}

function evaluateCalculatedField(formula, actual, budget, difference) {
  switch (formula) {
    case "((actual - budget) / budget) * 100":
      return budget === 0 ? 0 : Number((((actual - budget) / budget) * 100).toFixed(2));
    case "actual - budget":
      return actual - budget;
    case "(100 - actual) + difference":
      return Number((100 - actual + difference).toFixed(2));
    default:
      return Number((actual * 1.05).toFixed(2));
  }
}

function formatValue(value, dataType) {
  if (dataType === "Percentage") return `${Number(value).toFixed(2)}%`;
  if (Math.abs(value) >= 1000) return Number(value).toLocaleString();
  return `${Number(value).toFixed(2)}`;
}

export default function SelfService() {
  const [selectedTopic, setSelectedTopic] = useState("การเงิน");
  const [selectedProvince, setSelectedProvince] = useState("ทั้งหมด");
  const [startMonth, setStartMonth] = useState("2567-01");
  const [selectedHospitalType, setSelectedHospitalType] = useState("ทั้งหมด");
  const [selectedRegion, setSelectedRegion] = useState("ทั้งหมด");
  const [selectedStatFunction, setSelectedStatFunction] = useState("running_total");
  const [analyticsLanguage, setAnalyticsLanguage] = useState("Python");
  const [reportKey, setReportKey] = useState(0);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleFreq, setScheduleFreq] = useState("รายสัปดาห์");
  const [scheduleEmail, setScheduleEmail] = useState("");
  const [saveStatus, setSaveStatus] = useState(null);
  const [scheduledList, setScheduledList] = useState(scheduledReports);
  const [calcFields, setCalcFields] = useState(DEFAULT_CALC_FIELDS);
  const [newCalcField, setNewCalcField] = useState({
    name: "Budget Variance %",
    formula: CALC_TEMPLATES["Budget Variance %"].formula,
    dataType: CALC_TEMPLATES["Budget Variance %"].dataType,
  });

  const topicData = MOCK_DATA[selectedTopic] || MOCK_DATA["การเงิน"];

  const statSeries = useMemo(
    () => buildStatSeries(topicData.line, selectedStatFunction),
    [topicData, selectedStatFunction, reportKey]
  );

  const derivedKpis = useMemo(() => {
    const lastPoint = statSeries[statSeries.length - 1];
    const totalActual = statSeries.reduce((sum, item) => sum + item.base, 0);
    const totalBudget = statSeries.reduce((sum, item) => sum + item.budget, 0);
    const diffAverage = statSeries.reduce((sum, item) => sum + item.difference, 0) / statSeries.length;

    return [
      { label: "จำนวนข้อมูล", value: `${statSeries.length} ช่วง`, tone: "blue" },
      { label: "Actual รวม", value: totalActual.toLocaleString(), tone: "emerald" },
      { label: "Budget รวม", value: totalBudget.toLocaleString(), tone: "amber" },
      { label: "Difference เฉลี่ย", value: diffAverage.toFixed(2), tone: "slate" },
      {
        label: STAT_FUNCTIONS.find((item) => item.key === selectedStatFunction)?.label || "Stat",
        value: lastPoint ? formatValue(lastPoint.activeValue, selectedStatFunction === "percent_of_total" ? "Percentage" : "Number") : "0",
        tone: "indigo",
      },
    ];
  }, [selectedStatFunction, statSeries]);

  const calcPreviewRows = useMemo(() => {
    const activeRows = statSeries.slice(-4);

    return activeRows.map((row) => {
      const values = calcFields.reduce((accumulator, field) => {
        accumulator[field.name] = evaluateCalculatedField(field.formula, row.base, row.budget, row.difference);
        return accumulator;
      }, {});

      return { ...row, calculated: values };
    });
  }, [calcFields, statSeries]);

  const handleReset = () => {
    setSelectedTopic("การเงิน");
    setSelectedProvince("ทั้งหมด");
    setStartMonth("2567-01");
    setSelectedHospitalType("ทั้งหมด");
    setSelectedRegion("ทั้งหมด");
    setSelectedStatFunction("running_total");
  };

  const handleBuildReport = () => setReportKey((value) => value + 1);

  const handleAddCalculatedField = () => {
    if (!newCalcField.name.trim() || !newCalcField.formula.trim()) return;

    setCalcFields((previous) => [
      ...previous,
      {
        id: Date.now(),
        name: newCalcField.name.trim(),
        formula: newCalcField.formula.trim(),
        dataType: newCalcField.dataType,
      },
    ]);
  };

  const handleCalcTemplateChange = (templateName) => {
    const template = CALC_TEMPLATES[templateName];
    setNewCalcField({
      name: templateName,
      formula: template.formula,
      dataType: template.dataType,
    });
  };

  const handleSave = () => {
    if (scheduleEnabled && !scheduleEmail.trim()) {
      setSaveStatus("error");
      return;
    }

    if (scheduleEnabled) {
      setScheduledList((previous) => [
        {
          id: Date.now(),
          title: `รายงาน ${selectedTopic}`,
          frequency: scheduleFreq,
          nextRun: "พรุ่งนี้",
          recipients: [scheduleEmail],
          format: "PDF",
          status: "ใช้งาน",
        },
        ...previous,
      ]);
    }

    setSaveStatus("success");
    window.setTimeout(() => setSaveStatus(null), 3500);
  };

  return (
    <div className="min-h-full bg-[#F4F7FB]">
      <div className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Self-Service Analytics Workspace</h1>
          </div>
        </div>

        {saveStatus === "success" ? (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
            <CheckCircle2 size={14} />
            บันทึกการตั้งค่าเรียบร้อยแล้ว
          </div>
        ) : null}
        {saveStatus === "error" ? (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
            <AlertTriangle size={14} />
            กรุณากรอกอีเมลผู้รับก่อนบันทึก Schedule Delivery
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 sm:p-6 xl:grid-cols-[320px,minmax(0,1fr)]">
        <aside className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm xl:sticky xl:top-20 xl:h-fit">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Settings2 size={16} className="text-[#0D5C8F]" />
              <h2 className="text-sm font-semibold text-gray-800">ตัวกรองข้อมูล</h2>
            </div>
            <button
              onClick={handleReset}
              className="text-xs font-medium text-[#0D5C8F] transition-colors hover:text-[#0a4a73]"
            >
              ล้างค่า
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">หัวข้อ</label>
              <select
                value={selectedTopic}
                onChange={(event) => setSelectedTopic(event.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
              >
                <option>การเงิน</option>
                <option>พัสดุ</option>
                <option>การรับรอง</option>
                <option>นโยบาย</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">ภาค</label>
              <select
                value={selectedRegion}
                onChange={(event) => setSelectedRegion(event.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
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

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">ประเภทโรงพยาบาล</label>
              <select
                value={selectedHospitalType}
                onChange={(event) => setSelectedHospitalType(event.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
              >
                <option>ทั้งหมด</option>
                <option>รพ.ทั่วไป</option>
                <option>รพ.ชุมชน</option>
                <option>รพ.เอกชน</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">ช่วงเวลา</label>
              <input
                type="month"
                value={startMonth}
                onChange={(event) => setStartMonth(event.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">จังหวัด</label>
              <select
                value={selectedProvince}
                onChange={(event) => setSelectedProvince(event.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
              >
                <option>ทั้งหมด</option>
                {PROVINCES.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                onClick={handleBuildReport}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D5C8F] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a4a73]"
              >
                <BarChart2 size={15} />
                สร้างรายงาน
              </button>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <div className="mb-3 flex items-center gap-2">
                <Calendar size={16} className="text-[#0D5C8F]" />
                <h2 className="text-sm font-semibold text-gray-800">Schedule Delivery</h2>
              </div>

              <div className="space-y-3">
                <Toggle
                  enabled={scheduleEnabled}
                  onChange={setScheduleEnabled}
                  label="ส่งออกอัตโนมัติ"
                  description="ส่งรายงานทางอีเมลตามกำหนด"
                />

                {scheduleEnabled ? (
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-3">
                    <div className="space-y-3">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-600">รูปแบบไฟล์</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button className="flex items-center justify-center gap-1.5 rounded-xl border border-red-100 bg-red-50 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100">
                            <FileText size={13} />
                            PDF
                          </button>
                          <button className="flex items-center justify-center gap-1.5 rounded-xl border border-green-100 bg-green-50 py-2 text-xs font-semibold text-green-600 transition-colors hover:bg-green-100">
                            <Download size={13} />
                            CSV
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {["รายวัน", "รายสัปดาห์", "รายเดือน"].map((frequency) => (
                          <button
                            key={frequency}
                            onClick={() => setScheduleFreq(frequency)}
                            className={`flex-1 rounded-lg border px-2 py-1.5 text-[11px] font-medium ${
                              scheduleFreq === frequency
                                ? "border-[#0D5C8F] bg-[#0D5C8F] text-white"
                                : "border-gray-200 bg-white text-gray-500"
                            }`}
                          >
                            {frequency.replace("ราย", "")}
                          </button>
                        ))}
                      </div>
                      <input
                        type="email"
                        value={scheduleEmail}
                        onChange={(event) => setScheduleEmail(event.target.value)}
                        placeholder="example@hai.go.th"
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                  </div>
                ) : null}

                {scheduleEnabled ? (
                  <button
                    onClick={handleSave}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D5C8F] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a4a73]"
                  >
                    <Save size={14} />
                    บันทึกการตั้งค่า
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </aside>

        <main className="min-w-0 space-y-4">
          <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <Clock size={16} className="text-[#0D5C8F]" />
              <h2 className="text-base font-semibold text-gray-900">Scheduled Deliveries</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-3 py-2 text-left font-medium text-gray-500">ชื่อรายงาน</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-500">ความถี่</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-500">ครั้งต่อไป</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-500">ผู้รับ</th>
                    <th className="px-3 py-2 text-center font-medium text-gray-500">รูปแบบ</th>
                    <th className="px-3 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {scheduledList.map((item) => (
                    <tr key={item.id} className="border-b border-gray-50">
                      <td className="px-3 py-3 font-medium text-gray-700">{item.title}</td>
                      <td className="px-3 py-3 text-gray-500">{item.frequency}</td>
                      <td className="px-3 py-3 text-gray-500">{item.nextRun}</td>
                      <td className="px-3 py-3 text-gray-500">{item.recipients?.join(", ") || "-"}</td>
                      <td className="px-3 py-3 text-center">
                        <span className={`rounded-full px-2 py-0.5 font-medium ${item.format === "CSV" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                          {item.format || "PDF"}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <button
                          onClick={() => setScheduledList((previous) => previous.filter((row) => row.id !== item.id))}
                          className="rounded-lg p-1 text-gray-300 transition-colors hover:bg-red-50 hover:text-red-400"
                        >
                          <X size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
