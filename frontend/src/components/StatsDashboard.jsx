import React from 'react'

function StatsDashboard({ tasks }) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const pendingTasks = totalTasks - completedTasks
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const priorityCounts = {
    high: tasks.filter(task => task.priority === 'high' && !task.completed).length,
    medium: tasks.filter(task => task.priority === 'medium' && !task.completed).length,
    low: tasks.filter(task => task.priority === 'low' && !task.completed).length
  }

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      color: 'bg-blue-500',
      icon: '📋'
    },
    {
      label: 'Completed',
      value: completedTasks,
      color: 'bg-green-500',
      icon: '✅'
    },
    {
      label: 'Pending',
      value: pendingTasks,
      color: 'bg-orange-500',
      icon: '⏳'
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      color: 'bg-purple-500',
      icon: '📈'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="bg-white rounded-2xl shadow-lg p-6 border-l-4 transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1"
          style={{ borderLeftColor: stat.color.replace('bg-', '') }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
          
          {stat.label === 'Completion Rate' && totalTasks > 0 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default StatsDashboard