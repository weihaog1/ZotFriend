import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudentProfile } from '../types';
import { getMatchExplanation } from '../services/geminiService';

interface WhyMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetProfile: StudentProfile | null;
}

export const WhyMatchModal: React.FC<WhyMatchModalProps> = ({ isOpen, onClose, targetProfile }) => {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<string>('');

  useEffect(() => {
    if (isOpen && targetProfile) {
      setLoading(true);
      setExplanation('');
      
      getMatchExplanation(targetProfile)
        .then((text) => {
          setExplanation(text);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isOpen, targetProfile]);

  return (
    <AnimatePresence>
      {isOpen && targetProfile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 40 }}
            className="relative bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-white/50"
          >
            {/* Header with geometric pattern */}
            <div className="bg-gray-50 p-6 border-b border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-uci-blue/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <div>
                      <h3 className="text-lg font-display font-bold text-gray-900 leading-tight">AI Compatibility</h3>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Analysis Complete</p>
                  </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 min-h-[200px] flex flex-col justify-center">
              {loading ? (
                 <div className="space-y-4">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="h-full bg-uci-blue"
                        />
                    </div>
                    <p className="text-center text-sm font-medium text-gray-400 animate-pulse">Running compatibility algorithm...</p>
                 </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed font-medium text-[15px]">
                    "{explanation}"
                  </p>
                  
                  <div className="flex gap-2 flex-wrap">
                      <span className="px-2 py-1 border border-gray-200 rounded text-xs font-bold text-gray-500 uppercase">Study Habits</span>
                      <span className="px-2 py-1 border border-gray-200 rounded text-xs font-bold text-gray-500 uppercase">Major</span>
                      <span className="px-2 py-1 border border-gray-200 rounded text-xs font-bold text-gray-500 uppercase">Interests</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <button 
                onClick={onClose}
                className="w-full py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
              >
                Close Analysis
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};