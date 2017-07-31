#!groovy
pipeline{
	agent any

	stages {
		stage('Build'){
			steps{
				sh 'cfc-auto-build-k8s saveoryfrontend .'
			}
		}

		stage('Deploy'){
			steps{
				sh 'cfc-auto-deploy-k8s	./deploy.yaml'
			}
		}
	}
}
