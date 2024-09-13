from django.test import TestCase
from django.contrib.auth import get_user_model, authenticate
from key import test_username, test_password, test_superuser_name, test_superuser_password
# Create your tests here.

class UserManagersTests(TestCase):

	def test_create_user(self):
		User = get_user_model()
		user = User.objects.create_user(username=test_username, password=test_password)
		self.assertEqual(user.username, test_username)
		self.assertTrue(user.is_active)
		self.assertFalse(user.is_staff)
		self.assertFalse(user.is_superuser)

		authenticated_user = authenticate(username=test_username, password=test_password)
		self.assertIsNotNone(authenticated_user)
		self.assertEqual(authenticated_user.username, user.username)

	def test_create_superuser(self):
		User = get_user_model()
		admin_user = User.objects.create_superuser(username=test_superuser_name, password=test_superuser_password)
		self.assertEqual(admin_user.username, test_superuser_name)
		self.assertTrue(admin_user.is_active)
		self.assertTrue(admin_user.is_staff)
		self.assertTrue(admin_user.is_superuser)

		authenticated_superuser = authenticate(username=test_superuser_name, password=test_superuser_password)
		self.assertIsNotNone(authenticated_superuser)
		self.assertEqual(authenticated_superuser.username, admin_user.username)
