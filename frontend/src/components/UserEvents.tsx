import React, { useState } from 'react';

const UserEvents: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

  return (
    <div>
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
        <button type="submit">Submit</button>
      </form>

      {error && <p>{error}</p>}

      {events.length > 0 ? (
        <ul className="event-list">
          {events.map((event: any) => (
            <li key={event.id}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{new Date(event.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found for this user.</p>
      )}
    </div>
  );
};

export default UserEvents;
