import { useState, useMemo } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CardGrid from './components/CardGrid'
import Footer from './components/Footer'
import { cards } from './data/cards'
import { createSearchEngine } from './utils/search'

// Build the search engine once
const search = createSearchEngine(cards)

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCards = useMemo(
    () => search(searchQuery),
    [searchQuery]
  )

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white flex flex-col">
      <Navbar />
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        resultCount={filteredCards.length}
      />
      <div className="flex-grow">
        <CardGrid filteredCards={filteredCards} />
      </div>
      <Footer />
    </div>
  )
}

export default App