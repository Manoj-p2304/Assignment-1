import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import StudentTable from './StudentTable';
import Dashboard from './Pages/Dashboard';
import Course from './Pages/Course';
import Exams from './Pages/Exams';
import Result from './Pages/Result';
import Notice from './Pages/Notice';
import Live from './Pages/Live';

// Import other page components as needed

const Routing = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/students" element={<StudentTable />} />
            <Route path="/course" element={<Course />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/results" element={<Result />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/live" element={<Live />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Routing;
