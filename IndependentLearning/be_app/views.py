from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from .models import Teacher
from .serializers import TeacherSerializer

# Create your views here.
def home(request):
    return render(request, 'home.html')

@api_view(['GET'])
def get_teacher_info(request):
    teacher_info = Teacher.objects.all()
    serializer = TeacherSerializer(teacher_info, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def login_teacher(request):
    email = request.data.get("email")
    password = request.data.get("password")
    
    try:
        teacher = Teacher.objects.get(email=email)
        if teacher and teacher.password == password:  # Simplified authentication
            return Response({"message": "Login successful", "teacher": teacher.name})
        else:
            return Response({"error": "Invalid credentials"}, status=401)
    except Teacher.DoesNotExist:
        return Response({"error": "Teacher not found"}, status=404)