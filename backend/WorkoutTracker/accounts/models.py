from django.shortcuts import get_object_or_404
from django.contrib.auth.models import AbstractUser, BaseUserManager, Group
from django.db import models
from datetime import datetime
import pytz


class UserAccountManager(BaseUserManager):
    def _create_user(self, email, is_staff, is_superuser, password=None, **extra_fields):
        email = self.normalize_email(email)
        currentTime = datetime.now(pytz.timezone('UTC'))
        extra_fields.setdefault('date_joined', currentTime)
        extra_fields.setdefault('last_login', currentTime)
        user = self.model(email=email, username=email, is_staff=is_staff, is_superuser=is_superuser, **extra_fields)
        user.set_password(password)
        try: 
            user.save()
        except Exception as e:
            print(e)
        # selectedGroup = Group.objects.get(name=groupName)
        # selectedGroup.user_set.add(user)
        return user
    
    def create_user(self, email, groupName="Client", password=None, **extra_fields):
        print({
           "email": email,
           "password": password,
           "extra_fields": extra_fields
        #    "firstName": extra_fields.first_name
        })
        user= self._create_user(email, is_staff=False, is_superuser=False, password=password, **extra_fields)
        print(user)
        selectedGroup = Group.objects.get(name=groupName)
        print(selectedGroup)
        selectedGroup.user_set.add(user)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        user= self._create_user(email, is_staff=True, is_superuser=True, password=password, **extra_fields)
        
        return user

class UserAccount(AbstractUser):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)    
        
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    
    objects = UserAccountManager()
    
    class Meta:
        db_table = "auth_user"
    
    def get_full_name(self):
       return "{fname} {lname}".format(fname=self.first_name, lname=self.last_name)

    def get_short_name(self):
        return self.first_name

    def __str__(self):
       return self.email
