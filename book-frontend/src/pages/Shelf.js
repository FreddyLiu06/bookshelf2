import {useEffect, useState} from 'react'
import {Grid, Card, CardContent} from '@mui/material'
import MUIDataTable from 'mui-datatables' 
import {Link} from 'react-router-dom'
import api from '../api'

const Shelf = () => {
    const [shelfData, setShelfData] = useState([])

    // Method to get bookshelf data from api
    const init = async () => {
        const result = await api.getBooksInShelf();
        setShelfData(result.data.data);
    }

    useEffect(()=> {
        init();
    }, [])

    // Columns to display bookshelf
    const shelfColumns = [
        {
          label: 'Book Title',
          name: 'book-title',
          options: {
            sort: true,
            filter: true,
            customBodyRenderLite: (dataIndex) => {
              return (
                <Link style={{color: '#0d6efd'}} to = {{
                  pathname: '/bookdetails',
                  state: {
                    bookID: shelfData[dataIndex].bookID,
                  }
                }}>
                  {shelfData[dataIndex].title}
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
                <img src={shelfData[dataIndex].imageLink} />
              )
            }
          }
        },
        {
          label: 'Author',
          name: 'book-author',
          options: {
            customBodyRenderLite: (dataIndex) => {
              const authArrayString = shelfData[dataIndex].authors;
              const json = authArrayString.replace(/'/g, `"`);
              const authArray = JSON.parse(json);
              let authors = ''
              authArray.forEach((author) => {
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
                const genreArrayString = shelfData[dataIndex].genres;
                const json = genreArrayString.replace(/'/g, `"`);
                const genreArray = JSON.parse(json);
                let genres = ''
                genreArray.forEach((genre) => {
                  genres += `${genre}, `;
                })
                return genres.slice(0, -2);
            }
          }
        },
    ]

    const shelfOptions = {
        selectableRows: 'none',
        filter: false,
        print: false,
        download: false,
        search: false,
    }

    return (
        <>
        <h1 className = "searchTitle">Book Shelf</h1>
        {shelfData.length > 0 &&
        <Grid container justifyContent='center'>
            <Grid container item xs={8} justifyContent='center'>
                <MUIDataTable style = {{width: '100%'}}
                data = {shelfData}
                columns = {shelfColumns}
                options = {shelfOptions} />
            </Grid>
        </Grid>
        }
        </>
    )
}

export default Shelf