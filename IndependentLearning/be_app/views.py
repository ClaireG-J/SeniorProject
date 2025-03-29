from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from .models import Teacher
from .serializers import TeacherSerializer
from django.contrib.auth.hashers import make_password, check_password

# This is essentially where the functions are for the backend. The functions go here
# and the react script accesses it using the urls.py file. In the urls.py file you
# add a connection to these functions.

# Create your views here.
def home(request):
    return render(request, 'home.html')

# Fetch all teacher info
@api_view(['GET'])
def get_teacher_info(request):
    teacher_info = Teacher.objects.all()
    serializer = TeacherSerializer(teacher_info, many=True)
    return Response(serializer.data)

# Teacher signup with hash handling
@api_view(['POST'])
def signup_teacher(request):
    name = request.data.get("name")
    email = request.data.get("email")
    password = request.data.get("password")
    classcode = request.data.get("classcode")

    if Teacher.objects.filter(email=email).exists():
        return Response({"error": "Email alreader registered"}, status=400)

    hashed_password = make_password(password) # Hash the password before storing
    teacher = Teacher.objects.create(
        name=name,
        email=email,
        password=hashed_password,
        classcode=classcode
    )
    return Response({"message": "Signup successful", "teacher": teacher.name})

@api_view(['POST'])
def login_teacher(request):
    email = request.data.get("email")
    password = request.data.get("password")
    
    try:
        teacher = Teacher.objects.get(email=email)
        if check_password(password, teacher.password):  
            return Response({
                "message": "Login successful",
                "teacher": teacher.name,
                "classcode": teacher.classcode 
            })
        else:
            return Response({"error": "Invalid credentials"}, status=401)
    except Teacher.DoesNotExist:
        return Response({"error": "Teacher not found"}, status=404)


