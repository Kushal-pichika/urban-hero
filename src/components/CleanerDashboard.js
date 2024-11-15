import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/dashboard.css';

const CleanerDashboard = () => {
  const [assignedTasks, setAssignedTasks] = useState([]);
  const navigate = useNavigate();
  const currentCleanerId = localStorage.getItem('cleanerId'); // Get cleaner's ID from localStorage or use authentication logic

  // Fetch tasks assigned to the cleaner
  const fetchAssignedTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('assignedTasks')) || [];
    const cleanerTasks = tasks.filter(task => task.cleanerId === currentCleanerId); // Filter tasks assigned to current cleaner
    setAssignedTasks(cleanerTasks);
  };

  // Update task status after cleaning
  const updateTaskStatus = (taskId, status) => {
    const tasks = JSON.parse(localStorage.getItem('assignedTasks')) || [];
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status } : task
    );
    localStorage.setItem('assignedTasks', JSON.stringify(updatedTasks));
    setAssignedTasks(updatedTasks); // Update tasks in state
    alert('Task status updated');
  };

  const handleLogout = () => {
    localStorage.removeItem('role'); // Clear the role from localStorage
    localStorage.removeItem('cleanerId'); // Clear cleanerId from localStorage
    navigate('/login'); // Redirect to login page
  };

  useEffect(() => {
    if (currentCleanerId) {
      fetchAssignedTasks();
    } else {
      // If cleanerId is not found, redirect to login page or show an error
      navigate('/login');
    }
  }, [currentCleanerId, navigate]);

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h2>Cleaner Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Your Assigned Tasks</h3>
          <ul>
            {assignedTasks.length > 0 ? (
              assignedTasks.map((task, index) => (
                <li key={index}>
                  <img src={task.imageUrl} alt={`Task ${index + 1}`} />
                  <p>Status: {task.status}</p>
                  {task.status !== 'Completed' && (
                    <button onClick={() => updateTaskStatus(task.id, 'Completed')}>
                      Mark as Completed
                    </button>
                  )}
                </li>
              ))
            ) : (
              <p>No tasks assigned yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CleanerDashboard;