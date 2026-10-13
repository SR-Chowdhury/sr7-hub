function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0a0e17]/85 backdrop-blur-md border-b border-[#1f2a3f]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <a
          href="/"
          className="font-mono text-xl font-bold text-[#00e07a] tracking-wider"
        >
          SR7
        </a>

        {/* Navigation Links */}
        <div className="flex items-center gap-7">
          <a
            href="#writeups"
            className="text-sm font-medium text-[#8b98a8] hover:text-white transition-colors"
          >
            Writeups
          </a>
          <a
            href="#projects"
            className="text-sm font-medium text-[#8b98a8] hover:text-white transition-colors"
          >
            Projects
          </a>
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