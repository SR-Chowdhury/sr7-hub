function GigCard({ title, price, delivery, summary, deliverables, tags, status }) {
  const isPlaceholder = status === 'placeholder'

  return (
    <article
      className={`w-full max-w-full min-w-0 bg-[#151d2e] border rounded-2xl p-7 transition-colors flex flex-col gap-4 ${
        isPlaceholder
          ? 'border-[#1f2a3f] opacity-60'
          : 'border-[#1f2a3f] hover:border-[#00e07a]/40'
      }`}
    >

      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`text-[11px] font-medium px-3 py-1 rounded-full ${
                isPlaceholder
                  ? 'bg-[#8b98a8]/10 text-[#8b98a8]'
                  : 'bg-[#00e07a]/10 text-[#00e07a]'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <span
          className={`font-mono text-sm font-bold ${
            isPlaceholder ? 'text-[#8b98a8]' : 'text-[#00e07a]'
          }`}
        >
          {price}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white leading-snug break-words">
        {title}
      </h3>

      {/* Summary */}
      <p className="text-sm text-[#8b98a8] leading-relaxed break-words">
        {summary}
      </p>

      {/* Meta */}
      {!isPlaceholder && (
        <div className="flex items-center gap-4 text-xs text-[#8b98a8]">
          <span>⏱ {delivery} delivery</span>
        </div>
      )}

      {/* Deliverables */}
      {deliverables.length > 0 && (
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#00e07a] mb-2">
            What You Get
          </h4>
          <ul className="space-y-1.5">
            {deliverables.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#8b98a8] break-words">
                <span className="text-[#00e07a] font-bold shrink-0">✓</span>
                <span className="break-words">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </article>
  )
}

export default GigCard