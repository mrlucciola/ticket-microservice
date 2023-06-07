# ticket-microservice

Simple microservices demo via a full stack ticketing application

## Tools

Frontend: React, rendered server-side via Next.js
API: Next.js
Datastore: MongoDB

## Services

The 5 services in this application are:

- Auth - User authentication: login/logout/registration
- Tickets - Create/edit tickets
- Orders - Create/edit orders
- Expiration - Order lifecycle - closes orders after 15 minutes
- Payments - Credit card payments. Closes orders on success/failure.

## Resources

- User
  - email: str
  - pw: str
- Ticket
  - title: str
  - price: str
  - userId: User.id
  - orderId: Order.id
- Order
  - userId: User.id
  - ticketId: Ticket.id
  - status: "Created" | "AwaitingPayment" | "Cancelled" | "Completed"
  - dtExpiry: Date
- Charge
  - orderId: Order.id
  - status: "Created" | "Failed" | "Completed"
  - amount: number
  - stripeId: str
  - stripeRefundId: str

## Repo Initialization:

1. Install Docker Desktop
1. Enable Kubernetes (k8s) through Docker
1. Install Kubernetes Ingress-Nginx
1. Install Skaffold (from Google)

## Repo Setup:

### 1. Set up `yarn`

```sh
yarn set version berry
yarn init

# add vscode yarn support
yarn add --dev @yarnpkg/sdks
yarn sdks vscode
yarn dlx @yarnpkg/sdks vscode

# add typescript support
yarn plugin import typescript
```

### 2. Set up husky:

```sh
npx husky install
# auto enable hooks after install
npm pkg set scripts.prepare="husky install"
```

### 3. Create k8s Secret:

```sh
# create secret imperatively with command:
kubectl create secret generic <name_of_secret> --from-literal=<key_str=value_str>

# look up k8s secrets with command:
kubectl get secrets

# find pod issues r.e. env var (secret-related) with command:
kubectl describe pod <name_of_pod>
```

## ISSUES
