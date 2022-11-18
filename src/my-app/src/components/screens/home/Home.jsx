import React, { useState, useEffect } from "react";
import Button from '../../buton/Button';
import Title from '../../title/Title';
import { Stage, AnimatedSprite, PixiComponent } from '@inlet/react-pixi'
import ButtonPetr from '../../buton/ButtonPetr'
import "./Home.css";
import { useNavigate } from "react-router-dom";


const Home = (props) => {
  const [socket, _] = useState(props.socket);
  // const socket = props.socket;
  const navigate = useNavigate();
  useEffect(() => {

    socket.emit('enterHome');

    socket.on('doneCreateLobby', (data) => {
      console.log(data);
      props.changeLobbyCode(data);
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
    <div className="homeParent">
      <div className="title-row">
        <Title class="title-shaking"></Title>
      </div>
      <div className="home">
            <div className = "Sprite">
              <Stage width={300} height={700} options={{ backgroundAlpha:0 }}>
                {/* {p1Ani} */}
                <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/char2_frames/char2frame1.png", "./game_sprites/char2_frames/char2frame3.png"]} anchor={0.01}/> 
                {/* <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/char2.png", "./game_sprites/back2.png"]} anchor={0.5}/> */}
              </Stage>
            </div>
        <div className = "button1">
          <Button imageEnter="./game_sprites/create2.png" imageLeave="./game_sprites/create.png" routesPath="/choose" socketEmitEvent={"createLobby"} socket={socket}>dog</Button>
        </div>
        <div className = "button1">
          <Button imageEnter="./game_sprites/join.png" imageLeave="./game_sprites/join2.png" routesPath="/join" socket={socket}>dog</Button>
          <div className = "petr">
            <ButtonPetr imageEnter="./game_sprites/char3.png" imageLeave="./game_sprites/char3.png">petr!</ButtonPetr>
          </div>
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
    </div>
  )
}

export default Home;