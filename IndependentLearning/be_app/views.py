from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from .models import Teacher
from .models import Student
from .models import Quiz
from .models import Question
from .serializers import TeacherSerializer
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.shortcuts import get_object_or_404


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


@csrf_exempt
def student_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            classcode = data.get("classcode")

           
            student = Student.objects.get(username=username, classcode=classcode)  

            teacher_id = student.classcode 
            grade = student.grade

            # Get the quiz for this teacher and grade
            quiz = Quiz.objects.filter(teacher__classcode=classcode, grade=grade).first()

            if not quiz:
                return JsonResponse({"error": "No quiz found for this grade and teacher."}, status=404)

            return JsonResponse({
                "teacher_id": teacher_id,
                "grade": grade,
                "quiz_id": quiz.id 
            })

        except Student.DoesNotExist:
            return JsonResponse({"error": "Student not found. Check name and teacher code."}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)



@csrf_exempt
def get_all_questions(request, quiz_id):
    try:
        quiz = Quiz.objects.filter(id=quiz_id).first()
        if not quiz:
            return JsonResponse({"error": "Quiz not found"}, status=404)

        questions = Question.objects.filter(quiz=quiz).order_by("id")
        if not questions:
            return JsonResponse({"error": "No questions found for this quiz"}, status=404)

        question_data = []
        for question in questions:
            question_data.append({
                "question_text": question.question_text,
                "option_one": question.option_one,
                "option_two": question.option_two,
                "option_three": question.option_three,
                "correct_answer": question.correct_answer,
                "prompt": question.prompt,
            })

        return JsonResponse({"questions": question_data})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)




@csrf_exempt  # Disable CSRF for simplicity (only for testing, use proper authentication in production)
def create_student(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            classcode = data.get("classcode")  # Classcode should be a string
            grade = data.get("grade")

            if not username or not classcode or not grade:
                return JsonResponse({"error": "Missing required fields"}, status=400)

            # Get the Teacher instance using classcode to verify it exists
            teacher = get_object_or_404(Teacher, classcode=classcode)

            # Create student with the classcode stored as a string
            student = Student.objects.create(username=username, classcode=classcode, grade=grade)

            return JsonResponse({"message": "Student created successfully", "student_id": student.id})
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
    
    return JsonResponse({"error": "Invalid request method"}, status=405)




@csrf_exempt
def create_quiz_with_questions(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # Retrieve teacher by classcode
            teacher = Teacher.objects.filter(classcode=data["classcode"]).first()
            if not teacher:
                return JsonResponse({"error": "Teacher with this classcode does not exist."}, status=400)

            # Create the Quiz
            quiz = Quiz.objects.create(teacher=teacher, grade=data["grade"])

            # Add Questions
            for q in data["questions"]:
                Question.objects.create(
                    quiz=quiz,
                    prompt=q["prompt"],
                    question_text=q["question_text"],
                    option_one=q["option_one"],
                    option_two=q["option_two"],
                    option_three=q["option_three"],
                    correct_answer=q["correct_answer"],
                )

            return JsonResponse({"message": "Quiz created successfully!", "quiz_id": quiz.id}, status=201)

        except KeyError as e:
            return JsonResponse({"error": f"Missing key: {str(e)}"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method."}, status=405)


@csrf_exempt
def create_question(request, quiz_id):
    if request.method == "POST":
        try:
            # Get the quiz by its ID
            quiz = get_object_or_404(Quiz, id=quiz_id)

            # Parse the JSON body
            data = json.loads(request.body)

            # Retrieve data from the POST request (now it's a dictionary)
            question_text = data.get("question_text")
            option_one = data.get("option_one")
            option_two = data.get("option_two")
            option_three = data.get("option_three")
            correct_answer = data.get("correct_answer")
            prompt = data.get("prompt")

            # Validate that the data is complete
            if not question_text or not option_one or not option_two or not option_three or correct_answer is None:
                return JsonResponse({"error": "Invalid input data"}, status=400)

            # Ensure correct_answer is an integer and within valid options
            try:
                correct_answer = int(correct_answer)  # Convert string to integer
            except ValueError:
                return JsonResponse({"error": "Invalid correct_answer value"}, status=400)

            if correct_answer not in [1, 2, 3]:
                return JsonResponse({"error": "Correct answer must be one of 1, 2, or 3"}, status=400)

            # Create the new question
            question = Question.objects.create(
                quiz=quiz,
                question_text=question_text,
                option_one=option_one,
                option_two=option_two,
                option_three=option_three,
                correct_answer=correct_answer,
                prompt=prompt,
            )

            return JsonResponse({
                "message": "Question created successfully",
                "question_id": question.id,
                "question_text": question.question_text
            }, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid HTTP method"}, status=405)
