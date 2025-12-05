import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { CURRENT_USER_PROFILE } from '../data/mockProfiles';
import { Navigation } from './Navigation';
import { MatchModal } from './MatchModal';
import { useApp } from '../context/AppContext';

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { matchModalOpen, setMatchModalOpen, lastMatchedProfile } = useApp();

  return (
    <div className="h-screen w-full flex flex-col font-sans overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full glass-panel z-40 h-16 shrink-0 flex items-center justify-center">
        <div className="w-full max-w-md px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-black flex items-center justify-center border border-gray-700 shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-white font-display font-bold text-lg">Z</span>
            </div>
            <h1 className="text-xl font-display font-bold tracking-tight text-gray-900">
              Zot<span className="text-uci-blue">Friend</span>
            </h1>
          </div>

          {/* User Avatar */}
          <div
            className="p-0.5 rounded-full bg-gradient-to-tr from-uci-blue to-uci-gold cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate('/profile')}
          >
            <div className="w-9 h-9 rounded-full bg-white p-0.5 overflow-hidden">
              <img src={CURRENT_USER_PROFILE.imageUrl} className="w-full h-full object-cover rounded-full" alt="Me" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative w-full max-w-md mx-auto h-full pt-16 pb-24">
        <Outlet />
      </main>

      {/* Navigation */}
      <Navigation />

      {/* Match Modal (Global) */}
      <MatchModal
        isOpen={matchModalOpen}
        onClose={() => setMatchModalOpen(false)}
        matchedProfile={lastMatchedProfile}
      />
    </div>
  );
};
