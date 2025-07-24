# No Surrender Forge

Epic weapon forging game built with Next.js, TypeScript, MongoDB, and Redis.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Backend**: Next.js API Routes, Node.js 20
- **Database**: MongoDB 5 + Mongoose
- **Cache**: Redis 7
- **Styling**: Tailwind CSS, Framer Motion
- **State**: Zustand
- **Monorepo**: Turborepo
- **Container**: Docker & Docker Compose

## 📋 Prerequisites

- Node.js 20+
- pnpm 8.15.6
- Docker & Docker Compose
- Git

## 🛠️ Installation

### Local Development (with Docker)
   docker compose build --no-cache
   docker-compose up -d

1. Clone the repository:
```bash
git clone https://github.com/burakonbasi/no-surrender-forge.git
cd no-surrender-forge
cd docker
    - docker compose build --no-cache
    - docker-compose up -d

## Seed the database
pnpm run seed

## Start development servers
pnpm dev

Web app: http://localhost:3000
API: http://localhost:3001

## Production Build
pnpm build
docker-compose -f docker/docker-compose.yml up --build
