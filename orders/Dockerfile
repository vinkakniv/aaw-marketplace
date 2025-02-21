FROM node:18.18.2 AS builder

WORKDIR /orders

COPY package.json ./

# Install pnpm
RUN npm install -g pnpm typescript

# Install dependencies
RUN pnpm install

# Copy source
COPY . .

# Build
RUN pnpm run build

# Production image
FROM node:18.18.2-slim

ENV PORT 8000
ENV NODE_ENV production

WORKDIR /orders

COPY --from=builder /orders/dist ./dist
COPY --from=builder /orders/package.json ./package.json
COPY --from=builder /orders/entrypoint.sh ./entrypoint.sh


COPY --from=builder /orders/drizzle.config.ts ./drizzle.config.ts  
COPY --from=builder /orders/drizzle ./drizzle

RUN npm install --only=production

EXPOSE 8000

RUN ["chmod", "+x", "entrypoint.sh"]
ENTRYPOINT [ "./entrypoint.sh" ]