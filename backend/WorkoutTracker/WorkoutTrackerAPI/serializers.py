from rest_framework import serializers
from django.contrib.auth.models import User
from accounts.models import UserAccount
from . import models
        
class UserManagementSerializer(serializers.ModelSerializer):
    class Meta():
        model = UserAccount
        fields = ["id", "username", "first_name", "last_name", "email"]        
        
class SessionHelperSerializer(serializers.ModelSerializer):
    workoutPlan_id =serializers.PrimaryKeyRelatedField(queryset=models.WorkoutPlan.objects.all())
    
    class Meta():
        model = models.Session
        fields = ["id", "workoutPlan_id", "name", "plannedDate", "completedDate", "description"]
        depth = 2
        
class WorkoutPlanSerializer(serializers.ModelSerializer):
    client_id = serializers.IntegerField(write_only= True)
    trainer_id = serializers.IntegerField(write_only= True)
    client = UserManagementSerializer(read_only=True)
    trainer = UserManagementSerializer(read_only=True)
    sessions = SessionHelperSerializer(many=True)
    class Meta():
        model = models.WorkoutPlan
        fields = ["id", "client", "client_id", "trainer", "trainer_id", "name", "sessions"]

class WorkoutPlanHelperSerializer(serializers.ModelSerializer):
    client_id = serializers.IntegerField(write_only= True)
    trainer_id = serializers.IntegerField(write_only= True)
    client = UserManagementSerializer(read_only=True)
    trainer = UserManagementSerializer(read_only=True)
    class Meta():
        model = models.WorkoutPlan
        fields = ["id", "client", "client_id", "trainer", "trainer_id", "name"]
               
class SessionSerializer(serializers.ModelSerializer):
    workoutPlan_id =serializers.IntegerField(write_only=True)
    workoutPlan = WorkoutPlanHelperSerializer(read_only=True)
    
    class Meta():
        model = models.Session
        fields = ["id", "workoutPlan_id", "name", "plannedDate", "completedDate", "description", "workoutPlan"]
        depth = 2
      
class ExerciseTypeSerializer(serializers.ModelSerializer):
    class Meta():
        model = models.ExerciseType
        fields = "__all__"
    
class ExerciseSerializer(serializers.ModelSerializer):
    session_id = serializers.IntegerField(write_only=True)
    session = SessionHelperSerializer(read_only=True)
    type = ExerciseTypeSerializer(read_only=True)
    type_id = serializers.IntegerField(write_only=True)
    
    class Meta():
        model = models.Exercise
        fields = ["id", "session_id", "session", "type", "type_id", "sets", "reps"]