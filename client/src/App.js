import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const API_URL = 'http://localhost:5001/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
      setError('');
    } catch (err) {
      setError('Could not load tasks. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      if (editingTask) {
        const res = await fetch(`${API_URL}/${editingTask._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            title: title.trim(), 
            description: description.trim(), 
            completed: editingTask.completed,
            dueDate,
            reminderTime
          }),
        });
        if (!res.ok) throw new Error('Failed to update task');
      } else {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            title: title.trim(), 
            description: description.trim(),
            dueDate,
            reminderTime
          }),
        });
        if (!res.ok) throw new Error('Failed to create task');
      }

      setTitle('');
      setDescription('');
      setDueDate('');
      setReminderTime('');
      setEditingTask(null);
      setError('');
      showMessage(editingTask ? 'Task updated successfully! ✨' : 'Task scheduled successfully! 📅');
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete task');
      showMessage('Task removed from schedule 🗑️');
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const res = await fetch(`${API_URL}/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, completed: !task.completed }),
      });
      if (!res.ok) throw new Error('Failed to update task');
      showMessage(task.completed ? 'Task moved to pending ⏳' : 'Task marked as completed! ✅');
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || '');
    setDueDate(task.dueDate ? task.dueDate.substring(0, 16) : '');
    setReminderTime(task.reminderTime ? task.reminderTime.substring(0, 16) : '');
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setTitle('');
    setDescription('');
    setDueDate('');
    setReminderTime('');
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>
            <span className="header-icon">📋</span>
            Task Manager
          </h1>
          <p className="header-description">
            A professional Task Scheduler API with automated reminders and deadline tracking.
          </p>
          {tasks.length > 0 && (
            <div className="stats">
              <span className="stat">{tasks.length} total</span>
              <span className="stat completed-stat">✅ {completedCount} done</span>
              <span className="stat pending-stat">⏳ {tasks.length - completedCount} pending</span>
            </div>
          )}
        </div>
      </header>

      <main className="main">
        {error && (
          <div className="error-banner">
            <span>⚠️</span> {error}
            <button className="error-dismiss" onClick={() => setError('')}>✕</button>
          </div>
        )}

        {message && (
          <div className="success-banner">
            <span>✨</span> {message}
          </div>
        )}

        <form className="task-form" onSubmit={handleSubmit}>
          <h2>{editingTask ? '✏️ Edit Task' : '➕ Add New Task'}</h2>
          <div className="form-group">
            <input
              id="task-title"
              type="text"
              placeholder="Task title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              id="task-description"
              placeholder="Task description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input form-textarea"
              rows="2"
            />
          </div>
          <div className="form-group form-row">
            <div className="form-col">
              <label htmlFor="due-date">Due Date</label>
              <input
                id="due-date"
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-col">
              <label htmlFor="reminder-time">Reminder Time</label>
              <input
                id="reminder-time"
                type="datetime-local"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" id="submit-task">
              {editingTask ? 'Update Task' : 'Add Task'}
            </button>
            {editingTask && (
              <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <section className="task-list-section">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading tasks…</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🎯</span>
              <h3>No tasks yet!</h3>
              <p>Add your first task above to get started.</p>
            </div>
          ) : (
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task._id} className={`task-card ${task.completed ? 'task-completed' : ''}`}>
                  <div className="task-checkbox">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task)}
                      id={`check-${task._id}`}
                    />
                  </div>
                  <div className="task-content">
                    <h3 className="task-title">{task.title}</h3>
                    {task.description && <p className="task-description">{task.description}</p>}
                    <div className="task-date-info">
                      <span className="task-date">
                        {new Date(task.createdAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric'
                        })}
                      </span>
                      {task.dueDate && (
                        <span className="task-date">
                           • Due: {new Date(task.dueDate).toLocaleString()}
                        </span>
                      )}
                      {task.reminderTime && (
                        <span className="task-date">
                           • Reminder: {new Date(task.reminderTime).toLocaleString()}
                        </span>
                      )}
                      {task.status && (
                        <span className={`status-text status-${task.status}`}>
                           ({task.status})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="task-actions">
                    <button
                      className="btn-icon btn-edit"
                      onClick={() => handleEdit(task)}
                      title="Edit"
                      id={`edit-${task._id}`}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => handleDelete(task._id)}
                      title="Delete"
                      id={`delete-${task._id}`}
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>Task Manager &mdash; Built with React &amp; Express</p>
      </footer>
    </div>
  );
}

export default App;
