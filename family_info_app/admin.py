from django.contrib import admin
from .models import SuperFamily, SubFamily, FamilyMember

# Register your models here.
admin.site.register(SuperFamily)
admin.site.register(SubFamily)
admin.site.register(FamilyMember)