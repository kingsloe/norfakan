from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CreateFuneralViewSet

router = DefaultRouter()
router.register(r'funeral-info', CreateFuneralViewSet, basename='funeral-info')

urlpatterns = [
    path('', include(router.urls))
]