import React, { useEffect, useState, useContext } from "react";
import Button from '../../buton/Button';
import Title from '../../title/Title';
import Screen from '../../screen_bg/Screen'
import { Context } from "../../../providers/provider";
import "./Home.css";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const states = useContext(Context);
  const [lobby_code, changeLobbyCode] = states.lobby_state;
  const [player, changePlayer] = states.player_state;
  const [socket, _] = states.socket_state;
  // const socket = props.socket;
  const navigate = useNavigate();
  useEffect(() => {

    socket.emit('enterHome');

    socket.on('doneCreateLobby', (data) => {
      console.log(data);
      changeLobbyCode(data);
      changePlayer("Player 1")
      navigate("/choose");
    })

    socket.on('P2JoinedLobby', (game_obj) => {
      console.log("p2 joined")
      let p1 = game_obj.p1;
      let p2 = game_obj.p2;
      console.log("P2JOINED")
      navigate('/choose')
    });

    return () => { socket.removeAllListeners() };

  }, []);

  return (
    <div>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* <Screen image="./game_sprites/brick2.png"></Screen> */}
      <div className="title-row">
        <Title class="title-shaking"></Title>
      </div>
      <div className="home">
        <div>
          <Button setPlayer={changePlayer} imageEnter="./game_sprites/create2.png" imageLeave="./game_sprites/create.png" routesPath="/choose" socketEmitEvent={"createLobby"} socket={socket}>dog</Button>
        </div>
        <div>
          <Button setPlayer={changePlayer} imageEnter="./game_sprites/join.png" imageLeave="./game_sprites/join2.png" routesPath="/join" socket={socket}>dog</Button>
        </div>
        <div>
          <Button imageEnter="./game_sprites/credits.png" imageLeave="./game_sprites/credits2.png" routesPath="/credit">dog</Button>
        </div>
        <div>
          <Button imageEnter="./game_sprites/credits.png" imageLeave="./game_sprites/credits2.png" routesPath="/game">dog</Button>
        </div>
      </div>
    </div>
  )
}

export default Home;