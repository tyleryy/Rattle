import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Button from './components/buton/Button';
import Title from './components/title/Title';
import Screen from './components/screen_bg/Screen'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/screens/home/Home";
import Choose from "./components/screens/choose/Choose";
import Credit from './components/screens/credit/Credit';
import Join from './components/screens/join/Join';
import Game from './components/screens/game/game';
// import background from './img/brick2.png'

import io from 'socket.io-client';

const socket = io();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/choose" element={<Choose />} />
            <Route path="/join" element={<Join />} />
            <Route path="/credit" element={<Credit />} />
            {/* DELETE ME LATER */}
            <Route path="/game" element={<Game />} />
          </Routes>
        </Router>
        {/*
        <Screen image="./game_sprites/brick2.png"></Screen>
        <div className = "home">
          <span>
            <Title class="title-shaking"></Title>
          </span>
          <div>
            <Button imageEnter="./game_sprites/create2.png" imageLeave="./game_sprites/create.png">dog</Button>
          </div>
          <div>
            <Button imageEnter="./game_sprites/join.png" imageLeave="./game_sprites/join2.png">dog</Button>
          </div>
          <div>
          <Button imageEnter="./game_sprites/credits.png" imageLeave="./game_sprites/credits2.png">dog</Button>
          </div>
        </div>
    */}
      </header>
    </div>
  );
}

export default App;
