FROM node:18.18.2 AS builder

WORKDIR /authentication

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

WORKDIR /authentication

COPY --from=builder /authentication/dist ./dist
COPY --from=builder /authentication/package.json ./package.json
COPY --from=builder /authentication/entrypoint.sh ./entrypoint.sh


COPY --from=builder /authentication/drizzle.config.ts ./drizzle.config.ts  
COPY --from=builder /authentication/drizzle ./drizzle

RUN npm install --only=production

EXPOSE 8000

RUN ["chmod", "+x", "entrypoint.sh"]
ENTRYPOINT [ "./entrypoint.sh" ]