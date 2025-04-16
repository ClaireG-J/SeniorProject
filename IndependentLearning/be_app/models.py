from django.db import models
from django.contrib.auth.hashers import make_password

# Teacher Model
class Teacher(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100, default="Unknown")
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    classcode = models.CharField(max_length=10, unique=True)

    def save(self, *args, **kwargs):
        if not self.password.startswith("pbkdf2_sha256$"):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

# Student Model
class Student(models.Model):
    id = models.BigAutoField(primary_key=True)
    username = models.CharField(max_length=100)
    classcode = models.CharField(max_length=10)
    grade = models.IntegerField()

    def __str__(self):
        return self.username


# Quiz Model
class Quiz(models.Model):
    id = models.BigAutoField(primary_key=True)
    teacher = models.ForeignKey("Teacher", on_delete=models.CASCADE, to_field="classcode")
    grade = models.IntegerField()

    def __str__(self):
        return f"Quiz {self.id}"  

def get_default_quiz():
    return Quiz.objects.first().id if Quiz.objects.exists() else None

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="questions", default=get_default_quiz)
    prompt = models.TextField()
    question_text = models.TextField()
    option_one = models.CharField(max_length=255)
    option_two = models.CharField(max_length=255)
    option_three = models.CharField(max_length=255)
    correct_answer = models.IntegerField(default=1)

    def __str__(self):
        return f"Question {self.id}: {self.question_text[:50]}..."

class StudentScore(models.Model):
    student_username = models.CharField(max_length=100) 
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="scores")
    classcode = models.CharField(max_length=10)
    grade = models.IntegerField()
    score = models.IntegerField()

    def __str__(self):
        return f"{self.student_username} - Grade {self.grade} - Score: {self.score}"
