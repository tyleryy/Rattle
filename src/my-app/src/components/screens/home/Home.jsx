import React from "react";
import Button from '../../buton/Button';
import Title from '../../title/Title';
import Screen from '../../screen_bg/Screen'

const Home = (props) => {

    return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Screen image="./game_sprites/brick2.png"></Screen>
        <div className = "home">
          <span>
            <Title class="title-shaking"></Title>
          </span>
          <div>
            <Button imageEnter="./game_sprites/create2.png" imageLeave="./game_sprites/create.png" routesPath="/choose">dog</Button>
          </div>
          <div>
            <Button imageEnter="./game_sprites/join.png" imageLeave="./game_sprites/join2.png" routesPath = "/join">dog</Button>
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