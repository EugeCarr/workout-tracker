from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from . import serializers, models
from django.http import HttpResponseBadRequest
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .permissions import IsClient, IsTrainer


class CreateListMixin(object):
    def create(self, request, *args, **kwargs):
        isMany = isinstance(request.data, list)
        serializer = self.get_serializer(data=request.data, many=isMany)
        serializer.is_valid(raise_exception=True)
        headers = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class ClientReadOnlyPermissionMixin(object):
    def get_permissions(self, * args, **kwargs): 
        method = self.request.method
        if method == "GET":
            self.permission_classes = [IsClient | IsTrainer | IsAdminUser, IsAuthenticated]
            
        else:
            self.permission_classes = [IsTrainer | IsAdminUser, IsAuthenticated]
        return[permission() for permission in self.permission_classes]

class WorkoutPlanCreateList(ClientReadOnlyPermissionMixin, generics.ListCreateAPIView):
    serializer_class = serializers.WorkoutPlanSerializer
    throttle_classes = [UserRateThrottle]
    
    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name="Client").exists():
            return models.WorkoutPlan.objects.filter(client_id=user.id)
        else:
            return models.WorkoutPlan.objects.filter(trainer_id=user.id)
    
class WorkoutPlanManage(ClientReadOnlyPermissionMixin, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.WorkoutPlanSerializer
    throttle_classes = [UserRateThrottle]
    
    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        if user.groups.filter(name="Client").exists():
            return models.WorkoutPlan.objects.prefetch_related('sessions').filter(client_id=user.id)
        else:
            return models.WorkoutPlan.objects.prefetch_related('sessions').filter(trainer_id=user.id)
    
class SessionManage(CreateListMixin, ClientReadOnlyPermissionMixin, generics.ListCreateAPIView):
    serializer_class = serializers.SessionSerializer
    throttle_classes = [UserRateThrottle]
    
    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name="Client").exists():
            return models.Session.objects.filter(workoutPlan__client_id=user.id)
        else:
            return models.Session.objects.filter(workoutPlan__trainer_id=user.id)
    
class SessionUpdateRetrieve(ClientReadOnlyPermissionMixin, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.SessionSerializer
    throttle_classes = [UserRateThrottle]
    
    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name="Client").exists():
            return models.Session.objects.filter(workoutPlan__client_id=user.id)
        else:
            return models.Session.objects.filter(workoutPlan__trainer_id=user.id)
    
class ExerciseTypeCreateList(CreateListMixin, ClientReadOnlyPermissionMixin, generics.ListCreateAPIView):
    serializer_class = serializers.ExerciseTypeSerializer
    throttle_classes = [UserRateThrottle]
    queryset = models.ExerciseType.objects.all()
    
    
class ExerciseCreateList(CreateListMixin, ClientReadOnlyPermissionMixin, generics.ListCreateAPIView):
    serializer_class = serializers.ExerciseSerializer
    throttle_classes = [UserRateThrottle]
    
    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name="Client").exists():
            return models.Exercise.objects.filter(session__workoutPlan__client_id=user.id)
        else:
            return models.Exercise.objects.filter(session__workoutPlan__trainer_id=user.id)
        
class ExerciseUpdateRetrieve(ClientReadOnlyPermissionMixin, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.ExerciseSerializer
    throttle_classes = [UserRateThrottle]    
    
    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name="Client").exists():
            return models.Exercise.objects.filter(session__workoutPlan__client_id=user.id)
        else:
            return models.Exercise.objects.filter(session__workoutPlan__trainer_id=user.id)
        
class UserAccountList(generics.ListAPIView):
    serializer_class = serializers.UserManagementSerializer
    throttle_classes = [UserRateThrottle]
    queryset = models.UserAccount.objects.all()
    permission_classes = [IsTrainer | IsAdminUser, IsAuthenticated]
    
    
    def get(self, request, *args, **kwargs):
        try: 
            print(self.kwargs)  
            isClient = self.kwargs['is_client']            
            if isClient not in ['1', '0']:
                return HttpResponseBadRequest(content={"message": "You must specify whether clients or trainers is requested"})
            
            if isClient == '1':
                return models.UserAccount.objects.filter(group__name="Client")
            else:
                return models.UserAccount.objects.filter(group__name="Trainer")
        except KeyError:
            return HttpResponseBadRequest(content={"message": "You must specify whether clients or trainers is requested"})