# Let's play GraphQL server

## Docker run
1. `docker-machine ip default` // prints docker ip address
2. `docker build -t letsplay/nodeapp:v1 .` // builds local image
3. `docker run --name backend -v `pwd`:/usr/src/letsplay -d -p 5000:5000 letsplay/nodeapp:v1` // runs server
4. `docker logs -f backend` // view server stdout

You can also stop and start backend server by this commands

`docker start backend`
`docker stop backend`

## Server access
`http://192.168.99.100:5000/` // it depends on Docker run step 1

## Query example
curl -XPOST -H 'Content-Type:application/graphql' -d 'query RootQueryType { user(id: "1"){ name } }' http://192.168.99.100:5000/graphql
