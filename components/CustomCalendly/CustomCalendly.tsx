'use client';

import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parseISO, isPast, setHours, setMinutes } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

type ScheduleComponentProps = {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  selectedTimezone: string;
  setSelectedTimezone: (tz: string) => void;
  setStep: (step: number) => void;
};

type DetailsFormComponentProps = {
  formData: {
    name: string;
    email: string;
    notes: string;
  };
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  message: string;
  isSuccess: boolean;
  setStep: (step: number) => void;
  selectedDate: Date | null;
  selectedTime: string | null;
  selectedTimezone: string;
};


type ConfirmationComponentProps = {
  formData: {
    name: string;
    email: string;
    notes: string;
  };
  selectedDate: Date | null;
  selectedTime: string | null;
  selectedTimezone: string;
};


// ------------------- Helper Constants & Functions -------------------
// Ab timezones ki ek vistarit list shamil ki gayi hai.
const COMMON_TIMEZONES = [
  { value: 'Etc/UTC', label: 'Coordinated Universal Time (UTC)' },
  { value: 'America/New_York', label: 'Eastern Time (ET) - New York' },
  { value: 'America/Chicago', label: 'Central Time (CT) - Chicago' },
  { value: 'America/Denver', label: 'Mountain Time (MT) - Denver' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT) - Los Angeles' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'Europe/Berlin', label: 'Berlin (CET)' },
  { value: 'Europe/Moscow', label: 'Moscow (MSK)' },
  { value: 'Asia/Dubai', label: 'Dubai (GST)' },
  { value: 'Asia/Karachi', label: 'Pakistan Standard Time (PKT)' },
  { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
  { value: 'Asia/Dhaka', label: 'Dhaka (BST)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
  { value: 'Asia/Singapore', label: 'Singapore (SGT)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST)' },
  { value: 'Australia/Perth', label: 'Perth (AWST)' },
  { value: 'Pacific/Auckland', label: 'Auckland (NZST)' },
  { value: 'Africa/Cairo', label: 'Cairo (EET)' },
  { value: 'Africa/Johannesburg', label: 'Johannesburg (SAST)' },
  { value: 'America/Sao_Paulo', label: 'Sao Paulo (BRT)' },
  { value: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires (ART)' },
  { value: 'America/Mexico_City', label: 'Mexico City (CST)' },
  { value: 'America/Anchorage', label: 'Anchorage (AKT)' },
  { value: 'America/Honolulu', label: 'Honolulu (HST)' },
];

// Mock data for available time slots in 24-hour format.
// Ab humne 12-hour format ke liye slots ko thoda change kiya hai.
const MOCK_AVAILABLE_SLOTS_24H = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00"
];

// Utility function to generate time slots for a given date, filtered for past times.
const generateTimeSlots = (date: Date) => {

  const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
  const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
  const isFutureDate = date.getTime() >= new Date().setHours(0, 0, 0, 0);

  if (isWeekday && isFutureDate) {
    const now = new Date();
    const isToday = isSameDay(date, now);

    return MOCK_AVAILABLE_SLOTS_24H.filter(slot => {
      if (isToday) {
        const [hours, minutes] = slot.split(':').map(Number);
        const slotDate = setMinutes(setHours(date, hours), minutes);
        return !isPast(slotDate);
      }
      return true;
    });
  }
  return [];
};


// ------------------- ScheduleComponent: Step 1 (Select Date and Time) -------------------
const ScheduleComponent = ({
  currentMonth, setCurrentMonth, selectedDate, setSelectedDate,
  selectedTime, setSelectedTime, selectedTimezone, setSelectedTimezone,
  setStep
}: ScheduleComponentProps) => {
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);


  // Effect to update time slots whenever selectedDate changes.
  useEffect(() => {
    if (selectedDate) {
      setAvailableTimeSlots(generateTimeSlots(selectedDate));
      setSelectedTime(null);
    }
  }, [selectedDate, setSelectedTime]);

  // Navigate to the next month.
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  // Navigate to the previous month.
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Renders the calendar grid.
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const cells = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const isCurrentMonth = isSameMonth(cloneDay, monthStart);
        const isPastDate = cloneDay.getTime() < new Date().setHours(0, 0, 0, 0);
        const isSelected = selectedDate ? isSameDay(cloneDay, selectedDate) : false;

        const isToday = isSameDay(cloneDay, new Date());
        const hasSlots = generateTimeSlots(cloneDay).length > 0 && !isPastDate;

        cells.push(
          <div
            className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer transition-all duration-200
              ${!isCurrentMonth ? "text-gray-600 pointer-events-none" : isSelected ? "bg-purple-600 text-white shadow-lg" : "text-gray-300 hover:bg-purple-800/20"}
              ${isToday && !isSelected ? "border border-cyan-500" : ""}
              ${isPastDate ? "opacity-50 pointer-events-none" : ""}
            `}
            key={cloneDay.toISOString()}
            onClick={() => {
              if (!isPastDate) {
                setSelectedDate(cloneDay);
              }
            }}
          >
            <span className="text-sm font-semibold">{formattedDate}</span>
            {hasSlots && (
              <span className="block w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1"></span>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
    }

    // Split cells into rows of 7 days.
    const rows = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push(
        <div className="grid grid-cols-7 gap-2" key={`row-${i}`}>
          {cells.slice(i, i + 7)}
        </div>
      );
    }
    return <div className="space-y-2">{rows}</div>;
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#0E0B1F] rounded-lg shadow-xl overflow-hidden w-full p-6 space-y-6 md:space-y-0 md:space-x-6">
      {/* Left Panel: Company Info */}
      <div className="md:w-1/3 p-4 bg-[#1A1630] rounded-lg flex flex-col text-left">
        <div className="flex flex-col gap-4 items-center mt-12 mb-6 justify-center">
          <Image
            src="/white.png"
            alt="Company Logo"
            width={60}
            height={60}
            draggable={false}
            className="rounded-full shadow-lg"
          />
          <h2 className="text-2xl font-bold text-white">SynCuraLegacy</h2>
        </div>
        <p className="text-md text-gray-400 mb-2">Discovery Call SynCuraLegacy</p>
        <div className="flex items-center text-gray-300">
          <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 10.586V6z" /></svg>
          <p>30 min</p>
        </div>
        <div className="flex items-center text-gray-300 mt-1">
          <svg className="w-8 h-8 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2.5 4.5A.5.5 0 013 4h14a.5.5 0 01.5.5v11a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5v-11zM17 5H3v10h14V5zM8 7.5A.5.5 0 018.5 7h3a.5.5 0 01.5.5v5a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-5zM12 7h1v6h-1V7zM7 7h1v6H7V7zM3.5 16h13v1H3.5v-1z" /></svg>
          <p className='text-sm'>Web conferencing details provided upon confirmation.</p>
        </div>
        {selectedDate && selectedTime && selectedTimezone && (
          <div className="text-left text-gray-300 mt-4 w-full">
            <p className="flex items-center text-sm">
              <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
              {format(selectedDate, 'PPP')}
            </p>
            <p className="flex items-center text-sm mt-1">
              <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 10.586V6z"></path></svg>
              {/* Ab selected time ko 12-hour (hh:mm a) format mein display kar rahe hain */}
              {format(parseISO(`2000-01-01T${selectedTime}:00`), 'hh:mm a')}
            </p>
            <p className="flex items-center text-sm mt-1 text-gray-500">
              <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.5 6a.5.5 0 00-1 0v4a.5.5 0 00.293.454l2.5 1.5a.5.5 0 00.556-.892L10 10.586V6.5z" clipRule="evenodd"></path></svg>
              {COMMON_TIMEZONES.find(tz => tz.value === selectedTimezone)?.label || selectedTimezone}
            </p>
          </div>
        )}
      </div>
      {/* Right Panel: Calendar & Time Slots */}
      <div className="md:w-2/3 p-4">
        <h3 className="text-xl font-semibold text-white mb-4">Select a Date & Time</h3>
        {/* Timezone selection dropdown */}
        <div className="mb-4">
          <label htmlFor="timezone" className="block text-gray-300 text-sm font-bold mb-2">Select Time Zone</label>
          <select
            id="timezone"
            name="timezone"
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-700"
          >
            {COMMON_TIMEZONES.map(tz => (
              <option key={tz.value} value={tz.value}>{tz.label}</option>
            ))}
          </select>
        </div>
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth} className="p-2 rounded-full hover:bg-purple-800/30 text-white">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <span className="text-lg font-bold text-white">{format(currentMonth, "MMMM yyyy")}</span>
          <button onClick={nextMonth} className="p-2 rounded-full hover:bg-purple-800/30 text-white">
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
        {/* Days of the Week */}
        <div className="grid grid-cols-7 gap-2 text-center text-gray-400 mb-2">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
            <div key={day} className="font-medium text-sm">{day}</div>
          ))}
        </div>
        {/* Calendar Cells */}
        {renderCells()}
        {/* Time Slots */}
        {selectedDate && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-white mb-3">Available Times for {format(selectedDate, 'PPP')}</h4>
            {availableTimeSlots.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableTimeSlots.map((time) => (
                  <button
                    key={time}
                    className={`px-4 py-2 rounded-lg border transition duration-200
                      ${selectedTime === time ? "bg-cyan-600 border-cyan-600 text-white shadow-md" : "bg-transparent border-purple-700 text-gray-300 hover:bg-purple-700/30 hover:border-purple-600"}
                    `}
                    onClick={() => setSelectedTime(time)}
                  >
                    {/* Time ko 12-hour format mein display kiya gaya hai */}
                    {format(parseISO(`2000-01-01T${time}:00`), 'hh:mm a')}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No available slots for this date.</p>
            )}
            {selectedTime && (
              <button
                onClick={() => setStep(2)}
                className="mt-6 w-full px-6 py-3 rounded-full text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition duration-300 ease-in-out shadow-lg font-semibold"
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


// ------------------- DetailsFormComponent: Step 2 (User Details) -------------------
const DetailsFormComponent = ({
  formData, handleFormChange, handleSubmit, isLoading, message, isSuccess,
  setStep, selectedDate, selectedTime, selectedTimezone
}: DetailsFormComponentProps) => {

  return (
    <div className="flex flex-col md:flex-row bg-[#0E0B1F] rounded-lg shadow-xl overflow-hidden w-full p-6 space-y-6 md:space-y-0 md:space-x-6 relative">
      {/* Left Panel: Company Info */}
      <div className="md:w-1/2 p-4 bg-[#1A1630] rounded-lg flex flex-col text-left">
        {/* Back Button */}
        <button
          onClick={() => setStep(1)}
          className="absolute top-8 left-10 p-2 rounded-full text-white bg-purple-700/50 hover:bg-purple-700/80 transition-all duration-200 z-10"
          aria-label="Go back to the previous step"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="flex flex-col gap-6 items-center mt-12 mb-6">
          <Image
            src="/white.png"
            alt="SynCuraLegacy"
            width={60}
            height={60}
            draggable={false}
            className="rounded-full shadow-lg"
          />
          <h2 className="text-2xl font-bold text-white">SynCuraLegacy</h2>
        </div>
        <p className="text-md text-gray-400 mb-2">Discovery Call SynCuraLegacy</p>
        <div className="flex items-center text-gray-300">
          <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 10.586V6z" /></svg>
          <p>30 min</p>
        </div>
        <div className="flex items-center text-gray-300 mt-1">
          <svg className="w-8 h-8 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2.5 4.5A.5.5 0 013 4h14a.5.5 0 01.5.5v11a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5v-11zM17 5H3v10h14V5zM8 7.5A.5.5 0 018.5 7h3a.5.5 0 01.5.5v5a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-5zM12 7h1v6h-1V7zM7 7h1v6H7V7zM3.5 16h13v1H3.5v-1z" /></svg>
          <p className='text-sm' >Web conferencing details provided upon confirmation.</p>
        </div>
        {selectedDate && selectedTime && selectedTimezone && (
          <div className="text-left text-gray-300 mt-4 w-full">
            <p className="flex items-center text-sm">
              <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
              {format(selectedDate, 'PPP')}
            </p>
            <p className="flex items-center text-sm mt-1">
              <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 10.586V6z"></path></svg>
              {/* Ab selected time ko 12-hour (hh:mm a) format mein display kar rahe hain */}
              {format(parseISO(`2000-01-01T${selectedTime}:00`), 'hh:mm a')}
            </p>
            <p className="flex items-center text-sm mt-1 text-gray-500">
              <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.5 6a.5.5 0 00-1 0v4a.5.5 0 00.293.454l2.5 1.5a.5.5 0 00.556-.892L10 10.586V6.5z" clipRule="evenodd"></path></svg>
              {COMMON_TIMEZONES.find(tz => tz.value === selectedTimezone)?.label || selectedTimezone}
            </p>
          </div>
        )}
      </div>
      {/* Right Panel: Form */}
      <div className="md:w-2/3 p-4 relative">
      
        <h3 className="text-xl font-semibold text-white mb-4">Enter Your Details</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-700 "
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-700 "
            />
          </div>
          <div>
            <label htmlFor="notes" className="block text-gray-300 text-sm font-bold mb-2">Please share anything that will help prepare for our meeting.</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleFormChange}
              rows={4}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-700 "
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-full text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition duration-300 ease-in-out shadow-lg font-semibold flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Schedule Event'
            )}
          </button>
          {message && (
            <p className={`text-center text-sm mt-4 ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};


// ------------------- ConfirmationComponent: Step 3 (Confirmation) -------------------
const ConfirmationComponent = ({
  formData, selectedDate, selectedTime, selectedTimezone
}: ConfirmationComponentProps) => {

  return (
    <div className="bg-[#0E0B1F] rounded-lg shadow-xl p-8 text-center w-full">
      <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="mt-4 text-2xl font-semibold text-white">Meeting Scheduled!</h3>
      <p className="mt-2 text-gray-300">
        Thank you, <span className="font-bold">{formData.name}</span>! Your meeting with SynCuraLegacy on <span className="font-bold">{format(selectedDate!, 'PPP')}</span> at <span className="font-bold">
          {/* Ab confirmation page par bhi time 12-hour format mein display ho raha hai */}
          {format(parseISO(`2000-01-01T${selectedTime}:00`), 'hh:mm a')} ({selectedTimezone})
        </span> has been successfully scheduled.
      </p>
      <p className="mt-2 text-gray-300">A confirmation email has been sent to <span className="font-bold">{formData.email}</span>.</p>
      <Link href="/">
        <button className="mt-6 px-6 py-3 rounded-full text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition duration-300 ease-in-out shadow-lg font-semibold">
          Go to Homepage
        </button>
      </Link>
    </div>
  );
};


// ------------------- Main App Component -------------------
// The main container that manages state and renders the correct component based on the step.
export default function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] =  useState<string | null>(null);
  const [step, setStep] = useState(1); // 1: Select Date/Time, 2: Enter Details, 3: Confirmation
  const [formData, setFormData] = useState({ name: '', email: '', notes: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState('');

  // Get user's local timezone on initial load.
  useEffect(() => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setSelectedTimezone(timezone);
    } catch (e) {
      console.error("Could not determine user's timezone:", e);
      setSelectedTimezone('Etc/UTC'); // Fallback to UTC
    }
  }, []);

  // Handle Form Input Change.
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Form Submission.
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsSuccess(false);

    if (!selectedDate || !selectedTime) {
      setMessage('Please select a date and time.');
      setIsLoading(false);
      return;
    }

    if (!selectedTimezone) {
      setMessage('Please select a time zone.');
      setIsLoading(false);
      return;
    }

    const meetingDateTime = `${format(selectedDate, 'PPP')} at ${format(parseISO(`2000-01-01T${selectedTime}:00`), 'hh:mm a')} (${selectedTimezone})`;

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          notes: formData.notes,
          meetingDateTime: meetingDateTime,
          companyName: 'SynCuraLegacy',
          companyLogo: '/white.png',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Meeting scheduled successfully! A confirmation email has been sent.');
        setIsSuccess(true);
        setStep(3);
      } else {
        setMessage(data.error || 'Failed to schedule meeting. Please try again.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      setMessage('An unexpected error occurred. Please try again later.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Conditionally render components based on the step state.
  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <ScheduleComponent
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            selectedTimezone={selectedTimezone}
            setSelectedTimezone={setSelectedTimezone}
            setStep={setStep}
          />
        );
      case 2:
        return (
          <DetailsFormComponent
            formData={formData}
            handleFormChange={handleFormChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            message={message}
            isSuccess={isSuccess}
            setStep={setStep}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedTimezone={selectedTimezone}
          />
        );
      case 3:
        return (
          <ConfirmationComponent
            formData={formData}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedTimezone={selectedTimezone}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#060417] text-white p-4">
      {/* The main container with a fixed minimum height */}
      <div className="w-full max-w-4xl min-h-[700px] flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
}
