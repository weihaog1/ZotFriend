import React from 'react';
import { StudentProfile } from '../types';

interface ProfileCardProps {
  profile: StudentProfile;
  onWhyMatch: () => void;
  dragDirection?: 'left' | 'right' | null;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onWhyMatch, dragDirection }) => {
  return (
    <div className="relative w-full h-full bg-white rounded-[32px] shadow-2xl overflow-hidden select-none border-4 border-white ring-1 ring-black/5 transform-gpu transition-transform">
      
      {/* Scrollable Content Container */}
      <div className="h-full overflow-y-auto no-scrollbar pb-28 relative">
        
        {/* Image Section */}
        <div className="relative h-[480px] w-full">
          <img 
            src={profile.imageUrl} 
            alt={profile.name} 
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
          {/* Subtle gradient overlay at top for clarity */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/40 to-transparent opacity-60" />
          
          {/* Heavy gradient at bottom for text readability */}
          <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-black via-black/60 to-transparent" />
          
          {/* Badge */}
          <div className="absolute top-6 right-6">
             <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-white/40 flex items-center gap-1.5">
                 <span className="text-uci-gold drop-shadow-md text-sm">★</span>
                 <span className="text-white font-bold font-display tracking-wide text-sm">{profile.matchScore}% MATCH</span>
             </div>
          </div>

          {/* Name & Basic Info Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10">
            <h2 className="text-4xl font-display font-black flex items-baseline gap-2 leading-none mb-1 drop-shadow-md">
              {profile.name} <span className="text-2xl font-medium opacity-80 font-sans">{profile.age}</span>
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="px-2 py-0.5 bg-uci-blue text-white text-xs font-bold uppercase tracking-wider rounded-md">
                    {profile.major}
                </span>
                <span className="px-2 py-0.5 bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-md">
                    {profile.year}
                </span>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="px-6 py-6 space-y-7 bg-white relative">
          
          {/* Bio */}
          <div>
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              {profile.bio}
            </p>
          </div>

          {/* Why Match Button - Neo Brutalist Style */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onWhyMatch();
            }}
            className="group w-full py-4 relative overflow-hidden bg-gray-900 rounded-xl text-white font-display font-bold shadow-lg transform transition-all active:scale-[0.98]"
          >
             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 group-hover:opacity-30 transition-opacity" />
             <div className="relative flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-300 animate-pulse">
                  <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576L8.279 5.044A.75.75 0 019 4.5z" clipRule="evenodd" />
                </svg>
                <span>WHY WE MATCH</span>
             </div>
          </button>

          {/* Classes */}
          <div>
            <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-3">Current Classes</h3>
            <div className="flex flex-wrap gap-2">
              {profile.classes.map((c, i) => (
                <span key={i} className="px-3 py-1.5 bg-blue-50 text-uci-blue rounded-lg text-sm font-bold border border-blue-100 shadow-sm">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Study Style */}
          <div>
            <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-3">Study Vibe</h3>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-900 rounded-lg border border-amber-100 font-bold text-sm shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-amber-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
              {profile.studyStyle}
            </div>
          </div>

          {/* Interests */}
          <div className="pb-8">
            <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, i) => (
                <span key={i} className="px-4 py-1.5 bg-white text-gray-700 border border-gray-200 rounded-full text-sm font-semibold shadow-sm">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Swipe Indicators (Overlay) - High contrast pop art style */}
      <div className={`absolute top-12 right-8 z-50 pointer-events-none transition-all duration-200 ${dragDirection === 'right' ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
         <div className="border-[6px] border-green-500 rounded-xl px-6 py-2 bg-white/20 backdrop-blur-sm -rotate-12 shadow-xl">
             <span className="text-5xl font-display font-black text-green-500 tracking-tighter drop-shadow-sm">LIKE</span>
         </div>
      </div>
      <div className={`absolute top-12 left-8 z-50 pointer-events-none transition-all duration-200 ${dragDirection === 'left' ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
         <div className="border-[6px] border-red-500 rounded-xl px-6 py-2 bg-white/20 backdrop-blur-sm rotate-12 shadow-xl">
             <span className="text-5xl font-display font-black text-red-500 tracking-tighter drop-shadow-sm">NOPE</span>
         </div>
      </div>
    </div>
  );
};