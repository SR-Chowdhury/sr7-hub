function AuditCard({
  title,
  client,
  category,
  environment,
  duration,
  summary,
  confidentialityNote,
  tools = [],
  scope = [],
  methodology = [],
  findingsSummary = {},
  criticalFindings = [],
  remediation = [],
  beforeAfter = { before: {}, after: {} },
  recommendations = [],
  lessons = [],
}) {
  const handleToggle = (e) => {
    if (e.target.open) {
      const card = e.target.closest("article");
      if (card) {
        setTimeout(() => {
          const navbarHeight = 80;
          const y =
            card.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 50);
      }
    }
  };

  return (
    <article className="w-full max-w-full min-w-0 overflow-hidden bg-[#151d2e] border border-[#1f2a3f] rounded-2xl p-7 transition-colors hover:border-[#00e07a]/40">
      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="text-[11px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-[#00e07a]/10 text-[#00e07a]">
          {category}
        </span>
        <span className="font-mono text-xs text-[#8b98a8]">{duration}</span>
      </div>

      {/* Title and summary */}
      <h2 className="text-lg font-semibold text-white leading-snug mb-2 break-words">
        {title}
      </h2>

      <p className="text-xs text-[#8b98a8] mb-2 break-words">
        <span className="font-semibold">Client:</span> {client}
      </p>

      <p className="text-sm text-[#8b98a8] leading-relaxed break-words mb-3">
        {summary}
      </p>

      {/* Findings mini-summary */}
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#ff5566]/10 text-[#ff5566]">
          {findingsSummary.critical ?? 0} Critical
        </span>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#ff8800]/10 text-[#ff8800]">
          {findingsSummary.high ?? 0} High
        </span>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#f0c000]/10 text-[#f0c000]">
          {findingsSummary.medium ?? 0} Medium
        </span>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#00e07a]/10 text-[#00e07a]">
          {findingsSummary.low ?? 0} Low
        </span>
      </div>

      {/* Tools */}
      <div className="flex flex-wrap gap-2 mt-4">
        {tools.map((tool) => (
          <span
            key={tool}
            className="text-xs font-medium bg-[#8b98a8]/10 text-[#8b98a8] px-3 py-1 rounded-full"
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Expandable full report */}
      <details
        onToggle={handleToggle}
        className="mt-5 border-t border-[#1f2a3f] pt-4 group w-full max-w-full min-w-0 scroll-mt-24"
      >
        <summary className="cursor-pointer text-sm font-semibold text-[#00e07a] list-none flex items-center gap-2 select-none">
          <span className="font-mono text-base font-bold w-4 group-open:hidden">
            +
          </span>
          <span className="font-mono text-base font-bold w-4 hidden group-open:inline">
            −
          </span>
          <span className="group-open:hidden">View Full Report</span>
          <span className="hidden group-open:inline">Hide Full Report</span>
        </summary>

        <div className="mt-5 space-y-6 w-full max-w-full min-w-0 overflow-hidden">
          {/* Confidentiality note */}
          {confidentialityNote && (
            <p className="text-xs text-[#8b98a8] italic bg-[#111826] border border-[#1f2a3f] rounded-lg p-4 break-words">
              {confidentialityNote}
            </p>
          )}

          {/* Environment */}
          <Section title="Environment">
            <p className="text-sm text-[#8b98a8] break-words">{environment}</p>
          </Section>

          {/* Scope */}
          <Section title="Scope">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {scope.map((item) => (
                <div
                  key={item.label}
                  className="bg-[#111826] border border-[#1f2a3f] rounded-lg p-3 text-center"
                >
                  <p className="font-mono text-base font-bold text-[#00e07a] break-words">
                    {item.value}
                  </p>
                  <p className="text-[10px] text-[#8b98a8] uppercase tracking-wider mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* Methodology */}
          <Section title="Methodology">
            <div className="space-y-2">
              {methodology.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#111826] border border-[#1f2a3f] rounded-lg p-3 flex flex-col md:flex-row md:items-center gap-2"
                >
                  <span className="font-mono text-[10px] text-[#00e07a] bg-[#00e07a]/10 px-2 py-1 rounded-full w-fit">
                    {item.tool}
                  </span>
                  <div className="flex-grow min-w-0">
                    <p className="text-xs font-semibold text-white break-words">
                      {item.step}
                    </p>
                    <p className="text-[11px] text-[#8b98a8] break-words">
                      {item.purpose}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Critical Findings */}
          <Section title="Critical Findings">
            <div className="space-y-3">
              {criticalFindings.map((finding) => (
                <div
                  key={finding.fid || finding.title || i}
                  className="bg-[#111826] border border-[#1f2a3f] rounded-lg p-4"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full ${
                        finding.severity === "Critical"
                          ? "bg-[#ff5566]/10 text-[#ff5566]"
                          : "bg-[#ff8800]/10 text-[#ff8800]"
                      }`}
                    >
                      {finding.severity}
                    </span>
                    <h3 className="text-sm font-semibold text-white break-words">
                      {finding.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#8b98a8] break-words mb-2">
                    {finding.detail}
                  </p>
                  <p className="text-xs text-[#8b98a8] break-words">
                    <span className="text-[#00e07a] font-semibold">Fix: </span>
                    {finding.fix}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* Remediation */}
          <Section title="Remediation Actions">
            <div className="space-y-2">
              {remediation.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-[#111826] border border-[#1f2a3f] rounded-lg p-3"
                >
                  <span className="text-[#00e07a] font-bold text-sm">✓</span>
                  <div className="flex-grow min-w-0">
                    <p className="text-xs text-white break-words">
                      {item.action}
                    </p>
                    <p className="text-[11px] text-[#8b98a8] mt-0.5 break-words">
                      {item.result}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Before / After */}
          <Section title="Before vs After">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-[#111826] border border-[#ff5566]/30 rounded-lg p-4 text-center">
                <p className="text-[10px] text-[#8b98a8] uppercase tracking-wider mb-1">
                  Before
                </p>
                <p className="font-mono text-2xl font-bold text-[#ff5566]">
                  {beforeAfter.before?.total ?? 0}
                </p>
                <p className="text-xs text-[#8b98a8] mt-1">
                  {beforeAfter.before?.critical ?? 0} Critical
                </p>
              </div>

              <div className="bg-[#111826] border border-[#00e07a]/30 rounded-lg p-4 text-center">
                <p className="text-[10px] text-[#8b98a8] uppercase tracking-wider mb-1">
                  After
                </p>
                <p className="font-mono text-2xl font-bold text-[#00e07a]">
                  {beforeAfter.after?.total ?? 0}
                </p>
                <p className="text-xs text-[#8b98a8] mt-1">
                  {beforeAfter.after?.critical ?? 0} Critical
                </p>
              </div>
            </div>
          </Section>

          {/* Recommendations */}
          <Section title="Hardening Recommendations">
            <ul className="space-y-2">
              {recommendations.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-[#111826] border border-[#1f2a3f] rounded-lg p-3"
                >
                  <span className="text-[#00e07a] font-bold text-sm">→</span>
                  <p className="text-xs text-[#8b98a8] break-words">{item}</p>
                </li>
              ))}
            </ul>
          </Section>

          {/* Lessons */}
          <Section title="Lessons Learned">
            <div className="space-y-2">
              {lessons.map((item, i) => (
                <blockquote
                  key={i}
                  className="border-l-2 border-[#00e07a] pl-4 py-1"
                >
                  <p className="text-xs text-[#8b98a8] italic break-words">
                    {item}
                  </p>
                </blockquote>
              ))}
            </div>
          </Section>
        </div>
      </details>
    </article>
  );
}

function Section({ title, children }) {
  return (
    <div className="w-full max-w-full min-w-0">
      <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#00e07a] mb-2">
        {title}
      </h4>
      {children}
    </div>
  );
}

export default AuditCard;
