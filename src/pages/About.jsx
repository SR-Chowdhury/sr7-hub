import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 pt-16 pb-20">

      <Link
        to="/writeups"
        className="inline-block text-sm text-[#8b98a8] hover:text-[#00e07a] transition-colors mb-6"
      >
        ← See my writeups
      </Link>

      {/* Hero: avatar + name + pitch */}
      <div className="flex flex-wrap items-center gap-8 mb-12">
        <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#00e07a] to-[#0084ff] flex items-center justify-center font-mono text-3xl font-bold text-[#0a0e17] flex-shrink-0">
          SR7
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold mb-1 break-words">
            Shihan Chowdhury
          </h1>
          <p className="font-mono text-sm text-[#00e07a] mb-3">@sr7sec</p>
          <p className="text-[#8b98a8] text-base max-w-[520px] prose-justify">
            Web security researcher and full-stack developer.
            I find vulnerabilities, document them clearly, and build secure applications.
          </p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-[#8b98a8] text-base leading-relaxed mb-4 prose-justify">
        My background in software development shapes how I approach security. Understanding how applications are built helps me investigate how they can fail, identify weaknesses, and think critically about practical remediation.
      </p>

      <p className="text-[#8b98a8] text-base leading-relaxed mb-4 prose-justify">
        I'm focused on {' '}<strong className="text-white font-semibold">web application security, WordPress security, and full-stack development.</strong> I document my work publicly through security labs, machine assessments, and audit write-ups, turning hands-on practice into technical knowledge that others can learn from.
      </p>

      <p className="text-[#8b98a8] text-base leading-relaxed mb-4 prose-justify">
        I'm currently developing my skills through{' '}
        <strong className="text-white font-semibold">PortSwigger Web Security Academy</strong>,{' '}
        <strong className="text-white font-semibold">Hack The Box</strong>, and{' '}
        <strong className="text-white font-semibold">VulnHub</strong> labs, while building SR7 Hub as a central portfolio for my security research, development projects, and technical documentation.
      </p>

      {/* Focus areas */}
      <h2 className="text-2xl font-bold mt-12 mb-5 pb-3 border-b border-[#1f2a3f]">
        Focus areas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SkillCard
          title="Web Application Security"
          tags={['SQL Injection', 'XSS', 'SSRF', 'XXE', 'CSRF', 'JWT']}
        />
        <SkillCard
          title="WordPress Security"
          tags={['Wordfence', 'Malware Removal', 'Hardening', 'Plugin Audits']}
        />
        <SkillCard
          title="Offensive Tooling"
          tags={['Burp Suite', 'Nmap', 'sqlmap', 'Metasploit', 'Wireshark']}
        />
        <SkillCard
          title="Development"
          tags={['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS']}
        />
      </div>

      {/* Get in touch */}
      <h2 className="text-2xl font-bold mt-12 mb-5 pb-3 border-b border-[#1f2a3f]">
        Get in touch
      </h2>

      <div className="flex flex-wrap gap-3">
        <a
          href="mailto:sr7sec@gmail.com"
          className="inline-flex items-center gap-2 text-sm text-[#8b98a8] bg-[#151d2e] border border-[#1f2a3f] px-4 py-2.5 rounded-lg hover:text-[#00e07a] hover:border-[#00e07a]/40 transition-colors"
        >
          ✉ Email
        </a>
        <a
          href="https://www.fiverr.com/sr7sec"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[#8b98a8] bg-[#151d2e] border border-[#1f2a3f] px-4 py-2.5 rounded-lg hover:text-[#00e07a] hover:border-[#00e07a]/40 transition-colors"
        >
          Fiverr
        </a>
        <a
          href="https://www.linkedin.com/in/shihan-chowdhury-915583279"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[#8b98a8] bg-[#151d2e] border border-[#1f2a3f] px-4 py-2.5 rounded-lg hover:text-[#00e07a] hover:border-[#00e07a]/40 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/SR-Chowdhury"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[#8b98a8] bg-[#151d2e] border border-[#1f2a3f] px-4 py-2.5 rounded-lg hover:text-[#00e07a] hover:border-[#00e07a]/40 transition-colors"
        >
          GitHub
        </a>
      </div>

    </div>
  )
}

function SkillCard({ title, tags }) {
  return (
    <div className="bg-[#151d2e] border border-[#1f2a3f] rounded-xl p-5 hover:border-[#00e07a]/40 transition-colors">
      <h3 className="text-[15px] font-semibold text-white mb-3 break-words">
        {title}
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono text-[#8b98a8] bg-[#8b98a8]/10 px-2.5 py-1 rounded-full whitespace-nowrap"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default About