import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import CovidData from './components/CovidData/CovidData';

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Header/>
      <Main>
        <CovidData/>
      </Main>
      <Footer/>
    </div>
  );
}

export default App;
