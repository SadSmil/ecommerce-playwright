pipeline {
    agent any

    tools {
        nodejs 'NodeJS-22'
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Check Docker') {
            steps {
                sh 'docker --version'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'playwright-email',
                        variable: 'VALID_USER_EMAIL'
                    ),
                    string(
                        credentialsId: 'playwright-password',
                        variable: 'VALID_USER_PASSWORD'
                    ),
                    string(
                        credentialsId: 'playwright-BASE_URL',
                        variable: 'BASE_URL'
                    )
                ]) {
                    sh '''
                    docker run --rm \
                      -v "$PWD:/work" \
                      -w /work \
                      -e VALID_USER_EMAIL \
                      -e VALID_USER_PASSWORD \
                      -e BASE_URL \
                      mcr.microsoft.com/playwright:v1.55.0-noble \
                      npx playwright test --project=chromium
                    '''
                }
            }
        }
    }

    post {
        always {

            archiveArtifacts artifacts: 'playwright-report/**',
                             allowEmptyArchive: true

            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            ])
        }
    }
}