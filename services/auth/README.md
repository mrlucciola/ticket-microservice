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
curl -k -d '{"email":"test@mail.com", "password":"testpassword"}' \
  -H "Content-Type: application/json" \
  -X POST https://ticketing.docker/api/users/register \
  -c ./_hidden/hidden-cookie.txt
curl -k -d '{"email":"testacct2@mailprovider.net", "password":"testpassword"}' \
  -H "Content-Type: application/json" \
  -X POST https://ticketing.docker/api/users/register \
  -c ./_hidden/hidden-cookie.txt
```

## ISSUES
