import React, { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import AddTask from './components/AddTask'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`)
      setTasks(response.data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTask = async (title) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, { title })
      setTasks([...tasks, response.data])
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const toggleTask = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}/toggle`)
      setTasks(tasks.map(task => 
        task.id === id ? response.data : task
      ))
    } catch (error) {
      console.error('Error toggling task:', error)
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`)
      setTasks(tasks.filter(task => task.id !== id))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  if (loading) {
    return <div className="container">Loading...</div>
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Task Manager</h1>
        <p>Simple task management application</p>
      </div>

      <AddTask onAdd={addTask} />
      <TaskList 
        tasks={tasks} 
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  )
}

export default App