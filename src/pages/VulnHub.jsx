import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import WalkthroughCard from '../components/WalkthroughCard'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'
import ErrorBox from '../components/ErrorBox'
import { walkthroughs } from '../lib/api'
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

function scoreMachine(machine, query) {
  if (query === '') return 1
  let score = 0
  if (machine.machineName?.toLowerCase().includes(query)) score += 10
  if (machine.difficulty?.toLowerCase().includes(query)) score += 8
  if (machine.os?.toLowerCase().includes(query)) score += 6
  if (machine.summary?.toLowerCase().includes(query)) score += 4
  if (machine.tools?.some((t) => t.toLowerCase().includes(query))) score += 3
  return score
}

function VulnHub() {
  const { data: vulnhubWalkthroughs = [], loading, error } = useResource(
    () => walkthroughs.list({ limit: 500 }),
    []
  )

  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredMachines = useMemo(() => {
    const query = sanitize(searchQuery)
    return vulnhubWalkthroughs
      .map((machine) => ({ machine, score: scoreMachine(machine, query) }))
      .filter(({ score }) => query === '' || score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ machine }) => machine)
  }, [vulnhubWalkthroughs, searchQuery])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const totalPages = Math.max(1, Math.ceil(filteredMachines.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const pagedMachines = filteredMachines.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) return <Loader label="Loading walkthroughs…" />
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
          SR7 // VULNHUB
        </span>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          VulnHub Walkthroughs
        </h1>
        <p className="text-[#8b98a8] text-base max-w-2xl mx-auto mb-8">
          Full boot2root walkthroughs from reconnaissance to privilege escalation. Every step documented with commands and findings.
        </p>

        <div className="flex justify-center gap-10 flex-wrap">
          <Stat number={vulnhubWalkthroughs.length.toString()} label="Machines" />
          <Stat number="Root" label="Access" />
          <Stat number="Boot2Root" label="Type" />
        </div>
      </div>

      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search machines (e.g. VulnOS, Drupal, SQLMap)..."
          className="w-full bg-[#111826] border border-[#1f2a3f] text-white text-sm rounded-xl px-5 py-3.5 outline-none placeholder-[#8b98a8] focus:border-[#00e07a] transition-colors"
        />
        {searchQuery && (
          <p className="text-xs text-[#8b98a8] mt-3 text-center">
            {filteredMachines.length} result{filteredMachines.length === 1 ? '' : 's'} for "{searchQuery}"
          </p>
        )}
      </div>

      {filteredMachines.length === 0 ? (
        <p className="text-center text-[#8b98a8] py-20">
          No walkthroughs match your search. Try a different keyword.
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-5 w-full max-w-full min-w-0">
            {pagedMachines.map((machine) => (
              <WalkthroughCard key={machine.id} {...machine} />
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

export default VulnHub