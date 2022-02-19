# Ticketing System

## Sample application using docker and kubernetes for microservices

### [Infrastructure](https://github.com/tclohm/ticketing-system/tree/main/infrastructure/k8s)
- k8s
  - auth-deply.yaml
  - ingress-srv.yaml

To start the cluster, you must be in the root directory 
and 
docker & kubernetes must be on

```sh
skaffold dev
```
### [Auth](https://github.com/tclohm/ticketing-system/tree/main/auth)
- auth
  - src
    - errors
    - middlewares
    - routes
    - index.ts
  - Dockerfile   
