import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Button from './components/buton/Button';
import Title from './components/title/Title';
import Screen from './components/screen_bg/Screen'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

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
  const [socketObj, setSocket] = useState(socket);
  const [lobbyCode, changeLobbyCode] = useState<string>("");

  const [playSound, {sound}] = useSound("./game_audio/home_audio.mp3", {volume: 0.03, loop: true})
  playSound();

  useEffect(() => {
    if (!socket) {
      socket = io(PORT);
    }
    socket.on('connect', () => {
      console.log("client is connected")
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log("client is disconnected")
      setIsConnected(false);
    });

    return () => { socket.removeAllListeners() };
  }, []);

  return (
    <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home socket={socketObj} changeLobbyCode={changeLobbyCode} />} />
            <Route path="/choose" element={<Choose socket={socketObj} lobby_code={lobbyCode} />} />
            <Route path="/join" element={<Join socket={socketObj} changeLobbyCode={changeLobbyCode} />} />
            <Route path="/credit" element={<Credit />} />
            <Route path="/options" element={<Options />} />
            {/* DELETE ME LATER */}
            <Route path="/game" element={<Game socket={socketObj} />} />
            <Route path="/victory" element={<Victory />} />
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
    </div>
  );
}

export default App;
