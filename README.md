# Book Shelf Project
This acts as a personal bookshelf for the user (me) to keep track of the books that I have been reading, or that I am interested in. The main motivation of creating this project was to get familiar with the Django framework, and linking the Django backend to a frontend website and practice full stack development. It is not a completely finished project due to time constraints

## Summary + Features
The search page allows the user (me) to search for any book. I used the Google books API since it is free and contains a wide variety of book information for me to use. The search results are displayed in a user friendly manner with the key information for each book stored in a table. I am able to click into a book to get a more 'detailed' look at the book. There is also an option to add the book to the bookshelf. \
*Note: Only the 'add to bookshelf' button on the search page works, I have not yet implemented the functionality for the book detail page*. \
The bookshelf is then stored in the backend database that I created using DJango. This is so that I can later access the bookshelf to see what books I have added in the 'Bookshelf' page.

## Running the Project
A development server can be set up by following these steps:\
1. Download and install node and django
2. Clone the repository to local device
3. Open up terminal in the frontend folder 'book-frontend' and execute\
    ```
        npm install
        npm run start
    ```
4. In another terminal, go to backend folder 'books-backend' and execute
    ```
        pipenv sync
        python manage.py runserver 8000
    ```
5. If the above commands do not work for the backend, try
   ```
        pipenv install
        pip install django
        pip install django-cors-headers
