import React, { useEffect, useState, useContext } from "react";
import Button from '../../buton/Button';
import { Context } from "../../../providers/provider";
import Title from '../../title/Title';
import { Stage, AnimatedSprite, PixiComponent } from '@inlet/react-pixi'
import ButtonPetr from '../../buton/ButtonPetr'
import "./Home.css";
import { useNavigate } from "react-router-dom";


const Home = () => {
  // get global vars of game state
  const states = useContext(Context);
  const [lobby_code, changeLobbyCode] = states.lobby_state;
  const [player, changePlayer] = states.player_state;
  const [socket, _] = states.socket_state;
  const navigate = useNavigate();
  useEffect(() => {

    socket.emit('enterHome');

    socket.on('doneCreateLobby', (data) => {
      console.log(data);
      changeLobbyCode(data);
      changePlayer("Player 1")
      navigate("/choose");
    })

    return () => { socket.removeAllListeners() };

  }, []);

  return (
    <div className="homeParent">
      {/* Animated Rattle Title at top of Home screen */}
      <Title></Title>
      <div className="home">
        {/* Character model on left of screen */}
        <Stage width={300} height={700} options={{ backgroundAlpha: 0 }}>
          {/* {p1Ani} */}
          <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/char2_frames/char2frame1.png", "./game_sprites/char2_frames/char2frame3.png"]} anchor={0.01} />
          {/* <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/char2.png", "./game_sprites/back2.png"]} anchor={0.5}/> */}
        </Stage>

        {/* main 3 buttons: create lobby, join lobby, credits */}
        <Button imageEnter="./game_sprites/create2.png" imageLeave="./game_sprites/create.png" socketEmitEvent={"createLobby"}>dog</Button>
        <Button imageEnter="./game_sprites/join.png" imageLeave="./game_sprites/join2.png" routesPath="/join">dog</Button>
        <Button imageEnter="./game_sprites/credits.png" imageLeave="./game_sprites/credits2.png" routesPath="/credit">dog</Button>
        
        {/* Character model on right of screen */}
        <Stage width={300} height={700} options={{ backgroundAlpha:0 }}>
          {/* {p1Ani} */}
          <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/char1.png", "./game_sprites/char1frame2.png"]} anchor={0.01}/> 
          {/* <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/char2.png", "./game_sprites/back2.png"]} anchor={0.5}/> */}
        </Stage>
      </div> 
      {/* must wrap petr in div because flex must be in an element supporting flexbox like div */}
      <div className="petr"> 
        <ButtonPetr imageEnter="./game_sprites/char3.png" imageLeave="./game_sprites/char3.png">petr!</ButtonPetr>
      </div>
    </div>
  )
}

export default Home;