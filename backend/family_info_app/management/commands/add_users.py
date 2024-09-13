from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from key import fake_password
from faker import Faker

class Command(BaseCommand):
    help = 'Adds users to the database'

    def handle(self, *args, **kwargs):
        fake = Faker()
        User = get_user_model()
        for _ in range(10):
            User.objects.create(
                username = fake.user_name(),
                email = fake.email(),
                first_name = fake.first_name(),
                last_name = fake.last_name(),
                password = make_password('1234'),
            )
        self.stdout.write(self.style.SUCCESS('Users added successfully'))