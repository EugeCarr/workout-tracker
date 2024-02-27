from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

class WorkoutPlan(models.Model):
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name="client")
    trainer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="PT")
    name = models.CharField(max_length=255)
    
    def __str__(self) -> str:
        return "{}: {}".format(self.client.first_name, self.name)
    
class Session(models.Model):
    workoutPlan = models.ForeignKey(WorkoutPlan, on_delete=models.CASCADE, related_name="sessions")
    name = models.CharField(max_length=255)
    plannedDate = models.DateField()
    completedDate = models.DateField(default=None, null=True)
    description = models.CharField(max_length=255)
    
    def __str__(self) -> str:
        return "{}: {} - {}".format(self.workoutPlan.name, self.name, self.plannedDate)
    
class ExerciseType(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    
    def __str__(self) -> str:
        return self.name
    
class Exercise(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    type = models.ForeignKey(ExerciseType, on_delete=models.CASCADE)
    sets = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(8)])
    repetitions = models.IntegerField(validators=[MinValueValidator(1)], name="reps")
    
    def __str__(self) -> str:
        return "{}: {} set(s) of {}".format(self.session.name, self.sets, self.type.name)
    
class Set(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete=models.PROTECT)
    isAssisted = models.BooleanField(default=False)
    repetitionsAchieved  = models.IntegerField(validators=[MinValueValidator(0)], name="reps_done")
    exertion = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)], name ="RPE")
    weight = models.DecimalField(decimal_places=1, max_digits = 4, validators=[MinValueValidator(0)])
    formRating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    comment = models.CharField(max_length=255)
    
