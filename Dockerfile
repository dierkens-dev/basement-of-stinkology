# Production Dependencies
FROM node:18.13.0 as dependencies
WORKDIR /dependencies

COPY package.json ./
COPY yarn.lock ./
COPY prisma/schema.prisma ./prisma/schema.prisma

RUN yarn install --production --frozen-lockfile

# Production Build
FROM node:18.13.0 as build
WORKDIR /build

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run build

# Application
FROM node:18.13.0 as application

# Copy production dependencies
COPY --from=dependencies /dependencies/package.json ./package.json
COPY --from=dependencies /dependencies/node_modules ./node_modules

# Copy built application code
COPY --from=build /build/.output ./.output

ENTRYPOINT [ "yarn", "start" ]