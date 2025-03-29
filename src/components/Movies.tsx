"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NowShowingSection from './NowShowingSection';
import UpcomingSection from './UpcomingSection';
import { Movie } from '@/types/movie';

interface MoviesProps {
  activeShows: Movie[];
  upcomingShows: Movie[];
}

const Movies: React.FC<MoviesProps> = ({ activeShows, upcomingShows }) => {
    const [activeTab, setActiveTab] = useState<'nowShowing' | 'upcoming'>('nowShowing');

    return (
        <div className="w-full mx-auto px-4 py-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
            {/* Tabs */}
            <div className="flex flex-col items-center mb-12">
                <h2 className="text-5xl font-bold text-slate-800 mb-8 tracking-tight">
                    <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                        Browse Movies
                    </span>
                </h2>
                <div className="inline-flex rounded-xl border border-red-500/20 p-1.5 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-red-500/10 transition-all duration-300">
                    <button
                        onClick={() => setActiveTab('nowShowing')}
                        className={`px-10 py-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                            activeTab === 'nowShowing'
                                ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg shadow-red-500/30'
                                : 'text-red-400 hover:bg-slate-100'
                        }`}
                    >
                        Now Showing
                    </button>
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`px-10 py-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                            activeTab === 'upcoming'
                                ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg shadow-red-500/30'
                                : 'text-red-400 hover:bg-slate-100'
                        }`}
                    >
                        Upcoming
                    </button>
                </div>
            </div>

            {/* Content Sections */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {activeTab === 'nowShowing' ? (
                        <NowShowingSection shows={activeShows} />
                    ) : (
                        <UpcomingSection onClick={() => setActiveTab('nowShowing')} shows={upcomingShows} />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Movies;