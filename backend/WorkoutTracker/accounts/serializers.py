from rest_framework import serializers
from . import models

class UserManagementSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta():
        model = models.UserAccount
        fields = ["id", "first_name", "last_name", "email", "password"]
        extra_kwargs= {
            'password': {'max_length': 50}
        }