import React, { useState } from 'react';

const RegisterForEvent: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [eventName, setEventName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, eventName }),
      });

      if (response.ok) {
        alert('Registration successful!');
        setUserName('');
        setEventName('');
      } else {
        alert('Failed to register for event');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register for Event</h2>
      <label>
        User Name:
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <label>
        Event Name:
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForEvent;
