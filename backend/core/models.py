from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    avatar = models.URLField(blank=True, null=True)
    timezone = models.CharField(max_length=64, default='UTC')

    def __str__(self):
        return self.username

