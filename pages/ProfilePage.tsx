import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CURRENT_USER_PROFILE } from '../data/mockProfiles';
import { useApp } from '../context/AppContext';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { matches } = useApp();

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-8 text-center pt-8 flex flex-col items-center">
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
            onClick={() => navigate('/')}
            className="w-full py-4 border-2 border-red-100 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
