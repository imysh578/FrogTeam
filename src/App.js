import React from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Routes} from
 'react-router-dom'

 import Home from './pages';
import CoinDetail from './components/ChartSection/Coingecko/CoinDetail';

function App() {
  return (
    <Router>
      <Home />
      <Routes>
        <Route path='coin'>
          <Route path=':id' element={<CoinDetail />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
