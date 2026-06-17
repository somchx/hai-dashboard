import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Home from './pages/Home'
import Financial from './pages/Financial'
import Procurement from './pages/Procurement'
import Accreditation from './pages/Accreditation'
import Policy from './pages/Policy'
import Reports from './pages/Reports'
import Alerts from './pages/Alerts'
import Admin from './pages/Admin'
import Settings from './pages/Settings'
import SelfService from './pages/SelfService'
import DataPrep from './pages/DataPrep'
import DataModeling from './pages/DataModeling'

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('hai_user')
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  const [language, setLanguage] = useState('th')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout language={language} setLanguage={setLanguage} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="financial" element={<Financial />} />
          <Route path="procurement" element={<Procurement />} />
          <Route path="accreditation" element={<Accreditation />} />
          <Route path="policy" element={<Policy />} />
          <Route path="reports" element={<Reports />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="admin" element={<Admin />} />
          <Route path="settings" element={<Settings />} />
          <Route path="self-service" element={<SelfService />} />
          <Route path="data-prep" element={<DataPrep />} />
          <Route path="data-modeling" element={<DataModeling />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
