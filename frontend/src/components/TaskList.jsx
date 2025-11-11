import React from 'react'

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="card">
        <p>No tasks found. Add your first task!</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h3>Tasks ({tasks.length})</h3>
      {tasks.map(task => (
        <div key={task.id} className={`task-item ${task.completed ? 'task-completed' : ''}`}>
          <div>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              style={{ marginRight: '10px' }}
            />
            <span>{task.title}</span>
          </div>
          <button 
            className="btn btn-danger"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default TaskList