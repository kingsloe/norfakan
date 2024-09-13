from django.db import models
from django.db.models import Sum
from django.contrib.auth import get_user_model
from family_info_app.models import SuperFamily, FamilyMember

class CreateFuneralFee(models.Model):

    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]

    creator = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True, default=1)
    super_family = models.ForeignKey(SuperFamily, on_delete=models.SET_NULL, null=True)
    amount = models.FloatField(null=True)
    gender = models.CharField(max_length=200, choices=GENDER_CHOICES)

    def __str__(self):
        return f'{self.amount}'

class TakeFuneralFee(models.Model):
    user_taking = models.ForeignKey(FamilyMember, on_delete=models.SET_NULL, related_name='user_taking_funeral_fee', null=True)
    user_paying = models.ForeignKey(FamilyMember, on_delete=models.SET_NULL, related_name='user_paying_funeral_fee', null=True)
    super_family = models.ForeignKey(SuperFamily, on_delete=models.SET_NULL, null=True)
    amount = models.FloatField(null=True)
    balance = models.FloatField(null=True)
    debt = models.FloatField(null=True)

    @classmethod
    def total_funeral_fee(cls, super_family):
        total_amount = cls.objects.filter(super_family=super_family).aggregate(total_amount=Sum('amount'))
        return total_amount['total_amount'] or 0

