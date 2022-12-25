import axios from 'axios';
import config from './config';


// API call to search for a book given name and title
const search = async (title, author) => {
    const maxResults = 40; // Maximum number of book results to be returned by the API after each search, max num is 40
    if (title) {
        title = title.replace(/\s/g, '+'); // Replace spaces with + for search
    } else {
        title = '';
    }

    if (author) {
        author = author.replace(/\s/g, '+');
        author = `inauthor:${author}`
    } else {
        author = '';
    }
    const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+${author}&key=${config.booksApiKey}&maxResults=${maxResults}`);
    return result;
}

// Method to search for a book given the ID
const getBookByID = async (bookID) => {
    const result = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookID}?key=${config.booksApiKey}`);
    return result;
}

// Add a book to bookshelf
const addBookToLibrary = async (bookID, title, authors, publishDate, imageLink, genres) => {
    const result = await axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/addBookToLibrary/',
        data: JSON.stringify({
            id: bookID,
            title: title,
            authors: authors,
            publishDate: publishDate,
            imageLink: imageLink,
            genres: genres,
        }),
        
    })
    return result;
}

// Get all books in the bookshelf
const getBooksInShelf = async () => {
    const result = await axios.get('http://127.0.0.1:8000/api/getBooksInShelf');
    return result;
}

const api = {
    search,
    getBookByID,
    addBookToLibrary,
    getBooksInShelf,
}

export default api;