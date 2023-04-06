import React from 'react';
import Main from './Components/Main';
import Movie from './Components/Movie';
import './Components/style.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/movie" element={<Movie />} />
      </Routes>
    </Router>
  );
}

export default App;


/*
import React from 'react';
import Main from './Components/Main';
import Movie from './Components/Movie.js';
import './Components/style.css';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movie">
          <Movie />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
*/