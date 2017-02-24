FROM nginx

RUN mkdir /app
WORKDIR /app

COPY index.html /app
COPY src /app
COPY nginx.conf /etc/nginx/
