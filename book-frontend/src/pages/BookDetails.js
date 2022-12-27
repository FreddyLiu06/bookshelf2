import React, { useEffect, useState } from 'react'
import api from '../api';
import { Grid, Button, Card, CardContent, alertClasses} from "@mui/material";
import { Search } from "@mui/icons-material";
import ReactHtmlParser from 'react-html-parser';

const BookDetails = (props) => {
    // Get ID of book being displayed
    const bookID = props.location.state.bookID;

    const [bookData, setBookData] = useState({});

    const getAuthorNames = () => {
        let authors = '';
        bookData.volumeInfo.authors.forEach((author) => {
            authors = `${author}, `
        })
        return authors.slice(0,-2);
    }

    // Initial method to get the book data from the api
    const init = async () => {
        const result = await api.getBookByID(bookID);
        setBookData(result.data);
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
                                    <Grid item style = {{marginBottom: 2}}>
                                        <img src={bookData.volumeInfo?.imageLinks?.thumbnail}/>
                                    </Grid>
                                    <Grid item>
                                        <Button>Add to bookshelf</Button>
                                    </Grid>

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