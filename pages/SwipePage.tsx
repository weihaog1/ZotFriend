import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from 'framer-motion';
import { StudentProfile, SwipeDirection } from '../types';
import { ProfileCard } from '../components/ProfileCard';
import { WhyMatchModal } from '../components/WhyMatchModal';
import { useApp } from '../context/AppContext';

// Individual card component with its own motion values
const SwipeCard: React.FC<{
  profile: StudentProfile;
  onSwipe: (direction: SwipeDirection) => void;
  onWhyMatch: () => void;
  forceSwipe: SwipeDirection | null;
}> = ({ profile, onSwipe, onWhyMatch, forceSwipe }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  // Handle forced swipe from buttons/keyboard
  useEffect(() => {
    if (forceSwipe) {
      setExitDirection(forceSwipe);
      onSwipe(forceSwipe);
    }
  }, [forceSwipe]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      setExitDirection('right');
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      setExitDirection('left');
      onSwipe('left');
    } else {
      setDragDirection(null);
    }
  };

  const handleDrag = (event: any, info: PanInfo) => {
    if (info.offset.x > 20) setDragDirection('right');
    else if (info.offset.x < -20) setDragDirection('left');
    else setDragDirection(null);
  };

  return (
    <motion.div
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
        x: exitDirection === 'left' ? -1000 : 1000,
        rotate: exitDirection === 'left' ? -45 : 45,
        opacity: 0,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <ProfileCard
        profile={profile}
        dragDirection={dragDirection || forceSwipe}
        onWhyMatch={onWhyMatch}
      />
    </motion.div>
  );
};

export const SwipePage: React.FC = () => {
  const { profiles, addMatch } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [forceSwipe, setForceSwipe] = useState<SwipeDirection | null>(null);
  const [whyMatchModalOpen, setWhyMatchModalOpen] = useState(false);
  const [whyMatchProfile, setWhyMatchProfile] = useState<StudentProfile | null>(null);
  const cardKey = useRef(0);

  const currentProfile = profiles[currentIndex];

  // Background gradient based on swipe direction
  const bgColor = swipeDirection === 'left'
    ? 'linear-gradient(180deg, #fecaca 0%, #fef2f2 50%, #f9fafb 100%)'
    : swipeDirection === 'right'
    ? 'linear-gradient(180deg, #bbf7d0 0%, #f0fdf4 50%, #f9fafb 100%)'
    : 'linear-gradient(180deg, #eff6ff 0%, #f8fafc 50%, #f9fafb 100%)';

  const handleSwipe = (direction: SwipeDirection) => {
    const profile = profiles[currentIndex];

    // Check for match
    if (direction === 'right' && profile.hasLikedUser) {
      addMatch(profile);
    }

    // Move to next card after animation
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setSwipeDirection(null);
      setForceSwipe(null);
      cardKey.current += 1;
    }, 350);
  };

  const handleButtonSwipe = (direction: SwipeDirection) => {
    if (forceSwipe) return; // Prevent double swipe
    setSwipeDirection(direction);
    setForceSwipe(direction);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (currentIndex >= profiles.length || whyMatchModalOpen || forceSwipe) return;

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handleButtonSwipe('left');
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleButtonSwipe('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, profiles.length, whyMatchModalOpen, forceSwipe]);

  const resetStack = () => {
    setCurrentIndex(0);
    setSwipeDirection(null);
    setForceSwipe(null);
  };

  const handleWhyMatch = () => {
    setWhyMatchProfile(currentProfile);
    setWhyMatchModalOpen(true);
  };

  return (
    <div
      className="absolute inset-0 transition-all duration-300"
      style={{ background: bgColor }}
    >
      <div className="relative w-full max-w-md mx-auto h-full p-4 pb-24 flex flex-col items-center justify-center perspective-1000">
        <AnimatePresence mode="wait">
          {currentIndex < profiles.length ? (
            <SwipeCard
              key={`${currentProfile.id}-${cardKey.current}`}
              profile={currentProfile}
              onSwipe={handleSwipe}
              onWhyMatch={handleWhyMatch}
              forceSwipe={forceSwipe}
            />
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center p-8 space-y-6"
            >
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-2 animate-pulse border-4 border-white shadow-xl">
                <span className="text-4xl">😴</span>
              </div>
              <h2 className="text-3xl font-display font-black text-gray-900">All Caught Up!</h2>
              <p className="text-gray-500 font-medium text-lg leading-relaxed">
                You've seen everyone on campus.<br />Maybe go study now?
              </p>
              <button
                onClick={resetStack}
                className="px-6 py-3 bg-white border-2 border-black shadow-neo font-bold hover:-translate-y-1 transition-transform"
              >
                Refresh Stack
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background Card Effect */}
        {currentIndex + 1 < profiles.length && (
          <div className="absolute w-[92%] h-[680px] top-8 bg-white rounded-[32px] shadow-xl border-4 border-white opacity-40 z-0 transform scale-95 origin-bottom" />
        )}

        {/* Bottom Action Buttons */}
        {currentIndex < profiles.length && (
          <div className="absolute bottom-28 flex items-center gap-8 z-30 pointer-events-auto">
            <button
              onClick={() => handleButtonSwipe('left')}
              disabled={!!forceSwipe}
              className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all border border-gray-100 hover:scale-110 active:scale-90 hover:shadow-xl disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button
              onClick={() => handleButtonSwipe('right')}
              disabled={!!forceSwipe}
              className="w-16 h-16 bg-gradient-to-br from-uci-blue to-blue-600 rounded-full shadow-lg flex items-center justify-center text-white transition-all hover:scale-110 active:scale-90 hover:shadow-blue-200 hover:shadow-xl border-2 border-transparent hover:border-white disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Why Match Modal */}
      <WhyMatchModal
        isOpen={whyMatchModalOpen}
        onClose={() => setWhyMatchModalOpen(false)}
        targetProfile={whyMatchProfile}
      />
    </div>
  );
};
