import React from 'react';


// Router
import { BrowserRouter, Route } from 'react-router-dom';

// Pages
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostList from "../pages/PostList";



function App() {
  return (
    <React.Fragment>
      {/* Router */}
      <BrowserRouter>
        <Route path='/login' exact compnent={Login} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/postlist' exact component={PostList} />
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
