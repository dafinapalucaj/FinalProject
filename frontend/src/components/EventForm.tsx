import React, { useState, useEffect } from 'react';

const EventForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [userName, setUserName] = useState('');
  const [userNameExists, setUserNameExists] = useState(false);

  useEffect(() => {
    const validateUserName = async () => {
      if (userName.trim()) {
        try {
          const response = await fetch(`/api/users/${userName}`);
          if (response.ok) {
            setUserNameExists(true);
          } else {
            setUserNameExists(false);
          }
        } catch (error) {
          console.error('Error validating username:', error);
          setUserNameExists(false);
        }
      } else {
        setUserNameExists(false);
      }
    };

    validateUserName();
  }, [userName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userNameExists) {
      alert('User name must be an existing user');
      return;
    }

    if (!title || !description || !date) {
      alert('All fields are required');
      return;
    }

    const event = { title, description, date, createdBy: userName };

    try {
      const res = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });

      if (res.ok) {
        alert('Event created successfully');
        setTitle('');
        setDescription('');
        setDate('');
        setUserName('');  
      } else {
        const errorData = await res.json();
        alert(`Error creating event: ${errorData?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the event');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Event</h2>
      <label>
        Creator Name:
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        {!userNameExists && userName.trim() && (
          <p style={{ color: 'red' }}>User name must exist</p>
        )}
      </label>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit" disabled={!userNameExists}>Create Event</button>
    </form>
  );
};

export default EventForm;

