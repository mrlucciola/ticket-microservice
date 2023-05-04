# ticket-microservice

Simple microservices demo via a full stack ticketing application

## Repo initialization:

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
