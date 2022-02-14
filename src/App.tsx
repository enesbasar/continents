import React from 'react';
import logo from './logo.svg';
import './App.css';
import Continents from './Continents';
import ExchangeRates from './ExchangeRates';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Continents
          continents={[
            {name: 'avrupa', value: 1},
            {name: 'avrupa', value: 2},
            {name: 'avrupa', value: 3},
            {name: 'avrupa', value: 4},
          ]}
        />
        {/* <ExchangeRates/> */}
      </header>
    </div>
  );
}

export default App;
