# 🚀 TaskFlow - Beautiful Task Manager

A modern, full-stack task management application with a beautiful UI, built with React, Node.js, Express, and PostgreSQL.

## ✨ Features

- 📝 Create, read, update, and delete tasks
- 🎯 Priority levels (Low, Medium, High)
- ✅ Mark tasks as complete/incomplete
- 📊 Real-time statistics dashboard
- 🎨 Beautiful gradient UI with smooth animations
- 🔍 Filter tasks by status (All, Pending, Completed)
- 🐳 Fully Dockerized for easy deployment

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- Axios
- Tailwind CSS (via CDN)
- Custom CSS animations

**Backend:**
- Node.js
- Express
- PostgreSQL
- pg (node-postgres)

**DevOps:**
- Docker & Docker Compose
- Jenkins CI/CD

## 📋 Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development)
- PostgreSQL 15+ (for local development)

## 🚀 Quick Start

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone <your-repo-url>
cd task-manager
```

2. Start all services:
```bash
docker-compose up -d
```

3. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/health

4. Stop the services:
```bash
docker-compose down
```

### Local Development

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Database:**
```bash
# Run PostgreSQL locally or use Docker:
docker run -d \
  --name taskdb \
  -e POSTGRES_DB=taskdb \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  postgres:15-alpine
```

## 📁 Project Structure

```
task-manager/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskList.jsx
│   │   │   ├── AddTask.jsx
│   │   │   └── StatsDashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── tasks.js
│   │   │   └── stats.js
│   │   └── server.js
│   ├── package.json
│   └── Dockerfile
├── database/
│   └── init.sql
├── docker-compose.yml
├── Jenkinsfile
└── README.md
```

## 🔌 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update task priority
- `PUT /api/tasks/:id/toggle` - Toggle task completion
- `DELETE /api/tasks/:id` - Delete a task

### Stats
- `GET /api/stats/dashboard` - Get dashboard statistics

### Health
- `GET /health` - Health check endpoint

## 🎨 UI Features

- **Gradient Background**: Beautiful purple-blue gradient with animated particles
- **Glass Morphism**: Modern frosted glass effect on cards
- **Smooth Animations**: Slide-in, fade-in, and hover effects
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Interactive Elements**: Hover effects, button ripples, and transitions
- **Priority Colors**: Visual indicators for task priorities
- **Empty States**: Friendly messages when no tasks exist

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
DB_HOST=db
DB_PORT=5432
DB_NAME=taskdb
DB_USER=postgres
DB_PASSWORD=password
PORT=5000
```

**Frontend:**
The frontend uses Vite's environment variables. For production, update the API URL in `frontend/src/App.jsx`.

## 🐳 Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Remove volumes (clean database)
docker-compose down -v

# Rebuild specific service
docker-compose build frontend
docker-compose build backend
```

## 🧪 Testing

```bash
# Test backend health
curl http://localhost:5000/health

# Test frontend
curl -I http://localhost:3000

# View logs
docker logs task-manager-frontend-1 --tail 50
docker logs task-manager-backend-1 --tail 50
docker logs task-manager-db-1 --tail 50
```

## 🚨 Troubleshooting

### Frontend can't connect to backend
- Make sure both services are running: `docker-compose ps`
- Check backend logs: `docker logs task-manager-backend-1`
- Verify backend is accessible: `curl http://localhost:5000/health`

### Database connection issues
- Check if database is running: `docker-compose ps db`
- View database logs: `docker logs task-manager-db-1`
- Verify credentials in docker-compose.yml

### Port already in use
- Change ports in docker-compose.yml
- Or stop the conflicting service

## 📝 License

MIT License - feel free to use this project for learning or production!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

Built with ❤️ using modern web technologies
