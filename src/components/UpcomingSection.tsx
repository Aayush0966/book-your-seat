'use client'
import MovieCard from "./MovieCard";
import { Film, ChevronRight, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Movie } from "@/types/movie";
import { motion } from "framer-motion";

interface UpcomingSectionProps {
  shows: Movie[];
  onClick: () => void;
}

const UpcomingSection: React.FC<UpcomingSectionProps> = ({ shows, onClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12"
        >
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-md group-hover:blur-lg transition-all duration-300 opacity-75" />
              <div className="relative p-2 bg-white rounded-full shadow-xl">
                <Sparkles className="w-8 h-8 text-purple-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-ping" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Coming Soon
              </h2>
              <p className="text-gray-600 mt-1">Exciting releases on the horizon</p>
            </div>
          </div>
        </motion.div>

        {shows && shows.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            {shows.map((show) => (
              <motion.div
                key={show.id}
                variants={itemVariants}
                className="group relative transform hover:z-10"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/10 to-blue-600/5 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <MovieCard movie={show as Movie} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl border border-purple-100 shadow-xl"
          >
            <Film className="w-20 h-20 text-purple-400 animate-bounce" />
            <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-2">No Upcoming Movies</h3>
            <p className="text-gray-600 mb-8">Stay tuned for future releases</p>
            <Button 
              onClick={onClick} 
              className="bg-purple-600 text-white z-50 hover:bg-purple-700 transition-all duration-300 cursor-pointer"
            >
              Browse Current Shows
            </Button>
          </motion.div>
        )}

        {/* Mobile View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 text-center md:hidden"
        >
          <Button
            variant="outline"
            className="w-full group bg-white border-purple-200 hover:border-purple-600 flex items-center justify-center space-x-3 hover:bg-purple-50 transition-all duration-300"
          >
            <span className="font-medium">View All Upcoming</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingSection;