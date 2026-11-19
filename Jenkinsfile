pipeline {
    agent any 

    tools {
      
    }

    environment {
       
    }

    stages {
        stage('Checkout') {
            steps {
                
                checkout scm
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm ci' 
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') { 
                    sh 'npm ci'
                }
            }
        }

        stage('Lint & Test Backend') {
            steps {
                dir('backend') {
                    sh 'npm run lint'
                   
                }
            }
        }

        stage('Lint & Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run lint'
                    sh 'npm run build' 
                }
            }
        }
    }

    post {
        always {
           
            echo 'Pipeline finished'
        }
        success {
            echo 'Build succeeded'
        }
        failure {
            echo 'Build failed'
        }
    }
}