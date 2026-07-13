import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { ScrollToTop } from './components/common/ScrollToTop'

import { AuthorLayout } from './layouts/AuthorLayout'
import AuthorDashboard from './pages/author/AuthorDashboard'
import AuthorSubmit from './pages/author/AuthorSubmit'

import { JournalLayout } from './layouts/JournalLayout'
import { AdminLayout } from './layouts/AdminLayout'
import { JournalPlaceholderPage } from './pages/JournalPlaceholderPage'
import JournalSectionDetails from './pages/JournalSectionDetails'
import JournalAbout from './pages/JournalAbout'

import Home from './pages/Home'
import About from './pages/About'
import News from './pages/News'
import Login from './pages/Login'
import Register from './pages/Register'
import ApplyEditor from './pages/ApplyEditor'
import Journals from './pages/Journals'
import JournalDetails from './pages/JournalDetails'
import JournalArticles from './pages/JournalArticles'
import ArticleDetails from './pages/ArticleDetails'
import Editors from './pages/Editors'
import NotFound from './pages/NotFound'
import AdminApplications from './pages/admin/AdminApplications'
import AdminEmployees from './pages/admin/AdminEmployees'
import AdminManuscripts from './pages/admin/AdminManuscripts'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="news" element={<News />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="apply-editor" element={<ApplyEditor />} />
          <Route path="articles" element={<Navigate to="/journals" replace />} />
          <Route path="articles/:articleId" element={<ArticleDetails />} />
          <Route path="journals" element={<Journals />} />

          <Route path="journals/:journalId" element={<JournalLayout />}>
            <Route index element={<JournalDetails />} />
            <Route path="articles" element={<JournalArticles />} />
            <Route path="submit" element={<JournalPlaceholderPage title="Submit Manuscript" />} />
            <Route path="special-issues" element={<JournalPlaceholderPage title="Special Issues" />} />
            <Route path="special-issues/:issueId" element={<JournalPlaceholderPage />} />
            <Route path="volumes" element={<JournalPlaceholderPage title="Volumes" />} />
            <Route path="volumes/:volumeId" element={<JournalPlaceholderPage />} />
            <Route path="research-topics" element={<JournalPlaceholderPage title="Research Topics" />} />
            <Route path="editorial-board" element={<Editors />} />
            <Route path="sections/:sectionId" element={<JournalSectionDetails />} />
            <Route path="about/:aboutId" element={<JournalAbout />} />
            <Route path="authors/:authorId" element={<JournalPlaceholderPage />} />
            <Route path="reviewers/:reviewerId" element={<JournalPlaceholderPage />} />
            <Route path="community/:communityId" element={<JournalPlaceholderPage />} />
          </Route>

          <Route path="editorial-board" element={<Editors />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/dashboard" element={<AuthorLayout />}>
          <Route index element={<AuthorDashboard />} />
          <Route path="submit" element={<AuthorSubmit />} />
          <Route path="submissions" element={<JournalPlaceholderPage title="My Submissions" />} />
          <Route path="settings" element={<JournalPlaceholderPage title="Profile Settings" />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="employees" replace />} />
          <Route path="employees" element={<AdminEmployees />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="manuscripts" element={<AdminManuscripts />} />
          <Route path="settings" element={<JournalPlaceholderPage title="Admin Settings" />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
