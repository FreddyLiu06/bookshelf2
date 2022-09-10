from django.db import models

# Create your models here.

class Library(models.Model):
    bookID = models.CharField(max_length = 100) # Volume ID of the book
    title = models.CharField(max_length = 100) # Title of book
    authors = models.TextField() # Authors of book
    publishDate = models.CharField(max_length = 100) # Publish Date
    imageLink = models.TextField() # Link to image
    genres = models.TextField() # Genres