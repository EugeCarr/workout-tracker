from rest_framework import permissions
from django.contrib.auth.models import Group

class IsClient(permissions.BasePermission):
    def has_permission(self, request, view):
        return Group.objects.get(name="Client").user_set.filter(id=request.user.id).exists()
    
class IsTrainer(permissions.BasePermission):
    def has_permission(self, request, view):
        return Group.objects.get(name="Trainer").user_set.filter(id=request.user.id).exists()

