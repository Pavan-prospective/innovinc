import axios from 'axios'
import { JOURNALS, ARTICLES, CATEGORIES, STATS } from '../utils/dummyData'

// In a real app, this would use a real backend URL
// const API_BASE_URL = process.env.VITE_API_URL || 'https://api.innovinc.org'

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// For now, we simulate API calls with promises and timeouts
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const api = {
  journals: {
    getAll: async () => {
      await delay(800)
      return JOURNALS
    },
    getById: async (id) => {
      await delay(600)
      const journal = JOURNALS.find(j => j.id === id)
      if (!journal) throw new Error('Journal not found')
      return journal
    }
  },
  articles: {
    getAll: async () => {
      await delay(800)
      return ARTICLES
    },
    getTrending: async () => {
      await delay(400)
      return ARTICLES.slice(0, 3)
    },
    getById: async (id) => {
      await delay(600)
      const article = ARTICLES.find(a => a.id === id)
      if (!article) throw new Error('Article not found')
      return article
    }
  },
  categories: {
    getAll: async () => {
      await delay(400)
      return CATEGORIES
    }
  },
  stats: {
    get: async () => {
      await delay(500)
      return STATS
    }
  }
}

// export default apiClient
