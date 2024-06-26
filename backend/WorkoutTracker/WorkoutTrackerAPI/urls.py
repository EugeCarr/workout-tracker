from django.urls import path
from . import views

urlpatterns = [
    path(route='workout-plans', view=views.WorkoutPlanCreateList.as_view(), name="workout-plans-list"),
    path(route='workout-plans/<int:pk>', view=views.WorkoutPlanManage.as_view(), name="workout-plan-edit"),
    path(route='workout-plans/sessions', view=views.SessionManage.as_view(), name="sessions-list"),
    path(route='workout-plans/sessions/<int:pk>', view=views.SessionUpdateRetrieve.as_view(), name="sessions-edit"),
    path(route='exercise-types', view=views.ExerciseTypeCreateList.as_view(), name="exercise-type-list"),
    path(route='exercise-types/<int:pk>', view=views.ExerciseTypeUpdateDelete.as_view(), name="exercise-type-single"),
    path(route='workout-plans/sessions/exercises', view=views.ExerciseCreateList.as_view(), name="exercises-list"),
    path(route='workout-plans/sessions/exercises/<int:pk>', view=views.ExerciseUpdateRetrieve.as_view(), name="exercises-edit"),
    path(route='users/', view=views.UserAccountList.as_view(), name="users-view"),
    path(route='muscle-groups', view=views.MuscleGroupListCreate.as_view(), name="muscle-groups"),
    path(route='users/add-to-trainers/<int:pk>', view=views.ChangeUserToTrainer.as_view(), name="add-user-to-trainers"),
]
