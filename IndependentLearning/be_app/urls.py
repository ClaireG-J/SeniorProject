from django.urls import path
from . import views

# This is where the react script accesses. You provide the proper url to the views file
# where the functions are housed. The react script will have a line of code something
# like this "fetch("http://127.0.0.1:8000/api/signup/")" and that is how it connects
# to this file.

urlpatterns = [
    path("", views.home, name="home"),
    path("api/teachers/", views.get_teacher_info, name="get_teacher_info"),
    path("api/login/", views.login_teacher, name="login_teacher"),
    path("api/signup/", views.signup_teacher, name="signup_teacher"),
]