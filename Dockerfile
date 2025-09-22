FROM node:24.8.0 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Production Dependencies
FROM base AS dependencies
WORKDIR /dependencies

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY prisma/schema.prisma ./prisma/schema.prisma

RUN pnpm install --prod --frozen-lockfile

# Production Build
FROM base AS build
WORKDIR /build

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# Application
FROM base AS application

# Copy production dependencies
COPY --from=dependencies /dependencies/package.json ./package.json
COPY --from=dependencies /dependencies/node_modules ./node_modules

# Copy built application code
COPY --from=build /build/.output ./.output

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080

ENTRYPOINT [ "pnpm", "start" ]