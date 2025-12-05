import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from 'framer-motion';
import { StudentProfile, Match, SwipeDirection } from '../types';
import { ProfileCard } from './ProfileCard';

interface SwipePageProps {
  profiles: StudentProfile[];
  onMatch: (profile: StudentProfile) => void;
  onWhyMatch: (profile: StudentProfile) => void;
}

// Individual card component with its own motion values
const SwipeCard: React.FC<{
  profile: StudentProfile;
  onSwipe: (direction: SwipeDirection) => void;
  onWhyMatch: () => void;
  isTop: boolean;
}> = ({ profile, onSwipe, onWhyMatch, isTop }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

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
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      whileTap={isTop ? { cursor: "grabbing", scale: 1.02 } : undefined}
      className={`absolute w-full h-full max-h-[700px] top-4 px-2 ${isTop ? 'touch-none cursor-grab z-20' : 'z-10'}`}
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
        dragDirection={dragDirection}
        onWhyMatch={onWhyMatch}
      />
    </motion.div>
  );
};

export const SwipePage: React.FC<SwipePageProps> = ({ profiles, onMatch, onWhyMatch }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  // Background gradient based on swipe direction
  const bgColor = swipeDirection === 'left'
    ? 'linear-gradient(135deg, #fecaca 0%, #f3f4f6 100%)'
    : swipeDirection === 'right'
    ? 'linear-gradient(135deg, #bbf7d0 0%, #f3f4f6 100%)'
    : 'linear-gradient(135deg, #eff6ff 0%, #fff 100%)';

  const currentProfile = profiles[currentIndex];

  const handleSwipe = (direction: SwipeDirection) => {
    const profile = profiles[currentIndex];
    setSwipeDirection(direction);

    // Check for match
    if (direction === 'right' && profile.hasLikedUser) {
      onMatch(profile);
    }

    // Move to next card after animation
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setSwipeDirection(null);
    }, 300);
  };

  const handleButtonSwipe = (direction: SwipeDirection) => {
    setSwipeDirection(direction);

    const profile = profiles[currentIndex];
    if (direction === 'right' && profile.hasLikedUser) {
      onMatch(profile);
    }

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setSwipeDirection(null);
    }, 400);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (currentIndex >= profiles.length) return;

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
  }, [currentIndex, profiles.length]);

  const resetStack = () => {
    setCurrentIndex(0);
    setSwipeDirection(null);
  };

  return (
    <div
      className="relative w-full h-full p-4 pb-24 flex flex-col items-center justify-center perspective-1000 transition-all duration-300"
      style={{ background: bgColor }}
    >
      <AnimatePresence mode="popLayout">
        {currentIndex < profiles.length ? (
          <SwipeCard
            key={currentProfile.id}
            profile={currentProfile}
            onSwipe={handleSwipe}
            onWhyMatch={() => onWhyMatch(currentProfile)}
            isTop={true}
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
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all border border-gray-100 hover:scale-110 active:scale-90 hover:shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={() => handleButtonSwipe('right')}
            className="w-16 h-16 bg-gradient-to-br from-uci-blue to-blue-600 rounded-full shadow-lg flex items-center justify-center text-white transition-all hover:scale-110 active:scale-90 hover:shadow-blue-200 hover:shadow-xl border-2 border-transparent hover:border-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
