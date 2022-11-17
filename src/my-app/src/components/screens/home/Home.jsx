import React, {useEffect} from "react";
import Button from '../../buton/Button';
import Title from '../../title/Title';
import Screen from '../../screen_bg/Screen'
import "./Home.css";

const Home = (props) => {
  const socket = props.socket;

  useEffect(() => {

    socket.on('P2JoinedLobby', () => {

    });

    return () => {socket.removeAllListeners()};


});

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <Screen image="./game_sprites/brick2.png"></Screen> */}
        <div className="title-row">
          <Title class="title-shaking"></Title>
        </div>
        <div className="home">
          <div>
            <Button imageEnter="./game_sprites/create2.png" imageLeave="./game_sprites/create.png" routesPath="/choose" socketEmitEvent={"createLobby"} socket={socket}>dog</Button>
          </div>
          <div>
            <Button imageEnter="./game_sprites/join.png" imageLeave="./game_sprites/join2.png" routesPath="/join">dog</Button>
          </div>
          <div>
            <Button imageEnter="./game_sprites/credits.png" imageLeave="./game_sprites/credits2.png" routesPath="/credit">dog</Button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Home;