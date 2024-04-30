from rest_framework import serializers
from django.contrib.auth.models import Group
from accounts.models import UserAccount
from . import models
from accounts.serializers import UserManagementSerializer  
from django.shortcuts import get_object_or_404   
from collections import OrderedDict
        
class UserGroupManagementSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(queryset=UserAccount.objects.all())
    class Meta():
        model= UserAccount
        fields=["id"]
    
    def update(self, instance, validated_data):
        clientGroup = Group.objects.get(name="Client")
        trainerGroup = Group.objects.get(name="Trainer")
        user = UserAccount.objects.get(pk=instance.id)
        print(user)
        print(clientGroup, trainerGroup)
        user.groups.remove(clientGroup)
        trainerGroup.user_set.add(user)
        user.save()
        
        return user

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
    sessions = SessionHelperSerializer(many=True, read_only=True)
    class Meta():
        model = models.WorkoutPlan
        fields = ["id", "client", "client_id", "trainer", "trainer_id", "name", "sessions", "startDate", "endDate"]

class WorkoutPlanHelperSerializer(serializers.ModelSerializer):
    client_id = serializers.IntegerField(write_only= True)
    trainer_id = serializers.IntegerField(write_only= True)
    client = UserManagementSerializer(read_only=True)
    trainer = UserManagementSerializer(read_only=True)
    class Meta():
        model = models.WorkoutPlan
        fields = ["id", "client", "client_id", "trainer", "trainer_id", "name", "startDate", "endDate"]
               
class SessionSerializer(serializers.ModelSerializer):
    workoutPlan_id =serializers.IntegerField(write_only=True)
    workoutPlan = WorkoutPlanHelperSerializer(read_only=True)
    
    class Meta():
        model = models.Session
        fields = ["id", "workoutPlan_id", "name", "plannedDate", "completedDate", "description", "workoutPlan"]
        depth = 2

class MuscleGroupSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    name = serializers.CharField(read_only=True)
    class Meta():
        model = models.MuscleGroup
        fields = ["id", "name"]

class ExerciseTypeSerializer(serializers.ModelSerializer):
    # muscleGroup_ids = serializers.PrimaryKeyRelatedField(queryset=models.MuscleGroup.objects.all(), many=True)
    muscleGroups = MuscleGroupSerializer(read_only=True, many=True)
    
    class Meta():
        model = models.ExerciseType
        fields = ["id", "name", "description", "muscleGroups"]
        
    def create(self, validated_data):
        print(self.initial_data)
        mGroups = self.initial_data["muscleGroups"]
        
        muscleGroupInstances = []
        
        for muscle in mGroups:
            existingMuscle = get_object_or_404(models.MuscleGroup.objects.filter(pk = muscle["id"]))
            muscleGroupInstances.append(existingMuscle)
        exerciseType = models.ExerciseType.objects.create(**validated_data)
        exerciseType.muscleGroups.set(muscleGroupInstances)
        return exerciseType           
    
    def update(self, instance, validated_data):
        muscleGroups = self.initial_data["muscleGroups"]
        muscleGroupInstances = []
        for muscle in muscleGroups:
            existingMuscle = get_object_or_404(models.MuscleGroup.objects.filter(pk = muscle["id"]))
            muscleGroupInstances.append(existingMuscle)
        instance.muscleGroups.set(muscleGroupInstances)
        
        for k, v in validated_data.items():
            setattr(instance, k, v)
        instance.save()
        return instance
        
            
        
        
    
class ExerciseSerializer(serializers.ModelSerializer):
    session_id = serializers.IntegerField(write_only=True)
    session = SessionHelperSerializer(read_only=True)
    type = ExerciseTypeSerializer(read_only=True)
    type_id = serializers.IntegerField(write_only=True)
    
    class Meta():
        model = models.Exercise
        fields = ["id", "session_id", "session", "type", "type_id", "sets", "reps"]
        
