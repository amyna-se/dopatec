import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Users, Video } from 'lucide-react';
import { Calendar } from '@/components/Calendar/BookingCalendar';
import { useScheduling } from '../../../stores/modules/scheduling';
import { format } from 'date-fns';

export function ClinicCalendar() {
  const { schedules, addSchedule } = useScheduling();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleAddAppointment = (date: Date, time: string) => {
    const schedule = {
      id: `schedule-${Date.now()}`,
      type: 'appointment',
      title: 'Patient Appointment',
      startTime: date.toISOString(),
      endTime: new Date(date.getTime() + 60 * 60 * 1000).toISOString(), // 1 hour duration
      attendees: [],
      location: {
        type: 'physical',
        details: 'Main Clinic'
      },
      reminders: [
        {
          type: 'email',
          beforeMinutes: 60
        }
      ]
    };

    addSchedule(schedule);
  };

  return (
    <div className="bg-dark-light rounded-lg p-6 border border-neon-purple/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <CalendarIcon className="w-6 h-6 text-neon-purple" />
          <h2 className="text-xl font-bold text-white">Clinic Calendar</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-dark rounded-lg p-6 border border-neon-blue/10">
            <h3 className="text-lg font-semibold text-white mb-4">Upcoming Appointments</h3>
            <div className="space-y-4">
              {Object.values(schedules).map((schedule) => (
                <motion.div
                  key={schedule.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-light rounded-lg p-4 border border-neon-blue/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-neon-blue/10 flex items-center justify-center">
                        {schedule.location?.type === 'online' ? (
                          <Video className="w-5 h-5 text-neon-blue" />
                        ) : (
                          <Users className="w-5 h-5 text-neon-blue" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{schedule.title}</h4>
                        <p className="text-gray-400">
                          {format(new Date(schedule.startTime), 'MMM d, yyyy')} at{' '}
                          {format(new Date(schedule.startTime), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                    <div className="text-gray-400">
                      {schedule.location?.type === 'online' ? 'Online' : 'In Person'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-dark rounded-lg p-6 border border-neon-blue/10">
          <h3 className="text-lg font-semibold text-white mb-4">Schedule Appointment</h3>
          <Calendar onBooking={handleAddAppointment} />
        </div>
      </div>
    </div>
  );
}