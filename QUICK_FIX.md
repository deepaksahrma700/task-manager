# 🔧 Quick Fix Guide

## Problem Identified

Your database table is missing the `priority` and `description` columns that the backend expects.

**Error:** `code: '42703'` - Column does not exist

## 🚀 Solution (Choose One)

### Option 1: Quick Migration (Keeps Existing Data)

Run this command to add the missing columns:

```bash
docker exec -i task-manager-cicd-db-1 psql -U postgres -d taskdb < database/migrate.sql
```

Or use the script:
```bash
# Linux/Mac
bash fix-database.sh

# Windows
fix-database.bat
```

### Option 2: Fresh Start (Recommended - Clean Database)

1. Stop and remove containers with volumes:
```bash
docker-compose down -v
```

2. Start fresh:
```bash
docker-compose up -d
```

This will recreate the database with the correct schema.

## ✅ Verify the Fix

1. Check table structure:
```bash
docker exec task-manager-cicd-db-1 psql -U postgres -d taskdb -c "\d tasks"
```

You should see:
- ✅ id
- ✅ title
- ✅ description (NEW)
- ✅ priority (NEW)
- ✅ completed
- ✅ created_at
- ✅ updated_at

2. Test the API:
```bash
curl http://localhost:5000/api/tasks
```

Should return tasks with priority field.

3. Test frontend:
```bash
curl http://localhost:3000
```

## 📋 What Was Fixed

### Before (Missing Columns):
```sql
- id
- title
- completed
- created_at
- updated_at
```

### After (Complete Schema):
```sql
- id
- title
- description ✨ NEW
- priority ✨ NEW (low/medium/high)
- completed
- created_at
- updated_at
```

## 🎯 Why This Happened

The database was created before the priority feature was added to the code. The `init.sql` file has the correct schema, but since the table already existed with `CREATE TABLE IF NOT EXISTS`, it didn't update the structure.

## 🔍 Current Status

After running the fix:
- ✅ Database schema matches backend expectations
- ✅ All API endpoints will work
- ✅ Frontend can display priorities
- ✅ No more "column does not exist" errors

## 💡 Prevention

For future schema changes:
1. Use migration scripts (like `migrate.sql`)
2. Or use `docker-compose down -v` to reset database
3. Consider using a migration tool like Flyway or Liquibase for production
