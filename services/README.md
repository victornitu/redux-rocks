# README #

### How to build the docker image ###

docker build -t <image-name> .

### How to run the container in production mode ###

docker run -d -p <mapped-port>:8080 <image-name>

### How to run the container in development mode ###

docker run -d -p <mapped-port>:8080 -v $(pwd)/src:/app/src <image-name> npm run dev

### How to test the running container ###

curl -i localhost:<selected-port>