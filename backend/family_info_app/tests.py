from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import SuperFamily, SubFamily, FamilyMember
# Create your tests here.

class SuperFamilyModelTests(TestCase):

	def setUp(self):
		self.User = get_user_model()
		self.creator = self.User.objects.create_user(
			username='creator',
			password='1234'
			)

		self.super_family_head = self.User.objects.create_user(
			username='family_head',
			password='family_key'
			)

		self.super_family = SuperFamily.objects.create(
			creator = self.creator,
			super_family_name = 'Super Family Test',
			super_family_head = self.super_family_head
			)

		self.super_family_head2 = self.User.objects.create(
			username = 'superfamily',
			password = 'superfampassword'
			)

	def test_create_super_family(self):
		self.assertEqual(self.super_family.creator, self.creator)
		self.assertEqual(self.super_family.super_family_name, 'Super Family Test')
		self.assertEqual(self.super_family.super_family_head, self.super_family_head)

		self.assertIsNotNone(self.super_family.family_key)
		self.assertEqual(len(self.super_family.family_key), 7)
		self.assertTrue(self.super_family.family_key.isalnum())

		self.assertIsNotNone(self.super_family.date_created)
		self.assertIsNotNone(self.super_family.date_updated)

		self.assertEqual(str(self.super_family), 'Super Family Test')

	def test_read_super_family(self):
		retrieved_super_family = SuperFamily.objects.get(id=self.super_family.id)
		self.assertEqual(retrieved_super_family, self.super_family)

	def test_update_super_family(self):
		self.super_family.super_family_name = 'Super Family Test2'
		self.super_family.super_family_head = self.super_family_head2
		self.super_family.save()

		updated_super_family = SuperFamily.objects.get(id=self.super_family.id)

		self.assertEqual(updated_super_family.super_family_name, 'Super Family Test2')
		self.assertEqual(updated_super_family.super_family_head, self.super_family_head2)

	def test_delete_super_family(self):
		super_family_id = self.super_family.id
		self.super_family.delete()

		with self.assertRaises(SuperFamily.DoesNotExist):
			SuperFamily.objects.get(id=super_family_id)


class SubFamilyModelTests(TestCase):

	def setUp(self):
		self.User = get_user_model()
		self.creator = self.User.objects.create(
			username='creator',
			password='1234'
			)

		self.super_family_head = self.User.objects.create(
			username='family_head',
			password='1234'
			)

		self.sub_family_head = self.User.objects.create(
			username='sub_fam_head',
			password='1234'
			)

		self.super_family = SuperFamily.objects.create(
			creator = self.creator,
			super_family_name = 'Super Family Test',
			super_family_head = self.super_family_head,
			)

		self.sub_family = SubFamily.objects.create(
			creator = self.creator,
			super_family = self.super_family,
			sub_family_name = 'Sub Family Test',
			sub_family_head = self.sub_family_head,
			)

	def test_create_sub_family(self):
		self.assertEqual(self.sub_family.creator, self.creator)
		self.assertEqual(self.sub_family.super_family, self.super_family)
		self.assertEqual(self.sub_family.sub_family_name, 'Sub Family Test')
		self.assertEqual(self.sub_family.sub_family_head, self.sub_family_head)
		self.assertEqual(str(self.sub_family), 'Sub Family Test')

		self.assertIsNotNone(self.sub_family.date_created)
		self.assertIsNotNone(self.sub_family.date_updated)

	def test_read_sub_family(self):
		retrieved_sub_family_id = SubFamily.objects.get(id=self.sub_family.id)
		self.assertEqual(retrieved_sub_family_id, self.sub_family)

	def test_update_sub_family(self):
		self.sub_family.sub_family_name = 'Sub Family Test2'
		self.sub_family.save()

		updated_sub_family = SubFamily.objects.get(id=self.sub_family.id)

		self.assertEqual(updated_sub_family.sub_family_name, 'Sub Family Test2')

	def test_delete_sub_family(self):
		sub_family_id = self.sub_family.id
		self.sub_family.delete()

		with self.assertRaises(SubFamily.DoesNotExist):
			SubFamily.objects.get(id=sub_family_id)

class FamilyMemberModelTests(TestCase):

	def setUp(self):
		self.User = get_user_model()
		self.created_user = self.User.objects.create_user(
			username='testuser',
			password='testpass'
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

		self.family_member = FamilyMember.objects.create(
			creator = self.creator,
			user = self.created_user,
			sub_family = self.sub_family,
			gender = 'male',
		)

	def test_create_family_member(self):
		self.assertEqual(self.family_member.creator, self.creator)
		self.assertEqual(self.family_member.user, self.created_user)
		self.assertEqual(self.family_member.sub_family, self.sub_family)
		self.assertEqual(self.family_member.position, 'member')
		self.assertEqual(self.family_member.status, 'alive')
		self.assertEqual(self.family_member.gender, 'male')
		self.assertEqual(self.family_member.contact, '0000000000')
		self.assertIsNotNone(self.family_member.date_created)
		self.assertIsNotNone(self.family_member.date_updated)
		self.assertEqual(str(self.family_member), self.created_user.username)

	def test_read_family_member(self):
		retrieved_family_member = FamilyMember.objects.get(id=self.family_member.id)
		self.assertEqual(retrieved_family_member, self.family_member)

	def test_update_family_member(self):
		self.family_member.position = 'committee'
		self.family_member.status = 'dead'
		self.family_member.gender = 'female'
		self.family_member.save()

		updated_family_member = FamilyMember.objects.get(id=self.family_member.id)

		self.assertEqual(updated_family_member.position, 'committee')
		self.assertEqual(updated_family_member.status, 'dead')
		self.assertEqual(updated_family_member.gender, 'female')

	def test_delete_family_member(self):
		family_member_id = self.family_member.id
		self.family_member.delete()

		with self.assertRaises(FamilyMember.DoesNotExist):
			FamilyMember.objects.get(id=family_member_id)

	def test_default_values(self):
		self.assertEqual(self.family_member.position, 'member')
		self.assertEqual(self.family_member.status, 'alive')
		self.assertEqual(self.family_member.contact, '0000000000')


