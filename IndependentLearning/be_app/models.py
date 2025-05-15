from django.db import models
from django.contrib.auth.hashers import make_password
from django.utils import timezone

class Teacher(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100, default="Unknown")
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    classcode = models.CharField(max_length=10, unique=True)
    last_login = models.DateTimeField(default=timezone.now)
    
    # Fields for password reset
    reset_token = models.CharField(max_length=255, null=True, blank=True)
    reset_token_created_at = models.DateTimeField(null=True, blank=True)

    def set_password(self, raw_password):
        """Set a new hashed password."""
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        """Check if the given password matches the stored password."""
        from django.contrib.auth.hashers import check_password
        return check_password(raw_password, self.password)

    def save(self, *args, **kwargs):
        # Ensure password is hashed before saving
        if not self.password.startswith('pbkdf2_') and not self.password.startswith('argon2$'):
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
    subject = models.CharField(max_length=10)

    def __str__(self):
        return self.username


# Quiz Model
class Quiz(models.Model):
    id = models.BigAutoField(primary_key=True)
    teacher = models.ForeignKey("Teacher", on_delete=models.CASCADE, to_field="classcode")
    grade = models.IntegerField()
    max_score =  models.IntegerField()
    subject = models.CharField(max_length=10)

    def __str__(self):
        return f"Quiz {self.id}"  

def get_default_quiz():
    return Quiz.objects.first().id if Quiz.objects.exists() else None

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="questions", default=get_default_quiz)
    prompt = models.TextField(blank=True)
    
    # Either one of these should be set
    question_text = models.TextField(blank=True, null=True)
    question_image = models.ImageField(upload_to="question_images/", blank=True, null=True)

    option_one_text = models.CharField(max_length=255, blank=True)
    option_two_text = models.CharField(max_length=255, blank=True)
    option_three_text = models.CharField(max_length=255, blank=True)

    option_one_image = models.ImageField(upload_to="option_images/", blank=True, null=True)
    option_two_image = models.ImageField(upload_to="option_images/", blank=True, null=True)
    option_three_image = models.ImageField(upload_to="option_images/", blank=True, null=True)

    correct_answer = models.IntegerField(default=1)

    def __str__(self):
        return f"Question {self.id}: {self.question_text or 'Image Question'}"



class StudentScore(models.Model):
    student_username = models.CharField(max_length=100) 
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="scores")
    classcode = models.CharField(max_length=10)
    grade = models.IntegerField()
    score = models.IntegerField()

    def __str__(self):
        return f"{self.student_username} - Grade {self.grade} - Score: {self.score}"
