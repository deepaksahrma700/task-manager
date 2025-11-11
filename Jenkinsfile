pipeline {
    agent any
    
    environment {
        FRONTEND_IMAGE = 'flowtrack-frontend:latest'
        BACKEND_IMAGE = 'flowtrack-backend:latest'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    echo "🚀 Triggered by: ${currentBuild.getBuildCauses()[0].shortDescription}"
                    echo "📦 Commit: ${env.GIT_COMMIT}"
                    echo "🌿 Branch: ${env.GIT_BRANCH}"
                    
                    // Show commit details
                    sh '''
                        echo "Last commit message:"
                        git log -1 --pretty=%B
                        echo "Committer:"
                        git log -1 --pretty=%an
                    '''
                }
            }
        }
        
        stage('Build & Deploy') {
            parallel {
                stage('Build Frontend') {
                    steps {
                        dir('frontend') {
                            sh 'docker build -t ${FRONTEND_IMAGE} .'
                        }
                    }
                }
                stage('Build Backend') {
                    steps {
                        dir('backend') {
                            sh 'docker build -t ${BACKEND_IMAGE} .'
                        }
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    echo "🚀 Deploying application..."
                    sh '''
                        # Stop old containers
                        docker-compose down || true
                        
                        # Start new deployment
                        docker-compose up -d
                        
                        # Wait for services
                        sleep 25
                    '''
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    echo "🔍 Running health checks..."
                    sh '''
                        # Check all containers are running
                        echo "📊 Container Status:"
                        docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"
                        
                        # Test backend API
                        echo "🔧 Testing backend..."
                        if curl -f http://localhost:5000/health; then
                            echo "✅ Backend is healthy"
                        else
                            echo "❌ Backend health check failed"
                            exit 1
                        fi
                        
                        # Test frontend
                        echo "🌐 Testing frontend..."
                        if curl -f http://localhost:3000 > /dev/null 2>&1; then
                            echo "✅ Frontend is responding"
                        else
                            echo "⚠️ Frontend check failed (might be still starting)"
                        fi
                    '''
                }
            }
        }
    }
    
    post {
        always {
            echo "🏁 Pipeline finished: ${currentBuild.result}"
            cleanWs()
        }
        success {
            script {
                def ip = sh(script: 'curl -s http://checkip.amazonaws.com', returnStdout: true).trim()
                echo "🎉 DEPLOYMENT SUCCESSFUL!"
                echo "📍 Application URLs:"
                echo "   Frontend: http://${ip}:3000"
                echo "   Backend API: http://${ip}:5000"
                echo "   Health Check: http://${ip}:5000/health"
            }
        }
        failure {
            echo "💥 DEPLOYMENT FAILED!"
            sh '''
                echo "=== Debug Information ==="
                echo "Docker containers:"
                docker ps -a
                echo "Recent logs:"
                docker-compose logs --tail=20
            '''
        }
    }
}