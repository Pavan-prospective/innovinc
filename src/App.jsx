import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { ScrollToTop } from './components/common/ScrollToTop'

import { JournalLayout } from './layouts/JournalLayout'
import { JournalPlaceholderPage } from './pages/JournalPlaceholderPage'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Journals from './pages/Journals'
import JournalDetails from './pages/JournalDetails'
import ArticleDetails from './pages/ArticleDetails'
import Editors from './pages/Editors'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="articles" element={<Navigate to="/journals" replace />} />
          <Route path="articles/:articleId" element={<ArticleDetails />} />
          <Route path="journals" element={<Journals />} />
          
          <Route path="journals/:journalId" element={<JournalLayout />}>
            <Route index element={<JournalDetails />} />
            <Route path="articles" element={<JournalPlaceholderPage title="Articles" />} />
            <Route path="research-topics" element={<JournalPlaceholderPage title="Research Topics" />} />
            <Route path="editorial-board" element={<Editors />} />
            <Route path="sections/:sectionId" element={<JournalPlaceholderPage />} />
            <Route path="about/:aboutId" element={<JournalPlaceholderPage />} />
            <Route path="authors/:authorId" element={<JournalPlaceholderPage />} />
          </Route>

          <Route path="editorial-board" element={<Editors />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
