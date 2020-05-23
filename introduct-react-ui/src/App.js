import React from 'react';
import './books/BookList'
import BookList from './books/BookList'
import BookDetails from './books/BookDetails'
import BookAdd from './books/BookAdd'
import BookEdit from './books/BookEdit'
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

function App() {
  return (
    <div className={'container'}>
      <Router>
        <Route path={'/list'} component={BookList}/>
        <Route path={'/details/:id'} component={BookDetails}/>
        <Route path={'/edit/:id'} component={BookEdit}/>
        <Route path={'/add'} component={BookAdd}/>
        <Redirect from={''} to={'/list'}/>
      </Router>
    </div>
  )
}

export default App;
