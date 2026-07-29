# 1. Prune the monorepo
FROM node:24-alpine AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune @luminano/api --docker

# 2. Install Dependencies & Build
FROM node:24-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
COPY pnpm-workspace.yaml .

RUN pnpm --filter @luminano/database db:generate
RUN pnpm --filter @luminano/api build

# pnpm v10+ deploy requires --legacy flag if workspace packages are not injected
RUN pnpm --filter @luminano/api deploy --prod --legacy /app/pruned
RUN cp -r apps/api/dist /app/pruned/dist

# 3. Run
FROM node:24-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

# Copy the entire standalone deployed package
COPY --from=builder /app/pruned ./

ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000

CMD ["node", "dist/main"]
