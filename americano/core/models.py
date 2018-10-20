from django.db import models
# User imports 
from django.contrib.auth.models import AbstractUser
from americano.truelayer.models import TrueLayerToken
from .managers import UserManager


# Create your models here.
class User(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    password = models.CharField(
        _('password'), max_length=128, blank=True, null=True)

    # User flags
    truelayer_tokens = models.ManyToManyField(
        TrueLayerToken, related_name='users', blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

