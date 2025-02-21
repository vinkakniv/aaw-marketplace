FROM node:18.18.2 AS builder

WORKDIR /authentication

COPY package.json ./

# Install pnpm
RUN npm install -g pnpm typescript

# Install dependencies
RUN pnpm install

RUN pnpm add -D ts-node

COPY . .

RUN pnpm run generate
RUN pnpm run migrate

# Build
RUN pnpm run build

# Production image
FROM node:18.18.2-slim

ENV PORT 8000
ENV NODE_ENV production

WORKDIR /authentication

COPY --from=builder /authentication/dist ./dist
COPY --from=builder /authentication/package.json ./package.json
COPY --from=builder /authentication/src ./src 
COPY --from=builder /authentication/drizzle.config.ts ./drizzle.config.ts  
COPY --from=builder /wauthentication/drizzle ./drizzle 

RUN npm install --only=production
RUN npm install -g pnpm typescript tsx

EXPOSE 8000

CMD pnpm run migrate && node dist/src/server.js