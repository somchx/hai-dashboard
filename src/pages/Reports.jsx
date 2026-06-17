import React, { useState } from 'react'
import {
  BarChart3, DollarSign, ShoppingCart, Award, Shield,
  Search, Share2, MessageSquare, Download, Calendar,
  ChevronDown, X, Send, Clock, FileText, Filter
} from 'lucide-react'
import { reports, scheduledReports, mockComments } from '../data/mockReports'

const categoryColors = {
  'การเงิน': 'bg-blue-100 text-blue-700',
  'พัสดุ': 'bg-teal-100 text-teal-700',
  'การรับรอง': 'bg-green-100 text-green-700',
  'นโยบาย': 'bg-purple-100 text-purple-700',
}

const categoryIcons = {
  'การเงิน': DollarSign,
  'พัสดุ': ShoppingCart,
  'การรับรอง': Award,
  'นโยบาย': Shield,
}

export default function Reports() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('ทั้งหมด')
  const [commentReport, setCommentReport] = useState(null)
  const [newComment, setNewComment] = useState('')
  const [commentsByReport, setCommentsByReport] = useState(mockComments)

  const categories = ['ทั้งหมด', 'การเงิน', 'พัสดุ', 'การรับรอง', 'นโยบาย']

  const filtered = reports.filter(r =>
    (categoryFilter === 'ทั้งหมด' || r.category === categoryFilter) &&
    (search === '' || r.title.toLowerCase().includes(search.toLowerCase()))
  )

  const getComments = (id) => commentsByReport[id] || []

  const addComment = (reportId) => {
    if (!newComment.trim()) return
    setCommentsByReport(prev => ({
      ...prev,
      [reportId]: [
        ...(prev[reportId] || []),
        {
          id: Date.now(),
          author: 'นายแพทย์ สมชาย ใจดี',
          time: 'เมื่อสักครู่',
          text: newComment.trim()
        }
      ]
    }))
    setNewComment('')
  }

  const activeReport = commentReport ? reports.find(r => r.id === commentReport) : null
  const comments = commentReport ? getComments(commentReport) : []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">รายงาน</h1>
          <p className="text-sm text-gray-500 mt-0.5">Reports Management — {reports.length} รายงาน</p>
        </div>
        <button className="btn-primary text-xs flex items-center gap-1.5">
          <FileText size={14} />
          สร้างรายงานใหม่
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ค้นหารายงาน..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20 focus:border-[#0D5C8F] shadow-sm"
          />
        </div>
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                categoryFilter === cat
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
        <p className="text-xs text-gray-400 mb-3">แสดง {filtered.length} รายงาน</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(report => {
            const Icon = categoryIcons[report.category] || BarChart3
            const reportComments = getComments(report.id)
            return (
              <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow group">
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
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span>{report.views} ครั้ง</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#0D5C8F] transition-colors p-1.5 rounded-lg hover:bg-blue-50"
                      onClick={() => setCommentReport(commentReport === report.id ? null : report.id)}
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

                {/* Comment Panel */}
                {commentReport === report.id && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="space-y-2.5 max-h-48 overflow-y-auto mb-3">
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
            )
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

      {/* Export Panel */}
      <div className="chart-card">
        <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Download size={15} className="text-[#0D5C8F]" />
          ส่งออกรายงาน
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['PDF', 'CSV', 'Excel', 'PowerPoint'].map(fmt => (
            <button
              key={fmt}
              className="flex flex-col items-center gap-2 p-4 border-2 border-gray-100 rounded-xl hover:border-[#0D5C8F]/40 hover:bg-blue-50 transition-all group"
            >
              <FileText size={24} className="text-gray-400 group-hover:text-[#0D5C8F]" />
              <span className="text-xs font-semibold text-gray-600 group-hover:text-[#0D5C8F]">{fmt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
