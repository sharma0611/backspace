from django.db import models
from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    """
    A custom user manager to deal with emails as unique identifiers for auth
    instead of usernames. The default that's used is "UserManager"
    """

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The email must be set')
        normalized_email = self.normalize_email(email)

        user = self.model(email=normalized_email, **extra_fields)

        if extra_fields.get('is_staff', False):
            if not password:
                raise ValueError('Staff users must set a password')
            user.set_password(password)
        else:
            user.set_unusable_password()

        user.save()
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(email, password, **extra_fields)
