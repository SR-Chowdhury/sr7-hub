import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import FilterBar from '../components/FilterBar'
import LabCard from '../components/LabCard'
import { portswiggerLabs } from '../data/portswiggerLabs'

const MAX_QUERY_LENGTH = 100

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
  if (lab.title.toLowerCase().includes(query)) score += 10
  if (lab.category.toLowerCase().includes(query)) score += 8
  if (lab.difficulty.toLowerCase().includes(query)) score += 6
  if (lab.summary.toLowerCase().includes(query)) score += 3
  return score
}

function PortSwigger() {
  const [searchQuery, setSearchQuery] = useState('')
  const [difficulty, setDifficulty] = useState('all')
  const [category, setCategory] = useState('all')

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
  }, [searchQuery, difficulty, category])

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
          All 61 Apprentice labs documented. Each entry includes the lab criteria, payload, exploitation steps, and remediation notes.
        </p>

        <div className="flex justify-center gap-10 flex-wrap">
          <Stat number="61" label="Apprentice" />
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
        <div className="flex flex-col gap-5 w-full max-w-full min-w-0">
          {filteredLabs.map((lab) => (
            <LabCard key={lab.id} {...lab} />
          ))}
        </div>
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