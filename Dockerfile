FROM node:21

WORKDIR /app
COPY . .
RUN yarn install \
&& yarn build \
&& rm -rf node_modules \
&& yarn install --production
CMD [ "yarn", "start" ]