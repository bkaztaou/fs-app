FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]