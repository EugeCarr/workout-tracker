# Generated by Django 5.0.2 on 2024-03-05 17:42

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ExerciseType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('plannedDate', models.DateField()),
                ('completedDate', models.DateField(default=None, null=True)),
                ('description', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='WorkoutPlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Exercise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sets', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(8)])),
                ('reps', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='WorkoutTrackerAPI.exercisetype')),
                ('session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='WorkoutTrackerAPI.session')),
            ],
        ),
        migrations.CreateModel(
            name='Set',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isAssisted', models.BooleanField(default=False)),
                ('reps_done', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('RPE', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10)])),
                ('weight', models.DecimalField(decimal_places=1, max_digits=4, validators=[django.core.validators.MinValueValidator(0)])),
                ('formRating', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10)])),
                ('comment', models.CharField(max_length=255)),
                ('exercise', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='WorkoutTrackerAPI.exercise')),
            ],
        ),
    ]
