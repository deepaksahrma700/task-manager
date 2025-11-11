import React, { useState } from 'react'

function AddTask({ onAdd }) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onAdd(title.trim())
      setTitle('')
    }
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
    </div>
  )
}

export default AddTask