import React, { useState } from 'react';
import './EventListPage.css';  

const UserEventsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch the events a user is registered for
  const fetchUserEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user events');
      }

      const data = await response.json();
      setEvents(data);  
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setEvents([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUserEvents();
  };

  return (
    <div className="event-list-container">
      <h1 className="event-list-title">User Registered Events</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit"> Submit </button>
        <p> </p>
      </form>

      {error && <p className="error-message">{error}</p>}

      {events.length > 0 ? (
        <ul className="event-list">
          {events.map((event: any) => (
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
        <p className="no-events-message">No events found for this user.</p>
      )}
    </div>
  );
};

export default UserEventsPage;
