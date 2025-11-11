import express from 'express'
import cors from 'cors'
import taskRoutes from './routes/tasks.js'
import statsRoutes from './routes/stats.js'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/tasks', taskRoutes)
app.use('/api/stats', statsRoutes)

// Enhanced health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'TaskFlow API',
    version: '2.0.0'
  })
})

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚀 TaskFlow API Server is running!',
    version: '2.0.0',
    endpoints: {
      tasks: '/api/tasks',
      stats: '/api/stats',
      health: '/health'
    }
  })
})

app.listen(PORT, () => {
  console.log(`🎯 TaskFlow Server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🚀 API ready: http://localhost:${PORT}/api`)
})