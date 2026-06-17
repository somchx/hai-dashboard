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
          <h1 className="text-2xl font-bold text-gray-900">Visualization Builder</h1>
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
