from django.urls import path
from . import views

urlpatterns = [
    path('addBookToLibrary/', views.addBookToLibrary),
    path('getBooksInShelf', views.getBooksInShelf)
]