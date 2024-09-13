from django.db import models
from django.contrib.auth import get_user_model
from family_info_app.models import FamilyMember

# Create your models here.

FUNERAL_TYPE = [
    ('one_week', 'One Week'),
    ('final_funeral', 'Final Funeral')
]

class CreateFuneral(models.Model):
    creator = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True, default=1)
    deceased = models.ForeignKey(FamilyMember, on_delete=models.SET_NULL, related_name='deceased', null=True)
    funeral_type = models.CharField(max_length=200, blank=True, choices=FUNERAL_TYPE)
    funeral_date = models.DateField(null=True)
    committee_members = models.ManyToManyField(FamilyMember, related_name='committee_members')
    funeral_closed = models.BooleanField(default=False)

    def __str__(self):
        return 'Funeral of ' + self.deceased.user.username 