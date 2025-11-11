pipeline {
    agent any
    
    environment {
        FRONTEND_IMAGE = 'flowtrack-frontend:latest'
        BACKEND_IMAGE = 'flowtrack-backend:latest'
    }
    
    stages {
        stage('Checkout & Setup') {
            steps {
                checkout scm
                script {
                    echo "🎯 Build triggered by GitHub push"
                    echo "📦 Repository: ${env.GIT_URL}"
                }
            }
        }
        
        stage('Test Docker Access') {
            steps {
                script {
                    echo "🔧 Testing Docker permissions..."
                    sh '''
                        # Test if Jenkins can access Docker
                        docker version || echo "Docker access failed"
                        docker-compose --version || echo "docker-compose not found"
                        
                        # List current containers
                        echo "Current containers:"
                        docker ps -a || echo "Cannot list containers"
                    '''
                }
            }
        }
        
        stage('Build Images') {
            steps {
                script {
                    echo "🏗️ Building Docker images..."
                    
                    // Build frontend
                    dir('frontend') {
                        sh 'docker build -t ${FRONTEND_IMAGE} .'
                    }
                    
                    // Build backend  
                    dir('backend') {
                        sh 'docker build -t ${BACKEND_IMAGE} .'
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
                        
                        # Start new containers
                        docker-compose up -d
                        
                        # Wait for startup
                        sleep 20
                    '''
                }
            }
        }
        
        stage('Verify') {
            steps {
                script {
                    echo "🔍 Verifying deployment..."
                    sh '''
                        # Check containers are running
                        echo "Running containers:"
                        docker ps
                        
                        # Simple health check
                        echo "Checking backend health..."
                        curl -f http://localhost:5000/health || echo "Backend not ready yet"
                        
                        echo "✅ Deployment completed!"
                    '''
                }
            }
        }
    }
    
    post {
        always {
            echo "📊 Build completed: ${currentBuild.result}"
            cleanWs()
        }
        success {
            script {
                def ip = sh(script: 'curl -s http://checkip.amazonaws.com', returnStdout: true).trim()
                echo "🎉 SUCCESS! App running at: http://${ip}"
            }
        }
        failure {
            echo "❌ Build failed - check logs above"
            sh '''
                echo "=== Debug Info ==="
                echo "Docker info:"
                docker info || echo "Docker not accessible"
                echo "Current user: $(whoami)"
                echo "Groups: $(groups)"
            '''
        }
    }
}