import React from 'react';


// Router
import { BrowserRouter, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

// Pages
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostList from "../pages/PostList";
import Footer from './Footer'



function App() {
  return (
    <React.Fragment>
      {/* Router */}
      <ConnectedRouter history={history}>
        <Route path='/' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/postlist' exact component={PostList} />
      </ConnectedRouter>
    </React.Fragment>
  );
};

export default App;
