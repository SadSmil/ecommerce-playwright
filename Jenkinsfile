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

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install chromium'
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
                    )
                ]) {
                    sh 'npx playwright test --project=chromium'
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