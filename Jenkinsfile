#!groovy
pipeline{
	agent any

	stages {
		stage('Build'){
			steps{
				sh 'pushd /'
				sh 'find -name "*cfc-auto-build-k8s*"'
				sh 'popd'
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
