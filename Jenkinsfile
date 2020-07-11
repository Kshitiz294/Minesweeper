node {
    def commit_id
    // config 
    def to = emailextrecipients([
            [$class: 'CulpritsRecipientProvider'],
            [$class: 'DevelopersRecipientProvider'],
            [$class: 'RequesterRecipientProvider']
    ])
    

    // job
    try {
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
            // Working docker image: cronn/nodejs-chrome-firefox:lts_chrome
            def myTestContainer = docker.image('ksgupta294/nodejs-chrome:test')
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
        stage('Declare Success') {
            // mark build as failed
            currentBuild.result = "SUCCESS";
            // set variables
            def subject = "${env.JOB_NAME} - Build #${env.BUILD_NUMBER} ${currentBuild.result}"
            def content = '${JELLY_SCRIPT,template="html"}'

            // send email
            emailext(body: content, mimeType: 'text/html',
                replyTo: '$DEFAULT_REPLYTO', subject: subject,
                to: '$DEFAULT_RECIPIENTS', attachLog: true )


            // send slack notification
            slackSend (color: '#00FF00', message: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
        }
    } catch (e) {
        // mark build as failed
        currentBuild.result = "FAILURE";
        // set variables
        def subject = "${env.JOB_NAME} - Build #${env.BUILD_NUMBER} ${currentBuild.result}"
        def content = '${JELLY_SCRIPT,template="html"}'

        // send email
        emailext(body: content, mimeType: 'text/html',
            replyTo: '$DEFAULT_REPLYTO', subject: subject,
            to: '$DEFAULT_RECIPIENTS', attachLog: true )



        // send slack notification
        slackSend (color: '#FF0000', message: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")


        // mark current build as a failure and throw the error
        throw e;
    }
}