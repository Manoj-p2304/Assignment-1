import React, { useState } from 'react';
import './StudentTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    slNo: '',
    studentName: '',
    class: '',
    score: '',
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');

  const openDeleteConfirmationModal = () => {
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationModal = () => {
    setDeleteConfirmationOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedStudent(null);
    setError('');
  };

  const addStudent = () => {
    // Validate all fields are filled
    if (!newStudent.studentName || !newStudent.class || !newStudent.score) {
      setError('All fields are mandatory.');
      return;
    }

    const scoreValue = parseInt(newStudent.score);
    if (isNaN(scoreValue) || scoreValue < 0 || scoreValue > 100) {
      setError('Score must be a number between 0 and 100.');
      return;
    }

    // Additional validation for class (1 to 12)
    const classValue = parseInt(newStudent.class);
    if (isNaN(classValue) || classValue < 1 || classValue > 12) {
      setError('Error: Please input values between 1 & 12 for Class.');
      return;
    }

    // Auto-generate result and grade based on score
    let result = '';
    let grade = '';
    const score = parseInt(newStudent.score);

    if (score >= 0 && score <= 30) {
      result = 'Failed';
      grade = 'Poor';
    } else if (score >= 31 && score <= 75) {
      result = 'Passed';
      grade = 'Average';
    } else if (score >= 76 && score <= 100) {
      result = 'Passed';
      grade = 'Excellent';
    }

    if (selectedStudent) {
      // If selectedStudent is present, it means we are editing an existing entry
      const updatedStudents = students.map((student) =>
        student.slNo === selectedStudent.slNo
          ? {
              ...student,
              studentName: newStudent.studentName,
              class: newStudent.class,
              score: newStudent.score,
              result,
              grade,
            }
          : student
      );

      setStudents(updatedStudents);
      setSelectedStudent(null);
    } else {
      // If selectedStudent is not present, it means we are adding a new entry
      const updatedStudents = [
        ...students,
        {
          slNo: students.length + 1,
          studentName: newStudent.studentName,
          class: newStudent.class,
          score: newStudent.score,
          result,
          grade,
        },
      ];

      setStudents(updatedStudents);
    }

    setNewStudent({
      slNo: '',
      studentName: '',
      class: '',
      score: '',
    });
    setError('');
    closeModal();
  };

  const editStudent = (slNo) => {
    const selectedStudent = students.find((student) => student.slNo === slNo);
    setNewStudent(selectedStudent);
    setSelectedStudent(selectedStudent);
    openModal();
  };


  const confirmDeleteStudent = () => {
    const updatedStudents = students.filter((student) => student.slNo !== selectedStudent.slNo);
    setStudents(updatedStudents);
    closeDeleteConfirmationModal();
  };
  const deleteStudent = (slNo) => {
    const selectedStudent = students.find((student) => student.slNo === slNo);
    setSelectedStudent(selectedStudent);
    openDeleteConfirmationModal();
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
    setError('');

    // Calculate and update result and grade based on the entered score
    let result = '';
    let grade = '';
    const score = parseInt(value);

    if (!isNaN(score)) {
      if (score >= 0 && score <= 30) {
        result = 'Failed';
        grade = 'Poor';
      } else if (score >= 31 && score <= 75) {
        result = 'Passed';
        grade = 'Average';
      } else if (score >= 76 && score <= 100) {
        result = 'Passed';
        grade = 'Excellent';
      }
    }

    setNewStudent((prevStudent) => ({
      ...prevStudent,
      result,
      grade,
    }));
  };

  return (
    <div className='div1'>
      <h2>Student Table</h2>
      <button className='btn1' onClick={openModal}>
        + ADD
      </button>

      <table className="static-table">
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Student Name</th>
            <th>Class</th>
            <th>Score</th>
            <th>Result</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.slNo}>
              <td>{student.slNo}</td>
              <td>{student.studentName}</td>
              <td>{student.class}</td>
              <td>{student.score}/100</td>
              <td>
                {student.result === 'Passed' && (
                  <span className='ResultBox'>Passed</span>
                )}
                {student.result === 'Failed' && (
                  <span className='ResultBox1'>{student.result}</span>
                )}
              </td>
              <td className={`grade ${student.grade}`}>{student.grade}</td>

              <td className='td-gap'>
                <button onClick={() => editStudent(student.slNo)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => deleteStudent(student.slNo)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {students.length > 0 && (
        <div className='entries-message'>
          Showing {students.length} of {students.length} entries
        </div>
      )}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Add/Edit Student Modal"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h3>{selectedStudent ? 'Edit Student' : 'Add Student'}</h3>
          {error && <p className="error">{error}</p>}
          <div className="modal-form">
            <label>Student Name: </label>
            <input
              type="text"
              name="studentName"
              required
              value={newStudent.studentName}
              onChange={handleInputChange}
            />
            <label>Class: </label>
            <input
              type="text"
              required
              name="class"
              value={newStudent.class}
              onChange={handleInputChange}
            />
            <label>Score: </label>
            <input
              type="text"
              required
              name="score"
              value={newStudent.score}
              onChange={handleInputChange}
            />
            <div>
              <label>Result: </label>
              <span className='span1'>{newStudent.result}</span>
              
            </div>
            <div>
              <label>Grade: </label>
              <span className={`grade ${newStudent.grade}`}>
                {newStudent.grade}
              </span>
            </div>
          </div>
          <div className="modal-buttons">
            <button className="cancel" onClick={closeModal}>
              Cancel
            </button>
            <button className="save" onClick={addStudent}>
              {selectedStudent ? 'Save Changes' : 'Add Student'}
            </button>
          </div>
        </Modal>
      )}
       {deleteConfirmationOpen && (
        <Modal
          isOpen={deleteConfirmationOpen}
          onRequestClose={closeDeleteConfirmationModal}
          contentLabel="Delete Confirmation Modal"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <h3>Delete Student</h3>
          <p>
            Are you sure you want to delete the student{' '}
            <strong>{selectedStudent?.studentName}</strong> from class{' '}
            <strong>{selectedStudent?.class}</strong>?
          </p>
          <div className="modal-buttons">
            <button className="cancel" onClick={closeDeleteConfirmationModal}>
              Cancel
            </button>
            <button className="confirm-delete" onClick={confirmDeleteStudent}>
              Confirm Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StudentTable;
