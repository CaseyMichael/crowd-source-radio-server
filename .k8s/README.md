# deploy agent
kubectl apply -f deploy-agent.yml

# scale up
kubectl scale --replicas=5 deployment buildkite-agent

# delete secret
kubectl delete secret <secret-name>

# delete pod (rotate pods due to automatically being replaced)
kubectl detel pod <pod-name>