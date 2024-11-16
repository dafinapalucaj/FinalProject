import React from 'react';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome to the Event Management System</h1>
        <p>Your one-stop destination for event organization and participation.</p>
      </header>
      <main className="home-content">
        <p>Create, view, and register for amazing events tailored just for you.</p>
        <p>
          Whether you're an attendee, organizer, or just exploring, we've got something for everyone.
        </p>
      </main>
      <footer className="home-footer">
        <p>Start your journey today!</p>
      </footer>
    </div>
  );
};

export default HomePage;
