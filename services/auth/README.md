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
########################## REGISTER (below) ##########################
COOKIE_PATH=_hidden/hidden-cookie.txt

curl -k -d '{"email":"test@mail.com", "password":"testpassword"}' \
  -H "Content-Type: application/json" \
  -X POST https://ticketing.docker/api/users/register \
  -c $COOKIE_PATH && \
  echo "\nsession="$(awk -F"session\t" 'BEGIN{ORS=""}{ print $2 }' $COOKIE_PATH)

########################## REGISTER (above) ##########################

########################### LOGIN (below) ############################
# cookie is stored in shell var here
# pass
curl -k -d '{"email":"test@mail.com", "password":"testpassword"}' \
  -H "Content-Type: application/json" \
  -X POST https://ticketing.docker/api/users/login \
  -c $COOKIE_PATH && \
  echo "\nsession="$(awk -F"session\t" 'BEGIN{ORS=""}{ print $2 }' $COOKIE_PATH)

# fail - validation - empty password
curl -k -d '{"email":"test@mail.com", "password":""}' \
  -H "Content-Type: application/json" \
  -X POST https://ticketing.docker/api/users/login \
  -c $COOKIE_PATH && \
  echo "\n"$(awk -F"session\t" 'BEGIN{ORS=""}{ print $2 }' $COOKIE_PATH)

# fail - validation - invalid email
curl -k -d '{"email":"not_an_email", "password":"testpassword"}' \
  -H "Content-Type: application/json" \
  -X POST https://ticketing.docker/api/users/login \
  -c $COOKIE_PATH

########################### LOGIN (above) ############################

######################## CURRENTUSER (below) #########################
COOKIE=$(awk -F"session\t" 'BEGIN{ORS=""}{ print $2 }' $COOKIE_PATH) && \
  curl -k \
  -H "Content-Type: application/json" \
  -X GET https://ticketing.docker/api/users/currentuser \
  --cookie "session=$COOKIE" && \
  echo "\nsession="$COOKIE

######################## CURRENTUSER (above) #########################

########################### LOGOUT (below) ###########################
curl -k \
  -H "Content-Type: application/json" \
  -X POST https://ticketing.docker/api/users/logout \
  -c $COOKIE_PATH && \
  echo "\nsession="$(awk -F"session\t" 'BEGIN{ORS=""}{ print $2 }' $COOKIE_PATH)

########################### LOGOUT (above) ###########################

```

## ISSUES
