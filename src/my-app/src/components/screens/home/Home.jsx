import React, { useEffect, useContext } from "react";
import Button from '../../buton/Button';
import { Context } from "../../../providers/provider";
import Title from '../../title/Title';
import { Stage, AnimatedSprite } from '@inlet/react-pixi'
import ButtonPetr from '../../buton/ButtonPetr'
import "./Home.css";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const states = useContext(Context);
  const [, changeLobbyCode] = states.lobby_state;
  const [, changePlayer] = states.player_state;
  const [socket, ] = states.socket_state;
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

    return () => { socket.removeAllListeners() };

  }, []);

  return (
    <div className="homeParent">
      <div className="title-row">
        <Title class="title-shaking"></Title>
      </div>
      <div className="home">
        <div className="Sprite">
          <Stage width={300} height={700} options={{ backgroundAlpha: 0 }}>
            {/* {p1Ani} */}
            <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/char2_frames/char2frame1.png", "./game_sprites/char2_frames/char2frame3.png"]} anchor={0.01} />
            {/* <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/char2.png", "./game_sprites/back2.png"]} anchor={0.5}/> */}
          </Stage>
        </div>
        <div className="button1">
          <Button imageEnter="./game_sprites/create2.png" imageLeave="./game_sprites/create.png" routesPath="/choose" socketEmitEvent={"createLobby"} socket={socket}>dog</Button>
        </div>
        <div className="button1">
          <Button imageEnter="./game_sprites/join.png" imageLeave="./game_sprites/join2.png" routesPath="/join" socket={socket}>dog</Button>
        </div>
        <div>
          <Button imageEnter="./game_sprites/credits.png" imageLeave="./game_sprites/credits2.png" routesPath="/credit">dog</Button>
        </div>
          <div className = "Sprite">
              <Stage width={300} height={700} options={{ backgroundAlpha:0 }}>
                {/* {p1Ani} */}
                <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/char1.png", "./game_sprites/char1frame2.png"]} anchor={0.01}/> 
                {/* <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/char2.png", "./game_sprites/back2.png"]} anchor={0.5}/> */}
              </Stage>
            </div> 
      </div>
      <div className = "petr">
          <ButtonPetr imageEnter="./game_sprites/char3.png" imageLeave="./game_sprites/char3.png">petr!!</ButtonPetr>
      </div>
    </div>
  )
}

export default Home;