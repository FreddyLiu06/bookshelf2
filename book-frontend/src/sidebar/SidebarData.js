import React from 'react'
import {Book, Search} from '@mui/icons-material';

const SidebarData = [
    {
        title: "Book Shelf",
        icon: <Book></Book>,
        link: "/",
        cname: "nav-text",
    },
    {
        title: "Search",
        icon: <Search></Search>,
        link: "/search",
        cname: "nav-text",
    }
]

export default SidebarData;