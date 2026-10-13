import { Link } from 'react-router-dom'

function Card({ icon, title, description, tags, link }) {
  return (
    <article className="group bg-[#151d2e] border border-[#1f2a3f] rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#00e07a] hover:shadow-[0_12px_32px_rgba(0,224,122,0.08)]">

      <div className="text-3xl">{icon}</div>

      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="text-sm text-[#8b98a8] leading-relaxed flex-grow">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mt-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium bg-[#00e07a]/10 text-[#00e07a] px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        to={link}
        className="self-start text-sm font-medium text-[#00e07a] border-b border-transparent hover:border-[#00e07a] transition-colors mt-2"
      >
        View More
      </Link>

    </article>
  )
}

export default Card