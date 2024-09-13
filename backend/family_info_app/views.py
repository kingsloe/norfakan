from django.shortcuts import get_object_or_404

# Models import
from .models import FamilyMember

# Serializers import
from .serializers import FamilyMemberSerializer

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response

class FamilyMemberViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = FamilyMemberSerializer

    # Overrides the default queryset to only associate the response with the loggedin user
    def get_queryset(self):
        family_member = get_object_or_404(FamilyMember, user=self.request.user)
        user_sub_family = family_member.sub_family

        return FamilyMember.objects.filter(sub_family=user_sub_family)
    
    # Custom endpoint for the number of family members to be shown on the homepage
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def get_family_members_list(self, request):
        family_member = get_object_or_404(FamilyMember, user=self.request.user)
        user_sub_family = family_member.sub_family

        alive_family_members = FamilyMember.objects.filter(status='alive', sub_family=user_sub_family)
        deceased_family_members = FamilyMember.objects.filter(status='dead', sub_family=user_sub_family)
        committee_members = FamilyMember.objects.filter(position='committee', sub_family=user_sub_family)


        data = {
            'alive_family_members': alive_family_members.count(),
            'deceased_family_members': deceased_family_members.count(),
            'committee_members': committee_members.count()
        }

        return Response(data)