import { BrowserRouter as Router, Route, Routes, Navigate, useParams} from 'react-router-dom';
import React, { Suspense} from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/SideBar/SideBar';
import EmailTemplate from './components/EmailTemplate/EmailTemplate';
import Record from './components/Record/Record';

function App() {
  return (
    <Router>
      <Sidebar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />    
            <Route path="/email_template" element={<EmailTemplate />} />    
            <Route path="/record" element={<Record />} />    
          </Routes>
        </Suspense>
    </Router>
  );
}

export default App;
