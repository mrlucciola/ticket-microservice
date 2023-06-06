# Authorization and Authentication Service

## Auth mechanism

### Requirements

1. Display user details
1. Handle authorization, authentication, and authorized requests
1. Handle invalidation using built-in methods
   - asdf
1. Interoperable across **all** components - service, system & language agnostic
1. Isolated - all data must be stored and manipulated within the `auth` service
1. No backend datastore for storing auth session info

These requirements suggest that JWT (**J**SON **W**eb **T**oken)

#### Sending a request

```sh
curl -d '{"email":"test@mail.com", "password":"testpassword"}' \
  -H "Content-Type: application/json" \
  -X POST http://ticketing.docker/api/users/register \
  -c ./hidden-cookie.txt
```

## ISSUES

1. Currently dealing with an issue regarding sending multiple `register` requests:

Multiple calls to the `auth` service, regardless of the `email` (and/or password) field (example below) -

```sh
curl -d '{"email":"test@mail.com", "password":"testpassword"}' \
  -H "Content-Type: application/json" \
  -X POST http://ticketing.docker/api/users/register \
  -c ./hidden-cookie.txt

curl -d '{"email":"test2@anothermailprovider.org", "password":"testpassword"}' \
  -H "Content-Type: application/json" \
  -X POST http://ticketing.docker/api/users/register \
  -c ./hidden-cookie.txt
```

cause the `auth` service to panic and exit (crash)

2. JWT in cookie response is not returned from `register` request (via `curl`)
