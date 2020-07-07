node {
    def commit_id
    stage('Preparation') {
        checkout scm
        sh "git rev-parse --short HEAD > .git/commit-id"                        
        commit_id = readFile('.git/commit-id').trim()
    }
    stage('test') {
        // This is used to use Nodejs installation on Jenkins
        //  nodejs(nodeJSInstallationName: 'nodejs-12.6.0') {
        //    sh 'npm install'
        //    sh 'npm run test'
        //  }
    
        // This is used to run build pipeline commands inside a nodejs docker container
        def myTestContainer = docker.image('selenium/node-chrome')
        myTestContainer.pull()
        myTestContainer.inside {
            sh 'npm install'
            sh 'npm run test'
        }
    }
    stage('docker build/push') {
        docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
            def app = docker.build("ksgupta294/minesweeper-angular:${commit_id}", '.').push()
        }
    }
}