import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Match, StudentProfile } from '../types';
import { MOCK_PROFILES } from '../data/mockProfiles';

interface AppContextType {
  profiles: StudentProfile[];
  matches: Match[];
  addMatch: (profile: StudentProfile) => void;
  lastMatchedProfile: StudentProfile | null;
  setLastMatchedProfile: (profile: StudentProfile | null) => void;
  matchModalOpen: boolean;
  setMatchModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profiles] = useState<StudentProfile[]>(MOCK_PROFILES);
  const [matches, setMatches] = useState<Match[]>([]);
  const [lastMatchedProfile, setLastMatchedProfile] = useState<StudentProfile | null>(null);
  const [matchModalOpen, setMatchModalOpen] = useState(false);

  const addMatch = (profile: StudentProfile) => {
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

  return (
    <AppContext.Provider value={{
      profiles,
      matches,
      addMatch,
      lastMatchedProfile,
      setLastMatchedProfile,
      matchModalOpen,
      setMatchModalOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
