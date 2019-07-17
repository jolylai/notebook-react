# 部署

## .gitlab-ci.yml

```yaml
variables:
  PRI_REGISTRY: docker-images.com:5000
  WEB_IMAGE: pc-web-frontend
  DOCKER_BUILDER_IMAGE: simple-erp_pc_web_frontend_builder_image
  DOCKER_BUILDER_RUNNER: simple-erp_pc_web_frontend_builder_image_runner

before_script:
  - echo "begin to run script"
  - docker login docker-images.com:5000 -u dev -p 123
after_script:
  - echo "run script end"

stages:
  - dump #导出文件
  - build #编译
  - install #安装到镜像仓库
  - deploy #自动部署

dump:master:echo:
  stage: dump
  script:
    - echo $CI_COMMIT_REF_NAME
    - echo $CI_PROJECT_NAME

web:dist:build:
  stage: build
  before_script:
    - docker stop $DOCKER_BUILDER_RUNNER && docker rm $DOCKER_BUILDER_RUNNER
  script:
    - export TAG=$CI_COMMIT_REF_NAME
    - export ENV_TAG=production
    - if [ "$CI_COMMIT_REF_NAME" == "develop" ]; then export TAG=dev; export ENV_TAG=dev; fi
    - if [ "$CI_COMMIT_REF_NAME" == "master" ]; then export TAG=qa; export ENV_TAG=qa; fi
    - echo $TAG,$ENV_TAG
    - docker build -t $DOCKER_BUILDER_IMAGE --rm --build-arg ENV_TAG=$ENV_TAG -f ./Dockerfile.build .
    - echo $DOCKER_BUILDER_RUNNER
    - docker run --name $DOCKER_BUILDER_RUNNER $DOCKER_BUILDER_IMAGE /bin/bash
    - docker cp $DOCKER_BUILDER_RUNNER:/src/app/dist ./docker/dist
    - docker build --pull -t $PRI_REGISTRY/$WEB_IMAGE:$TAG --build-arg CONT_IMG_VER=$TAG ./docker
    - docker rmi -f $DOCKER_BUILDER_IMAGE
  after_script:
    - docker stop $DOCKER_BUILDER_RUNNER && docker rm $DOCKER_BUILDER_RUNNER
    - docker images|grep none | awk '{print $3 }'|xargs docker rmi -f
  only:
    - develop
    - master
    - tags
  tags:
    - simple-erp-frontend-builder

web:dist:install:
  stage: install
  script:
    - export TAG=$CI_COMMIT_REF_NAME
    - if [ "$CI_COMMIT_REF_NAME" == "develop" ]; then export TAG=dev; fi
    - if [ "$CI_COMMIT_REF_NAME" == "master" ]; then export TAG=qa; fi
    - echo $TAG
    - docker push $PRI_REGISTRY/$WEB_IMAGE:$TAG
  only:
    - develop
    - master
    - tags
  tags:
    - simple-erp-frontend-builder

web:dist:deploy:
  stage: deploy
  variables:
    TOKEN: a296fd40fb2c4757830b6a
    PROJECT_ID: 10
  script:
    - export ENV=production
    - if [ "$CI_COMMIT_REF_NAME" == "develop" ]; then export ENV=dev; fi
    - if [ "$CI_COMMIT_REF_NAME" == "master" ]; then export ENV=qa; fi
    - echo $REF
    - curl -X POST -F token=$TOKEN -F ref=master -F variables[ENV]=$ENV -F variables[SERVICE]=pc-web-frontend http://opengit.com/api/v4/projects/$PROJECT_ID/trigger/pipeline
  only:
    - develop
    - master
```

## nginx

`docker/nginx/nginx.conf`

```nginx
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    server {
        location / {
                index  index.html;
                root   /usr/share/nginx/html/;
                location / {
                    try_files $uri $uri/ /index.html;
                }
        }
    }
    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

## Dockerfile

`docker/Dockerfile`

```Docker
FROM nginx
COPY ./dist /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/nginx.conf
ARG CONT_IMG_VER
ENV CONT_IMG_VER ${CONT_IMG_VER:-dev}
LABEL VERSION=$CONT_IMG_VER
RUN echo $CONT_IMG_VER
```

## Dockerfile.build

```Docker
FROM node

RUN npm config set registry https://registry.npm.taobao.org

RUN npm install yarn -g

Run yarn config set registry https://registry.npm.taobao.org

RUN npm install -g n

RUN n stable

RUN node -v

# Create app directory
RUN mkdir -p /src/app
WORKDIR /src/app

# to make npm test run only once non-interactively
ENV CI=true

#copy sources
COPY . /src/app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1

# Install app dependencies
RUN yarn install

ARG ENV_TAG
ENV ENV_TAG ${ENV_TAG}
RUN echo $ENV_TAG
RUN yarn run build

```
