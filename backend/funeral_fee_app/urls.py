from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TakeFuneralFeeViewSet

router = DefaultRouter()
router.register(r'take-funeral-fee', TakeFuneralFeeViewSet, basename='take-funeral-fee')

urlpatterns = [
    path('', include(router.urls))
]