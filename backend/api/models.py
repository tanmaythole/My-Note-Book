from django.db import models
# from django.contrib.auth.models import User
from django.conf import settings
User = settings.AUTH_USER_MODEL

# Create your models here.

class Notes(models.Model):
    user_id = models.ForeignKey(User, verbose_name=(""), on_delete=models.CASCADE)
    title = models.TextField()
    description = models.TextField()
    tag = models.CharField(max_length=20)
    date = models.DateTimeField()
