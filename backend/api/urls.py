from django.urls import path
from . import views

urlpatterns = [
    path('notes/<int:id>/', views.NotesList.as_view()),
    path('notes', views.NotesList.as_view()),

]