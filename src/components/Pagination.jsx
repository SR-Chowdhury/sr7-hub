function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-2 mt-10">

      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium text-[#8b98a8] bg-[#111826] border border-[#1f2a3f] rounded-lg hover:border-[#00e07a] hover:text-[#00e07a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#1f2a3f] disabled:hover:text-[#8b98a8]"
      >
        ← Prev
      </button>

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
            page === currentPage
              ? 'bg-[#00e07a] text-[#0a0e17]'
              : 'text-[#8b98a8] bg-[#111826] border border-[#1f2a3f] hover:border-[#00e07a] hover:text-[#00e07a]'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-medium text-[#8b98a8] bg-[#111826] border border-[#1f2a3f] rounded-lg hover:border-[#00e07a] hover:text-[#00e07a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#1f2a3f] disabled:hover:text-[#8b98a8]"
      >
        Next →
      </button>

    </div>
  )
}

export default Pagination