export function journalPath(journalId, ...segments) {
  const parts = ['', 'journals', journalId, ...segments.filter(Boolean)]
  return parts.join('/')
}

export function getJournalSections(journal) {
  if (!journal?.sections) return []
  return journal.sections.map((section) => ({
    ...section,
    path: journalPath(journal.id, 'sections', section.slug),
  }))
}

export function getFirstLetter(title) {
  const letter = title?.trim()?.charAt(0)?.toUpperCase()
  return letter && /[A-Z]/.test(letter) ? letter : '#'
}

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export function formatArticleDate(article) {
  if (article.history?.accepted) return `Accepted on ${article.history.accepted}`
  if (article.publicationDate) {
    return `Published on ${new Date(article.publicationDate).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })}`
  }
  return null
}
