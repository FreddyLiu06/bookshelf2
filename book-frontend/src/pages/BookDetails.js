import React, { useEffect, useState } from 'react'
import api from '../api';
import { Grid, Button, Card, CardContent, alertClasses} from "@mui/material";
import { Search } from "@mui/icons-material";
import ReactHtmlParser from 'react-html-parser';

const BookDetails = (props) => {
    // Get ID of book being displayed
    const bookID = props.location.state.bookID;
    const idSet = new Set();

    const [bookData, setBookData] = useState({});
    const [idSetState, setIdSetState] = useState(new Set()) // State for set of bookIDs in shelf

    const getAuthorNames = () => {
        let authors = '';
        bookData.volumeInfo.authors.forEach((author) => {
            authors = `${author}, `
        })
        return authors.slice(0,-2);
    }

    // Method that gets all bookIDs that are in shelf and stores it in idSet
    const getAllIDInShelf = async () => {
        const shelfQ = await api.getBooksInShelf();
        const shelfarr = shelfQ.data.data;
        for (const book of shelfarr) {
            idSet.add(book['bookID']);
        }
    }

    // Initial method to get the book data from the api
    const init = async () => {
        const bookQ = await api.getBookByID(bookID);
        setBookData(bookQ.data);
        getAllIDInShelf();
        setIdSetState(idSet);
    }

    const handleAddToShelf = async (data) => {
        await api.addBookToLibrary(data.id, data.volumeInfo.title, data.volumeInfo.authors, data.volumeInfo.publishedDate, data.volumeInfo.imageLinks?.thumbnail, [data.volumeInfo.categories[0]]);
        idSet.add(data.id);
        setIdSetState(idSet);
      }
    
      const handleRemoveFromShelf = async (bookID) => {
        await api.removeBook(bookID);
        idSet.delete(bookID);
        setIdSetState(idSet);
      }

    useEffect(() => {
        init();
    }, [])

    return (
        <React.Fragment>
            <Grid container spacing={2} justifyContent='center'>
                <Grid item xs = {8.5} spacing={2} justifyContent='center'>
                    {Object.keys(bookData).length > 0 ?
                    <Card>
                        <CardContent>
                            <Grid container spacing={1} justifyContent='center'>
                                <Grid container item xs = {2} justifyContent='center'>
                                    <div align="center">
                                        <img src={bookData.volumeInfo?.imageLinks?.thumbnail}/>
                                        {idSetState.has(bookID) ? 
                                        <Button height="90%" style={{color: 'red'}} onClick={() => {handleRemoveFromShelf(bookData.id)}}>Remove from shelf</Button> : 
                                        <Button height="90%" onClick={() => {handleAddToShelf(bookData)}}>Add to bookshelf</Button>}
                                    </div>
                                </Grid>
                                <Grid item xs = {10}>
                                    <h1>{bookData.volumeInfo.title}</h1>
                                    <h2 style={{fontWeight: 'normal'}}>{getAuthorNames()}</h2>
                                    <br></br>
                                    <div>{ReactHtmlParser(bookData.volumeInfo.description)}</div>
                                    <br></br>
                                    <a style={{display:'inline'}} href={bookData.volumeInfo.previewLink}>Google Books</a>
                                    <p style={{color: 'grey', fontSize: 10}}>Published {bookData.volumeInfo.publishedDate}</p>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card> : 'LOADING'
                    }
                </Grid>
            </Grid>
        </React.Fragment>
     )
}

export default BookDetails