import express from 'express'
import pkg from 'pg'
const { Pool } = pkg

const router = express.Router()

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'taskdb',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432'),
})

// GET dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    const tasksResult = await pool.query(`
      SELECT 
        COUNT(*) as total_tasks,
        COUNT(*) FILTER (WHERE completed = true) as completed_tasks,
        COUNT(*) FILTER (WHERE completed = false) as pending_tasks,
        ROUND(
          (COUNT(*) FILTER (WHERE completed = true) * 100.0 / NULLIF(COUNT(*), 0)
        ), 2) as completion_rate
      FROM tasks
    `)

    const priorityResult = await pool.query(`
      SELECT 
        priority,
        COUNT(*) as count
      FROM tasks 
      WHERE completed = false
      GROUP BY priority
      ORDER BY 
        CASE priority 
          WHEN 'high' THEN 1 
          WHEN 'medium' THEN 2 
          WHEN 'low' THEN 3 
        END
    `)

    const recentTasks = await pool.query(`
      SELECT * FROM tasks 
      ORDER BY created_at DESC 
      LIMIT 5
    `)

    res.json({
      overview: tasksResult.rows[0],
      priorities: priorityResult.rows,
      recentTasks: recentTasks.rows
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
