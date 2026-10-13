function LabCard({
  labNumber,
  title,
  difficulty,
  category,
  summary,
  criteria,
  payload,
  steps,
  whyItWorks,
  remediation,
  notes,
}) {
  const difficultyStyles = {
    Apprentice: "bg-[#00e07a]/10 text-[#00e07a]",
    Practitioner: "bg-[#f0c000]/10 text-[#f0c000]",
    Expert: "bg-[#ff5566]/10 text-[#ff5566]",
  };

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
      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="font-mono text-xs font-semibold text-[#8b98a8]">
          {labNumber}
        </span>
        <span
          className={`text-[11px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${
            difficultyStyles[difficulty] || difficultyStyles.Apprentice
          }`}
        >
          {difficulty}
        </span>
        <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-[#8b98a8]/10 text-[#8b98a8]">
          {category}
        </span>
      </div>

      {/* Title and summary */}
      <h2 className="text-lg font-semibold text-white leading-snug mb-2 break-words">
        {title}
      </h2>
      <p className="text-sm text-[#8b98a8] leading-relaxed break-words">
        {summary}
      </p>

      {/* Expandable solution */}
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
          <span className="group-open:hidden">View Solution</span>
          <span className="hidden group-open:inline">Hide Solution</span>
        </summary>

        <div className="mt-5 space-y-5 w-full max-w-full min-w-0 overflow-hidden">
          <Section title="Criteria">
            <ul className="list-disc pl-5 text-sm text-[#8b98a8] space-y-1 break-words">
              {criteria.map((item, i) => (
                <li key={i} className="break-words">
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Payload">
            <pre className="w-full max-w-full overflow-x-auto bg-[#060910] border border-[#1f2a3f] rounded-lg px-4 py-3 m-0">
              <code className="font-mono text-sm text-[#00e07a] break-all whitespace-pre-wrap">
                {payload}
              </code>
            </pre>
          </Section>

          <Section title="Steps">
            <ol className="list-decimal pl-5 text-sm text-[#8b98a8] space-y-1 break-words">
              {steps.map((step, i) => (
                <li key={i} className="break-words">
                  {step}
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Why It Works">
            <p className="text-sm text-[#8b98a8] break-words">{whyItWorks}</p>
          </Section>

          <Section title="Remediation">
            <p className="text-sm text-[#8b98a8] break-words">{remediation}</p>
          </Section>

          {notes && (
            <Section title="Notes">
              <p className="text-sm text-[#8b98a8] break-words">{notes}</p>
            </Section>
          )}
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

export default LabCard;
