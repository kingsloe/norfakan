from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import CreateFuneralFee, TakeFuneralFee
from family_info_app.models import SuperFamily

class CreateFuneralFeeTests(TestCase):

	def setUp(self):

		self.User = get_user_model()

		self.creator = self.User.objects.create(
			username = 'creator',
			password = 'creatorpass'
			)

		self.super_family_head = self.User.objects.create(
			username = 'superfam',
			password = 'superfampass'
			)

		self.super_family = SuperFamily.objects.create(
			creator = self.creator,
			super_family_name = 'Super Family Test',
			super_family_head = self.super_family_head,
			)

		self.funeral_fee = CreateFuneralFee.objects.create(
			creator = self.creator,
			super_family = self.super_family,
			amount = 5.0,
			gender = 'female',
			)

	def test_create_funeral_fee(self):
		self.assertEqual(self.funeral_fee.creator, self.creator)
		self.assertEqual(self.funeral_fee.super_family, self.super_family)
		self.assertEqual(self.funeral_fee.amount, 5.0)
		self.assertEqual(self.funeral_fee.gender, 'female')

	def test_read_funeral_fee(self):
		retrieved_funeral_fee = CreateFuneralFee.objects.get(id=self.funeral_fee.id)
		self.assertEqual(retrieved_funeral_fee, self.funeral_fee)

	def test_update_funeral_fee(self):
		self.funeral_fee.amount = 7.0
		self.funeral_fee.gender = 'male'
		self.funeral_fee.save()

		updated_funeral_fee = CreateFuneralFee.objects.get(id=self.funeral_fee.id)

		self.assertEqual(updated_funeral_fee.amount, 7.0)
		self.assertEqual(updated_funeral_fee.gender, 'male')

	def test_delete_funeral_fee(self):
		funeral_fee_id = self.funeral_fee.id
		self.funeral_fee.delete()

		with self.assertRaises(CreateFuneralFee.DoesNotExist):
			CreateFuneralFee.objects.get(id=funeral_fee_id)
	
	def test_default_values(self):
		self.assertEqual(self.funeral_fee.creator.id, 1)
		

	

