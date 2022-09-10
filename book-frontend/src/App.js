import api from "./api";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Shelf from "./pages/Shelf";
import SearchPage from './pages/SearchPage';
import BookDetails from "./pages/BookDetails";

function App() {

  return (
    <div className = "App">
      <Router>
        <Sidebar />
        <Switch>
          <Route path = '/' exact component={Shelf}/>
          <Route path = '/search' exact component={SearchPage} />
          <Route path = '/bookdetails' exact component={BookDetails} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
