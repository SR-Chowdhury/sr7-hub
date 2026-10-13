// Search engine for SR7 Hub
// Handles sanitization, normalization, and weighted scoring

const MAX_QUERY_LENGTH = 100

// Remove control characters, trim, lowercase
export function sanitizeQuery(raw) {
  if (typeof raw !== 'string') return ''
  return raw
    .slice(0, MAX_QUERY_LENGTH)
    .toLowerCase()
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
}

// Build a searchable index for one card (runs once at startup)
function buildIndex(card) {
  return {
    title: (card.title || '').toLowerCase(),
    description: (card.description || '').toLowerCase(),
    tags: (card.tags || []).map((t) => t.toLowerCase()),
    aliases: (card.aliases || []).map((a) => a.toLowerCase()),
  }
}

// Score a card against the query
// Title = 10, Alias = 8, Tag = 6, Description = 3
function score(index, query) {
  let total = 0
  if (index.title.includes(query)) total += 10
  if (index.aliases.some((a) => a.includes(query))) total += 8
  if (index.tags.some((t) => t.includes(query))) total += 6
  if (index.description.includes(query)) total += 3
  return total
}

// Create a search engine from a list of cards
export function createSearchEngine(cards) {
  const indexed = cards.map((card) => ({
    card,
    index: buildIndex(card),
  }))

  return function search(rawQuery) {
    const query = sanitizeQuery(rawQuery)

    // Empty query returns all cards
    if (query === '') {
      return indexed.map((entry) => entry.card)
    }

    // Filter + score + sort by relevance
    return indexed
      .map(({ card, index }) => ({
        card,
        score: score(index, query),
      }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.card)
  }
}