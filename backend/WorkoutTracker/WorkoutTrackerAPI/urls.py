from django.urls import path
from . import views

urlpatterns = [
    path(route='workout-plans', view=views.WorkoutPlanCreateList.as_view(), name="workout-plans-list"),
    path(route='workout-plans/<int:pk>', view=views.WorkoutPlanManage.as_view(), name="workout-plan-edit"),
    path(route='workout-plans/sessions', view=views.SessionManage.as_view(), name="sessions-list"),
]
