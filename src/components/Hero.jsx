function Hero({ searchQuery, setSearchQuery, resultCount }) {
  return (
    <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">

      {/* Badge */}
      <span className="inline-block font-mono text-xs font-medium tracking-widest text-[#00e07a] bg-[#00e07a]/10 px-4 py-1.5 rounded-full mb-6">
        SR7 // CYBERSEC
      </span>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-5">
        Think Like An Attacker.
        <br />
        Build Like A Defender.
      </h1>

      {/* Subtext */}
      <p className="text-[#8b98a8] text-base md:text-lg max-w-2xl mx-auto mb-10">
        Security writeups, lab solutions, and projects from my journey into web application security and penetration testing.
      </p>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by lab, machine, or vulnerability (e.g. SQLi, XSS, VulnOS)..."
          className="w-full bg-[#111826] border border-[#1f2a3f] text-white text-sm rounded-xl py-4 pl-6 pr-16 outline-none placeholder-[#8b98a8] focus:border-[#00e07a] focus:ring-4 focus:ring-[#00e07a]/10 transition-all"
        />

        <button
          type="button"
          aria-label="Search"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#00e07a] text-[#0a0e17] w-10 h-10 rounded-lg flex items-center justify-center hover:opacity-85 transition-opacity"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      {/* Search hint */}
      {searchQuery && (
        <p className="text-sm text-[#8b98a8] mt-4">
          {resultCount} result{resultCount === 1 ? '' : 's'} for "{searchQuery}"
        </p>
      )}

    </section>
  )
}

export default Hero