# Ticketing System

## Sample application using docker and kubernetes for microservices

### Stack
Express & MongoDB
(Mongoose used to connect and interact with MongoDB)

### [Infrastructure](https://github.com/tclohm/ticketing-system/tree/main/infrastructure/k8s)
- k8s/
  - auth-deply.yaml
  - auth-mongo-depl.yaml
  - ingress-srv.yaml

To start the cluster, you must be in the root directory 
and 
docker & kubernetes must be on

```sh
skaffold dev
```
### [Auth](https://github.com/tclohm/ticketing-system/tree/main/auth)
- auth/
  - src/
    - errors/
    - middlewares/
    - models/
    - routes/
      - __test__/
    - services/
    - test/
    - index
  - Dockerfile

### [Client](https://github.com/tclohm/ticketing-system/tree/main/client) -- next.js
- client/
  - api/
  - components/
  - hooks/
  - pages/
      - auth/
      - _app
      - index
  - Dockerfile   
### [Common](https://npm.com/tclohm/@eventspaceticketing/common) -- third party package resources and auth
### [Tickets](https://github.com/tclohm/ticketing-system/tree/main/tickets)
- tickets/
  - src/
    - models/
    - routes/
      - __test__/
    - test/
    - app
    - index
  - Dockerfile

You must create kubernetes secret with JWT for auth to work between microservices
environment variable set in infrastructure/k8s/\*-depls.yaml

