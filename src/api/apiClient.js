import { JOURNALS, ARTICLES, CATEGORIES, STATS } from '../utils/dummyData'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const journalTitleMap = Object.fromEntries(JOURNALS.map((j) => [j.id, j.title]))

function enrichArticle(article) {
  return {
    ...article,
    journalTitle: journalTitleMap[article.journalId] || article.journalTitle,
  }
}

function enrichJournal(journal) {
  const articleCount = ARTICLES.filter((a) => a.journalId === journal.id).length
  return {
    ...journal,
    stats: {
      ...journal.stats,
      articles: articleCount || journal.stats?.articles || 0,
    },
  }
}

export const api = {
  journals: {
    getAll: async () => {
      await delay(400)
      return JOURNALS.map(enrichJournal)
    },
    getById: async (id) => {
      await delay(300)
      const journal = JOURNALS.find((j) => j.id === id)
      if (!journal) throw new Error('Journal not found')
      return enrichJournal(journal)
    },
  },
  articles: {
    getAll: async () => {
      await delay(400)
      return ARTICLES.map(enrichArticle)
    },
    getTrending: async () => {
      await delay(300)
      return [...ARTICLES]
        .map(enrichArticle)
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5)
    },
    getMostViewed: async () => {
      await delay(300)
      return [...ARTICLES]
        .map(enrichArticle)
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 4)
    },
    getByJournal: async (journalId) => {
      await delay(300)
      return ARTICLES.filter((a) => a.journalId === journalId).map(enrichArticle)
    },
    getByJournalAndSection: async (journalId, sectionId) => {
      await delay(300)
      return ARTICLES.filter((a) => a.journalId === journalId && a.sectionId === sectionId).map(enrichArticle)
    },
    getById: async (id) => {
      await delay(300)
      const article = ARTICLES.find((a) => a.id === id)
      if (!article) throw new Error('Article not found')
      return enrichArticle(article)
    },
  },
  categories: {
    getAll: async () => {
      await delay(200)
      return CATEGORIES
    },
  },
  stats: {
    get: async () => {
      await delay(300)
      return STATS
    },
  },
}
