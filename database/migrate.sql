-- Migration script to add missing columns to existing tasks table

-- Add priority column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='tasks' AND column_name='priority') THEN
        ALTER TABLE tasks ADD COLUMN priority VARCHAR(20) DEFAULT 'medium' 
        CHECK (priority IN ('low', 'medium', 'high'));
    END IF;
END $$;

-- Add description column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='tasks' AND column_name='description') THEN
        ALTER TABLE tasks ADD COLUMN description TEXT;
    END IF;
END $$;

-- Update existing tasks to have medium priority if NULL
UPDATE tasks SET priority = 'medium' WHERE priority IS NULL;

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at);

-- Display the updated table structure
\d tasks
