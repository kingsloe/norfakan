from .serializers import TakeFuneralFeeSerializer
from .models import TakeFuneralFee
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication 
from django.shortcuts import get_object_or_404
from family_info_app.models import FamilyMember


class TakeFuneralFeeViewSet(viewsets.ModelViewSet):
    serializer_class = TakeFuneralFeeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        family_member = get_object_or_404(FamilyMember, user=self.request.user)
        user_super_family = family_member.sub_family.super_family
        return FamilyMember.objects.filter(super_family=user_super_family)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def get_total_funeral_fee(self, request):
        user = get_object_or_404(FamilyMember, user=self.request.user)
        user_super_family = user.sub_family.super_family
        total_funeral_fee = TakeFuneralFee.total_funeral_fee(user_super_family)
        return Response(total_funeral_fee)
