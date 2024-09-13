from .models import TakeFuneralFee
from rest_framework import serializers

class TakeFuneralFeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TakeFuneralFee
        fields = [
            'user_taking',
            'user_paying',
            'amount',
            'balance',
            'debt'
        ]