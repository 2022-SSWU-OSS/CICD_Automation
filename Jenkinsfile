node{
    def app
    stage('Clone repository'){
        git branch: 'main',
            url: 'https://github.com/2022-SSWU-OSS/CICD_Automation.git'
    }
    stage('Build image'){
        app = docker.build("jiun17/pipeline_example")
    }
    stage('Test image'){
        app.inside{
        }
    }
    stage('Push image'){
        if(env.BRANCH_NAME == 'main') {
            docker.withRegistry('https://registry.hub.docker.com', 'jiun17'){
                app.push("${env.BUILD_NUMBER}")
                app.push("latest")
            }
        }
    }
}
