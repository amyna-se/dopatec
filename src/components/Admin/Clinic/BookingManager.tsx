import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Settings } from 'lucide-react';
import { useScheduling } from '../../../stores/modules/scheduling';

export function BookingManager() {
  const { schedules } = useScheduling();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'settings'>('upcoming');

  const bookingSettings = {
    allowedTimeSlots: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'],
    appointmentDuration: 60,
    bufferTime: 15,
    maxAdvanceBooking: 30,
    autoConfirm: true
  };

  return (
    <div className="bg-dark-light rounded-lg p-6 border border-neon-purple/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6 text-neon-purple" />
          <h2 className="text-xl font-bold text-white">Booking System</h2>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'upcoming'
                ? 'bg-neon-purple text-white'
                : 'bg-dark text-gray-400 hover:bg-neon-purple/20'
            }`}
          >
            Upcoming Bookings
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'settings'
                ? 'bg-neon-purple text-white'
                : 'bg-dark text-gray-400 hover:bg-neon-purple/20'
            }`}
          >
            Settings
          </button>
        </div>
      </div>

      {activeTab === 'upcoming' ? (
        <div className="space-y-4">
          {Object.values(schedules).map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark rounded-lg p-4 border border-neon-blue/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-neon-blue/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-neon-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{booking.title}</h3>
                    <p className="text-gray-400">
                      {new Date(booking.startTime).toLocaleDateString()} at{' '}
                      {new Date(booking.startTime).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">{booking.attendees.length} attendees</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-dark rounded-lg p-6 border border-neon-blue/10">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Booking Settings</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Appointment Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={bookingSettings.appointmentDuration}
                    className="w-full px-4 py-2 rounded-lg bg-dark-light border border-neon-blue/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Buffer Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={bookingSettings.bufferTime}
                    className="w-full px-4 py-2 rounded-lg bg-dark-light border border-neon-blue/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Max Advance Booking (days)
                  </label>
                  <input
                    type="number"
                    value={bookingSettings.maxAdvanceBooking}
                    className="w-full px-4 py-2 rounded-lg bg-dark-light border border-neon-blue/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Auto Confirm Bookings
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={bookingSettings.autoConfirm}
                      className="rounded border-gray-700 text-neon-purple focus:ring-neon-purple"
                    />
                    <span className="text-white">Enable auto confirmation</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Available Time Slots</h3>
              <div className="grid grid-cols-4 gap-4">
                {bookingSettings.allowedTimeSlots.map((timeSlot) => (
                  <div
                    key={timeSlot}
                    className="px-4 py-2 rounded-lg bg-dark-light border border-neon-blue/10 text-white text-center"
                  >
                    {timeSlot}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}