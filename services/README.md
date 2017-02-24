# README #

### Build the docker image ###

_**/services>_ docker build -t [**image-name**] .

### Run the container in production mode ###

_**/services>_ docker run -d -p [**port**]:8080 [**image-name**]

### Run the container in development mode ###

_**/services>_ docker run -d -p [**port**]:8080 -v $(pwd)/src:/app/src [**image-name**] npm run dev

### Test the running container ###

_**/services>_ curl -i localhost:[**port**]