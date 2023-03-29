FROM node:14-alpine3.14 as development

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

RUN npm install --only=development

COPY . .

EXPOSE 4000
CMD ["yarn", "dev"]