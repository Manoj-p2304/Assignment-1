// Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faBook, faClipboard, faPoll, faBullhorn, faChalkboardTeacher, faBell } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <img src="https://www.shutterstock.com/image-vector/school-education-logo-vector-260nw-2307938019.jpg" alt="School Logo" />
        <h1>SCHOOL SPACE</h1>
        <Link to="/">
          <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
        </Link>
        <Link to="/students">
          <FontAwesomeIcon icon={faUsers} /> Students
        </Link>
        <Link to="/course">
          <FontAwesomeIcon icon={faBook} /> Courses
        </Link>
        <Link to="/exams">
          <FontAwesomeIcon icon={faClipboard} /> Exams
        </Link>
        <Link to="/results">
          <FontAwesomeIcon icon={faPoll} /> Results
        </Link>
        <Link to="/notice">
          <FontAwesomeIcon icon={faBullhorn} /> Notice Board
        </Link>
        <Link to="/live">
          <FontAwesomeIcon icon={faChalkboardTeacher} /> Live Classes
        </Link>
        <Link to="/page6">
          <FontAwesomeIcon icon={faBell} /> Notification
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
