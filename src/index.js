import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" component={App}/>
      <Route exact path="/:isMatrix" component={App}/>
      <Route path="/:isMatrix/:isPCP/:dataset/:method/:sample" component={App}/>
    </Router>

    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

