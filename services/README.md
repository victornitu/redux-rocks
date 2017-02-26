# README #

### Build the docker image ###
    docker build -t [image-name] .

### Run the container in production mode ###
    docker run -d -p [port]:8090 [image-name]

### Run the container in development mode ###
    docker run -d -p [port]:8090 -v [pwd]/src:/app/src [image-name] npm run dev

### Test the running container ###
    curl -i localhost:[port]
