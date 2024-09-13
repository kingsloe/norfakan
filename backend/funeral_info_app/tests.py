from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import CreateFuneral
from family_info_app.models import FamilyMember, SuperFamily, SubFamily

# Create your tests here.

class CreateFuneralTests(TestCase):

    def setUp(self):
        self.User = get_user_model()
        self.deceased_user = self.User.objects.create_user(
            username='testuser',
            password='testpass'
        )

        self.committee_user1 = self.User.objects.create_user(
            username='committe_user1',
            password='committe_pass1'
        )

        self.committee_user2 = self.User.objects.create_user(
            username='committe_user2',
            password='committe_pass2'
        )

        self.creator = self.User.objects.create_user(
            username='creator',
            password='testpass'
        )

        self.super_family_head = self.User.objects.create_user(
            username='supercreator',
            password='supertestpass'
        )

        self.sub_family_head = self.User.objects.create_user(
            username='subcreator',
            password='subtestpass'
        )

        self.super_family = SuperFamily.objects.create(
            creator = self.creator,
            super_family_name = 'Super Family Test',
            super_family_head = self.super_family_head
        )

        self.sub_family = SubFamily.objects.create(
            creator = self.creator,
            super_family = self.super_family,
            sub_family_name = 'Sub Family Test',
            sub_family_head = self.sub_family_head
        )

        self.deceased = FamilyMember.objects.create(
            creator = self.creator,
            user = self.deceased_user,
            sub_family = self.sub_family,
            status = 'dead',
            gender = 'male',
        )

        self.committee1 = FamilyMember.objects.create(
            creator = self.creator,
            user = self.committee_user1,
            sub_family = self.sub_family,
            position = 'head_of_committee',
            gender = 'male',
        )

        self.committee2 = FamilyMember.objects.create(
            creator = self.creator,
            user = self.committee_user2,
            sub_family = self.sub_family,
            position = 'committee',
            gender = 'male',
        )

        self.funeral = CreateFuneral.objects.create(
            creator = self.creator,
            deceased = self.deceased,
            funeral_type = 'one_week',
            funeral_date = '2024-08-05',
            funeral_closed = False
        )

        self.funeral.committee_members.add(self.committee1, self.committee2)

    def test_create_funeral(self):
        self.assertEqual(self.funeral.creator, self.creator)
        self.assertEqual(self.funeral.deceased.user, self.deceased_user)
        self.assertEqual(self.funeral.funeral_type, 'one_week')
        self.assertEqual(self.funeral.funeral_date, '2024-08-05')
        self.assertEqual(self.funeral.funeral_closed, False)

        committee_members = self.funeral.committee_members.all()
        self.assertIn(self.committee1, committee_members)
        self.assertIn(self.committee2, committee_members)

    def test_read_funeral(self):
        retrieved_funeral = CreateFuneral.objects.get(id=self.funeral.id)
        self.assertEqual(retrieved_funeral, self.funeral)

    def test_update_funeral(self):
        self.funeral.funeral_type = 'final_funeral'
        self.funeral.funeral_closed = True
        self.funeral.save()

        updated_funeral = CreateFuneral.objects.get(id=self.funeral.id)

        self.assertEqual(updated_funeral.funeral_type, 'final_funeral')
        self.assertEqual(updated_funeral.funeral_closed, True)

    def test_delete_funeral(self):
        funeral_id = self.funeral.id
        self.funeral.delete()

        with self.assertRaises(CreateFuneral.DoesNotExist):
            CreateFuneral.objects.get(id=funeral_id)
