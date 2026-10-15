import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0a0e17]/85 backdrop-blur-md border-b border-[#1f2a3f]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <Link
          to="/"
          className="font-mono text-xl font-bold text-[#00e07a] tracking-wider"
        >
          SR7
        </Link>

        <div className="flex items-center gap-7">
          <Link
            to="/about"
            className="text-sm font-medium text-[#8b98a8] hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            to="/writeups"
            className="text-sm font-medium text-[#8b98a8] hover:text-white transition-colors"
          >
            Writeups
          </Link>
          <Link
            to="/fiverr"
            className="text-sm font-medium text-[#8b98a8] hover:text-white transition-colors"
          >
            Services
          </Link>
          <a
            href="#contact"
            className="text-sm font-medium text-[#00e07a] border border-[#00e07a] px-4 py-1.5 rounded-md hover:bg-[#00e07a]/10 transition-colors"
          >
            Contact
          </a>
        </div>

      </div>
    </nav>
  )
}

export default Navbar