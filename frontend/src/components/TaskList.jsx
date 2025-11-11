import React from 'react'

function TaskList({ tasks, onToggle, onDelete, onUpdatePriority, filter }) {
  const priorityIcons = {
    low: '🟢',
    medium: '🟡', 
    high: '🔴'
  }

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-red-600' }
  ]

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          {filter === 'completed' 
            ? 'No completed tasks yet'
            : filter === 'pending'
            ? 'No pending tasks'
            : 'No tasks yet'
          }
        </h3>
        <p className="text-gray-500">
          {filter === 'all' ? 'Create your first task to get started!' : 'Tasks will appear here'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`group flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
            task.completed
              ? 'bg-green-50 border-green-200'
              : 'bg-white border-gray-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center space-x-4 flex-1">
            <button
              onClick={() => onToggle(task.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                task.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
              }`}
            >
              {task.completed && '✓'}
            </button>

            <div className="flex-1 min-w-0">
              <p className={`text-lg font-medium transition-all duration-200 ${
                task.completed
                  ? 'text-gray-500 line-through'
                  : 'text-gray-800'
              }`}>
                {task.title}
              </p>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-sm text-gray-500">
                  {priorityIcons[task.priority]} {task.priority}
                </span>
                <span className="text-sm text-gray-400">
                  {new Date(task.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {/* Priority Selector */}
            <select
              value={task.priority}
              onChange={(e) => onUpdatePriority(task.id, e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-2 py-1 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {priorityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
              title="Delete task"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList