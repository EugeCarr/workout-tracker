from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from . import serializers, models
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle
from rest_framework.permissions import IsAuthenticated
from .permissions import IsClient, IsTrainer

class WorkoutPlanCreateList(generics.ListCreateAPIView):
    serializer_class = serializers.WorkoutPlanSerializer
    throttle_classes = [UserRateThrottle]
    
    def get_queryset(self):
        user = self.request.user
        print([self.request, user])
        if user.groups.filter(name="Client").exists():
            return models.WorkoutPlan.objects.filter(client_id=user.id)
        else:
            return models.WorkoutPlan.objects.filter(trainer_id=user.id)

    def get_permissions(self, * args, **kwargs): 
        method = self.request.method
        if method == "POST":
            self.permission_classes = [IsTrainer, IsAuthenticated]
        else:
            self.permission_classes = [IsClient | IsTrainer, IsAuthenticated]
        return[permission() for permission in self.permission_classes] 
            
    
    
class WorkoutPlanManage(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.WorkoutPlanSerializer
    throttle_classes = [UserRateThrottle]
    
    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        if user.groups.filter(name="Client").exists():
            return models.WorkoutPlan.objects.select_related("session").filter(client_id=user.id)
        else:
            return models.WorkoutPlan.objects.select_related("session").filter(trainer_id=user.id)

    def get_permissions(self): 
        method = self.request.method
        if method in ["DELETE", "PUT"]:
            self.permission_classes = [IsAuthenticated, IsTrainer,]
        elif method == "GET":
            self.permission_classes = [IsAuthenticated, IsClient | IsTrainer,]
        
        return[permission() for permission in self.permission_classes] 
    
class SessionManage(generics.ListCreateAPIView):
    serializer_class = serializers.SessionSerializer
    throttle_classes = [UserRateThrottle]
    
    def get_queryset(self):
        user = self.request.user
        print([self.request, user])
        if user.groups.filter(name="Client").exists():
            return models.Session.objects.filter(workoutPlan__client_id=user.id)
        else:
            return models.Session.objects.filter(workoutPlan__trainer_id=user.id)

    def get_permissions(self, * args, **kwargs): 
        method = self.request.method
        if method == "POST":
            self.permission_classes = [IsTrainer, IsAuthenticated]
        else:
            self.permission_classes = [IsClient | IsTrainer, IsAuthenticated]
        return[permission() for permission in self.permission_classes] 
            