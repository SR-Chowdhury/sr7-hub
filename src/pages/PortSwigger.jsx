import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FilterBar from '../components/FilterBar'
import LabCard from '../components/LabCard'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'
import ErrorBox from '../components/ErrorBox'
import { labs } from '../lib/api'
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

function scoreLab(lab, query) {
  if (query === '') return 1
  let score = 0
  if (lab.title?.toLowerCase().includes(query)) score += 10
  if (lab.category?.toLowerCase().includes(query)) score += 8
  if (lab.difficulty?.toLowerCase().includes(query)) score += 6
  if (lab.summary?.toLowerCase().includes(query)) score += 3
  return score
}

function PortSwigger() {
  const { data: portswiggerLabs = [], loading, error } = useResource(
    () => labs.list({ limit: 500 }),
    []
  )

  const [searchQuery, setSearchQuery] = useState('')
  const [difficulty, setDifficulty] = useState('all')
  const [category, setCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredLabs = useMemo(() => {
    const query = sanitize(searchQuery)

    return portswiggerLabs
      .map((lab) => ({ lab, score: scoreLab(lab, query) }))
      .filter(({ lab, score }) => {
        const matchesQuery = query === '' || score > 0
        const matchesDifficulty = difficulty === 'all' || lab.difficulty === difficulty
        const matchesCategory = category === 'all' || lab.category === category
        return matchesQuery && matchesDifficulty && matchesCategory
      })
      .sort((a, b) => b.score - a.score)
      .map(({ lab }) => lab)
  }, [portswiggerLabs, searchQuery, difficulty, category])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, difficulty, category])

  const totalPages = Math.max(1, Math.ceil(filteredLabs.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const pagedLabs = filteredLabs.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) return <Loader label="Loading labs…" />
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
          SR7 // LABS
        </span>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          PortSwigger Lab Solutions
        </h1>
        <p className="text-[#8b98a8] text-base max-w-2xl mx-auto mb-8">
          All Apprentice labs documented. Each entry includes the lab criteria, payload, exploitation steps, and remediation notes.
        </p>

        <div className="flex justify-center gap-10 flex-wrap">
          <Stat number={portswiggerLabs.length.toString()} label="Labs" />
          <Stat number="4" label="Practitioner" />
          <Stat number="#56,379" label="Hall of Fame" />
        </div>
      </div>

      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        category={category}
        setCategory={setCategory}
      />

      <p className="text-sm text-[#8b98a8] mb-5">
        {filteredLabs.length} result{filteredLabs.length === 1 ? '' : 's'}
      </p>

      {filteredLabs.length === 0 ? (
        <p className="text-center text-[#8b98a8] py-20">
          No labs match your filters. Try a different keyword.
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-5 w-full max-w-full min-w-0">
            {pagedLabs.map((lab) => (
              <LabCard key={lab.id} {...lab} />
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

export default PortSwigger