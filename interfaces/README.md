# README #

### Build the docker image for the build container ###

_**/interfaces>_ docker build -t [**image-name**] .

### Run the build container ###

_**/interfaces>_ docker run --name [**container-name**] [**image-name**]

### Extract the compiled application ###

_**/interfaces>_ docker cp [**container-name**]:app/build/src build

### Remove build container ###

_**/interfaces>_ docker rm [**container-name**]

### Build the docker image for the production container ###

_**/interfaces>_ cd build

_**/interfaces/build>_ docker build -t [**image-name**] .

### Run the production container ###

_**/interfaces/build>_ docker run -d -p [**port**]:8080 [**image-name**]
