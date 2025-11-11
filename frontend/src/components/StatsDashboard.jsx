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
          className="glass rounded-2xl shadow-2xl p-6 border-l-4 transition-all duration-300 hover:shadow-2xl hover:transform hover:-translate-y-2 animate-scaleIn hover-lift"
          style={{ 
            borderLeftColor: stat.color.replace('bg-', ''),
            animationDelay: `${index * 0.1}s`
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.label}</p>
              <p className="text-4xl font-bold text-gray-800 mt-2 gradient-text">{stat.value}</p>
            </div>
            <div className="text-4xl animate-pulse">{stat.icon}</div>
          </div>
          
          {stat.label === 'Completion Rate' && totalTasks > 0 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
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