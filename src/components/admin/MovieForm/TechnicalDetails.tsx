import { StepProps } from '@/types/movie';
import { Clock } from 'lucide-react';

export const TechnicalDetailsStep = ({ movieDetails, handleChange } : StepProps) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Clock className="w-6 h-6" />
        Technical Details
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Runtime (minutes)</label>
          <input
            type="number"
            name="duration"
            value={movieDetails.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Language</label>
          <select
            name="language"
            value={movieDetails.language}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Select language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Age Rating</label>
          <select
            name="ageRating"
            value={movieDetails.ageRating}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Select rating</option>
            <option value="G">G</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="R">R</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Poster URL</label>
          <input
            type="url"
            name="posterUrl"
            value={movieDetails.posterUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            placeholder="https://"
          />
        </div>
      </div>
    </div>
  );
};