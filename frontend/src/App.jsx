import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TaskList from './components/TaskList'
import AddTask from './components/AddTask'
import StatsDashboard from './components/StatsDashboard'
import './index.css'

const API_URL = 'http://localhost:5000/api'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

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

  const addTask = async (title, priority = 'medium') => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, { title, priority })
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

  const updateTaskPriority = async (id, priority) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, { priority })
      setTasks(tasks.map(task => 
        task.id === id ? response.data : task
      ))
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            TaskFlow
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your workflow with beautiful task management
          </p>
        </div>

        {/* Stats Dashboard */}
        <StatsDashboard tasks={tasks} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Task Section */}
          <div className="lg:col-span-1">
            <AddTask onAdd={addTask} />
          </div>

          {/* Task List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              {/* Filter Tabs */}
              <div className="flex space-x-4 mb-6 border-b border-gray-200">
                {['all', 'pending', 'completed'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-4 py-2 rounded-t-lg font-medium transition-all duration-200 ${
                      filter === tab
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} 
                    <span className="ml-2 bg-gray-200 px-2 py-1 rounded-full text-xs">
                      {tab === 'all' ? tasks.length : 
                       tab === 'pending' ? tasks.filter(t => !t.completed).length :
                       tasks.filter(t => t.completed).length}
                    </span>
                  </button>
                ))}
              </div>

              <TaskList 
                tasks={filteredTasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onUpdatePriority={updateTaskPriority}
                filter={filter}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App