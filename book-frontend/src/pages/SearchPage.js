import {React, useState} from "react";
import {TextField, Grid, Button, Card, CardContent, alertClasses} from "@mui/material";
import { Search } from "@mui/icons-material";
import api from '../api'
import MUIDataTable from 'mui-datatables';
import {Link} from 'react-router-dom';

const SearchPage = () => {

  // State to store data for the books that were retrieved from the books
  const [bookData, setBookData] = useState([])

  // Method to search for books using the Google API once the form is submitted
  const handleSearch = async (event) => {
    event.preventDefault();

    // Get values from form
    const title = event.target.booktitle.value;
    const author = event.target.author.value;

    if (title || author) {
      const bookResults = await api.search(title, author);
      setBookData(bookResults.data.items);
    } 
  }

  const handleAddToShelf = async (data) => {
    await api.addBookToLibrary(data.id, data.volumeInfo.title, data.volumeInfo.authors, data.volumeInfo.publishedDate, data.volumeInfo.imageLinks?.thumbnail, data.volumeInfo.categories)
  }

  // Define columns for table to display books 
  const bookColumns = [
    {
      label: 'Book Title',
      name: 'book-title',
      options: {
        sort: true,
        filter: true,
        customBodyRenderLite: (dataIndex) => { // Custom generate the content for each row,
          return (
            <Link style={{color: '#0d6efd'}} to = {{
              pathname: '/bookdetails',
              state: {
                bookID: bookData[dataIndex].id,
              }
            }}>
              {bookData[dataIndex].volumeInfo.title}
            </Link>
          )
        }
      }
    },
    {
      label: 'Cover',
      name: 'book-cover',
      options: {
        customBodyRenderLite: (dataIndex) => {
          return (
            <img src={bookData[dataIndex].volumeInfo?.imageLinks?.smallThumbnail} />
          )
        }
      }
    },
    {
      label: 'Author',
      name: 'book-author',
      options: {
        customBodyRenderLite: (dataIndex) => {
          let authors = ''
          bookData[dataIndex].volumeInfo.authors?.forEach((author) => {
            authors += `${author}, `;
          })
          return authors.slice(0, -2);
        }
      }
    },
    {
      label: 'Genres',
      name: 'book-genres',
      options: {
        customBodyRenderLite: (dataIndex) => {
          let genres = '';
          bookData[dataIndex].volumeInfo.categories?.forEach((genre) => {
            genres += `${genre}, `;
          })
          return genres.slice(0,-2);
        }
      }
    },
    {
      label: 'Action',
      name: 'book-action',
      options: {
        customBodyRenderLite: (dataIndex) => {
          return (
            <Button onClick={() => {handleAddToShelf(bookData[dataIndex])}}>Add to bookshelf</Button>
          )
        }
      }
    }
  ]

  const tableOptions = {
    selectableRows: 'none',
    filter: false,
    print: false,
    download: false,
    // search: false,

    // Define custom search in the table
    customSearch: (searchQuery, currentRow, columns) => {
      searchQuery = searchQuery.toLowerCase(); // convert query to lowercase
      return columns.some((column, index) => {
          if (!column.label || !currentRow[index]) { // handle empty cases
              return false;
          } else if (column.label === "Book Title") {
              return currentRow[index].toString().toLowerCase().includes(searchQuery);
          } else { // default behavior
              return false;
          }
      });
    },
    
  }

  return (
    <>
      <div className="searchTitle">
        <h1> Search for Books! </h1>
      </div>
      
      <Grid container spacing={2} justifyContent="center" alignItems="center" marginBottom="2em">
        <Grid item xs = {8} spacing = {3} justifyContent="center">
          <Card>
            {/* Form for searching for books using book title and author name*/}
            <form onSubmit = {handleSearch}>
            <CardContent>
              <Grid container spacing = {2} justifyContent="center">
                <Grid item xs = {12}>
                  <TextField name="booktitle" style={{backgroundColor: 'white'}} fullWidth id="searchbar" placeholder="Book Title" variant="outlined" />
                </Grid>
                <Grid item xs = {12}>
                  <TextField name="author" style={{backgroundColor: 'white'}} fullWidth id="searchbar" placeholder="Author Name" variant="outlined" />
                </Grid>
                <Grid item xs = {2}>
                  <Button style={{height: '100%', width: '100%', marginLeft: 0, padding: 0, backgroundColor: '#0d6efd', color:'white'}} type="submit" aria-label="searchbutton" startIcon={<Search />}> Search </Button> 
                </Grid>
              </Grid>
            </CardContent>
            </form>
          </Card>
        </Grid>
      </Grid>
      {bookData.length > 0 &&
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={8} spacing={3} justifyContent="center">
          <MUIDataTable
          title = {'Search Results'}
          data = {bookData}
          columns = {bookColumns}
          options = {tableOptions}
          />
        </Grid>
      </Grid>
      }
    </>
  );
};

export default SearchPage;
