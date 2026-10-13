import Card from './Card'

function CardGrid({ filteredCards }) {
  if (filteredCards.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <p className="text-center text-[#8b98a8] py-20 text-base">
          No results found. Try a different keyword.
        </p>
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-6 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            icon={card.icon}
            title={card.title}
            description={card.description}
            tags={card.tags}
            link={card.link}
          />
        ))}
      </div>
    </main>
  )
}

export default CardGrid