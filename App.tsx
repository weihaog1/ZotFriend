import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from 'framer-motion';
import { MOCK_PROFILES, CURRENT_USER_PROFILE } from './data/mockProfiles';
import { Match, StudentProfile, SwipeDirection, ViewState } from './types';
import { ProfileCard } from './components/ProfileCard';
import { Navigation } from './components/Navigation';
import { MatchModal } from './components/MatchModal';
import { WhyMatchModal } from './components/WhyMatchModal';
import { MatchesList } from './components/MatchesList';
import { LandingPage } from './components/LandingPage';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [profiles, setProfiles] = useState<StudentProfile[]>(MOCK_PROFILES);
  const [view, setView] = useState<ViewState>('home');
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Modal States
  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [lastMatchedProfile, setLastMatchedProfile] = useState<StudentProfile | null>(null);
  const [whyMatchModalOpen, setWhyMatchModalOpen] = useState(false);
  const [whyMatchProfile, setWhyMatchProfile] = useState<StudentProfile | null>(null);
  const [pendingNextCard, setPendingNextCard] = useState(false);

  // Motion Values for the top card
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  
  // Background gradient shift based on drag
  const bgGradient = useTransform(
      x, 
      [-200, 0, 200], 
      ['linear-gradient(135deg, #fecaca 0%, #f3f4f6 100%)', 'linear-gradient(135deg, #eff6ff 0%, #fff 100%)', 'linear-gradient(135deg, #bbf7d0 0%, #f3f4f6 100%)']
  );
  
  // Drag and Swipe State
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
  const [lastDirection, setLastDirection] = useState<SwipeDirection | null>(null);

  // Handle Drag
  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      swipe('right');
    } else if (info.offset.x < -threshold) {
      swipe('left');
    } else {
      setDragDirection(null);
    }
  };

  const handleDrag = (event: any, info: PanInfo) => {
    if (info.offset.x > 20) setDragDirection('right');
    else if (info.offset.x < -20) setDragDirection('left');
    else setDragDirection(null);
  };

  const swipe = (direction: SwipeDirection) => {
    const currentProfile = profiles[currentIndex];
    setLastDirection(direction);
    setDragDirection(null);

    if (direction === 'right' && currentProfile.hasLikedUser) {
      // It's a match - show modal first, delay card transition
      const newMatch: Match = {
        id: Date.now().toString(),
        profileId: currentProfile.id,
        timestamp: Date.now(),
        profile: currentProfile
      };
      setMatches(prev => [...prev, newMatch]);
      setLastMatchedProfile(currentProfile);
      setPendingNextCard(true);
      setMatchModalOpen(true);
    } else {
      // No match - proceed with card transition immediately
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => x.set(0), 50);
    }
  };

  const handleMatchModalClose = () => {
    setMatchModalOpen(false);
    if (pendingNextCard) {
      setPendingNextCard(false);
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => x.set(0), 50);
    }
  };

  // Keyboard navigation for swiping with arrow keys
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle arrow keys on home view, when cards exist, and no modals are open
      if (showLanding || view !== 'home' || currentIndex >= profiles.length || matchModalOpen || whyMatchModalOpen) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        // Show visual feedback before swiping
        setDragDirection('left');
        setTimeout(() => swipe('left'), 150);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        // Show visual feedback before swiping
        setDragDirection('right');
        setTimeout(() => swipe('right'), 150);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLanding, view, currentIndex, profiles.length, matchModalOpen, whyMatchModalOpen]);

  const currentProfile = profiles[currentIndex];

  if (showLanding) {
    return <LandingPage onEnterApp={() => setShowLanding(false)} />;
  }

  return (
    <motion.div 
        style={{ background: view === 'home' ? bgGradient : '#F9FAFB' }}
        className="h-screen w-full flex flex-col font-sans overflow-hidden transition-colors duration-500"
    >
      
      {/* Header - Glassmorphism */}
      <header className="fixed top-0 left-0 w-full glass-panel z-40 h-16 shrink-0 flex items-center justify-center">
        <div className="w-full max-w-md px-4 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setShowLanding(true)}>
                <div className="w-9 h-9 bg-black flex items-center justify-center border border-gray-700 shadow-sm group-hover:scale-105 transition-transform">
                    <span className="text-white font-display font-bold text-lg">Z</span>
                </div>
                <h1 className="text-xl font-display font-bold tracking-tight text-gray-900">Zot<span className="text-uci-blue">Friend</span></h1>
            </div>
            
            {/* User Avatar with Ring */}
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
          <div className="relative w-full h-full p-4 pb-24 flex flex-col items-center justify-center perspective-1000">
             <AnimatePresence>
                {currentIndex < profiles.length ? (
                   <motion.div
                     key={currentProfile.id}
                     style={{ x, rotate, opacity }}
                     drag="x"
                     dragConstraints={{ left: 0, right: 0 }}
                     dragElastic={0.6}
                     onDragEnd={handleDragEnd}
                     onDrag={handleDrag}
                     whileTap={{ cursor: "grabbing", scale: 1.02 }}
                     className="absolute w-full h-full max-h-[700px] top-4 px-2 touch-none cursor-grab z-20"
                     initial={{ scale: 0.95, opacity: 0, y: 50 }}
                     animate={{ scale: 1, opacity: 1, y: 0 }}
                     exit={{ 
                        x: lastDirection === 'left' ? -1000 : 1000,
                        rotate: lastDirection === 'left' ? -45 : 45,
                        opacity: 0, 
                        transition: { duration: 0.4, ease: "easeIn" } 
                     }}
                     transition={{ type: "spring", stiffness: 300, damping: 20 }}
                   >
                     <ProfileCard 
                        profile={currentProfile} 
                        dragDirection={dragDirection}
                        onWhyMatch={() => {
                            setWhyMatchProfile(currentProfile);
                            setWhyMatchModalOpen(true);
                        }}
                     />
                   </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center p-8 space-y-6"
                   >
                     <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-2 animate-pulse border-4 border-white shadow-xl">
                        <span className="text-4xl">😴</span>
                     </div>
                     <h2 className="text-3xl font-display font-black text-gray-900">All Caught Up!</h2>
                     <p className="text-gray-500 font-medium text-lg leading-relaxed">
                        You've seen everyone on campus.<br/>Maybe go study now?
                     </p>
                     <button onClick={() => setCurrentIndex(0)} className="px-6 py-3 bg-white border-2 border-black shadow-neo font-bold hover:-translate-y-1 transition-transform">
                        Refresh Stack
                     </button>
                  </motion.div>
                )}
             </AnimatePresence>
             
             {/* Background Card Effect (The card behind the current one) */}
             {currentIndex + 1 < profiles.length && (
                 <div className="absolute w-[92%] h-[680px] top-8 bg-white rounded-[32px] shadow-xl border-4 border-white opacity-40 z-10 transform scale-95 origin-bottom"></div>
             )}

             {/* Bottom Action Buttons (Only visible if cards exist) */}
             {currentIndex < profiles.length && (
                <div className="absolute bottom-28 flex items-center gap-8 z-30 pointer-events-auto">
                   <button 
                      onClick={() => swipe('left')}
                      className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all border border-gray-100 hover:scale-110 active:scale-90 hover:shadow-xl"
                   >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                   </button>
                   <button 
                      onClick={() => swipe('right')}
                      className="w-16 h-16 bg-gradient-to-br from-uci-blue to-blue-600 rounded-full shadow-lg flex items-center justify-center text-white transition-all hover:scale-110 active:scale-90 hover:shadow-blue-200 hover:shadow-xl border-2 border-transparent hover:border-white"
                   >
                       <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                       </svg>
                   </button>
                </div>
             )}
          </div>
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
                    <img src={CURRENT_USER_PROFILE.imageUrl} className="w-full h-full object-cover" />
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
        onClose={handleMatchModalClose}
        matchedProfile={lastMatchedProfile}
      />
      
      <WhyMatchModal
        isOpen={whyMatchModalOpen}
        onClose={() => setWhyMatchModalOpen(false)}
        targetProfile={whyMatchProfile}
      />
    </motion.div>
  );
}

export default App;