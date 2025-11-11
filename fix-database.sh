#!/bin/bash

echo "🔧 Fixing database schema..."

# Run migration script
docker exec -i task-manager-cicd-db-1 psql -U postgres -d taskdb < database/migrate.sql

echo ""
echo "✅ Migration complete!"
echo ""
echo "📊 Checking table structure:"
docker exec task-manager-cicd-db-1 psql -U postgres -d taskdb -c "\d tasks"

echo ""
echo "📋 Current tasks:"
docker exec task-manager-cicd-db-1 psql -U postgres -d taskdb -c "SELECT id, title, priority, completed FROM tasks;"

echo ""
echo "🧪 Testing API:"
curl http://localhost:5000/api/tasks

echo ""
echo "✨ Done! Your database is now fixed."
