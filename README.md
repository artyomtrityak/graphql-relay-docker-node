# Let's play GraphQL server
Let's play Docker GraphQL server setup

# Setup

## Get images
1. `docker pull node`
2. `docker pull postgres`


## Setup PostgreSQL server
`docker run --name db -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_USER=letsplay -e POSTGRES_DB=letsplay -d postgres`

You can connect to server
`docker exec -it db /bin/bash`
then you can connect to psql shell
`psql --dbname=letsplay --username=letsplay --password` and type `mysecretpassword` as password


## Setup Node.js server
1. `docker build -t letsplay/nodeapp:v1 .`
2. ```
> docker run --name backend -v `pwd`:/usr/src/letsplay -d -p 5000:5000 --link db:postgres letsplay/nodeapp:v1
```
3. `docker logs -f backend`

You can also stop and start backend server by this commands
`docker start backend` and `docker stop backend`


## Server access
Address depends on `docker-machine ip default`
`http://192.168.99.100:5000/`


## Query example
Address depends
`curl -XPOST -H 'Content-Type:application/graphql' -d 'query RootQueryType { user(id: "1"){ name } }' http://192.168.99.100:5000/graphql`
