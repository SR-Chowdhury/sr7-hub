import { useState, useMemo } from 'react'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CardGrid from './components/CardGrid'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import PortSwigger from './pages/PortSwigger'
import VulnHub from './pages/VulnHub'
import HTB from './pages/HTB'
import WordPressAudit from './pages/WordPressAudit'
import Fiverr from './pages/Fiverr'
import { cards } from './data/cards'
import { createSearchEngine } from './utils/search'

import ProtectedRoute from './admin/ProtectedRoute'
import AdminLayout from './admin/AdminLayout'
import Login from './admin/Login'
import LabsList from './admin/LabsList'
import LabForm from './admin/LabForm'
import MachinesList from './admin/MachinesList'
import MachineForm from './admin/MachineForm'
import WalkthroughsList from './admin/WalkthroughsList'
import WalkthroughForm from './admin/WalkthroughForm'
import AuditsList from './admin/AuditsList'
import AuditForm from './admin/AuditForm'
import GigsList from './admin/GigsList'
import GigForm from './admin/GigForm'
import ProfileEditor from './admin/ProfileEditor'

const search = createSearchEngine(cards)

function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCards = useMemo(
    () => search(searchQuery),
    [searchQuery]
  )

  return (
    <>
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        resultCount={filteredCards.length}
      />
      <div className="flex-grow">
        <CardGrid filteredCards={filteredCards} />
      </div>
    </>
  )
}

function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#0a0e17] text-white flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/portswigger" element={<PortSwigger />} />
          <Route path="/vulnhub" element={<VulnHub />} />
          <Route path="/htb" element={<HTB />} />
          <Route path="/wordpress-audit" element={<WordPressAudit />} />
          <Route path="/fiverr" element={<Fiverr />} />
        </Route>

        <Route path="/admin/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/labs" replace />} />
          <Route path="labs" element={<LabsList />} />
          <Route path="labs/new" element={<LabForm isNew />} />
          <Route path="labs/:id" element={<LabForm />} />
          <Route path="machines" element={<MachinesList />} />
          <Route path="machines/new" element={<MachineForm isNew />} />
          <Route path="machines/:id" element={<MachineForm />} />
          <Route path="walkthroughs" element={<WalkthroughsList />} />
          <Route path="walkthroughs/new" element={<WalkthroughForm isNew />} />
          <Route path="walkthroughs/:id" element={<WalkthroughForm />} />
          <Route path="audits" element={<AuditsList />} />
          <Route path="audits/new" element={<AuditForm isNew />} />
          <Route path="audits/:id" element={<AuditForm />} />
          <Route path="gigs" element={<GigsList />} />
          <Route path="gigs/new" element={<GigForm isNew />} />
          <Route path="gigs/:id" element={<GigForm />} />
          <Route path="profile" element={<ProfileEditor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App