import React, { useState } from 'react'
import {
  Award,
  BarChart3,
  Bell,
  Calendar,
  Clock,
  Download,
  FileText,
  Globe,
  LayoutDashboard,
  Languages,
  Lock,
  Mail,
  MessageSquare,
  Search,
  Send,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Users,
  X,
  DollarSign,
  Shield,
} from 'lucide-react'
import { reports, scheduledReports, mockComments } from '../data/mockReports'

const categoryColors = {
  การเงิน: 'bg-blue-100 text-blue-700',
  พัสดุ: 'bg-teal-100 text-teal-700',
  การรับรอง: 'bg-green-100 text-green-700',
  นโยบาย: 'bg-purple-100 text-purple-700',
}

const categoryIcons = {
  การเงิน: DollarSign,
  พัสดุ: ShoppingCart,
  การรับรอง: Award,
  นโยบาย: Shield,
}

const roleOptions = ['ผู้บริหาร', 'นักวิเคราะห์', 'เจ้าหน้าที่การเงิน', 'เจ้าหน้าที่คุณภาพ', 'ผู้ประสานงานจังหวัด']
const permissionOptions = ['ดูอย่างเดียว', 'แสดงความคิดเห็น', 'แก้ไขได้']
const shareScopeOptions = ['เฉพาะผู้รับที่ระบุ', 'ทั้งหน่วยงาน', 'ทั้งองค์กร']
const alertChannels = ['อีเมล', 'แจ้งเตือนในระบบ', 'อีเมล + แจ้งเตือนในระบบ']
const assetTypes = ['ทั้งหมด', 'Report', 'Dashboard']
const accessTypes = ['ทั้งหมด', 'ส่วนตัว', 'แชร์เฉพาะสิทธิ์', 'ทั้งองค์กร']
const deliveryChannels = ['อีเมล', 'Mobile App', 'อีเมล + Mobile App']
const deliveryFrequencies = ['รายวัน', 'รายสัปดาห์', 'รายเดือน']
const uiText = {
  th: {
    title: 'รายงานและ Dashboard',
    subtitle: 'รองรับการค้นหา แบ่งปัน ทำงานร่วมกัน แสดงความคิดเห็น ตั้งเวลาส่งรายงาน และแสดงผลหลายภาษา',
    createReport: 'สร้าง Report',
    createDashboard: 'สร้าง Dashboard',
    sharedCount: 'รายการที่แชร์แล้ว',
    activeAlerts: 'Alert ใช้งานอยู่',
    searchPlaceholder: 'ค้นหาจากชื่อรายงาน, dashboard, คำสำคัญ หรือประเภทสิทธิ์...',
    showResults: 'แสดง',
    items: 'รายการ',
    mobileTitle: 'Mobile Collaboration',
    mobileSubtitle: 'รองรับการแสดงความคิดเห็นและตอบกลับผ่านอุปกรณ์เคลื่อนที่หรือแอปพลิเคชัน',
    scheduleTitle: 'Scheduled Delivery',
    scheduleSubtitle: 'กำหนดเวลาส่งรายงานหรือ Dashboard รายวัน รายสัปดาห์ หรือรายเดือนผ่านช่องทางที่รองรับ',
    languageTitle: 'Multi-language Support',
    languageSubtitle: 'รองรับ UI มากกว่าหนึ่งภาษา พร้อมโหมดแปลอัตโนมัติสำหรับบริบทข้อมูลที่เหมาะสม',
    saveSchedule: 'บันทึก Schedule Delivery',
    appReady: 'พร้อมใช้งานบน Mobile',
    translateMode: 'แปลอัตโนมัติ',
    originalMode: 'ต้นฉบับ',
  },
  en: {
    title: 'Reports and Dashboards',
    subtitle: 'Supports search, sharing, collaboration, commenting, scheduled delivery, and multi-language UI.',
    createReport: 'Create Report',
    createDashboard: 'Create Dashboard',
    sharedCount: 'Shared assets',
    activeAlerts: 'Active alerts',
    searchPlaceholder: 'Search by report name, dashboard, keyword, or access type...',
    showResults: 'Showing',
    items: 'items',
    mobileTitle: 'Mobile Collaboration',
    mobileSubtitle: 'Users can comment and interact with reports or dashboards from mobile devices or applications.',
    scheduleTitle: 'Scheduled Delivery',
    scheduleSubtitle: 'Send reports or dashboards on a daily, weekly, or monthly schedule via supported channels.',
    languageTitle: 'Multi-language Support',
    languageSubtitle: 'Supports more than one UI language with machine-translation mode for context-aware previews.',
    saveSchedule: 'Save Schedule Delivery',
    appReady: 'Mobile ready',
    translateMode: 'Machine translation',
    originalMode: 'Original',
  },
}

const initialAlertRules = [
  {
    id: 1,
    assetId: 13,
    assetTitle: 'รายงานการประเมินคุณภาพโรงพยาบาล HA ปี 2567',
    metric: 'คะแนน HA เฉลี่ย',
    condition: '< 80',
    channel: 'อีเมล + แจ้งเตือนในระบบ',
    status: 'ใช้งาน',
  },
  {
    id: 2,
    assetId: 7,
    assetTitle: 'รายงานการจัดซื้อจัดจ้างประจำเดือน',
    metric: 'คำขอจัดซื้อค้าง',
    condition: '> 20',
    channel: 'แจ้งเตือนในระบบ',
    status: 'ใช้งาน',
  },
  {
    id: 3,
    assetId: 20,
    assetTitle: 'รายงานความก้าวหน้านโยบาย Q2/2567',
    metric: 'KPI ต่ำกว่าเป้าหมาย',
    condition: '> 3 รายการ',
    channel: 'อีเมล',
    status: 'รอเริ่ม',
  },
]

function enrichReport(report) {
  const isDashboard = report.id % 4 === 0 || report.id % 7 === 0
  const accessLevel = !report.shared ? 'ส่วนตัว' : report.id % 3 === 0 ? 'ทั้งองค์กร' : 'แชร์เฉพาะสิทธิ์'
  const permission = report.id % 5 === 0 ? 'แก้ไขได้' : report.id % 2 === 0 ? 'ดูอย่างเดียว' : 'แสดงความคิดเห็น'
  const ownerRole = roleOptions[report.id % roleOptions.length]

  return {
    ...report,
    assetType: isDashboard ? 'Dashboard' : 'Report',
    accessLevel,
    permission,
    ownerRole,
    sharedWith: report.shared ? roleOptions.slice(0, (report.id % 3) + 2) : [],
    keywords: [
      report.category,
      report.format,
      isDashboard ? 'dashboard' : 'report',
      report.title.split(' ')[0],
      permission,
    ],
  }
}

function accessBadgeClass(accessLevel) {
  if (accessLevel === 'ทั้งองค์กร') return 'bg-emerald-100 text-emerald-700'
  if (accessLevel === 'แชร์เฉพาะสิทธิ์') return 'bg-amber-100 text-amber-700'
  return 'bg-gray-100 text-gray-600'
}

function permissionBadgeClass(permission) {
  if (permission === 'แก้ไขได้') return 'bg-blue-100 text-blue-700'
  if (permission === 'แสดงความคิดเห็น') return 'bg-purple-100 text-purple-700'
  return 'bg-slate-100 text-slate-600'
}

export default function Reports() {
  const [language, setLanguage] = useState(() => localStorage.getItem('hai_language') || 'th')
  const [translationMode, setTranslationMode] = useState('original')
  const [reportItems, setReportItems] = useState(() => reports.map(enrichReport))
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('ทั้งหมด')
  const [assetTypeFilter, setAssetTypeFilter] = useState('ทั้งหมด')
  const [accessFilter, setAccessFilter] = useState('ทั้งหมด')
  const [commentReport, setCommentReport] = useState(null)
  const [newComment, setNewComment] = useState('')
  const [newCommentType, setNewCommentType] = useState('ความคิดเห็น')
  const [newCommentTag, setNewCommentTag] = useState('')
  const [commentsByReport, setCommentsByReport] = useState(() =>
    Object.fromEntries(
      Object.entries(mockComments).map(([id, entries]) => [
        id,
        entries.map((entry, index) => ({
          ...entry,
          type: index === 0 ? 'หมายเหตุ' : 'ความคิดเห็น',
          tag: index === 0 ? 'ประเด็นสำคัญ' : '',
        })),
      ])
    )
  )
  const [shareTarget, setShareTarget] = useState(null)
  const [shareRecipient, setShareRecipient] = useState(roleOptions[0])
  const [sharePermission, setSharePermission] = useState(permissionOptions[0])
  const [shareScope, setShareScope] = useState(shareScopeOptions[0])
  const [alerts, setAlerts] = useState(initialAlertRules)
  const [scheduledList, setScheduledList] = useState(scheduledReports)
  const [mobileChannel, setMobileChannel] = useState('Mobile App')
  const [deliveryForm, setDeliveryForm] = useState({
    assetId: 1,
    frequency: deliveryFrequencies[0],
    channel: deliveryChannels[0],
    recipient: 'director@hai.or.th',
    format: 'PDF',
  })
  const [alertForm, setAlertForm] = useState({
    assetId: 1,
    metric: 'คะแนน HA เฉลี่ย',
    operator: '>',
    threshold: '',
    channel: alertChannels[0],
  })

  const categories = ['ทั้งหมด', 'การเงิน', 'พัสดุ', 'การรับรอง', 'นโยบาย']
  const t = uiText[language] || uiText.th

  const filtered = reportItems.filter((report) => {
    const haystack = [report.title, report.category, report.assetType, report.accessLevel, ...report.keywords]
      .join(' ')
      .toLowerCase()

    return (
      (categoryFilter === 'ทั้งหมด' || report.category === categoryFilter) &&
      (assetTypeFilter === 'ทั้งหมด' || report.assetType === assetTypeFilter) &&
      (accessFilter === 'ทั้งหมด' || report.accessLevel === accessFilter) &&
      (search.trim() === '' || haystack.includes(search.toLowerCase()))
    )
  })

  const getComments = (id) => commentsByReport[id] || []

  const addComment = (reportId) => {
    if (!newComment.trim()) return

    setCommentsByReport((prev) => ({
      ...prev,
      [reportId]: [
        ...(prev[reportId] || []),
        {
          id: Date.now(),
          author: 'นายแพทย์ สมชาย ใจดี',
          time: 'เมื่อสักครู่',
          text: newComment.trim(),
          type: newCommentType,
          tag: newCommentTag.trim(),
        },
      ],
    }))
    setNewComment('')
    setNewCommentTag('')
    setNewCommentType('ความคิดเห็น')
  }

  const saveShareSettings = () => {
    if (!shareTarget) return

    setReportItems((prev) =>
      prev.map((item) =>
        item.id === shareTarget.id
          ? {
              ...item,
              shared: true,
              accessLevel: shareScope === 'ทั้งองค์กร' ? 'ทั้งองค์กร' : 'แชร์เฉพาะสิทธิ์',
              permission: sharePermission,
              sharedWith:
                shareScope === 'เฉพาะผู้รับที่ระบุ'
                  ? Array.from(new Set([...item.sharedWith, shareRecipient]))
                  : shareScope === 'ทั้งหน่วยงาน'
                    ? Array.from(new Set([...item.sharedWith, 'ผู้บริหาร', 'นักวิเคราะห์']))
                    : roleOptions,
            }
          : item
      )
    )
    setShareTarget(null)
  }

  const addAlertRule = () => {
    const target = reportItems.find((item) => item.id === Number(alertForm.assetId))
    if (!target || !alertForm.threshold.trim()) return

    setAlerts((prev) => [
      {
        id: Date.now(),
        assetId: target.id,
        assetTitle: target.title,
        metric: alertForm.metric,
        condition: `${alertForm.operator} ${alertForm.threshold}`,
        channel: alertForm.channel,
        status: 'ใช้งาน',
      },
      ...prev,
    ])

    setAlertForm((prev) => ({ ...prev, threshold: '' }))
  }

  const addScheduledDelivery = () => {
    const target = reportItems.find((item) => item.id === Number(deliveryForm.assetId))
    if (!target || !deliveryForm.recipient.trim()) return

    setScheduledList((prev) => [
      {
        id: Date.now(),
        title: target.title,
        frequency: deliveryForm.frequency,
        nextRun: language === 'th' ? 'รอบถัดไปอัตโนมัติ' : 'Next scheduled cycle',
        recipients: [deliveryForm.recipient],
        format: deliveryForm.format,
        status: 'ใช้งาน',
        channel: deliveryForm.channel,
      },
      ...prev,
    ])
  }

  const toggleLanguage = () => {
    const nextLanguage = language === 'th' ? 'en' : 'th'
    setLanguage(nextLanguage)
    localStorage.setItem('hai_language', nextLanguage)
  }

  const reportCount = reportItems.filter((item) => item.assetType === 'Report').length
  const dashboardCount = reportItems.filter((item) => item.assetType === 'Dashboard').length
  const sharedCount = reportItems.filter((item) => item.shared).length
  const activeAlertsCount = alerts.filter((item) => item.status === 'ใช้งาน').length
  const mobileCommentsCount = Object.values(commentsByReport).reduce((sum, entries) => sum + entries.length, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
            <p className="mt-1 text-sm text-gray-500">{t.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="btn-primary text-xs flex items-center gap-1.5">
              <FileText size={14} />
              {t.createReport}
            </button>
            <button className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-1.5">
              <LayoutDashboard size={14} />
              {t.createDashboard}
            </button>
            <button
              onClick={toggleLanguage}
              className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-1.5"
            >
              <Globe size={14} />
              {language === 'th' ? 'ไทย / EN' : 'EN / ไทย'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {[
            { label: 'Reports', value: reportCount, icon: FileText, tone: 'bg-blue-50 text-blue-700' },
            { label: 'Dashboards', value: dashboardCount, icon: LayoutDashboard, tone: 'bg-teal-50 text-teal-700' },
            { label: t.sharedCount, value: sharedCount, icon: Users, tone: 'bg-purple-50 text-purple-700' },
            { label: t.activeAlerts, value: activeAlertsCount, icon: Bell, tone: 'bg-amber-50 text-amber-700' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
              <div className={`mb-2 inline-flex rounded-lg p-2 ${item.tone}`}>
                <item.icon size={16} />
              </div>
              <p className="text-lg font-bold text-gray-900">{item.value}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[240px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm shadow-sm focus:border-[#0D5C8F] focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
            />
          </div>

          <select
            value={assetTypeFilter}
            onChange={(e) => setAssetTypeFilter(e.target.value)}
            className="rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
          >
            {assetTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={accessFilter}
            onChange={(e) => setAccessFilter(e.target.value)}
            className="rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
          >
            {accessTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                categoryFilter === cat
                  ? 'bg-[#0D5C8F] text-white'
                  : 'border border-gray-200 bg-white text-gray-600 hover:border-[#0D5C8F]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs text-gray-400">{t.showResults} {filtered.length} {t.items}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((report) => {
            const Icon = categoryIcons[report.category] || BarChart3
            const AssetIcon = report.assetType === 'Dashboard' ? LayoutDashboard : FileText
            const reportComments = getComments(report.id)

            return (
              <div key={report.id} className="group rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-gray-50 p-2">
                      <Icon size={16} className="text-gray-500" />
                    </div>
                    <span className={`badge text-[10px] ${categoryColors[report.category] || 'bg-gray-100 text-gray-600'}`}>
                      {report.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="badge bg-gray-100 text-gray-500 text-[10px] flex items-center gap-1">
                      <AssetIcon size={11} />
                      {report.assetType}
                    </span>
                    <span className={`badge text-[10px] ${accessBadgeClass(report.accessLevel)}`}>{report.accessLevel}</span>
                  </div>
                </div>

                <h3 className="mb-2 line-clamp-2 text-sm font-semibold leading-snug text-gray-800">{report.title}</h3>

                <div className="mb-3 flex flex-wrap gap-1.5">
                  <span className={`badge text-[10px] ${permissionBadgeClass(report.permission)}`}>{report.permission}</span>
                  <span className="badge bg-slate-100 text-slate-600 text-[10px]">{report.format}</span>
                  <span className="badge bg-indigo-100 text-indigo-700 text-[10px]">{report.ownerRole}</span>
                </div>

                <div className="mb-3 flex items-center gap-1 text-[11px] text-gray-400">
                  <Clock size={11} />
                  อัปเดต {report.lastUpdated}
                </div>

                <div className="mb-3 rounded-lg bg-gray-50 p-2.5">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">คำสำคัญ</p>
                  <div className="flex flex-wrap gap-1">
                    {report.keywords.slice(0, 4).map((keyword) => (
                      <span key={keyword} className="rounded-full bg-white px-2 py-1 text-[10px] text-gray-500 border border-gray-100">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-50 pt-3">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{report.views} ครั้ง</span>
                    <span>{report.sharedWith.length} ผู้ใช้งานร่วม</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <button
                        className="flex items-center gap-1 rounded-lg p-1.5 text-xs text-gray-400 transition-colors hover:bg-blue-50 hover:text-[#0D5C8F]"
                        onClick={() => setCommentReport(commentReport === report.id ? null : report.id)}
                      >
                        <MessageSquare size={13} />
                        <span>{reportComments.length}</span>
                      </button>
                      <button
                        className="flex items-center gap-1 rounded-lg p-1.5 text-xs text-gray-400 transition-colors hover:bg-amber-50 hover:text-amber-600"
                        onClick={() =>
                          setAlertForm((prev) => ({ ...prev, assetId: report.id }))
                        }
                      >
                        <Bell size={13} />
                        <span>Alert</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-[#0D5C8F]"
                        title="แชร์และกำหนดสิทธิ์"
                        onClick={() => {
                          setShareTarget(report)
                          setShareRecipient(report.sharedWith[0] || roleOptions[0])
                          setSharePermission(report.permission)
                          setShareScope(report.accessLevel === 'ทั้งองค์กร' ? 'ทั้งองค์กร' : 'เฉพาะผู้รับที่ระบุ')
                        }}
                      >
                        <Share2 size={13} />
                      </button>
                      <button className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-[#0D5C8F]" title="ดาวน์โหลด">
                        <Download size={13} />
                      </button>
                    </div>
                  </div>
                </div>

                {commentReport === report.id && (
                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <div className="mb-3 space-y-2.5 max-h-56 overflow-y-auto">
                      {reportComments.length === 0 ? (
                        <p className="py-2 text-center text-xs text-gray-400">ยังไม่มีความคิดเห็นหรือหมายเหตุ</p>
                      ) : (
                        reportComments.map((comment) => (
                          <div key={comment.id} className="rounded-lg bg-gray-50 p-2.5">
                            <div className="mb-1 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-gray-700">{comment.author}</span>
                                <span
                                  className={`rounded-full px-2 py-0.5 text-[10px] ${
                                    comment.type === 'หมายเหตุ'
                                      ? 'bg-amber-100 text-amber-700'
                                      : 'bg-blue-100 text-blue-700'
                                  }`}
                                >
                                  {comment.type}
                                </span>
                                {comment.tag && (
                                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] text-gray-500 border border-gray-200">
                                    {comment.tag}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-gray-400">{comment.time}</span>
                            </div>
                            <p className="text-xs leading-relaxed text-gray-600">{comment.text}</p>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="mb-2 grid grid-cols-2 gap-2">
                      <select
                        value={newCommentType}
                        onChange={(e) => setNewCommentType(e.target.value)}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
                      >
                        <option>ความคิดเห็น</option>
                        <option>หมายเหตุ</option>
                      </select>
                      <input
                        type="text"
                        value={newCommentTag}
                        onChange={(e) => setNewCommentTag(e.target.value)}
                        placeholder="แท็กประกอบ เช่น ประเด็นประชุม"
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
                      />
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addComment(report.id)}
                        placeholder="เพิ่มความคิดเห็นหรือหมายเหตุบนรายงาน/Dashboard..."
                        className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
                      />
                      <button
                        onClick={() => addComment(report.id)}
                        className="rounded-lg bg-[#0D5C8F] p-2 text-white transition-colors hover:bg-[#0a4a73]"
                      >
                        <Send size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="chart-card">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <Smartphone size={15} className="text-[#0D5C8F]" />
                {t.mobileTitle}
              </h3>
              <p className="mt-0.5 text-xs text-gray-400">{t.mobileSubtitle}</p>
            </div>
            <span className="badge bg-emerald-100 text-emerald-700 text-[10px]">{t.appReady}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: language === 'th' ? 'ความคิดเห็นจากมือถือ' : 'Mobile comments', value: mobileCommentsCount },
              { label: language === 'th' ? 'ช่องทางตอบกลับ' : 'Response channel', value: mobileChannel },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-gray-50 p-3">
                <p className="text-base font-bold text-[#0D5C8F]">{item.value}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {['Mobile App', 'Responsive Web', 'Tablet Review'].map((channel) => (
              <button
                key={channel}
                onClick={() => setMobileChannel(channel)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  mobileChannel === channel
                    ? 'bg-[#0D5C8F] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {channel}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {reportItems.slice(0, 3).map((item) => (
              <div key={`mobile-${item.id}`} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-800">{item.title}</p>
                    <p className="mt-1 text-xs text-gray-400">
                      {language === 'th'
                        ? `รองรับการตอบกลับผ่าน ${mobileChannel} และเปิดดูบนมือถือได้ทันที`
                        : `Available for instant reply via ${mobileChannel} with mobile-friendly layout.`}
                    </p>
                  </div>
                  <button
                    onClick={() => setCommentReport(item.id)}
                    className="rounded-lg border border-gray-200 px-2.5 py-1 text-[11px] text-gray-600 hover:bg-white"
                  >
                    {language === 'th' ? 'ตอบกลับ' : 'Reply'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <ShieldCheck size={15} className="text-[#0D5C8F]" />
                Sharing & Collaboration
              </h3>
              <p className="mt-0.5 text-xs text-gray-400">กำหนดสิทธิ์การเข้าถึงรายงานและ Dashboard ตามระดับผู้ใช้งาน</p>
            </div>
            <span className="badge bg-blue-100 text-blue-700 text-[10px]">{sharedCount} รายการที่ถูกแชร์</span>
          </div>

          <div className="space-y-2">
            {reportItems.filter((item) => item.shared).slice(0, 5).map((item) => (
              <div key={item.id} className="rounded-xl bg-gray-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-800">{item.title}</p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {item.assetType} • {item.accessLevel} • {item.permission}
                    </p>
                  </div>
                  <button
                    className="rounded-lg border border-gray-200 px-2.5 py-1 text-[11px] text-gray-600 hover:bg-white"
                    onClick={() => setShareTarget(item)}
                  >
                    จัดการสิทธิ์
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {item.sharedWith.map((recipient) => (
                    <span key={recipient} className="rounded-full bg-white px-2 py-1 text-[10px] text-gray-500 border border-gray-100">
                      {recipient}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <Bell size={15} className="text-[#0D5C8F]" />
                Alert / Notification
              </h3>
              <p className="mt-0.5 text-xs text-gray-400">ตั้งเกณฑ์แจ้งเตือนสำหรับรายงานและ Dashboard ที่ต้องติดตาม</p>
            </div>
            <span className="badge bg-amber-100 text-amber-700 text-[10px]">{activeAlertsCount} ใช้งาน</span>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <select
              value={alertForm.assetId}
              onChange={(e) => setAlertForm((prev) => ({ ...prev, assetId: Number(e.target.value) }))}
              className="rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
            >
              {reportItems.slice(0, 12).map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
            <select
              value={alertForm.metric}
              onChange={(e) => setAlertForm((prev) => ({ ...prev, metric: e.target.value }))}
              className="rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
            >
              {['คะแนน HA เฉลี่ย', 'คำขอจัดซื้อค้าง', 'KPI ต่ำกว่าเป้าหมาย', 'รายรับต่ำกว่าคาดการณ์'].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <select
                value={alertForm.operator}
                onChange={(e) => setAlertForm((prev) => ({ ...prev, operator: e.target.value }))}
                className="w-20 rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
              >
                <option>{'>'}</option>
                <option>{'<'}</option>
                <option>{'>='}</option>
                <option>{'<='}</option>
                <option>{'='}</option>
              </select>
              <input
                type="text"
                value={alertForm.threshold}
                onChange={(e) => setAlertForm((prev) => ({ ...prev, threshold: e.target.value }))}
                placeholder="ค่าเกณฑ์"
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
              />
            </div>
            <select
              value={alertForm.channel}
              onChange={(e) => setAlertForm((prev) => ({ ...prev, channel: e.target.value }))}
              className="rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
            >
              {alertChannels.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <button
            onClick={addAlertRule}
            className="mt-3 rounded-xl bg-[#0D5C8F] px-3 py-2 text-xs font-medium text-white hover:bg-[#0a4a73]"
          >
            เพิ่มเงื่อนไขแจ้งเตือน
          </button>

          <div className="mt-4 space-y-2">
            {alerts.map((alert) => (
              <div key={alert.id} className="rounded-xl bg-gray-50 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-800">{alert.assetTitle}</p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {alert.metric} {alert.condition} • {alert.channel}
                    </p>
                  </div>
                  <span
                    className={`badge text-[10px] ${
                      alert.status === 'ใช้งาน' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {alert.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="chart-card">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <Mail size={15} className="text-[#0D5C8F]" />
              {t.scheduleTitle}
            </h3>
            <p className="mt-0.5 text-xs text-gray-400">{t.scheduleSubtitle}</p>
          </div>
          <span className="badge bg-sky-100 text-sky-700 text-[10px]">{scheduledList.filter((item) => item.status === 'ใช้งาน').length} Active</span>
        </div>

        <div className="grid grid-cols-1 gap-2 mb-4 sm:grid-cols-2 xl:grid-cols-5">
          <select
            value={deliveryForm.assetId}
            onChange={(e) => setDeliveryForm((prev) => ({ ...prev, assetId: Number(e.target.value) }))}
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
          >
            {reportItems.slice(0, 12).map((item) => (
              <option key={`delivery-${item.id}`} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
          <select
            value={deliveryForm.frequency}
            onChange={(e) => setDeliveryForm((prev) => ({ ...prev, frequency: e.target.value }))}
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
          >
            {deliveryFrequencies.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select
            value={deliveryForm.channel}
            onChange={(e) => setDeliveryForm((prev) => ({ ...prev, channel: e.target.value }))}
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
          >
            {deliveryChannels.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <input
            type="text"
            value={deliveryForm.recipient}
            onChange={(e) => setDeliveryForm((prev) => ({ ...prev, recipient: e.target.value }))}
            placeholder={language === 'th' ? 'อีเมลหรือกลุ่มผู้รับ' : 'Recipient email or group'}
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
          />
          <button
            onClick={addScheduledDelivery}
            className="rounded-xl bg-[#0D5C8F] px-3 py-2 text-xs font-medium text-white hover:bg-[#0a4a73]"
          >
            {t.saveSchedule}
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <Calendar size={15} className="text-[#0D5C8F]" />
              รายงานอัตโนมัติ
            </h3>
            <p className="mt-0.5 text-xs text-gray-400">ตั้งเวลาส่งรายงานอัตโนมัติและติดตามผู้รับปลายทาง</p>
          </div>
          <button className="btn-primary text-xs">+ เพิ่มตารางรายงาน</button>
        </div>
        <div className="space-y-2">
          {scheduledList.map((sr) => (
            <div key={sr.id} className="flex items-center gap-4 rounded-xl bg-gray-50 p-3 transition-colors hover:bg-gray-100">
              <div className={`rounded-lg p-2 ${sr.status === 'ใช้งาน' ? 'bg-green-100' : 'bg-gray-200'}`}>
                <Clock size={14} className={sr.status === 'ใช้งาน' ? 'text-green-600' : 'text-gray-500'} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-800">{sr.title}</p>
                <p className="mt-0.5 text-xs text-gray-400">
                  {sr.frequency} — {sr.channel || 'อีเมล'} — ครั้งต่อไป: {sr.nextRun} — รับ: {sr.recipients.join(', ')}
                </p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-2">
                <span className="badge bg-blue-100 text-blue-700 text-[10px]">{sr.format}</span>
                <span className={`badge text-[10px] ${sr.status === 'ใช้งาน' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {sr.status}
                </span>
                <button className="p-1 text-xs text-gray-400 transition-colors hover:text-red-500">
                  <X size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-card">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <Languages size={15} className="text-[#0D5C8F]" />
              {t.languageTitle}
            </h3>
            <p className="mt-0.5 text-xs text-gray-400">{t.languageSubtitle}</p>
          </div>
          <button
            onClick={() => setTranslationMode((prev) => (prev === 'original' ? 'machine' : 'original'))}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            {translationMode === 'original' ? t.translateMode : t.originalMode}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs font-semibold text-gray-700 mb-1">{language === 'th' ? 'ภาษาปัจจุบัน' : 'Current language'}</p>
            <p className="text-sm text-[#0D5C8F] font-bold">{language === 'th' ? 'ภาษาไทย' : 'English'}</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs font-semibold text-gray-700 mb-1">{language === 'th' ? 'โหมดแปลข้อมูล' : 'Data translation mode'}</p>
            <p className="text-sm text-[#0D5C8F] font-bold">{translationMode === 'original' ? t.originalMode : t.translateMode}</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs font-semibold text-gray-700 mb-1">{language === 'th' ? 'การใช้งานปลอดภัย' : 'Secure operation'}</p>
            <p className="text-sm text-[#0D5C8F] font-bold">{language === 'th' ? 'ภายในระบบ HAI' : 'Inside HAI system'}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-3 text-xs text-blue-700">
          {language === 'th'
            ? 'ระบบรองรับหลายภาษาในส่วนติดต่อผู้ใช้งาน และมีโหมดแปลอัตโนมัติสำหรับการพรีวิวข้อความ โดยคงการใช้งานไว้ภายในระบบเพื่อลดความเสี่ยงด้านความมั่นคงปลอดภัยของข้อมูล'
            : 'The system supports multiple UI languages and a machine-translation preview mode while keeping processing inside the application flow to reduce data security risk.'}
        </div>
      </div>

      <div className="chart-card">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-800">
          <Download size={15} className="text-[#0D5C8F]" />
          ส่งออกรายงาน
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {['PDF', 'CSV', 'Excel', 'PowerPoint'].map((fmt) => (
            <button
              key={fmt}
              className="group flex flex-col items-center gap-2 rounded-xl border-2 border-gray-100 p-4 transition-all hover:border-[#0D5C8F]/40 hover:bg-blue-50"
            >
              <FileText size={24} className="text-gray-400 group-hover:text-[#0D5C8F]" />
              <span className="text-xs font-semibold text-gray-600 group-hover:text-[#0D5C8F]">{fmt}</span>
            </button>
          ))}
        </div>
      </div>

      {shareTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-gray-900">แบ่งปันและกำหนดสิทธิ์</h3>
                <p className="mt-1 text-sm text-gray-500">{shareTarget.title}</p>
              </div>
              <button className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600" onClick={() => setShareTarget(null)}>
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">ระดับการแชร์</label>
                <select
                  value={shareScope}
                  onChange={(e) => setShareScope(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
                >
                  {shareScopeOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">สิทธิ์การเข้าถึง</label>
                <select
                  value={sharePermission}
                  onChange={(e) => setSharePermission(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
                >
                  {permissionOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-gray-600">ผู้ใช้งานหรือกลุ่มเป้าหมาย</label>
                <select
                  value={shareRecipient}
                  onChange={(e) => setShareRecipient(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20"
                >
                  {roleOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-blue-50 p-3">
              <p className="mb-1 flex items-center gap-2 text-xs font-semibold text-blue-700">
                <Lock size={12} />
                ตัวอย่างสิทธิ์หลังบันทึก
              </p>
              <p className="text-xs text-blue-700/90">
                {shareScope} • {sharePermission} • ผู้รับหลัก: {shareRecipient}
              </p>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShareTarget(null)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={saveShareSettings}
                className="rounded-lg bg-[#0D5C8F] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a4a73]"
              >
                บันทึกการแชร์
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
