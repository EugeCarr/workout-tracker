from django.contrib import admin
from . import models

admin.site.register(models.WorkoutPlan)
admin.site.register(models.Session)
admin.site.register(models.ExerciseType)
admin.site.register(models.Exercise)
admin.site.register(models.Set)
admin.site.register(models.MuscleGroup)
