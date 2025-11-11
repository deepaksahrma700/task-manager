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
      <div className="text-center py-16 animate-fadeIn">
        <div className="text-7xl mb-6 animate-pulse">📝</div>
        <h3 className="text-2xl font-bold text-gray-700 mb-3">
          {filter === 'completed' 
            ? 'No completed tasks yet'
            : filter === 'pending'
            ? 'No pending tasks'
            : 'No tasks yet'
          }
        </h3>
        <p className="text-gray-500 text-lg">
          {filter === 'all' ? 'Create your first task to get started! ✨' : 'Tasks will appear here'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`group flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-xl task-enter hover-lift ${
            task.completed
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
              : 'glass border-gray-200 hover:border-blue-400'
          }`}
        >
          <div className="flex items-center space-x-4 flex-1">
            <button
              onClick={() => onToggle(task.id)}
              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                task.completed
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-500 text-white shadow-lg'
                  : 'border-gray-300 hover:border-green-500 hover:bg-green-50 hover:shadow-md'
              }`}
            >
              {task.completed && <span className="text-lg">✓</span>}
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
              className="text-sm border-2 border-gray-300 rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer hover:border-blue-400"
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
              className="p-2 text-red-500 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 rounded-lg transition-all duration-200 transform hover:scale-110"
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