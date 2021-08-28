import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './index.css';
import App from './screen/App/App';
import CheckCookies from './res/CheckCookies';
import Auth from './screen/Auth/Auth';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={Auth}/>
        <Route exact path="/home">
            { CheckCookies() === false ? 
              <Redirect to="/" /> :
              <App/>
             }

        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);