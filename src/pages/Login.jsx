import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, CreditCard, Heart, AlertCircle } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [loginMethod, setLoginMethod] = useState('email')
  const [email, setEmail] = useState('admin@hai.or.th')
  const [password, setPassword] = useState('password123')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmailLogin = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('กรุณากรอกอีเมลและรหัสผ่าน')
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem('hai_user', JSON.stringify({
        name: 'นายแพทย์ สมชาย ใจดี',
        role: 'admin',
        email: email,
      }))
      navigate('/')
    }, 1000)
  }

  const handleSSOLogin = (method) => {
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem('hai_user', JSON.stringify({
        name: 'นายแพทย์ สมชาย ใจดี',
        role: 'admin',
        email: 'admin@hai.or.th',
        loginMethod: method,
      }))
      navigate('/')
    }, 1200)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #0D5C8F 0%, #082F49 50%, #0D5C8F 100%)' }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full border-2 border-white/30" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full border border-white/20" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full border border-white/20" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0D5C8F] to-[#0EA5E9] px-8 pt-8 pb-10 text-center relative">
            <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-3">
              <span className="text-[#0D5C8F] font-black text-lg">HAI</span>
            </div>
            <h1 className="text-white text-2xl font-bold">HAI Smart Dashboard</h1>
            <p className="text-blue-200 text-sm mt-1">ระบบ Smart HAI Dashboard</p>
            <p className="text-blue-200/70 text-xs mt-0.5">สถาบันรับรองคุณภาพสถานพยาบาล (องค์การมหาชน)</p>

            {/* Wave */}
            <svg
              viewBox="0 0 400 40"
              className="absolute bottom-0 left-0 right-0 w-full"
              preserveAspectRatio="none"
            >
              <path d="M0,20 C100,40 300,0 400,20 L400,40 L0,40 Z" fill="white" />
            </svg>
          </div>

          <div className="px-8 pt-6 pb-8">
            {/* Login method tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setLoginMethod('thaid')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium border-2 transition-all ${
                  loginMethod === 'thaid'
                    ? 'border-[#0D5C8F] bg-[#0D5C8F] text-white'
                    : 'border-gray-200 text-gray-600 hover:border-[#0D5C8F]/40'
                }`}
              >
                <CreditCard size={14} />
                ThaiD
              </button>
              <button
                onClick={() => setLoginMethod('healthid')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium border-2 transition-all ${
                  loginMethod === 'healthid'
                    ? 'border-[#0D5C8F] bg-[#0D5C8F] text-white'
                    : 'border-gray-200 text-gray-600 hover:border-[#0D5C8F]/40'
                }`}
              >
                <Heart size={14} />
                Health ID
              </button>
              <button
                onClick={() => setLoginMethod('email')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium border-2 transition-all ${
                  loginMethod === 'email'
                    ? 'border-[#0D5C8F] bg-[#0D5C8F] text-white'
                    : 'border-gray-200 text-gray-600 hover:border-[#0D5C8F]/40'
                }`}
              >
                <Mail size={14} />
                อีเมล
              </button>
            </div>

            {/* ThaiD Login */}
            {loginMethod === 'thaid' && (
              <div className="text-center">
                <div className="bg-blue-50 rounded-xl p-6 mb-4">
                  <CreditCard size={40} className="mx-auto text-[#0D5C8F] mb-3" />
                  <p className="text-sm text-gray-600 font-medium">เข้าสู่ระบบด้วย ThaiD</p>
                  <p className="text-xs text-gray-400 mt-1">ระบบยืนยันตัวตนภาครัฐ</p>
                </div>
                <button
                  onClick={() => handleSSOLogin('thaid')}
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-sm bg-[#0D5C8F] text-white hover:bg-[#0a4a73] transition-colors disabled:opacity-60"
                >
                  {loading ? 'กำลังเชื่อมต่อ...' : 'เข้าสู่ระบบผ่าน ThaiD'}
                </button>
              </div>
            )}

            {/* Health ID Login */}
            {loginMethod === 'healthid' && (
              <div className="text-center">
                <div className="bg-green-50 rounded-xl p-6 mb-4">
                  <Heart size={40} className="mx-auto text-green-600 mb-3" />
                  <p className="text-sm text-gray-600 font-medium">เข้าสู่ระบบด้วย Health ID</p>
                  <p className="text-xs text-gray-400 mt-1">ระบบยืนยันตัวตนด้านสุขภาพ</p>
                </div>
                <button
                  onClick={() => handleSSOLogin('healthid')}
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-sm bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-60"
                >
                  {loading ? 'กำลังเชื่อมต่อ...' : 'เข้าสู่ระบบผ่าน Health ID'}
                </button>
              </div>
            )}

            {/* Email Login */}
            {loginMethod === 'email' && (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 bg-red-50 text-red-700 text-xs px-3 py-2.5 rounded-lg border border-red-100">
                    <AlertCircle size={14} />
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">อีเมล</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20 focus:border-[#0D5C8F] transition-all"
                      placeholder="example@hai.or.th"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">รหัสผ่าน</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-9 pr-10 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D5C8F]/20 focus:border-[#0D5C8F] transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-1.5 text-gray-500 cursor-pointer">
                    <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300" />
                    จดจำฉันไว้
                  </label>
                  <span className="text-[#0D5C8F] cursor-pointer hover:underline font-medium">ลืมรหัสผ่าน?</span>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-sm bg-[#0D5C8F] text-white hover:bg-[#0a4a73] transition-colors disabled:opacity-60 mt-2"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      กำลังเข้าสู่ระบบ...
                    </span>
                  ) : 'เข้าสู่ระบบ'}
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-blue-200/60 text-xs mt-4">
          © 2567 สถาบันรับรองคุณภาพสถานพยาบาล (องค์การมหาชน) — เวอร์ชัน 2.4.1
        </p>
      </div>
    </div>
  )
}
