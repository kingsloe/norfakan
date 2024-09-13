from .models import CreateFuneral
from rest_framework import serializers
from users_app.serializers import UserSerializer
from family_info_app.serializers import FamilyMemberUserSerializer

class CreateFuneralSerializer(serializers.ModelSerializer):
    creator = UserSerializer()
    deceased = FamilyMemberUserSerializer()
    class Meta:
        model = CreateFuneral
        fields = [
            'id',
            'creator',
            'deceased',
            'funeral_type',
            'funeral_date',
            'committee_members',
            'funeral_closed'
        ]