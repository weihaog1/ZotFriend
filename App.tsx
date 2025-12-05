import React, { useState } from 'react';
import { MOCK_PROFILES, CURRENT_USER_PROFILE } from './data/mockProfiles';
import { Match, StudentProfile, ViewState } from './types';
import { Navigation } from './components/Navigation';
import { MatchModal } from './components/MatchModal';
import { WhyMatchModal } from './components/WhyMatchModal';
import { MatchesList } from './components/MatchesList';
import { LandingPage } from './components/LandingPage';
import { SwipePage } from './components/SwipePage';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [profiles] = useState<StudentProfile[]>(MOCK_PROFILES);
  const [view, setView] = useState<ViewState>('home');
  const [matches, setMatches] = useState<Match[]>([]);

  // Modal States
  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [lastMatchedProfile, setLastMatchedProfile] = useState<StudentProfile | null>(null);
  const [whyMatchModalOpen, setWhyMatchModalOpen] = useState(false);
  const [whyMatchProfile, setWhyMatchProfile] = useState<StudentProfile | null>(null);

  const handleMatch = (profile: StudentProfile) => {
    const newMatch: Match = {
      id: Date.now().toString(),
      profileId: profile.id,
      timestamp: Date.now(),
      profile: profile
    };
    setMatches(prev => [...prev, newMatch]);
    setLastMatchedProfile(profile);
    setTimeout(() => setMatchModalOpen(true), 400);
  };

  const handleWhyMatch = (profile: StudentProfile) => {
    setWhyMatchProfile(profile);
    setWhyMatchModalOpen(true);
  };

  if (showLanding) {
    return <LandingPage onEnterApp={() => setShowLanding(false)} />;
  }

  return (
    <div className="h-screen w-full flex flex-col font-sans overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full glass-panel z-40 h-16 shrink-0 flex items-center justify-center">
        <div className="w-full max-w-md px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setShowLanding(true)}>
            <div className="w-9 h-9 bg-black flex items-center justify-center border border-gray-700 shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-white font-display font-bold text-lg">Z</span>
            </div>
            <h1 className="text-xl font-display font-bold tracking-tight text-gray-900">
              Zot<span className="text-uci-blue">Friend</span>
            </h1>
          </div>

          {/* User Avatar */}
          <div className="p-0.5 rounded-full bg-gradient-to-tr from-uci-blue to-uci-gold">
            <div className="w-9 h-9 rounded-full bg-white p-0.5 overflow-hidden">
              <img src={CURRENT_USER_PROFILE.imageUrl} className="w-full h-full object-cover rounded-full" alt="Me" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative w-full max-w-md mx-auto h-full pt-16">
        {/* VIEW: HOME (SWIPING) */}
        {view === 'home' && (
          <SwipePage
            profiles={profiles}
            onMatch={handleMatch}
            onWhyMatch={handleWhyMatch}
          />
        )}

        {/* VIEW: MATCHES */}
        {view === 'matches' && (
          <div className="h-full overflow-y-auto">
            <MatchesList matches={matches} />
          </div>
        )}

        {/* VIEW: PROFILE */}
        {view === 'profile' && (
          <div className="p-8 text-center pt-20 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-white shadow-neo">
              <img src={CURRENT_USER_PROFILE.imageUrl} className="w-full h-full object-cover" alt="Profile" />
            </div>
            <h2 className="text-3xl font-display font-black text-gray-900">{CURRENT_USER_PROFILE.name}</h2>
            <p className="text-gray-500 font-medium text-lg">{CURRENT_USER_PROFILE.major}</p>

            <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm">
              <h3 className="font-bold text-gray-900 mb-4 text-left">Your Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-black text-uci-blue">{matches.length}</div>
                  <div className="text-xs text-blue-600 font-bold uppercase">Matches</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-black text-yellow-600">89%</div>
                  <div className="text-xs text-yellow-700 font-bold uppercase">Avg Comp.</div>
                </div>
              </div>
            </div>

            <div className="mt-8 w-full max-w-sm">
              <button
                onClick={() => setShowLanding(true)}
                className="w-full py-4 border-2 border-red-100 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Navigation */}
      <Navigation currentView={view} setView={setView} matchesCount={matches.length} />

      {/* Modals */}
      <MatchModal
        isOpen={matchModalOpen}
        onClose={() => setMatchModalOpen(false)}
        matchedProfile={lastMatchedProfile}
      />

      <WhyMatchModal
        isOpen={whyMatchModalOpen}
        onClose={() => setWhyMatchModalOpen(false)}
        targetProfile={whyMatchProfile}
      />
    </div>
  );
}

export default App;
