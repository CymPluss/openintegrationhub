FROM node:8.16.1-alpine
LABEL NAME="meta-data-repository"
ARG local

ADD package.json /tmp/package.json
RUN apk --no-cache add \
    python \
    make \
    tar \
    g++ \
    libc6-compat
RUN if [ "$local" == "true" ]; \
    then cd /tmp && yarn ; \
    else cd /tmp && yarn --production ; \
    fi 
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN ln -s /tmp/node_modules /usr/src/app/ && chown -R 1000:1000 /usr/src/app
# just for start
USER node

CMD yarn -s start
