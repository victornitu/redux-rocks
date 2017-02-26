# README #

### Build the docker image for the build container ###
    docker build -t [image-name] .

### Run the build container ###
    docker run --name [container-name] [image-name]

### Extract the compiled application ###
    docker cp [container-name]:app/build/src build

### Remove build container ###
    docker rm [container-name]

### Build the docker image for the production container ###
_inside build folder (cd build)_

    docker build -t [image-name] .

### Run the production container ###
    docker run -d -p [port]:8080 [image-name]
