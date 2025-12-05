import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { SwipePage } from './pages/SwipePage';
import { MatchesPage } from './pages/MatchesPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Landing page - no layout */}
          <Route path="/" element={<LandingPage />} />

          {/* App pages with layout */}
          <Route element={<Layout />}>
            <Route path="/swipe" element={<SwipePage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Redirect unknown routes to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
