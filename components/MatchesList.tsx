import React from 'react';
import { Match } from '../types';

interface MatchesListProps {
  matches: Match[];
}

export const MatchesList: React.FC<MatchesListProps> = ({ matches }) => {
  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center pt-24">
        <div className="w-32 h-32 bg-gray-200 rounded-full mb-6 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Matches Yet</h2>
        <p className="text-gray-500">Start swiping to find your study partners! When you match, they'll appear here.</p>
      </div>
    );
  }

  return (
    <div className="p-4 pt-4 pb-24">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 px-2">Your Matches <span className="text-uci-blue">({matches.length})</span></h1>
      
      <div className="grid grid-cols-2 gap-4">
        {matches.map((match) => (
          <div key={match.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col">
            <div className="relative h-40 w-full">
               <img src={match.profile.imageUrl} alt={match.profile.name} className="w-full h-full object-cover" />
               <div className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 rounded-full text-xs font-bold text-uci-blue shadow-sm">
                 {match.profile.matchScore}%
               </div>
            </div>
            
            <div className="p-3 flex-1 flex flex-col">
              <h3 className="font-bold text-gray-900">{match.profile.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{match.profile.major}</p>
              
              <div className="mt-auto space-y-1.5 pt-2 border-t border-gray-50">
                {match.profile.socials?.instagram && (
                   <a href={`https://instagram.com/${match.profile.socials.instagram.replace('@','')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-pink-600 font-medium hover:underline">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      {match.profile.socials.instagram}
                   </a>
                )}
                {match.profile.socials?.discord && (
                  <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-medium">
                     <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 14.168 14.168 0 0 0-.622 1.28 18.297 18.297 0 0 0-5.462 0 14.502 14.502 0 0 0-.623-1.28.076.076 0 0 0-.078-.037 19.742 19.742 0 0 0-4.886 1.515.078.078 0 0 0-.033.028C.535 9.046-.32 13.58.098 18.056a.083.083 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .085.028 19.839 19.839 0 0 0 5.996-3.03.078.078 0 0 0 .031-.056c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                     {match.profile.socials.discord}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
