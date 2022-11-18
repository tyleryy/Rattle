import React, { useEffect, useState } from "react";
import Button from '../../buton/Button';
import Title from '../../title/Title';
import Screen from '../../screen_bg/Screen'
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
      let p1 = game_obj.p1;
      let p2 = game_obj.p2;

      navigate('/choose')
    });

    return () => { socket.removeAllListeners() };

<<<<<<< HEAD
  }, []);
=======
  });
>>>>>>> frontend

  return (
    <div>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* <Screen image="./game_sprites/brick2.png"></Screen> */}
      <div className="title-row">
        <Title class="title-shaking"></Title>
      </div>
      <div className="home">
        <div>
          <Button imageEnter="./game_sprites/create2.png" imageLeave="./game_sprites/create.png" routesPath="/choose" socketEmitEvent={"createLobby"} socket={socket}>dog</Button>
        </div>
<<<<<<< HEAD
  <div className="home">
    <div>
      <Button imageEnter="./game_sprites/create2.png" imageLeave="./game_sprites/create.png" routesPath="/choose" socketEmitEvent={"createLobby"} socket={socket}>dog</Button>
    </div>
    <div>
      <Button imageEnter="./game_sprites/join.png" imageLeave="./game_sprites/join2.png" routesPath="/join" socketEmitEvent={"joinLobby"} socket={socket}>dog</Button>
    </div>
    <div>
      <Button imageEnter="./game_sprites/credits.png" imageLeave="./game_sprites/credits2.png" routesPath="/credit">dog</Button>
    </div>
=======
        <div>
      <Button imageEnter="./game_sprites/join.png" imageLeave="./game_sprites/join2.png" routesPath="/join">dog</Button>
>>>>>>> frontend
    </div>
    <div>
      <Button imageEnter="./game_sprites/credits.png" imageLeave="./game_sprites/credits2.png" routesPath="/credit">dog</Button>
    </div>
    <div>
      <Button imageEnter="./game_sprites/credits.png" imageLeave="./game_sprites/credits2.png" routesPath="/game">dog</Button>
    </div>
  </div>
    </div >
  )
}

export default Home;