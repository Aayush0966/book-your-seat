import { StepProps } from '@/types/movie';
import { Calendar, Plus, X } from 'lucide-react';
import React from 'react';
import { FormikValues } from 'formik';

export const ShowScheduleStep = ({ movieDetails, handleChange, handleShowtimeChange }: StepProps) => {
  const [customTime, setCustomTime] = React.useState('');
  const [selectedScreen, setSelectedScreen] = React.useState<number | null>(null);
  const defaultTimes = ['10:00 AM', '01:00 PM', '05:00 PM', '09:00 PM'];
  const screenIds = [1, 2, 3];

  const handleAddCustomTime = () => {
    if (customTime && selectedScreen !== null) {
      const modifiedTime = convertTime(customTime);
      handleShowtimeChange(selectedScreen, modifiedTime);
      setCustomTime('');
    }
  };

  const convertTime = (time: string) => {
    const todayDate = new Date().toISOString().split('T')[0];
    const dateTime = new Date(`${todayDate} ${time}`);
    return Math.floor(dateTime.getTime() / 1000);
  };

  const removeShowtime = (screenId: number, time: number) => {
    handleShowtimeChange(screenId, time);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toISOString().split('T')[0]; // Return date in 'YYYY-MM-DD' format
  };

  const handleSubmit = (values: FormikValues) => {
    const formattedData = {
        ...values,
        showStartDate: BigInt(values.showStartDate),
        showEndDate: BigInt(values.showEndDate),
        showtimes: values.showtimes.map((showtime: any) => ({
            screenId: showtime.screenId,
            showTime: BigInt(showtime.showTime)
        }))
    };
    onSubmit(formattedData);
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
              value={movieDetails.showStartDate ? formatDate(movieDetails.showStartDate) : ''}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              name="showEndDate"
              value={movieDetails.showEndDate ? formatDate(movieDetails.showEndDate) : ''}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
        </div>

        {/* Screen Selection Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Screen</label>
          <select
            value={selectedScreen || ''}
            onChange={(e) => setSelectedScreen(Number(e.target.value))}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            required
          >
            <option value="" disabled>Select Screen</option>
            {screenIds.map((screenId) => (
              <option key={screenId} value={screenId}>
                Screen {screenId}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Default Showtimes</label>
          <div className="flex flex-wrap gap-2">
            {defaultTimes.map((time) => (
              <button
                key={time}
                onClick={() => {
                  if (selectedScreen !== null) {
                    const modifiedTime = convertTime(time);
                    handleShowtimeChange(selectedScreen, modifiedTime);
                  }
                }}
                className={`px-4 py-2 rounded-full transition-all ${
                  movieDetails.showtimes.some(
                    (st) => st.screenId === selectedScreen && st.showTime === convertTime(time)
                  )
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
              required
            />
            <button
              onClick={handleAddCustomTime}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {movieDetails.showtimes.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-2">Selected Showtimes</label>
            <div className="flex flex-wrap gap-2">
              {movieDetails.showtimes
                .filter((st) => st.screenId === selectedScreen)
                .map(({ screenId, showTime }) => (
                  <div
                    key={`${screenId}-${showTime}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full"
                  >
                    <span>
                      Screen {screenId}: {new Date(showTime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button
                      onClick={() => removeShowtime(screenId, showTime)}
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
