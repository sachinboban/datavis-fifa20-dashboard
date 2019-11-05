import React from 'react';
import './css/app.css';
import Navbar from './navbar';
import Dashboard from "./dashboard";
import Story from "./story";
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar/>
                <Switch>
                    <Redirect exact from="/" to="/home" />
                    <Route exact path="/home" component={Dashboard}/>
                    <Route exact path="/story" component={Story}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
