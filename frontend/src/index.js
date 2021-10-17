import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Profil from './pages/Profil';
import Navbar from './components/Navbar';

ReactDOM.render(
      <Router>
          <Navbar />

          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/profil" exact component={Profil} />
              <Redirect to="/" />
          </Switch>
    </Router>,
    document.getElementById("root")
);