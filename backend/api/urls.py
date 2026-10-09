from django.urls import path
from api.views import greet, health_db

urlpatterns = [
    path("greet/", greet, name="greet"),
    path("health/db/", health_db, name="health_db"),
]