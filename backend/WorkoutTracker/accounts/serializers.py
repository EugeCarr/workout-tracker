from rest_framework import serializers
from . import models

class UserManagementSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    groups = serializers.SerializerMethodField()
    
    
    def get_groups(self, obj):
        return obj.groups.values_list('name', flat=True)
    
    class Meta():
        model = models.UserAccount
        fields = ["id", "first_name", "last_name", "email", "password", "groups"]
        extra_kwargs= {
            'password': {'max_length': 50}
        }