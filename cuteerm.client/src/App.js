import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import FileSearcher from "./components/file-searcher";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
      
          <h1 className="App-title">BJ's DCS</h1>
        </header>
        <div className="App-intro">
          <Router>
            <div>
              <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                  <ul className="nav nav navbar-nav">
                    <li role="presentation" className="active"><Link to="/filesearch">File Search</Link></li>

                  </ul>
                </div>
              </nav>
              <hr />
              <Route exact  path="/" component={FileSearcher} />
              <Route path="/filesearch" component={FileSearcher} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}





export default App;
