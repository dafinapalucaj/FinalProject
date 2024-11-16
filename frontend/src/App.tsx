import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EventListPage from './pages/EventListPage';
import EventForm from './components/EventForm';
import UserForm from './components/UserForm';
import RegisterForEvent from './components/RegisterForEvent';
import CalendarView from './components/CalendarView';
import HomePage from './pages/HomePage';
import UserEventsPage from './pages/UserEventsPage'; 
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      
      <nav className="sidebar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/events">View Events</Link></li>
          <li><Link to="/event-form">Create Event</Link></li>
          <li><Link to="/register-event">Register for Event</Link></li>
          <li><Link to="/user-form">Create User</Link></li>
          <li><Link to="/calendar">View Calendar</Link></li>
          <li><Link to="/user/events">My Registered Events</Link></li> 
        </ul>
      </nav>
      
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventListPage />} />
          <Route path="/event-form" element={<EventForm />} />
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/register-event" element={<RegisterForEvent />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/user/events" element={<UserEventsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
