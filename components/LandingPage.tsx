import React from 'react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col relative overflow-hidden text-dark-900 selection:bg-uci-gold selection:text-black">
      
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-uci-blue/10 rounded-full blur-[120px] mix-blend-multiply filter pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-uci-gold/20 rounded-full blur-[100px] mix-blend-multiply filter pointer-events-none" />

      {/* Navigation */}
      <nav className="w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto z-50">
        <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-display font-bold text-xl border-2 border-transparent group-hover:border-uci-gold group-hover:bg-uci-blue transition-all duration-300 shadow-neo-sm">
                Z
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">Zot<span className="text-uci-blue">Friend</span>.</span>
        </div>
        <button 
            onClick={onEnterApp}
            className="hidden md:block px-6 py-2.5 bg-white border-2 border-black text-black font-bold text-sm hover:bg-uci-gold hover:translate-y-[-2px] hover:shadow-neo transition-all duration-200"
        >
            LAUNCH DEMO
        </button>
      </nav>

      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center p-6 max-w-7xl mx-auto w-full relative z-10 gap-12 lg:gap-20">
        
        {/* Text Content */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 text-center lg:text-left pt-10 lg:pt-0"
        >
            <div className="inline-block mb-4 px-4 py-1.5 bg-uci-blue/10 text-uci-blue font-bold text-xs uppercase tracking-widest border border-uci-blue/20 rounded-full">
                For UC Irvine Students
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-6">
                STUDY <br/>
                <span className="relative inline-block">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-uci-blue to-uci-darkBlue">TOGETHER</span>
                    <span className="absolute -bottom-2 left-0 w-full h-4 bg-uci-gold/50 -z-0 skew-x-12"></span>
                </span> <br/>
                NOT ALONE.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                The anti-doomscrolling app for Anteaters. Find study partners, gym buddies, or just someone to grab boba with at UTC.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                    onClick={onEnterApp}
                    className="px-8 py-4 bg-black text-white text-lg font-bold shadow-neo hover:shadow-neo-lg hover:-translate-y-1 transition-all active:translate-y-0 active:shadow-none border-2 border-black"
                >
                    START SWIPING
                </button>
                <button className="px-8 py-4 bg-transparent text-black text-lg font-bold border-2 border-black hover:bg-gray-50 transition-all">
                    HOW IT WORKS
                </button>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-4 text-sm font-semibold text-gray-500">
                <div className="flex -space-x-3">
                    {[1,2,3,4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                            <img src={`https://picsum.photos/100?random=${i+20}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                <span>Joined by 2,000+ Anteaters</span>
            </div>
        </motion.div>

        {/* Visual Content - Floating Cards */}
        <div className="flex-1 w-full max-w-md lg:max-w-full relative h-[500px] flex items-center justify-center perspective-1000">
            {/* Decorative circles */}
            <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-[300px] h-[300px] border border-black/5 rounded-full animate-[spin_10s_linear_infinite]" />
                 <div className="w-[450px] h-[450px] border border-black/5 rounded-full absolute animate-[spin_15s_linear_infinite_reverse]" />
            </div>

            <motion.div
                initial={{ rotate: -6, y: 20, opacity: 0 }}
                animate={{ rotate: -6, y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="absolute z-10 w-64 bg-white p-4 pb-8 rounded-2xl border-2 border-black shadow-neo transform -translate-x-12"
            >
                 <div className="h-48 bg-gray-200 rounded-xl mb-4 overflow-hidden relative">
                    <img src="https://picsum.photos/400/600?random=4" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 bg-white px-2 py-0.5 text-xs font-bold border border-black">ICS MAJOR</div>
                 </div>
                 <div className="h-4 w-3/4 bg-gray-900 rounded-sm mb-2"></div>
                 <div className="h-3 w-1/2 bg-gray-300 rounded-sm"></div>
            </motion.div>

            <motion.div
                initial={{ rotate: 6, y: 40, opacity: 0 }}
                animate={{ rotate: 6, y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute z-20 w-64 bg-white p-4 pb-8 rounded-2xl border-2 border-black shadow-neo transform translate-x-12 translate-y-8"
            >
                 <div className="h-48 bg-gray-200 rounded-xl mb-4 overflow-hidden relative">
                    <img src="https://picsum.photos/400/600?random=99" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 bg-uci-gold px-2 py-0.5 text-xs font-bold border border-black">98% MATCH</div>
                 </div>
                 <div className="h-4 w-2/3 bg-gray-900 rounded-sm mb-2"></div>
                 <div className="h-3 w-1/2 bg-gray-300 rounded-sm"></div>
                 
                 {/* Floating Like Button */}
                 <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-uci-blue rounded-full border-2 border-black flex items-center justify-center text-white shadow-neo">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                 </div>
            </motion.div>
        </div>

      </main>

      {/* Marquee Footer */}
      <div className="py-4 bg-black overflow-hidden whitespace-nowrap border-t-2 border-black relative z-20">
        <div className="inline-block animate-marquee">
             <span className="text-white font-display font-bold text-xl mx-8 tracking-widest uppercase">Find Your Squad</span>
             <span className="text-uci-gold font-display font-bold text-xl mx-8 tracking-widest uppercase">★</span>
             <span className="text-white font-display font-bold text-xl mx-8 tracking-widest uppercase">Ace Your Classes</span>
             <span className="text-uci-gold font-display font-bold text-xl mx-8 tracking-widest uppercase">★</span>
             <span className="text-white font-display font-bold text-xl mx-8 tracking-widest uppercase">Level Up Your GPA</span>
             <span className="text-uci-gold font-display font-bold text-xl mx-8 tracking-widest uppercase">★</span>
             <span className="text-white font-display font-bold text-xl mx-8 tracking-widest uppercase">Find Your Squad</span>
             <span className="text-uci-gold font-display font-bold text-xl mx-8 tracking-widest uppercase">★</span>
             <span className="text-white font-display font-bold text-xl mx-8 tracking-widest uppercase">Ace Your Classes</span>
             <span className="text-uci-gold font-display font-bold text-xl mx-8 tracking-widest uppercase">★</span>
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};