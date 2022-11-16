import React from "react";
import Screen from '../../screen_bg/Screen'
import Button from '../../buton/Button';

function Credit(props) {
    return (
        <div className="App">
            <header className="App-header">
                <Screen image="./game_sprites/brick3.png"></Screen>
                <div className = "join">
                    <Button imageEnter="./game_sprites/back.png" imageLeave="./game_sprites/back2.png" routesPath="/">dog</Button>
                </div>
            </header>
        </div>
    )
}

export default Credit;