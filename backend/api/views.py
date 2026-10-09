from django.db import connection
from django.http import JsonResponse
import time

def health_db(request):
    start_time = time.time()
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1;")
            row = cursor.fetchone()

        latency_ms = round((time.time() - start_time) * 1000, 2)

        return JsonResponse({
            "status": "healthy",
            "database": "PostgreSQL",
            "latency": f"{latency_ms}ms",
            "message": "Database connection is solid."
        })
    except Exception as exc:
        return JsonResponse({
            "status": "unhealthy",
            "error": str(exc),
            "message": "Failed to query the database."
        }, status=503)


def greet(request):
    return JsonResponse({
        "status": "success",
        "message": "Welcome to your Full Stack application! Backend is live and healthy.",
        "project": "create-fs-app",
        "stack": {
            "frontend": "Next.js (App Router) + Biome + Tailwind CSS",
            "backend": "Django + PostgreSQL",
            "runtime": "Docker Compose"
        }
    })