.PHONY: up down build logs restart shell-backend shell-frontend migrate makemigrations lint

up:
	docker compose up -d

dev:
	docker compose up --build

down:
	docker compose down

build:
	docker compose build

logs:
	docker compose logs -f

restart:
	docker compose restart

shell-backend:
	docker compose exec backend bash

shell-frontend:
	docker compose exec frontend sh

migrate:
	docker compose exec backend python manage.py migrate

makemigrations:
	docker compose exec backend python manage.py makemigrations

lint:
	docker compose exec frontend pnpm biome check .