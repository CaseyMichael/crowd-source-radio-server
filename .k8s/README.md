# deploy agent
kubectl apply -f deploy-agent.yml

# scale up
kubectl scale --replicas=5 deployment buildkite-agent

# create new secret
