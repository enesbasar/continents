import React from 'react';
import logo from './logo.svg';
import './App.css';
import Continents from '../Pages/Continents/Continents';
import ExchangeRates from '../ExchangeRates';
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* 
      <header className="App-header">
        <Continents
          continents={[
            {name: 'avrupa', value: 1},
            {name: 'avrupa', value: 2},
            {name: 'avrupa', value: 3},
            {name: 'avrupa', value: 4},
          ]}
        />
        <Router />
        <ExchangeRates/>
      </header>
    </div> */}
      <div className="App">
        <div className='sidebar-wrapper'>
          <ul>
            <li className='home'>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/continents">Continents</Link>
            </li>
          </ul>
        </div>
        <header className="App-header">
          <Routes>
            <Route path="/" element={<div>Welcome</div>} />
            <Route path="/continents" element={<Continents />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
