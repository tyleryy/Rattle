import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Button from './components/buton/Button';
import Title from './components/title/Title';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          <Title></Title>
        </p>
        <Button imageEnter="./game_sprites/create2.png" imageLeave="./game_sprites/create.png">dog</Button>
        <Button imageEnter="./game_sprites/join.png" imageLeave="./game_sprites/join2.png">dog</Button>
        <Button imageEnter="./game_sprites/credits.png" imageLeave="./game_sprites/credits2.png">dog</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
