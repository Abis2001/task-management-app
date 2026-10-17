pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'my-docker-image:latest'
        DOCKER_NETWORK = 'task-management-network'
        FRONTEND_IMAGE = 'task-management-frontend'
        BACKEND_IMAGE = 'task-management-backend'
        MYSQL_IMAGE = 'task-management-mysql'
    }
    stages {
        stage('git clone') {
            steps {
                git branch: 'dev', url: 'https://github.com/Abis2001/task-management-app.git'
                }
            }
        stage('docker network') {
            steps {
                sh 'docker network create $DOCKER_NETWORK || true'
            }
        }
        stage('build frontend') {
            steps {
                sh 'docker build -t ${FRONTEND_IMAGE}:latest ./frontend'
            }
        }
        stage('docker build backend') {
            steps {
                sh 'docker build -t ${BACKEND_IMAGE}:latest ./Backend'
            }
        }
        stage('docker build database') {
            steps {
                sh 'docker build -t ${MYSQL_IMAGE}:latest ./db'
            }
        }
        stage('deploy frontend') {
            steps {
                sh   'docker run -d \
                        --name task-management-frontend \
                        --network "$DOCKER_NETWORK" \
                        -p 80:80 \
                        "$FRONTEND_IMAGE:latest '
            }
        }
        stage('deploybackend') {
            steps {
                sh '  docker run -d \
                        --name task-management-backend \
                        --network "$DOCKER_NETWORK" \
                        -p 3000:3000 \
                        "$BACKEND_IMAGE:latest'
             }
        }
        stage('deploy database') {
            steps {
                sh ' docker run -d \
                            --name mysql-task \
                            --network "$DOCKER_NETWORK" \
                            -e MYSQL_ROOT_PASSWORD=root \
                            -e MYSQL_DATABASE=taskdb \
                            -v dbdata:/var/lib/mysql \
                            -p 3306:3306 \
                            "$MYSQL_IMAGE:latest'
            }
        }
        stage('docker login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                }
            }
        }
        stage('docker push') {
            steps {
                sh 'docker tag ${FRONTEND_IMAGE}:latest $DOCKER_USERNAME/task-management-frontend:latest'
                sh 'docker tag ${BACKEND_IMAGE}:latest $DOCKER_USERNAME/task-management-backend:latest'
                sh 'docker tag ${MYSQL_IMAGE}:latest $DOCKER_USERNAME/task-management-mysql:latest'
                sh 'docker push $DOCKER_USERNAME/${FRONTEND_IMAGE}:latest'
                sh 'docker push $DOCKER_USERNAME/${BACKEND_IMAGE}:latest'
                sh 'docker push $DOCKER_USERNAME/${MYSQL_IMAGE}:latest'
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
            }
        failure {
            echo 'Pipeline failed!'
            }
        always {
            echo 'Pipeline finished.'
        }
    }
} 