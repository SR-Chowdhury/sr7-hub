import { Link } from 'react-router-dom'
import GigCard from '../components/GigCard'
import Loader from '../components/Loader'
import ErrorBox from '../components/ErrorBox'
import { gigs, profile as profileApi } from '../lib/api'
import { useResource } from '../lib/useResource'

function Fiverr() {
  const { data: fiverrProfile, loading: loadingProfile, error: profileError } = useResource(
    () => profileApi.get(),
    []
  )

  const { data: fiverrGigs = [], loading: loadingGigs, error: gigsError } = useResource(
    () => gigs.list({ limit: 500 }),
    []
  )

  const loading = loadingProfile || loadingGigs
  const error = profileError || gigsError

  if (loading) return <Loader label="Loading Fiverr services…" />
  if (error) return <ErrorBox error={error} />
  if (!fiverrProfile) return <ErrorBox error={{ message: 'Profile not found' }} />

  return (
    <div className="w-full max-w-6xl mx-auto px-6 pt-16 pb-20 overflow-hidden">

      <Link
        to="/"
        className="inline-block text-sm text-[#8b98a8] hover:text-[#00e07a] transition-colors mb-6"
      >
        ← Back to Hub
      </Link>

      <div className="text-center mb-12">
        <span className="inline-block font-mono text-xs font-medium tracking-widest text-[#00e07a] bg-[#00e07a]/10 px-4 py-1.5 rounded-full mb-5">
          SR7 // FIVERR
        </span>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Fiverr Services
        </h1>
        <p className="text-[#8b98a8] text-base max-w-2xl mx-auto mb-3">
          {fiverrProfile.tagline}
        </p>
        <p className="font-mono text-sm text-[#00e07a] mb-8">
          {fiverrProfile.username} · {fiverrProfile.location}
        </p>

        <div className="flex justify-center gap-10 flex-wrap mb-8">
          <Stat number={fiverrGigs.length.toString()} label="Services" />
          <Stat number="24h" label="Response Time" />
          <Stat number="UK" label="Based In" />
        </div>

        {fiverrProfile.profileUrl && (
          <a
            href={fiverrProfile.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-[#00e07a] text-[#0a0e17] font-semibold px-6 py-3 rounded-lg hover:bg-[#00c46a] transition-colors"
          >
            View My Fiverr Profile →
          </a>
        )}
      </div>

      <div className="bg-[#151d2e] border border-[#1f2a3f] rounded-2xl p-7 mb-10">
        <h2 className="text-xl font-bold text-white mb-5">
          Why Hire Me
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Reason
            title="PortSwigger Labs Solved"
            detail="Completed all Apprentice labs covering SQLi, XSS, CSRF, XXE, SSRF, JWT, and more."
          />
          <Reason
            title="Hack The Box Machines"
            detail="Practical hands-on experience with real-world penetration testing methodology."
          />
          <Reason
            title="Full-Stack Developer Background"
            detail="I understand how web apps are built, so I know where vulnerabilities hide."
          />
          <Reason
            title="WordPress Security Audit Experience"
            detail="Full Wordfence audits with findings, remediation, and hardening reports."
          />
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-5">
        Services I Offer
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {fiverrGigs.map((gig) => (
          <GigCard key={gig.id} {...gig} />
        ))}
      </div>

      <div className="bg-[#151d2e] border border-[#1f2a3f] rounded-2xl p-7 mb-10">
        <h2 className="text-xl font-bold text-white mb-5">
          How It Works
        </h2>
        <div className="space-y-3">
          <Step number="1" text="Message me with your requirements" />
          <Step number="2" text="I confirm scope and delivery time" />
          <Step number="3" text="You place the order on Fiverr" />
          <Step number="4" text="I perform the work and deliver the report" />
          <Step number="5" text="You review, and I offer free revision if needed" />
        </div>
      </div>

      {fiverrProfile.profileUrl && (
        <div className="text-center">
          <p className="text-[#8b98a8] mb-5">
            Have a project in mind? Let's secure your application.
          </p>
          <a
            href={fiverrProfile.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-[#00e07a] text-[#0a0e17] font-semibold px-8 py-3 rounded-lg hover:bg-[#00c46a] transition-colors"
          >
            Message Me on Fiverr →
          </a>
        </div>
      )}

    </div>
  )
}

function Stat({ number, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-mono text-2xl font-bold text-[#00e07a]">{number}</span>
      <span className="text-xs text-[#8b98a8] uppercase tracking-wider mt-1">{label}</span>
    </div>
  )
}

function Reason({ title, detail }) {
  return (
    <div className="bg-[#111826] border border-[#1f2a3f] rounded-xl p-4">
      <p className="text-sm font-semibold text-white break-words mb-1">{title}</p>
      <p className="text-xs text-[#8b98a8] break-words">{detail}</p>
    </div>
  )
}

function Step({ number, text }) {
  return (
    <div className="flex items-start gap-4 bg-[#111826] border border-[#1f2a3f] rounded-xl p-4">
      <span className="w-8 h-8 shrink-0 rounded-full bg-[#00e07a]/10 text-[#00e07a] font-mono font-bold flex items-center justify-center text-sm">
        {number}
      </span>
      <p className="text-sm text-[#8b98a8] break-words pt-1">{text}</p>
    </div>
  )
}

export default Fiverr