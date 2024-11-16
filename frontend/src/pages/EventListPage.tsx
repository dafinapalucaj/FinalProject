import React, { useEffect, useState } from 'react';
import './EventListPage.css'; 

const EventListPage: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data); 
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents(); 
  }, []);

  return (
    <div className="event-list-container">
      <h2 className="event-list-title">Events List</h2>
      {events.length > 0 ? (
        <ul className="event-list">
          {events.map((event) => (
            <li key={event.id} className="event-list-item">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
              <p className="event-date">
                <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="event-creator">
                <strong>Creator:</strong> {event.createdBy}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-events-message">No events found.</p>
      )}
    </div>
  );
};

export default EventListPage;
