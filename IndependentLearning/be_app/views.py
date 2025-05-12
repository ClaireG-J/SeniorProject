from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from .models import Teacher
from .models import Student
from .models import Quiz
from .models import Question
from .models import StudentScore
from .serializers import TeacherSerializer
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from django.contrib.auth.tokens import default_token_generator
import secrets
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings


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
            username = data.get("username", "").strip()
            classcode = data.get("classcode")
            grade = data.get("grade")

            # Validate required fields
            if not username or not classcode or grade is None:
                return JsonResponse({"error": "Missing required fields."}, status=400)

            # Check if teacher exists
            teacher = Teacher.objects.filter(classcode=classcode).first()
            if not teacher:
                return JsonResponse({"error": "Invalid teacher code."}, status=404)

            # Check if student already exists (case-insensitive username match)
            existing_student = Student.objects.filter(
                username__iexact=username,
                classcode=classcode,
                grade=grade
            ).first()

            if existing_student:
                return JsonResponse({"error": "Student already exists with this name and class code."}, status=400)

            # Create the new student
            student = Student.objects.create(
                username=username,
                classcode=classcode,
                grade=grade
            )

            # Find matching quiz
            quiz = Quiz.objects.filter(teacher__classcode=classcode, grade=grade).first()
            if not quiz:
                return JsonResponse({"error": "No quiz found for this grade and teacher."}, status=404)

            return JsonResponse({
                "teacher_id": classcode,
                "grade": grade,
                "quiz_id": quiz.id,
                "username": student.username,
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)



@csrf_exempt
def get_all_questions(request, quiz_id):
    try:
        quiz = Quiz.objects.get(id=quiz_id)  # Raises exception if no quiz is found
    except Quiz.DoesNotExist:
        return JsonResponse({"error": "Quiz not found"}, status=404)
    questions = Question.objects.filter(quiz=quiz).order_by("id")
    
    if not questions:
        return JsonResponse({"questions": []}, status=200)  # Return empty array if no questions

    question_data = []
    for question in questions:
        question_data.append({
            "question_text": question.question_text,
            "prompt": question.prompt,  # Ensure 'prompt' is a valid field
            "correct_answer": question.correct_answer,
            "options": [
                {
                    "text": question.option_one_text,
                    "image": request.build_absolute_uri(question.option_one_image.url) if question.option_one_image else None
                },
                {
                    "text": question.option_two_text,
                    "image": request.build_absolute_uri(question.option_two_image.url) if question.option_two_image else None
                },
                {
                    "text": question.option_three_text,
                    "image": request.build_absolute_uri(question.option_three_image.url) if question.option_three_image else None
                }
            ]
        })

    return JsonResponse({"questions": question_data, "max_score": quiz.max_score}, status=200)








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
def create_quiz(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # Retrieve teacher by classcode
            teacher = Teacher.objects.filter(classcode=data["classcode"]).first()
            if not teacher:
                return JsonResponse({"error": "Teacher with this classcode does not exist."}, status=400)

            # Create the Quiz
            quiz = Quiz.objects.create(teacher=teacher, grade=data["grade"])

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
            quiz = Quiz.objects.filter(id=quiz_id).first()
            if not quiz:
                return JsonResponse({"error": "Quiz not found"}, status=404)

            data = request.POST
            files = request.FILES

            question_text = data.get("question_text")
            question_image = files.get("question_image")

            if not question_text and not question_image:
                return JsonResponse({"error": "Either question_text or question_image is required"}, status=400)

            prompt = data.get("prompt")
            correct_answer = data.get("correct_answer")

            # Must provide correct answer
            if not correct_answer:
                return JsonResponse({"error": "correct_answer is required"}, status=400)

            try:
                correct_answer = int(correct_answer)
                if correct_answer not in [1, 2, 3]:
                    raise ValueError()
            except ValueError:
                return JsonResponse({"error": "Correct answer must be 1, 2, or 3"}, status=400)

            # Use exact model field names here
            option_one_text = data.get("option_one_text", "")
            option_two_text = data.get("option_two_text", "")
            option_three_text = data.get("option_three_text", "")

            option_one_image = files.get("option_one_image")
            option_two_image = files.get("option_two_image")
            option_three_image = files.get("option_three_image")

            question = Question.objects.create(
                quiz=quiz,
                prompt=prompt,
                question_text=question_text,
                question_image=question_image,
                correct_answer=correct_answer,
                option_one_text=option_one_text,
                option_two_text=option_two_text,
                option_three_text=option_three_text,
                option_one_image=option_one_image,
                option_two_image=option_two_image,
                option_three_image=option_three_image,
            )

            return JsonResponse({
                "message": "Question created successfully",
                "question_id": question.id
            }, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid HTTP method"}, status=405)




@api_view(['POST'])
def submit_score(request):
    data = request.data
    print("Received data:", data)

    quiz_id = data.get('quizId')
    score = data.get('score')
    classcode = data.get('classcode')
    username = data.get('username')
    grade = data.get('grade')

    if not all([quiz_id, score, username, grade]):
        return Response({'error': 'Missing required fields'}, status=400)

    try:
        student = get_object_or_404(Student, username=username, grade=grade)

        quiz = get_object_or_404(Quiz, id=quiz_id)

        if StudentScore.objects.filter(student_username=username, quiz=quiz).exists():
            return Response({'message': 'Score already submitted for this student and quiz.'}, status=200)

        StudentScore.objects.create(
            student_username=username, 
            quiz=quiz,
            grade=grade,
            score=score,
            classcode = classcode
        )

        return Response({'message': 'Score submitted successfully'}, status=200)

    except Exception as e:
        print("Error:", str(e))
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def get_student_score(request, student_username, grade):
    try:
        score = StudentScore.objects.get(student_username=student_username, grade=grade)
        
        return Response({
            'score': score.score,
            'grade': score.grade,
        }, status=200)
    except StudentScore.DoesNotExist:
        return Response({'error': 'Score not found for this student and grade.'}, status=400)


@api_view(['GET'])
def get_scores_by_classcode(request, classcode):
    try:
        grade = request.query_params.get('grade', None)

        if grade:
            student_scores = StudentScore.objects.filter(classcode=classcode, grade=grade)
        else:
            student_scores = StudentScore.objects.filter(classcode=classcode)

        scores_data = [
            {
                'student_username': score.student_username,
                'score': score.score,
            }
            for score in student_scores
        ]

        return Response(scores_data)

    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
def forgot_password(request):
    email = request.data.get('email')
    user = get_object_or_404(Teacher, email=email)

    token = secrets.token_urlsafe(32)

    user.reset_token = token
    user.reset_token_created_at = timezone.now()
    user.save()

    reset_link = f"http://localhost:3000/reset-password/{user.pk}/{token}" 

    send_mail(
        'Password Reset Request',
        f'Click the link to reset your password: {reset_link}',
        settings.DEFAULT_FROM_EMAIL,
        [email],
    )
    return Response({"message": "Password reset email sent."}, status=200)


@api_view(['POST'])
def reset_password(request, uid, token):
    try:
        user = Teacher.objects.get(pk=uid)
    except Teacher.DoesNotExist:
        return Response({"error": "Invalid user."}, status=400)

    if user.reset_token != token:
        return Response({"error": "Invalid or expired token."}, status=400)

    if (timezone.now() - user.reset_token_created_at).total_seconds() > 3600:
        return Response({"error": "Token expired."}, status=400)

    new_password = request.data.get('password')
    if not new_password:
        return Response({"error": "Password is required."}, status=400)

    user.set_password(new_password)
    user.reset_token = None
    user.reset_token_created_at = None
    user.save()

    return Response({"message": "Password reset successful."})


@api_view(['DELETE'])
def delete_student_and_score(request, username):
    try:
        # Delete related scores first
        StudentScore.objects.filter(student_username=username).delete()

        # Then delete the student
        student = Student.objects.get(username=username)
        student.delete()

        return Response({"message": "Student and scores deleted"}, status=204)
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=404)






