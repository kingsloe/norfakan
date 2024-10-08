from django.db import models
from django.contrib.auth import get_user_model
import random 
import string
from django.db.models.signals import pre_save
from django.dispatch import receiver

class SuperFamily(models.Model):
    creator = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, related_name='families', null=True, default=1)
    super_family_name = models.CharField(max_length=200, default='Super Family Name')
    super_family_head = models.OneToOneField(get_user_model(), on_delete=models.SET_NULL, null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    family_key = models.CharField(max_length=7, editable=False, unique=True)


    def __str__(self):
        return f'{self.super_family_name}'

def generate_family_key():
    while True:
        key = ''.join(random.choices(string.ascii_letters + string.digits, k=7))
        if not SuperFamily.objects.filter(family_key=key).exists():
            return key
        
@receiver(pre_save, sender=SuperFamily)
def set_family_key(sender, instance, **kwargs):
    if not instance.family_key:
        instance.family_key = generate_family_key()

class SubFamily(models.Model):
    creator = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, related_name='sub_families', null=True, default=1)
    super_family = models.ForeignKey(SuperFamily, on_delete=models.SET_NULL, related_name='sub_families', null=True)
    sub_family_name = models.CharField(max_length=200, default='Sub Family Name')
    sub_family_head = models.OneToOneField(get_user_model(), on_delete=models.SET_NULL, related_name='sub_family_head', null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.sub_family_name}'

class FamilyMember(models.Model):

    POSITION_CHOICES = [
        ('head_of_super_family', 'Head of super family'),
        ('head_of_sub_family', 'Head of sub family'),
        ('head_of_committee', 'Head of committee'),
        ('committee', 'Committee member'),
        ('member', 'Member'),
    ]

    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]

    STATUS_CHOICES = [
        ('alive', 'alive'),
        ('dead', 'dead'),
    ]

    creator = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, related_name='family_members', null=True, default=1)
    user = models.OneToOneField(get_user_model(), on_delete=models.SET_NULL, null=True)
    sub_family = models.ForeignKey(SubFamily, on_delete=models.SET_NULL, related_name='family_members', null=True)
    position = models.CharField(max_length=200, choices=POSITION_CHOICES, default='member')
    status = models.CharField(max_length=200, choices=STATUS_CHOICES, default='alive')
    gender = models.CharField(max_length=200, choices=GENDER_CHOICES)
    contact = models.CharField(max_length=200, default='0000000000')
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username
    
