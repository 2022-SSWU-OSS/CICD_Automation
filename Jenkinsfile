pipeline{
    agent any
    environment{
        PROJECT_ID = 'opensource-sw'
        CLUSTER_NAME = 'k8s'
        LOCATION = 'asia-northeast3-a'
        CREDENTIALS_ID = 'gke'
    }
    stages{
        stage('Checkout code'){
            steps{
                checkout scm
            }
        }
        stage('Build image'){
            steps{
                script{
                    app = docker.build("jiun17/pipeline_example")
                }
            }
        }
        stage('Push image'){
            when{
                branch 'main'
            }
            steps{
                script{
                    docker.withRegistry('https://registry.hub.docker.com', 'jiun17'){
                        app.push("${env.BUILD_ID}")
                        app.push("latest")
                    }
                }
            }
        }
        stage('Deploy to GKE'){
            when{
                branch 'main'
            }
            steps{
                sh "sed -i 's/pipeline_example:latest/pipeline_example:${env.BUILD_ID}/g' deploy.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'deploy.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            }
        }
    }
}
