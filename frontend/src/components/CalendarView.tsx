import React from 'react';
import { useQuery } from '@tanstack/react-query';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

interface Event {
  id: number;
  title: string;
  date: string; 
  description?: string;
}

const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch('http://localhost:3000/events');
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
};

const isEventArray = (data: any): data is Event[] => {
  return Array.isArray(data) && data.every(event => 
    typeof event.id === 'number' &&
    typeof event.title === 'string' &&
    typeof event.date === 'string'
  );
};

const Calendar: React.FC = () => {
  const { data, isLoading, error } = useQuery<Event[], Error>({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const events: Event[] = isEventArray(data) ? data : []; 

  console.log('Fetched events:', events);

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events.map((event) => ({
          title: event.title,
          date: event.date.split('T')[0], 
        }))} 
      />
    </div>
  );
};

export default Calendar;
