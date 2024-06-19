from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class SuperFamily(models.Model):
    creator = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='families', null=True)
    super_family_name = models.CharField(max_length=200, default='Super Family Name')
    super_family_head = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.super_family_name


class SubFamily(models.Model):
    creator = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='sub_families', null=True)
    super_family = models.ForeignKey(SuperFamily, on_delete=models.SET_NULL, related_name='sub_families', null=True)
    sub_family_name = models.CharField(max_length=200, default='Sub Family Name')
    sub_family_head = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='sub_family_head', null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.sub_family_name + ' family of ' + self.super_family.super_family_name


class FamilyMember(models.Model):

    POSITION_CHOICES = [
    ('head_of_super_family', 'Head_of_super_family'),
    ('head_of_sub_family', 'Head_of_sub_family'),
    ('head_of_committee', 'Head_of_committee'),
    ('committee', 'Committee_member'),
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

    creator = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='family_members', null=True)
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)
    sub_family = models.ForeignKey(SubFamily, on_delete=models.SET_NULL, related_name='family_members', null=True)
    position = models.CharField(max_length=200, choices=POSITION_CHOICES, default='member')
    status = models.CharField(max_length=200, choices=STATUS_CHOICES, default='alive')
    gender = models.CharField(max_length=200, choices=GENDER_CHOICES)
    contact = models.CharField(max_length=200, default='0000000000')
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username
    
