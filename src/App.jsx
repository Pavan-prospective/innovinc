import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { ScrollToTop } from './components/common/ScrollToTop'

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
          <Route path="journals/:journalId" element={<JournalDetails />} />
          <Route path="editorial-board" element={<Editors />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
