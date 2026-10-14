function Footer() {
  return (
    <footer className="border-t border-[#1f2a3f] mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">

        <p className="text-sm text-[#8b98a8]">
          © 2026 · SR7 · Shihan Chowdhury
        </p>

        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/shihan-chowdhury-915583279"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-[#8b98a8] hover:text-[#00e07a] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/SR-Chowdhury"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-[#8b98a8] hover:text-[#00e07a] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://sr7-portfolio.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-[#8b98a8] hover:text-[#00e07a] transition-colors"
          >
            Portfolio
          </a>
        </div>

      </div>
    </footer>
  )
}

export default Footer