from django.db import models

# Create your models here.
class Teacher(models.Model):
    id = models.BigIntegerField(primary_key=True)
    email = models.CharField(max_length=100)
    classcode = models.BigIntegerField()
    def __str__(self):
        return self.name

class Student(models.Model):
    id = models.BigIntegerField(primary_key=True)
    username = models.CharField(max_length=100)
    T_id = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    def __str__(self):
        return self.name