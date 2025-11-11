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

// GET all tasks with sorting
router.get('/', async (req, res) => {
  try {
    const { sort = 'created_at', order = 'desc' } = req.query
    const validSortFields = ['created_at', 'priority', 'title']
    const validOrders = ['asc', 'desc']
    
    const sortField = validSortFields.includes(sort) ? sort : 'created_at'
    const sortOrder = validOrders.includes(order.toLowerCase()) ? order.toUpperCase() : 'DESC'

    const result = await pool.query(
      `SELECT * FROM tasks 
       ORDER BY 
         CASE priority 
           WHEN 'high' THEN 1 
           WHEN 'medium' THEN 2 
           WHEN 'low' THEN 3 
         END,
         ${sortField} ${sortOrder}`
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// CREATE new task with priority
router.post('/', async (req, res) => {
  try {
    const { title, priority = 'medium' } = req.body
    if (!title) {
      return res.status(400).json({ error: 'Title is required' })
    }

    const validPriorities = ['low', 'medium', 'high']
    const taskPriority = validPriorities.includes(priority) ? priority : 'medium'

    const result = await pool.query(
      'INSERT INTO tasks (title, priority) VALUES ($1, $2) RETURNING *',
      [title, taskPriority]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating task:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// UPDATE task priority
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { priority } = req.body

    const validPriorities = ['low', 'medium', 'high']
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority' })
    }

    const result = await pool.query(
      'UPDATE tasks SET priority = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [priority, id]
    )
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' })
    }
    
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error updating task:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// TOGGLE task completion
router.put('/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'UPDATE tasks SET completed = NOT completed, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
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

// DELETE task
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
    
    res.json({ message: 'Task deleted successfully', task: result.rows[0] })
  } catch (error) {
    console.error('Error deleting task:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router