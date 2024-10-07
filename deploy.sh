
# Start minikube
minikube start

# Apply deployment and service configuration for the Angular app
echo "Deploying Angular app..."
kubectl apply -f ./sample-app-angular/deployment.yaml
kubectl apply -f ./sample-app-angular/service.yaml

# Apply deployment and service configuration for the backend
echo "Deploying Backend app..."
kubectl apply -f ./sample-app-server/deployment.yaml
kubectl apply -f ./sample-app-server/service.yaml

# Check deployments
kubectl get deployments

# Check services
kubectl get svc

# Check pods
kubectl get pod

# Port forwarding
kubectl port-forward svc/backend 3000:3000 --address 0.0.0.0 &
kubectl port-forward svc/angular-app 4200:4200 --address 0.0.0.0 &

echo "All services deployed and port-forwarding setup!"
