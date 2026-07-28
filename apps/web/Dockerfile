# 1. Prune
FROM node:24-alpine AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune @luminano/web --docker

# 2. Install Dependencies & Build
FROM node:24-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
COPY pnpm-workspace.yaml .

ARG NEXT_PUBLIC_API_MOCK=false
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_MOCK=$NEXT_PUBLIC_API_MOCK
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm --filter @luminano/web build

# 3. Run
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

COPY --from=builder /app/apps/web/.next/standalone ./

EXPOSE 3000

CMD ["node", "apps/web/server.js"]