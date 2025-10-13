# Base image
FROM node:22.20.0 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# -----------------------------
# 1. Production Dependencies
# -----------------------------
FROM base AS dependencies
WORKDIR /dependencies

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY prisma/schema.prisma ./prisma/schema.prisma

# Install prod dependencies (includes @prisma/client)
RUN pnpm install --prod --frozen-lockfile

# Generate Prisma client (must happen after install)
RUN pnpm prisma generate

# -----------------------------
# 2. Build Stage
# -----------------------------
FROM base AS build
WORKDIR /build

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

# Generate Prisma client here too (for build-time type safety)
RUN pnpm prisma generate

RUN pnpm run build

# -----------------------------
# 3. Application Runtime
# -----------------------------
FROM base AS application

# Copy production dependencies including generated Prisma client
COPY --from=dependencies /dependencies/package.json ./package.json
COPY --from=dependencies /dependencies/node_modules ./node_modules

# Copy built Nuxt output
COPY --from=build /build/.output ./.output

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080

ENTRYPOINT ["pnpm", "start"]
