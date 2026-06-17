import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  Building2,
  Clock,
  Database,
  DollarSign,
  GripVertical,
  LayoutGrid,
  MapPin,
  Plus,
  ShoppingCart,
  Shield,
  Users,
  X,
} from 'lucide-react'
import KPICard from '../components/KPICard'

const monthlyScores = [
  { label: 'ม.ค.', score: 79.2, target: 80 },
  { label: 'ก.พ.', score: 80.1, target: 80 },
  { label: 'มี.ค.', score: 81.5, target: 81 },
  { label: 'เม.ย.', score: 80.8, target: 81 },
  { label: 'พ.ค.', score: 82.3, target: 82 },
  { label: 'มิ.ย.', score: 83.1, target: 82 },
  { label: 'ก.ค.', score: 82.7, target: 83 },
  { label: 'ส.ค.', score: 83.9, target: 83 },
  { label: 'ก.ย.', score: 84.2, target: 84 },
  { label: 'ต.ค.', score: 83.5, target: 84 },
  { label: 'พ.ย.', score: 84.8, target: 85 },
  { label: 'ธ.ค.', score: 85.1, target: 85 },
]

const hospitalsByRegion = [
  { label: 'กลาง', value: 95 },
  { label: 'เหนือ', value: 78 },
  { label: 'ตะวันออกเฉียงเหนือ', value: 125 },
  { label: 'ตะวันออก', value: 45 },
  { label: 'ตะวันตก', value: 42 },
  { label: 'ใต้', value: 65 },
]

const accreditationStatus = [
  { label: 'รับรอง', value: 338, color: '#22C55E' },
  { label: 'รอผล', value: 86, color: '#F59E0B' },
  { label: 'หมดอายุ', value: 26, color: '#EF4444' },
]

const budgetUtilization = [
  { label: 'Q1', used: 72, approved: 75 },
  { label: 'Q2', used: 78, approved: 80 },
  { label: 'Q3', used: 84, approved: 82 },
  { label: 'Q4', used: 88, approved: 87 },
]

const activities = [
  { id: 1, text: 'โรงพยาบาลนครสวรรค์ผ่านการรับรอง HA ระดับ 3', time: '15 นาทีที่แล้ว' },
  { id: 2, text: 'รายงานงบประมาณ Q2/2567 พร้อมสำหรับตรวจสอบ', time: '2 ชั่วโมงที่แล้ว' },
  { id: 3, text: 'ส่งรายงานประจำเดือนพฤษภาคมให้คณะกรรมการแล้ว', time: '1 วันที่แล้ว' },
]

const HEALTH_REGIONS = [
  { id: 1, name: 'เขต 1 เชียงใหม่', provinces: 8, hospitals: 42, score: 84, cx: 175, cy: 105 },
  { id: 2, name: 'เขต 2 พิษณุโลก', provinces: 5, hospitals: 28, score: 79, cx: 205, cy: 155 },
  { id: 3, name: 'เขต 3 นครสวรรค์', provinces: 5, hospitals: 31, score: 82, cx: 195, cy: 195 },
  { id: 4, name: 'เขต 4 สระบุรี', provinces: 8, hospitals: 55, score: 88, cx: 220, cy: 235 },
  { id: 5, name: 'เขต 5 ราชบุรี', provinces: 8, hospitals: 47, score: 80, cx: 185, cy: 270 },
  { id: 6, name: 'เขต 6 ระยอง', provinces: 8, hospitals: 38, score: 76, cx: 255, cy: 255 },
  { id: 7, name: 'เขต 7 ขอนแก่น', provinces: 5, hospitals: 44, score: 77, cx: 255, cy: 185 },
  { id: 8, name: 'เขต 8 อุดรธานี', provinces: 7, hospitals: 39, score: 74, cx: 240, cy: 135 },
  { id: 9, name: 'เขต 9 นครราชสีมา', provinces: 4, hospitals: 35, score: 81, cx: 255, cy: 220 },
  { id: 10, name: 'เขต 10 อุบลราชธานี', provinces: 5, hospitals: 30, score: 73, cx: 295, cy: 215 },
  { id: 11, name: 'เขต 11 สุราษฎร์ธานี', provinces: 7, hospitals: 34, score: 83, cx: 210, cy: 330 },
  { id: 12, name: 'เขต 12 สงขลา', provinces: 7, hospitals: 27, score: 86, cx: 220, cy: 390 },
  { id: 13, name: 'เขต 13 กรุงเทพฯ', provinces: 1, hospitals: 67, score: 91, cx: 225, cy: 248 },
]

const PROVINCE_HEATMAP = [
  { name: 'กรุงเทพฯ', score: 91, col: 5, row: 7 },
  { name: 'เชียงใหม่', score: 85, col: 3, row: 2 },
  { name: 'เชียงราย', score: 80, col: 4, row: 1 },
  { name: 'ลำปาง', score: 78, col: 3, row: 3 },
  { name: 'แพร่', score: 76, col: 4, row: 3 },
  { name: 'พิษณุโลก', score: 79, col: 5, row: 4 },
  { name: 'นครสวรรค์', score: 82, col: 4, row: 5 },
  { name: 'อยุธยา', score: 84, col: 5, row: 6 },
  { name: 'ขอนแก่น', score: 77, col: 7, row: 5 },
  { name: 'อุดรธานี', score: 74, col: 7, row: 3 },
  { name: 'อุบลราชธานี', score: 73, col: 9, row: 6 },
  { name: 'นครราชสีมา', score: 81, col: 7, row: 6 },
  { name: 'ชลบุรี', score: 86, col: 7, row: 7 },
  { name: 'ระยอง', score: 83, col: 8, row: 7 },
  { name: 'สุราษฎร์ธานี', score: 83, col: 5, row: 10 },
  { name: 'สงขลา', score: 86, col: 6, row: 12 },
  { name: 'ภูเก็ต', score: 88, col: 4, row: 11 },
  { name: 'ราชบุรี', score: 80, col: 4, row: 8 },
  { name: 'กาญจนบุรี', score: 75, col: 3, row: 7 },
  { name: 'ประจวบฯ', score: 78, col: 4, row: 9 },
]

const HOSPITAL_DOTS = [
  { name: 'รพ.ศิริราช', x: 224, y: 248, score: 92, type: 'A' },
  { name: 'รพ.จุฬา', x: 230, y: 252, score: 88, type: 'A' },
  { name: 'รพ.เชียงใหม่', x: 175, y: 108, score: 85, type: 'S' },
  { name: 'รพ.ขอนแก่น', x: 258, y: 187, score: 79, type: 'S' },
  { name: 'รพ.สงขลา', x: 222, y: 392, score: 83, type: 'S' },
  { name: 'รพ.พิษณุโลก', x: 207, y: 158, score: 78, type: 'M' },
  { name: 'รพ.อุดร', x: 243, y: 137, score: 74, type: 'M' },
  { name: 'รพ.ชลบุรี', x: 258, y: 258, score: 86, type: 'M' },
  { name: 'รพ.ภูเก็ต', x: 193, y: 370, score: 88, type: 'M' },
  { name: 'รพ.นครราชสีมา', x: 256, y: 222, score: 76, type: 'S' },
  { name: 'รพ.อุบลฯ', x: 297, y: 217, score: 73, type: 'S' },
  { name: 'รพ.สุราษฎร์', x: 212, y: 332, score: 83, type: 'M' },
  { name: 'รพ.หาดใหญ่', x: 228, y: 405, score: 81, type: 'M' },
]

function scoreToColor(score) {
  if (score >= 88) return '#16a34a'
  if (score >= 82) return '#22c55e'
  if (score >= 77) return '#f59e0b'
  if (score >= 73) return '#f97316'
  return '#ef4444'
}

function scoreToFill(score) {
  if (score >= 88) return 'bg-green-600'
  if (score >= 82) return 'bg-green-400'
  if (score >= 77) return 'bg-amber-400'
  if (score >= 73) return 'bg-orange-400'
  return 'bg-red-500'
}

// Simplified Thailand outline path (SVG viewBox 0 0 420 480)
const THAILAND_PATH = 'M170,30 L185,28 L200,32 L215,38 L225,50 L230,65 L225,80 L215,90 L220,105 L230,115 L235,130 L238,145 L235,160 L240,175 L250,185 L260,195 L265,210 L268,225 L265,238 L258,248 L270,258 L278,268 L275,280 L268,290 L260,298 L255,310 L250,325 L245,338 L242,350 L238,362 L235,374 L232,388 L228,400 L225,412 L222,425 L220,438 L215,448 L208,455 L200,460 L192,455 L185,448 L180,435 L183,422 L185,410 L183,398 L180,385 L178,372 L175,360 L170,348 L165,335 L162,322 L158,310 L155,298 L153,285 L158,275 L163,265 L165,252 L162,240 L158,228 L155,215 L152,200 L155,185 L158,170 L155,158 L150,148 L148,135 L152,122 L158,112 L160,100 L158,88 L155,75 L157,62 L162,50 L167,40 Z'

const SPATIAL_TABS = [
  { id: 'heatmap', label: 'Heatmap จังหวัด' },
  { id: 'region', label: 'เขตสุขภาพ' },
  { id: 'hospital', label: 'Hospital Locations' },
]

const quickLinks = [
  { path: '/financial', icon: DollarSign, label: 'ข้อมูลการเงิน', desc: 'งบประมาณและรายรับรายจ่าย', color: 'from-blue-500 to-blue-700' },
  { path: '/procurement', icon: ShoppingCart, label: 'ข้อมูลพัสดุ', desc: 'จัดซื้อจัดจ้างและพัสดุ', color: 'from-teal-500 to-teal-700' },
  { path: '/accreditation', icon: Award, label: 'การรับรองคุณภาพ', desc: 'HA และการประเมิน', color: 'from-green-500 to-green-700' },
  { path: '/policy', icon: Shield, label: 'ข้อมูลนโยบาย', desc: 'ยุทธศาสตร์และแผนงาน', color: 'from-purple-500 to-purple-700' },
]

const chartTypeOptions = [
  { value: 'line', label: 'Line' },
  { value: 'bar', label: 'Bar' },
  { value: 'pie', label: 'Pie' },
  { value: 'area', label: 'Area' },
]

const chartTemplates = {
  line: {
    title: 'แนวโน้มคะแนน HA',
    subtitle: 'ข้อมูลรายเดือน',
    minW: 320,
    minH: 280,
    width: 560,
    height: 340,
  },
  bar: {
    title: 'จำนวนโรงพยาบาลรายภาค',
    subtitle: 'จำแนกตามภูมิภาค',
    minW: 320,
    minH: 280,
    width: 520,
    height: 340,
  },
  pie: {
    title: 'สถานะการรับรอง',
    subtitle: 'สัดส่วนภาพรวม',
    minW: 300,
    minH: 280,
    width: 420,
    height: 340,
  },
  area: {
    title: 'Budget Utilization',
    subtitle: 'ภาพรวมรายไตรมาส',
    minW: 320,
    minH: 280,
    width: 560,
    height: 340,
  },
}

const initialCharts = [
  { id: 1, type: 'line', ...chartTemplates.line },
  { id: 2, type: 'bar', ...chartTemplates.bar },
  { id: 3, type: 'pie', ...chartTemplates.pie },
]

function renderChartByType(type, chartId) {
  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={monthlyScores}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} />
          <YAxis domain={[75, 90]} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Line type="monotone" dataKey="score" stroke="#0D5C8F" strokeWidth={2.5} dot={{ r: 3 }} name="คะแนนจริง" />
          <Line type="monotone" dataKey="target" stroke="#22C55E" strokeWidth={2} strokeDasharray="5 5" dot={false} name="เป้าหมาย" />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={hospitalsByRegion} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10 }} formatter={(value) => [value, 'โรงพยาบาล']} />
          <Bar dataKey="value" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  if (type === 'pie') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={accreditationStatus} dataKey="value" nameKey="label" cx="50%" cy="48%" innerRadius={55} outerRadius={88} paddingAngle={3}>
            {accreditationStatus.map((entry) => (
              <Cell key={entry.label} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10 }} />
          <Legend iconSize={10} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={budgetUtilization}>
        <defs>
          <linearGradient id={`builder-area-${chartId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22C55E" stopOpacity={0.28} />
            <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="label" tick={{ fontSize: 11 }} />
        <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10 }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Area type="monotone" dataKey="used" stroke="#22C55E" fill={`url(#builder-area-${chartId})`} strokeWidth={2.5} name="ใช้จริง" />
        <Area type="monotone" dataKey="approved" stroke="#0D5C8F" fillOpacity={0} strokeWidth={2} name="อนุมัติ" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function BuilderCard({
  chart,
  onDelete,
  onUpdate,
  onResizeStart,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
}) {
  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, chart.id)}
      onDragOver={(event) => onDragOver(event, chart.id)}
      onDrop={(event) => onDrop(event, chart.id)}
      className={`relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all ${
        isDragging ? 'opacity-50 ring-2 ring-[#0D5C8F]/30' : 'hover:shadow-md'
      }`}
      style={{
        width: `${chart.width}px`,
        minWidth: `${chart.minW}px`,
        minHeight: `${chart.minH}px`,
        height: `${chart.height}px`,
        resize: 'none',
      }}
    >
      <div className="mb-3 flex items-start gap-3">
        <button
          className="cursor-grab rounded-lg border border-gray-200 bg-gray-50 p-2 text-gray-400 active:cursor-grabbing"
          title="ลากเพื่อจัดเรียง"
        >
          <GripVertical size={15} />
        </button>

        <div className="min-w-0 flex-1 space-y-2">
          <input
            type="text"
            value={chart.title}
            onChange={(event) => onUpdate(chart.id, { title: event.target.value })}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-800 focus:border-[#0D5C8F] focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/15"
            placeholder="ชื่อกราฟ"
          />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr),160px]">
            <input
              type="text"
              value={chart.subtitle}
              onChange={(event) => onUpdate(chart.id, { subtitle: event.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-500 focus:border-[#0D5C8F] focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/15"
              placeholder="คำอธิบายกราฟ"
            />
            <select
              value={chart.type}
              onChange={(event) => onUpdate(chart.id, { type: event.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#0D5C8F] focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/15"
            >
              {chartTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => onDelete(chart.id)}
          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
          title="ลบกราฟ"
        >
          <X size={15} />
        </button>
      </div>

      <div className="h-[calc(100%-88px)] min-h-[170px] overflow-hidden rounded-xl border border-gray-100 bg-[#F7FAFC] p-2">
        {renderChartByType(chart.type, chart.id)}
      </div>

      <button
        onMouseDown={(event) => onResizeStart(event, chart.id)}
        className="absolute bottom-2 right-2 h-4 w-4 cursor-se-resize rounded-sm bg-[#0D5C8F]/15"
        title="ลากเพื่อปรับขนาด"
      />
    </div>
  )
}

export default function Home() {
  const [builderCharts, setBuilderCharts] = useState(initialCharts)
  const [newChartType, setNewChartType] = useState('line')
  const [spatialTab, setSpatialTab] = useState('heatmap')
  const [hoveredNode, setHoveredNode] = useState(null)
  const [draggingId, setDraggingId] = useState(null)
  const dragSourceIdRef = useRef(null)
  const resizeRef = useRef(null)

  const userRaw = localStorage.getItem('hai_user')
  const user = userRaw ? JSON.parse(userRaw) : { name: 'ผู้ใช้งาน' }
  const today = new Date().toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!resizeRef.current) return

      const { id, startX, startY, startWidth, startHeight, minW, minH } = resizeRef.current
      const nextWidth = Math.max(minW, startWidth + (event.clientX - startX))
      const nextHeight = Math.max(minH, startHeight + (event.clientY - startY))

      setBuilderCharts((previous) =>
        previous.map((chart) => (
          chart.id === id
            ? { ...chart, width: Math.min(920, nextWidth), height: Math.min(640, nextHeight) }
            : chart
        ))
      )
    }

    const handleMouseUp = () => {
      resizeRef.current = null
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const handleAddChart = () => {
    const template = chartTemplates[newChartType]
    setBuilderCharts((previous) => [
      ...previous,
      {
        id: Date.now(),
        type: newChartType,
        ...template,
      },
    ])
  }

  const handleUpdateChart = (id, patch) => {
    setBuilderCharts((previous) =>
      previous.map((chart) => {
        if (chart.id !== id) return chart

        if (patch.type) {
          const template = chartTemplates[patch.type]
          return {
            ...chart,
            ...patch,
            subtitle: patch.subtitle ?? template.subtitle,
            width: Math.max(chart.width, template.minW),
            height: Math.max(chart.height, template.minH),
            minW: template.minW,
            minH: template.minH,
          }
        }

        return { ...chart, ...patch }
      })
    )
  }

  const handleDeleteChart = (id) => {
    setBuilderCharts((previous) => previous.filter((chart) => chart.id !== id))
  }

  const handleDragStart = (event, id) => {
    dragSourceIdRef.current = id
    setDraggingId(id)
    event.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (event, targetId) => {
    event.preventDefault()
    const sourceId = dragSourceIdRef.current
    if (!sourceId || sourceId === targetId) {
      setDraggingId(null)
      return
    }

    setBuilderCharts((previous) => {
      const next = [...previous]
      const sourceIndex = next.findIndex((chart) => chart.id === sourceId)
      const targetIndex = next.findIndex((chart) => chart.id === targetId)
      if (sourceIndex === -1 || targetIndex === -1) return previous

      const [moved] = next.splice(sourceIndex, 1)
      next.splice(targetIndex, 0, moved)
      return next
    })

    setDraggingId(null)
    dragSourceIdRef.current = null
  }

  const handleResizeStart = (event, id) => {
    event.preventDefault()
    event.stopPropagation()
    const chart = builderCharts.find((item) => item.id === id)
    if (!chart) return

    resizeRef.current = {
      id,
      startX: event.clientX,
      startY: event.clientY,
      startWidth: chart.width,
      startHeight: chart.height,
      minW: chart.minW,
      minH: chart.minH,
    }
  }

  return (
    <div className="space-y-6 py-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
          <p className="mt-1 text-sm text-gray-500">
            สวัสดี, {user.name} • {today}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-3 py-2 text-green-700">
          <Activity size={14} />
          <span className="text-xs font-medium">พร้อมใช้งาน</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard
          title="Charts บนหน้า Overview"
          value={String(builderCharts.length)}
          subtitle="กำลังแสดงผล"
          icon={LayoutGrid}
          color="blue"
          trend="up"
          trendValue="+2"
          trendLabel="custom widgets"
        />
        <KPICard
          title="จำนวนโรงพยาบาลทั้งหมด"
          value="450"
          subtitle="ในระบบ HAI"
          icon={Building2}
          color="blue"
          trend="up"
          trendValue="+18"
          trendLabel="จากปีที่แล้ว"
        />
        <KPICard
          title="รับรองปีนี้"
          value="338"
          subtitle="ผ่านการรับรอง HA"
          icon={Award}
          color="green"
          trend="up"
          trendValue="+52"
          trendLabel="จากปีที่แล้ว"
        />
        <KPICard
          title="ผู้ใช้งานที่ใช้งานอยู่"
          value="127"
          subtitle="ออนไลน์ในวันนี้"
          icon={Users}
          color="purple"
          trend="up"
          trendValue="+8%"
          trendLabel="จากสัปดาห์ที่แล้ว"
        />
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-[#0D5C8F]" />
            <h2 className="text-sm font-semibold text-gray-800">Overview Canvas</h2>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
              drag & drop + resize
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={newChartType}
              onChange={(event) => setNewChartType(event.target.value)}
              className="rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#0D5C8F] focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/15"
            >
              {chartTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <button
              onClick={handleAddChart}
              className="flex items-center gap-2 rounded-xl bg-[#0D5C8F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0a4a73]"
            >
              <Plus size={14} />
              เพิ่ม Chart
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-start gap-4">
          {builderCharts.map((chart) => (
            <BuilderCard
              key={chart.id}
              chart={chart}
              isDragging={draggingId === chart.id}
              onDelete={handleDeleteChart}
              onUpdate={handleUpdateChart}
              onResizeStart={handleResizeStart}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </section>

      {/* Spatial Analytics */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#0D5C8F]" />
            <h2 className="text-sm font-semibold text-gray-800">Spatial Analytics Dashboard</h2>
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-700">แผนที่</span>
          </div>
          <div className="flex gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1">
            {SPATIAL_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSpatialTab(tab.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  spatialTab === tab.id
                    ? 'bg-white text-[#0D5C8F] shadow-sm ring-1 ring-gray-200'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Map SVG panel */}
          <div className="relative flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gradient-to-b from-sky-50 to-blue-50" style={{ width: 340, height: 460 }}>
            <svg viewBox="0 0 420 480" width="340" height="460" className="absolute inset-0">
              {/* Thailand silhouette */}
              <path d={THAILAND_PATH} fill="#e0f2fe" stroke="#93c5fd" strokeWidth="1.5" />

              {spatialTab === 'heatmap' && PROVINCE_HEATMAP.map((p) => (
                <rect
                  key={p.name}
                  x={p.col * 28 + 30}
                  y={p.row * 33 + 20}
                  width={24}
                  height={24}
                  rx={5}
                  fill={scoreToColor(p.score)}
                  fillOpacity={0.85}
                  stroke="white"
                  strokeWidth={1}
                  className="cursor-pointer transition-opacity hover:opacity-100"
                  onMouseEnter={() => setHoveredNode({ name: p.name, score: p.score, label: `คะแนน HA: ${p.score}` })}
                  onMouseLeave={() => setHoveredNode(null)}
                />
              ))}

              {spatialTab === 'region' && HEALTH_REGIONS.map((r) => (
                <g key={r.id} className="cursor-pointer" onMouseEnter={() => setHoveredNode({ name: r.name, score: r.score, label: `${r.hospitals} รพ. • คะแนน ${r.score}` })} onMouseLeave={() => setHoveredNode(null)}>
                  <circle cx={r.cx} cy={r.cy} r={18} fill={scoreToColor(r.score)} fillOpacity={0.8} stroke="white" strokeWidth={1.5} />
                  <text x={r.cx} y={r.cy + 1} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontWeight="700" fill="white">{r.id}</text>
                </g>
              ))}

              {spatialTab === 'hospital' && HOSPITAL_DOTS.map((h) => (
                <g key={h.name} className="cursor-pointer" onMouseEnter={() => setHoveredNode({ name: h.name, score: h.score, label: `ระดับ ${h.type} • คะแนน ${h.score}` })} onMouseLeave={() => setHoveredNode(null)}>
                  <circle cx={h.x} cy={h.y} r={h.type === 'A' ? 7 : h.type === 'S' ? 5.5 : 4} fill={scoreToColor(h.score)} stroke="white" strokeWidth={1.5} />
                </g>
              ))}
            </svg>

            {/* Tooltip */}
            {hoveredNode && (
              <div className="pointer-events-none absolute left-3 top-3 rounded-lg bg-gray-900/90 px-3 py-2 text-xs text-white shadow-lg">
                <div className="font-semibold">{hoveredNode.name}</div>
                <div className="mt-0.5 text-gray-300">{hoveredNode.label}</div>
              </div>
            )}

            {/* Legend */}
            <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded-lg bg-white/90 px-2 py-1.5 text-[10px] text-gray-600 shadow">
              {[['#16a34a', '≥88'], ['#22c55e', '82–87'], ['#f59e0b', '77–81'], ['#f97316', '73–76'], ['#ef4444', '<73']].map(([c, l]) => (
                <span key={l} className="flex items-center gap-1">
                  <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: c }} />
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* Side panel */}
          <div className="flex-1 min-w-0">
            {spatialTab === 'heatmap' && (
              <div>
                <p className="mb-3 text-xs text-gray-500">คะแนน HA รายจังหวัด — แสดงความเข้มของสีตามระดับคะแนน</p>
                <div className="grid grid-cols-2 gap-2">
                  {PROVINCE_HEATMAP.slice().sort((a, b) => b.score - a.score).map((p) => (
                    <div key={p.name} className="flex items-center gap-2 rounded-lg border border-gray-100 px-3 py-2">
                      <span className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${scoreToFill(p.score)}`} />
                      <span className="min-w-0 flex-1 truncate text-xs text-gray-700">{p.name}</span>
                      <span className="text-xs font-semibold text-gray-900">{p.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {spatialTab === 'region' && (
              <div>
                <p className="mb-3 text-xs text-gray-500">เขตสุขภาพ 13 เขต — จำนวนโรงพยาบาลและคะแนนเฉลี่ย</p>
                <div className="space-y-2">
                  {HEALTH_REGIONS.map((r) => (
                    <div key={r.id} className="flex items-center gap-3 rounded-lg border border-gray-100 px-3 py-2.5">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: scoreToColor(r.score) }}>{r.id}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="truncate text-xs font-medium text-gray-800">{r.name}</span>
                          <span className="ml-2 text-xs font-semibold text-gray-900">{r.score}</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                          <div className="h-full rounded-full transition-all" style={{ width: `${r.score}%`, background: scoreToColor(r.score) }} />
                        </div>
                      </div>
                      <span className="text-[11px] text-gray-400">{r.hospitals} รพ.</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {spatialTab === 'hospital' && (
              <div>
                <p className="mb-3 text-xs text-gray-500">Hospital Location Visualization — โรงพยาบาลหลักรายพื้นที่</p>
                <div className="mb-3 flex gap-3 text-[11px] text-gray-500">
                  {[['A', '#16a34a', 'ระดับ A (7+)'], ['S', '#22c55e', 'ระดับ S (5.5)'], ['M', '#f59e0b', 'ระดับ M (4)']].map(([t, c, l]) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <svg width="14" height="14"><circle cx="7" cy="7" r="5" fill={c} /></svg>
                      {l}
                    </span>
                  ))}
                </div>
                <div className="space-y-2">
                  {HOSPITAL_DOTS.map((h) => (
                    <div key={h.name} className="flex items-center gap-3 rounded-lg border border-gray-100 px-3 py-2">
                      <svg width="14" height="14" className="flex-shrink-0">
                        <circle cx="7" cy="7" r={h.type === 'A' ? 6 : h.type === 'S' ? 5 : 4} fill={scoreToColor(h.score)} />
                      </svg>
                      <span className="min-w-0 flex-1 truncate text-xs text-gray-700">{h.name}</span>
                      <span className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold text-white" style={{ background: scoreToColor(h.score) }}>{h.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr),340px]">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">กิจกรรมล่าสุด</h3>
            <button className="text-xs font-medium text-[#0D5C8F] hover:underline">ดูทั้งหมด</button>
          </div>
          <div className="space-y-3">
            {activities.map((item) => (
              <div key={item.id} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <p className="text-sm text-gray-700">{item.text}</p>
                <p className="mt-1 flex items-center gap-1 text-[11px] text-gray-400">
                  <Clock size={10} />
                  {item.time}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-gray-800">เข้าถึงด่วน</h3>
          <div className="grid grid-cols-1 gap-3">
            {quickLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-xl bg-gradient-to-br ${item.color} p-4 text-white transition-opacity hover:opacity-90`}
              >
                <item.icon size={24} className="mb-2 opacity-90" />
                <div className="text-sm font-semibold">{item.label}</div>
                <div className="mt-1 text-xs opacity-80">{item.desc}</div>
                <div className="mt-3 flex items-center gap-1 text-xs opacity-80">
                  ดูรายละเอียด <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
