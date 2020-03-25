import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { useHistory } from "react-router";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Index from './index';
import Login from './components/Login';
import Register from './components/Register';

function Routing() {

  return (
    <Router> 
        <Switch>
          { localStorage.getItem('usertoken') && 
              <Route exact path="/" component={Index} />
          }

          { localStorage.getItem('usertoken') == null && 
             <Route exact path="/" component={Login} />
          }
          <Route exact path="/register" component={Register} />
        </Switch>
    </Router>
  );
}

export default Routing;