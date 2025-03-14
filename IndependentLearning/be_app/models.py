from django.db import models

# Create your models here.
class Teacher(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100, default="Unknown")
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255, default="Unkown")  # Consider hashing passwords
    classcode = models.BigIntegerField()
    
    def __str__(self):
        return self.name

class Student(models.Model):
    id = models.BigAutoField(primary_key=True)
    username = models.CharField(max_length=100)
    T_id = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.username