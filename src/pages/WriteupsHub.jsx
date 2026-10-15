import { Link } from 'react-router-dom'

const HUBS = [
  {
    to: '/portswigger',
    icon: 'PS',
    title: 'PortSwigger Labs',
    description:
      'Web Security Academy lab solutions covering SQL injection, XSS, SSRF, XXE, CSRF, JWT flaws, and more.',
    count: 66,
    unit: 'labs',
  },
  {
    to: '/htb',
    icon: 'HTB',
    title: 'Hack The Box',
    description:
      'Boot2root machine walkthroughs from reconnaissance to privilege escalation, with full command history.',
    count: 7,
    unit: 'machines',
  },
  {
    to: '/vulnhub',
    icon: 'VH',
    title: 'VulnHub Walkthroughs',
    description:
      'Full boot2root writeups covering Drupal, OpenDocMan, kernel exploits, and privilege escalation chains.',
    count: 1,
    unit: 'walkthrough',
  },
  {
    to: '/wordpress-audit',
    icon: 'WP',
    title: 'WordPress Audits',
    description:
      'Structured security audit case studies with scope, methodology, findings, remediation, and lessons learned.',
    count: 1,
    unit: 'audit',
  },
]

function WriteupsHub() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 pt-16 pb-20">

      <div className="text-center mb-12">
        <span className="inline-block font-mono text-xs font-medium tracking-widest text-[#00e07a] bg-[#00e07a]/10 px-4 py-1.5 rounded-full mb-5">
          SR7 // WRITEUPS
        </span>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Security Writeups
        </h1>
        <p className="text-[#8b98a8] text-base max-w-2xl mx-auto">
          Documented lab solutions, machine walkthroughs, and security audit case studies.
          Every entry includes methodology, tooling, exploitation steps, and remediation notes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {HUBS.map((hub) => (
          <Link
            key={hub.to}
            to={hub.to}
            className="bg-[#151d2e] border border-[#1f2a3f] rounded-2xl p-7 flex flex-col hover:border-[#00e07a]/40 hover:-translate-y-0.5 transition-all"
          >
            <div className="w-10 h-10 rounded-[10px] bg-[#00e07a]/10 text-[#00e07a] flex items-center justify-center font-mono text-base font-bold mb-4 flex-shrink-0">
              {hub.icon}
            </div>
            <h3 className="text-lg font-bold mb-2 break-words">
              {hub.title}
            </h3>
            <p className="text-sm text-[#8b98a8] leading-relaxed flex-1 mb-4 break-words">
              {hub.description}
            </p>
            <div className="flex justify-between items-center text-xs font-mono text-[#8b98a8] pt-4 border-t border-[#1f2a3f] gap-3 flex-wrap">
              <span>
                <span className="text-[#00e07a] font-semibold">{hub.count}</span> {hub.unit}
              </span>
              <span className="text-[#00e07a] text-base">→</span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default WriteupsHub