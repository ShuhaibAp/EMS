from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Form(models.Model):
    fname=models.CharField(max_length=100)
    user=models.ForeignKey(User, related_name='forms', on_delete=models.CASCADE)

    def __str__(self):
        return self.fname

class Fields(models.Model):
    INPUT_TYPES = [
        ('text', 'Text'),
        ('number', 'Number'),
        ('date', 'Date'),
        ('password', 'Password'),
    ]
    form=models.ForeignKey(Form, related_name='fields', on_delete=models.CASCADE)
    label=models.CharField(max_length=100)
    input_type=models.CharField(max_length=20, choices=INPUT_TYPES)
    order=models.PositiveIntegerField()

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.label} ({self.input_type})"

class UserProfile(models.Model):
    image=models.ImageField(upload_to="profile_images", blank=True, null=True)
    user=models.OneToOneField(User, on_delete=models.CASCADE)
    bio=models.TextField()
    date=models.DateField(auto_now_add=True)

    def __str__(self):
        return self.username

class Employee(models.Model):
    form=models.ForeignKey(Form, on_delete=models.CASCADE)
    field_data=models.JSONField()  # Replaces EmployeeFieldData model

    def __str__(self):
        return f"Employee: {self.profile.username} for Form: {self.form.fname}"


