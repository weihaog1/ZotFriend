import React from 'react';
import { useApp } from '../context/AppContext';
import { MatchesList } from '../components/MatchesList';

export const MatchesPage: React.FC = () => {
  const { matches } = useApp();

  return (
    <div className="h-full overflow-y-auto bg-gray-50 pb-24">
      <div className="max-w-md mx-auto">
        <MatchesList matches={matches} />
      </div>
    </div>
  );
};
