from django.db import models
from django.contrib.auth.models import User
from family_info_app.models import SuperFamily, FamilyMember

# Create your models here.

class CreateFuneralFee(models.Model):

    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]

    creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    super_family = models.ForeignKey(SuperFamily, on_delete=models.SET_NULL, null=True)
    amount = models.FloatField(null=True)
    gender = models.CharField(max_length=200, choices=GENDER_CHOICES)

    def __str__(self):
        return f'Funeral fee for males in {self.super_family.super_family_name} ({self.amount})'


class TakeFuneralFee(models.Model):
    user_taking = models.ForeignKey(FamilyMember, on_delete=models.SET_NULL, related_name='user_taking_funeral_fee', null=True)
    user_paying = models.ForeignKey(FamilyMember, on_delete=models.SET_NULL, related_name='user_paying_funeral_fee', null=True)
    amount = models.FloatField(null=True)
    balance = models.FloatField(null=True)
    debt = models.FloatField(null=True)

