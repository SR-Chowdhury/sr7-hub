import { useState, useMemo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CardGrid from './components/CardGrid'
import Footer from './components/Footer'
import PortSwigger from './pages/PortSwigger'
import { cards } from './data/cards'
import { createSearchEngine } from './utils/search'

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

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0e17] text-white flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portswigger" element={<PortSwigger />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App