import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Button from './components/buton/Button';
import Title from './components/title/Title';
import Screen from './components/screen_bg/Screen'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from './providers/provider';
import Home from "./components/screens/home/Home";
import Choose from "./components/screens/choose/Choose";
import Credit from './components/screens/credit/Credit';
import Join from './components/screens/join/Join';
import Game from './components/screens/game/game';
import Options from './components/screens/options/Options';
import Victory from './components/screens/victory/victory';
// import background from './img/brick2.png'
import useSound from 'use-sound'

import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

const PORT = 'http://localhost:2000/'
let socket: Socket = io(PORT);

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const lobby_state = useState<string>(""); // what the lobby code is
  const player_state = useState<string>(""); // which player the user is (1 or 2)
  const socket_state = useState<Socket>(socket); // user's socket
  const character = useState<string>(""); // user's selected character 
  const char2 = useState<string>(""); // other player's character

  // global variables all components have access to (no props drilling necessary)
  let __dict__ = {
    lobby_state: lobby_state, 
    player_state: player_state, 
    socket_state: socket_state, 
    character_state: character, 
    char2_state: char2 }


  const [playSound] = useSound("./game_audio/home_audio.mp3", { volume: 0.03, loop: true })
  playSound();

  useEffect(() => {
    console.log("rattle")

    if (!socket) {
      socket = io(PORT);
    }
    socket.on('connect', () => {
      console.log("client now is connected with id " + socket.id);
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log("client is disconnected")
      player_state[1]("")
      setIsConnected(false);
    });

    return () => { socket.removeAllListeners() }; //socket cleanup when webapp closes

  }, []);


  return (
    <div>
      <Provider contexts={__dict__}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/choose" element={<Choose />} />
            <Route path="/join" element={<Join />} />
            <Route path="/credit" element={<Credit />} />
            <Route path="/options" element={<Options />} />
            {/* DELETE ME LATER */}
            <Route path="/game" element={<Game />} />
            <Route path="/victory" element={<Victory />} />
          </Routes>
        </Router>
      </Provider>
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
    </div>
  );
}

export default App;
