function WalkthroughCard({
  machineName,
  difficulty,
  os,
  source,
  goal,
  summary,
  tools,
  phases,
  keyFindings,
  flag,
  remediation,
  notes,
}) {
  const handleToggle = (e) => {
    if (e.target.open) {
      const card = e.target.closest('article')
      if (card) {
        setTimeout(() => {
          const navbarHeight = 80
          const y =
            card.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight
          window.scrollTo({ top: y, behavior: 'smooth' })
        }, 50)
      }
    }
  }

  return (
    <article className="w-full max-w-full min-w-0 overflow-hidden bg-[#151d2e] border border-[#1f2a3f] rounded-2xl p-7 transition-colors hover:border-[#00e07a]/40">

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="font-mono text-xs font-semibold text-[#8b98a8]">
          {os}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-[#00e07a]/10 text-[#00e07a]">
          {difficulty}
        </span>
        <a
          href={source}
          target="_blank"
          rel="noreferrer"
          className="text-[11px] font-medium px-3 py-1 rounded-full bg-[#8b98a8]/10 text-[#8b98a8] hover:text-[#00e07a] transition-colors"
        >
          VulnHub ↗
        </a>
      </div>

      {/* Title and summary */}
      <h2 className="text-lg font-semibold text-white leading-snug mb-2 break-words">
        {machineName}
      </h2>
      <p className="text-sm text-[#8b98a8] leading-relaxed break-words mb-3">
        {summary}
      </p>

      {/* Goal */}
      <p className="text-sm text-[#8b98a8] break-words">
        <span className="text-[#00e07a] font-semibold">Goal:</span> {goal}
      </p>

      {/* Tools */}
      <div className="flex flex-wrap gap-2 mt-4">
        {tools.map((tool) => (
          <span
            key={tool}
            className="text-xs font-medium bg-[#00e07a]/10 text-[#00e07a] px-3 py-1 rounded-full"
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Expandable solution */}
      <details
        onToggle={handleToggle}
        className="mt-5 border-t border-[#1f2a3f] pt-4 group w-full max-w-full min-w-0 scroll-mt-24"
      >
        <summary className="cursor-pointer text-sm font-semibold text-[#00e07a] list-none flex items-center gap-2 select-none">
          <span className="font-mono text-base font-bold w-4 group-open:hidden">+</span>
          <span className="font-mono text-base font-bold w-4 hidden group-open:inline">−</span>
          <span className="group-open:hidden">View Walkthrough</span>
          <span className="hidden group-open:inline">Hide Walkthrough</span>
        </summary>

        <div className="mt-5 space-y-6 w-full max-w-full min-w-0 overflow-hidden">

          {/* Phases */}
          {phases.map((phase, idx) => (
            <div key={idx} className="w-full max-w-full min-w-0">
              <h3 className="text-sm font-semibold text-[#00e07a] mb-3 break-words">
                {phase.title}
              </h3>
              <div className="space-y-2 w-full max-w-full min-w-0">
                {phase.steps.map((step, i) => (
                  <div key={i} className="w-full max-w-full min-w-0">
                    <p className="text-sm text-[#8b98a8] break-words">
                      • {step.text}
                    </p>
                    {step.command && (
                      <pre className="w-full max-w-full overflow-x-auto bg-[#060910] border border-[#1f2a3f] rounded-lg px-4 py-2 mt-1 mb-2 m-0">
                        <code className="font-mono text-xs text-[#00e07a] whitespace-pre-wrap break-all">
                          {step.command}
                        </code>
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Key Findings */}
          <Section title="Key Findings">
            <ul className="list-disc pl-5 text-sm text-[#8b98a8] space-y-1 break-words">
              {keyFindings.map((item, i) => (
                <li key={i} className="break-words">{item}</li>
              ))}
            </ul>
          </Section>

          {/* Flag */}
          <Section title="Flag">
            <pre className="w-full max-w-full overflow-x-auto bg-[#060910] border border-[#1f2a3f] rounded-lg px-4 py-3 m-0">
              <code className="font-mono text-sm text-[#00e07a] whitespace-pre-wrap break-words">
                {flag}
              </code>
            </pre>
          </Section>

          {/* Remediation */}
          <Section title="Remediation">
            <p className="text-sm text-[#8b98a8] break-words">{remediation}</p>
          </Section>

          {/* Notes */}
          {notes && (
            <Section title="Notes">
              <p className="text-sm text-[#8b98a8] break-words">{notes}</p>
            </Section>
          )}

        </div>
      </details>

    </article>
  )
}

function Section({ title, children }) {
  return (
    <div className="w-full max-w-full min-w-0">
      <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#00e07a] mb-2">
        {title}
      </h4>
      {children}
    </div>
  )
}

export default WalkthroughCard