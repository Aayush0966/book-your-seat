import React from 'react';
import { Calendar, Plus, X } from 'lucide-react';
import { StepProps } from '@/types/movie';

export const ShowScheduleStep = ({ formData, handleChange, handleShowtimeChange } : StepProps) => {
    const [customTime, setCustomTime] = React.useState('');
    const defaultTimes = ['10:00 AM', '01:00 PM', '05:00 PM', '09:00 PM'];
  
    const handleAddCustomTime = () => {
      if (customTime && !formData.showtimes.includes(convertTime(customTime))) {
        const modifiedTime = convertTime(customTime)
        handleAdd(modifiedTime)
        setCustomTime('');
      }
    };

    const convertTime = (time:string) => {
     const todayDate = new Date().toISOString().split('T')[0];
     const dateTime = new Date(`${todayDate} ${time}`);
     const unixTime = Math.floor(dateTime.getTime() / 1000);
     return unixTime;
    }
  
    const handleAdd = (time: number) => {
      handleShowtimeChange( time)
    }

    const removeShowtime = (time: number) => {
      handleShowtimeChange(time);
    };

    const formatDate = (timestamp: number) => {
      const date = new Date(timestamp * 1000);
      return date.toISOString().split('T')[0]; // Return date in 'YYYY-MM-DD' format
    };
  
    return (
      <div className="space-y-6 animate-fadeIn">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          Show Schedule
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                name="showStartDate"
                value={formData.showStartDate ? formatDate(formData.showStartDate) : ''}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                name="showEndDate"
                value={formData.showEndDate ? formatDate(formData.showEndDate) : ''}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-2">Default Showtimes</label>
            <div className="flex flex-wrap gap-2">
              {defaultTimes.map(time => (
                <button
                  key={time}
                  onClick={() => handleAdd(convertTime(time))}
                  className={`px-4 py-2 rounded-full transition-all ${
                    formData.showtimes.includes(convertTime(time))
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-2">Add Custom Showtime</label>
            <div className="flex gap-2">
              <input
                type="time"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                onClick={handleAddCustomTime}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
  
          {formData.showtimes.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Selected Showtimes</label>
              <div className="flex flex-wrap gap-2">
                {formData.showtimes.map(time => (
                  <div
                    key={time}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full"
                  >
                    <span>{new Date(time * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <button
                      onClick={() => removeShowtime(time)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };