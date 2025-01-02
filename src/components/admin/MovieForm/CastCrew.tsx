import React from 'react';
import { Users } from 'lucide-react';
import { StepProps } from '../MovieForm';

export const CastCrewStep = ({ formData, handleChange, handleCastChange }: StepProps) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Users className="w-6 h-6" />
        Cast & Crew
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Director</label>
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter director's name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cast (comma-separated)</label>
          <textarea
            name="cast"
            value={formData.cast.join(', ')}
            onChange={handleCastChange}
            className="w-full p-2 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter cast members, separated by commas"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>
    </div>
  );
};
