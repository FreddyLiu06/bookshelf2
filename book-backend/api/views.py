from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Library
import json

# Create your views here.

# Method to add book to shelf
def addBookToLibrary(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        newBook = Library(
            bookID = data['id'],
            title = data['title'],
            authors = data['authors'],
            publishDate = data['publishDate'],
            imageLink = data['imageLink'],
            genres = data['genres']
        )
        newBook.save()
        return HttpResponse('success')

# Method to get all books in the shelf
def getBooksInShelf(request):
    if request.method == 'GET':
        return JsonResponse({'data': list(Library.objects.values())})