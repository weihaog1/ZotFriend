import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudentProfile } from '../types';
import { CURRENT_USER_PROFILE } from '../data/mockProfiles';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchedProfile: StudentProfile | null;
}

export const MatchModal: React.FC<MatchModalProps> = ({ isOpen, onClose, matchedProfile }) => {
  return (
    <AnimatePresence>
      {isOpen && matchedProfile && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4">
           {/* Dark Overlay with Blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative z-10 w-full max-w-sm text-center"
          >
            {/* Confetti / Burst Background Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-uci-blue via-purple-500 to-uci-gold opacity-30 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="mb-10 relative">
               <motion.div
                 initial={{ scale: 0, rotate: -10 }}
                 animate={{ scale: 1, rotate: -5 }}
                 transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                 className="inline-block bg-white text-black px-6 py-2 text-6xl font-display font-black transform -rotate-6 shadow-[8px_8px_0px_0px_rgba(255,210,0,1)] border-4 border-black"
               >
                 IT'S A
               </motion.div>
               <motion.div
                 initial={{ scale: 0, rotate: 10 }}
                 animate={{ scale: 1, rotate: 3 }}
                 transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
                 className="mt-2 inline-block bg-uci-blue text-white px-8 py-2 text-6xl font-display font-black transform rotate-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black"
               >
                 MATCH
               </motion.div>
            </div>

            {/* Avatars */}
            <div className="flex justify-center items-center gap-2 mb-12">
              <motion.div 
                initial={{ x: -100, rotate: -20, opacity: 0 }}
                animate={{ x: 10, rotate: -12, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="w-36 h-48 rounded-2xl overflow-hidden border-4 border-white shadow-2xl z-10"
              >
                <img src={CURRENT_USER_PROFILE.imageUrl} className="w-full h-full object-cover" />
              </motion.div>
              <motion.div 
                 initial={{ x: 100, rotate: 20, opacity: 0 }}
                 animate={{ x: -10, rotate: 12, opacity: 1 }}
                 transition={{ delay: 0.4 }}
                 className="w-36 h-48 rounded-2xl overflow-hidden border-4 border-white shadow-2xl z-20"
              >
                <img src={matchedProfile.imageUrl} className="w-full h-full object-cover" />
              </motion.div>
            </div>

            {/* Action Area */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <p className="text-white text-xs font-bold uppercase tracking-widest mb-3 opacity-70">Socials Unlocked</p>
                <div className="space-y-2">
                    {matchedProfile.socials?.discord && (
                        <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/10">
                            <span className="text-white font-mono text-sm">{matchedProfile.socials.discord}</span>
                            <span className="text-indigo-400 text-xs font-bold uppercase">Discord</span>
                        </div>
                    )}
                    {matchedProfile.socials?.instagram && (
                        <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/10">
                            <span className="text-white font-mono text-sm">{matchedProfile.socials.instagram}</span>
                            <span className="text-pink-400 text-xs font-bold uppercase">Insta</span>
                        </div>
                    )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-full py-4 bg-uci-gold text-black font-display font-bold text-xl rounded-xl shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] border-2 border-transparent hover:border-black transition-all"
              >
                KEEP SWIPING
              </motion.button>
            </motion.div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};