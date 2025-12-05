import React from 'react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  matchesCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView, matchesCount }) => {
  const getButtonClass = (view: ViewState) => {
    const base = "flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 relative group";
    return currentView === view 
      ? `${base} text-white bg-black shadow-lg scale-110 -translate-y-2` 
      : `${base} text-gray-400 hover:bg-gray-100 hover:text-gray-900`;
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-auto z-50">
      <nav className="glass-panel px-6 py-2 rounded-[32px] flex items-center gap-6 shadow-2xl ring-1 ring-black/5">
        
        <button className={getButtonClass('home')} onClick={() => setView('home')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S13.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m-15.686 0A8.959 8.959 0 013 12c0-.778.099-1.533.284-2.253m0 0A11.953 11.953 0 0112 10.5c2.998 0 5.74-1.1 7.843-2.918" />
          </svg>
          {/* Tooltip */}
          {currentView !== 'home' && <span className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-black text-white text-[10px] py-1 px-2 rounded transition-opacity">Discover</span>}
        </button>

        <div className="w-px h-8 bg-gray-200"></div>

        <button className={getButtonClass('matches')} onClick={() => setView('matches')}>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-2.288l-4.16-4.162A2.126 2.126 0 0011.602 2.75l-4.16 4.162c-.683.682-1.058 1.625-1.026 2.593.003.09.006.18.01.27m8.47 4.633a1.125 1.125 0 01-1.125-1.125V9m0 0a1.125 1.125 0 01-1.125 1.125a1.125 1.125 0 011.125 1.125v2.25" />
            </svg>
            {matchesCount > 0 && (
              <span className={`absolute -top-1.5 -right-2 ${currentView === 'matches' ? 'bg-uci-gold text-black' : 'bg-uci-blue text-white'} text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-sm`}>
                {matchesCount}
              </span>
            )}
          </div>
          {currentView !== 'matches' && <span className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-black text-white text-[10px] py-1 px-2 rounded transition-opacity">Matches</span>}
        </button>

        <div className="w-px h-8 bg-gray-200"></div>

        <button className={getButtonClass('profile')} onClick={() => setView('profile')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          {currentView !== 'profile' && <span className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-black text-white text-[10px] py-1 px-2 rounded transition-opacity">Profile</span>}
        </button>

      </nav>
    </div>
  );
};