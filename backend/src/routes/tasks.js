import express from 'express'
import pkg from 'pg'
const { Pool } = pkg

const router = express.Router()

// Database connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'taskdb',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
})

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks ORDER BY created_at DESC'
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Create new task
router.post('/', async (req, res) => {
  try {
    const { title } = req.body
    if (!title) {
      return res.status(400).json({ error: 'Title is required' })
    }

    const result = await pool.query(
      'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
      [title]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating task:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Toggle task completion
router.put('/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *',
      [id]
    )
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' })
    }
    
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error toggling task:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    )
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' })
    }
    
    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error('Error deleting task:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router