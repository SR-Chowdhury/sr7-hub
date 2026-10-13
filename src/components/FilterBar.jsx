function FilterBar({
  searchQuery,
  setSearchQuery,
  difficulty,
  setDifficulty,
  category,
  setCategory,
}) {
  const categories = [
    'all',
    'SQL Injection',
    'XSS',
    'CSRF',
    'Clickjacking',
    'CORS',
    'XXE',
    'SSRF',
    'OS Command Injection',
    'Path Traversal',
    'Access Control',
    'Authentication',
    'WebSocket',
    'PHP Object Injection',
    'Information Disclosure',
    'Business Logic',
    'File Upload',
    'JWT',
    'GraphQL',
    'API Testing',
    'NoSQL Injection',
    'AI/LLM',
    'Race Condition',
  ]

  return (
    <section className="max-w-6xl mx-auto px-6 py-5">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-3">

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search labs (e.g. SQLi, XSS, JWT, race condition)..."
          className="bg-[#111826] border border-[#1f2a3f] text-white text-sm rounded-xl px-4 py-3 outline-none placeholder-[#8b98a8] focus:border-[#00e07a] transition-colors"
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="bg-[#111826] border border-[#1f2a3f] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#00e07a] transition-colors cursor-pointer"
        >
          <option value="all">All Difficulties</option>
          <option value="Apprentice">Apprentice</option>
          <option value="Practitioner">Practitioner</option>
          <option value="Expert">Expert</option>
        </select>

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
  )
}

export default FilterBar