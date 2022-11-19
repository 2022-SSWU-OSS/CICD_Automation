node{
    def app
    stage('Clone repository'){
        git branch: 'main',
            url: 'https://github.com/2022-SSWU-OSS/CICD_Automation.git'
    }
    stage('Build image'){
        app = docker.buld("jiun17/pipeline_example")
    }
    stage('Test image'){
        app.inside{
            sh 'npm install && node app.js'
        }
    }
    stage('Push image'){
        docker.withRegistry('https://registry.hub.docker.com', 'jiun17'){
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }
}
