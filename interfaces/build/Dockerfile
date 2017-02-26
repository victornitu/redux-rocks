FROM nginx

RUN mkdir -p /app/src
WORKDIR /app

COPY index.html /app
COPY src /app/src
COPY nginx.conf /etc/nginx/
