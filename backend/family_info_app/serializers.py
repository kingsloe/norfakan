from .models import FamilyMember
from rest_framework import serializers
from users_app.serializers import UserSerializer

class FamilyMemberSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = FamilyMember
        fields = [
            'id', 
            'user', 
            'position', 
            'status', 
            'gender', 
            'contact', 
            'sub_family', 
            'creator', 
            'date_created', 
            'date_updated'
            ]
        
class FamilyMemberUserSerializer(FamilyMemberSerializer):
    class Meta:
        model = FamilyMember
        fields = ['user', 'sub_family']