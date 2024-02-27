from rest_framework import serializers
from django.contrib.auth.models import User
from . import models


class UserManagementSerializer(serializers.ModelSerializer):
    class Meta():
        model = User
        fields = ["id", "username", "first_name", "email"]
        
        
class WorkoutPlanSerializer(serializers.ModelSerializer):
    client_id = serializers.IntegerField(write_only= True)
    trainer_id = serializers.IntegerField(write_only= True)
    client = UserManagementSerializer(read_only=True)
    trainer = UserManagementSerializer(read_only=True)
    class Meta():
        model = models.WorkoutPlan
        fields = ["id", "client", "client_id", "trainer", "trainer_id", "name"]
        
class SessionSerializer(serializers.ModelSerializer):
    workoutPlan_id =serializers.IntegerField(write_only= True)
    workoutPlan = WorkoutPlanSerializer(read_only=True)
    
    class Meta():
        model = models.Session
        fields = ["id", "workoutPlan_id", "name", "plannedDate", "completedDate", "description", "workoutPlan"]
        depth = 2
        