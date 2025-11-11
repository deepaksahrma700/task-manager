-- Drop existing table if it exists (for clean migration)
DROP TABLE IF EXISTS tasks;

-- Enhanced tasks table with priority
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data with priorities
INSERT INTO tasks (title, priority, completed) VALUES 
('Learn React and build amazing UIs', 'high', true),
('Deploy application to production', 'high', false),
('Write documentation for the project', 'medium', false),
('Set up CI/CD pipeline with Jenkins', 'high', true),
('Create responsive design for mobile', 'medium', false),
('Add user authentication system', 'low', false),
('Optimize database queries', 'medium', false),
('Write unit tests for backend', 'low', false);

-- Create indexes for better performance
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_completed ON tasks(completed);
CREATE INDEX idx_tasks_created_at ON tasks(created_at);