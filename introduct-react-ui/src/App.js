import React from 'react';
import './books/BookList'
import BookList from './books/BookList'
import BookDetails from './books/BookDetails'
import BookAdd from './books/BookAdd'
import BookEdit from './books/BookEdit'
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

function App() {
  return (
    <div style={{width: '500px', padding: '20px', margin: '10px auto', border: '1px solid #28a745', borderRadius: '6px'}}>
      <Router>
        <Route path={'/list'} component={BookList}/>
        <Route path={'/details/:id'} component={BookDetails}/>
        <Route path={'/edit/:id'} component={BookEdit}/>
        <Route path={'/add'} component={BookAdd}/>
        <Redirect from={''} to={'/list'}/>
      </Router>
    </div>
  );
}

export default App;
