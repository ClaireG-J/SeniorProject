from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("api/teachers/", views.get_teacher_info, name="get_teacher_info"),
    path("api/login/", views.login_teacher, name="login_teacher"),
]