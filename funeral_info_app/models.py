from django.db import models
from django.contrib.auth.models import User
from family_info_app.models import FamilyMember

# Create your models here.

FUNERAL_TYPE = [
    ('one_week', 'One Week'),
    ('final_funeral', 'Final Funeral')
]

class CreateFuneral(models.Model):
    creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    deceased = models.ForeignKey(FamilyMember, on_delete=models.SET_NULL, related_name='deceased', null=True)
    funeral_type = models.CharField(max_length=200, blank=True, choices=FUNERAL_TYPE)
    funeral_date = models.DateField(null=True)
    committee_members = models.ManyToManyField(FamilyMember, related_name='committee_members')
    funeral_close = models.BooleanField(default=False)

    def __str__(self):
        return 'Funeral of ' + self.deceased.user.username 