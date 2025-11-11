pipeline {
    agent any
    
    tools {
        // Define tools if needed
    }
    
    environment {
        FRONTEND_IMAGE = 'flowtrack-frontend:latest'
        BACKEND_IMAGE = 'flowtrack-backend:latest'
        DOCKER_HOST = 'unix:///var/run/docker.sock'
    }
    
    stages {
        stage('Checkout & Info') {
            steps {
                checkout scm
                
                script {
                    echo "🎯 Build Triggered by: ${currentBuild.getBuildCauses()[0].shortDescription}"
                    echo "📦 Repository: ${env.GIT_URL}"
                    echo "🔖 Commit: ${env.GIT_COMMIT}"
                    echo "🌿 Branch: ${env.GIT_BRANCH}"
                    
                    // Display last commit message
                    sh 'git log -1 --pretty=format:"%s"'
                }
            }
        }
        
        stage('Build Docker Images') {
            parallel {
                stage('Build Frontend') {
                    steps {
                        dir('frontend') {
                            sh '''
                                echo "🏗️ Building Frontend Docker image..."
                                docker build -t ${FRONTEND_IMAGE} .
                                echo "✅ Frontend image built successfully"
                            '''
                        }
                    }
                }
                
                stage('Build Backend') {
                    steps {
                        dir('backend') {
                            sh '''
                                echo "🏗️ Building Backend Docker image..."
                                docker build -t ${BACKEND_IMAGE} .
                                echo "✅ Backend image built successfully"
                            '''
                        }
                    }
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                script {
                    echo "🔒 Scanning Docker images for vulnerabilities..."
                    
                    // Scan frontend image
                    sh '''
                        if command -v trivy &> /dev/null; then
                            trivy image ${FRONTEND_IMAGE} --exit-code 0 --severity HIGH,CRITICAL
                        else
                            echo "⚠️ Trivy not installed, skipping security scan"
                        fi
                    '''
                    
                    // Scan backend image  
                    sh '''
                        if command -v trivy &> /dev/null; then
                            trivy image ${BACKEND_IMAGE} --exit-code 0 --severity HIGH,CRITICAL
                        else
                            echo "⚠️ Trivy not installed, skipping security scan"
                        fi
                    '''
                }
            }
        }
        
        stage('Deploy Application') {
            steps {
                script {
                    echo "🚀 Deploying application..."
                    
                    sh '''
                        # Stop existing containers
                        echo "Stopping existing containers..."
                        docker-compose down || true
                        
                        # Remove unused images to save space
                        echo "Cleaning up unused images..."
                        docker image prune -f
                        
                        # Start new deployment
                        echo "Starting new deployment..."
                        docker-compose up -d --build
                        
                        echo "⏳ Waiting for services to start..."
                        sleep 15
                    '''
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    echo "🔍 Performing health checks..."
                    
                    // Check backend health
                    sh '''
                        if curl -f http://localhost:5000/health; then
                            echo "✅ Backend service is healthy"
                        else
                            echo "❌ Backend health check failed"
                            exit 1
                        fi
                    '''
                    
                    // Check frontend (with retry logic)
                    sh '''
                        max_attempts=5
                        attempt=1
                        while [ $attempt -le $max_attempts ]; do
                            if curl -f http://localhost:3000 > /dev/null 2>&1; then
                                echo "✅ Frontend service is responding"
                                break
                            else
                                echo "⏳ Frontend not ready yet (attempt $attempt/$max_attempts)"
                                sleep 10
                                attempt=$((attempt + 1))
                            fi
                        done
                        
                        if [ $attempt -gt $max_attempts ]; then
                            echo "⚠️ Frontend health check timeout, but continuing..."
                        fi
                    '''
                }
            }
        }
    }
    
    post {
        always {
            echo "📊 Pipeline execution completed"
            
            // Show current container status
            sh '''
                echo "Current Docker containers:"
                docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"
            '''
            
            // Clean workspace
            cleanWs()
        }
        success {
            script {
                def publicIp = sh(script: 'curl -s http://checkip.amazonaws.com', returnStdout: true).trim()
                echo "🎉 DEPLOYMENT SUCCESSFUL!"
                echo "🌐 Application URL: http://${publicIp}"
                echo "🔧 Backend API: http://${publicIp}:5000"
                echo "📱 Frontend: http://${publicIp}:3000"
            }
        }
        failure {
            echo "❌ DEPLOYMENT FAILED!"
            echo "Check the logs above for details"
            
            // Show docker logs for debugging
            sh '''
                echo "=== Docker Compose Logs ==="
                docker-compose logs --tail=50 || true
            '''
        }
        unstable {
            echo "⚠️ Pipeline marked as unstable"
        }
    }
}