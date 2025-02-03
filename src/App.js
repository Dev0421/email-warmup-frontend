import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import React, { Suspense } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/SideBar/SideBar';
import EmailTemplate from './components/EmailTemplate/EmailTemplate';
import Record from './components/Record/Record';
import Prestart from './pages/Prestart';

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/' && <Sidebar />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Prestart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/template" element={<EmailTemplate />} />
          <Route path="/record" element={<Record />} />
        </Routes>
      </Suspense>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;