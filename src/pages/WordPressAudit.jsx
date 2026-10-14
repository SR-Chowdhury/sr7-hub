import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AuditCard from '../components/AuditCard'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'
import ErrorBox from '../components/ErrorBox'
import { audits } from '../lib/api'
import { useResource } from '../lib/useResource'

const MAX_QUERY_LENGTH = 100
const ITEMS_PER_PAGE = 5

function sanitize(raw) {
  if (typeof raw !== 'string') return ''
  return raw
    .slice(0, MAX_QUERY_LENGTH)
    .toLowerCase()
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
}

function scoreAudit(audit, query) {
  if (query === '') return 1
  let score = 0
  if (audit.title?.toLowerCase().includes(query)) score += 10
  if (audit.category?.toLowerCase().includes(query)) score += 8
  if (audit.client?.toLowerCase().includes(query)) score += 6
  if (audit.summary?.toLowerCase().includes(query)) score += 4
  if (audit.tools?.some((t) => t.toLowerCase().includes(query))) score += 3
  return score
}

function WordPressAudit() {
  const { data: wordpressAudits = [], loading, error } = useResource(
    () => audits.list({ limit: 500 }),
    []
  )

  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const categories = ['all', 'Class Project', 'Freelance', 'Personal', 'Confidential']

  const filteredAudits = useMemo(() => {
    const query = sanitize(searchQuery)

    return wordpressAudits
      .map((audit) => ({ audit, score: scoreAudit(audit, query) }))
      .filter(({ audit, score }) => {
        const matchesQuery = query === '' || score > 0
        const matchesCategory = category === 'all' || audit.category === category
        return matchesQuery && matchesCategory
      })
      .sort((a, b) => b.score - a.score)
      .map(({ audit }) => audit)
  }, [wordpressAudits, searchQuery, category])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, category])

  const totalPages = Math.max(1, Math.ceil(filteredAudits.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const pagedAudits = filteredAudits.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) return <Loader label="Loading audits…" />
  if (error) return <ErrorBox error={error} />

  return (
    <div className="w-full max-w-7xl mx-auto px-6 pt-16 pb-20 overflow-hidden">

      <Link
        to="/"
        className="inline-block text-sm text-[#8b98a8] hover:text-[#00e07a] transition-colors mb-6"
      >
        ← Back to Hub
      </Link>

      <div className="text-center mb-12">
        <span className="inline-block font-mono text-xs font-medium tracking-widest text-[#00e07a] bg-[#00e07a]/10 px-4 py-1.5 rounded-full mb-5">
          SR7 // AUDITS
        </span>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          WordPress Security Audits
        </h1>
        <p className="text-[#8b98a8] text-base max-w-2xl mx-auto mb-8">
          Full security audit case studies. Each report includes scope, methodology, findings, remediation, and hardening recommendations. Client names are anonymized unless written permission is given.
        </p>

        <div className="flex justify-center gap-10 flex-wrap">
          <Stat number={wordpressAudits.length.toString()} label="Reports" />
          <Stat number="Wordfence" label="Primary Tool" />
          <Stat number="Localhost" label="Environment" />
        </div>
      </div>

      <section className="max-w-6xl mx-auto py-5">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search audits (e.g. Wordfence, plugin, Astra, XML-RPC)..."
            className="bg-[#111826] border border-[#1f2a3f] text-white text-sm rounded-xl px-4 py-3 outline-none placeholder-[#8b98a8] focus:border-[#00e07a] transition-colors"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#111826] border border-[#1f2a3f] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#00e07a] transition-colors cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </section>

      <p className="text-sm text-[#8b98a8] mb-5">
        {filteredAudits.length} result{filteredAudits.length === 1 ? '' : 's'}
      </p>

      {filteredAudits.length === 0 ? (
        <p className="text-center text-[#8b98a8] py-20">
          No audits match your filters. Try a different keyword.
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-5 w-full max-w-full min-w-0">
            {pagedAudits.map((audit) => (
              <AuditCard key={audit.id} {...audit} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

    </div>
  )
}

function Stat({ number, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-mono text-2xl font-bold text-[#00e07a]">
        {number}
      </span>
      <span className="text-xs text-[#8b98a8] uppercase tracking-wider mt-1">
        {label}
      </span>
    </div>
  )
}

export default WordPressAudit