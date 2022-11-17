import React from "react";
import Screen from '../../screen_bg/Screen'
import Button from '../../buton/Button';

function Options(props) {
    return (
        <div className="App">
            <header className="App-header">
                <Screen image="./game_sprites/brick3.png"></Screen>
                <div className = "join">
                    <div>
                        <Button imageEnter="./game_sprites/back.png" imageLeave="./game_sprites/back2.png" routesPath="/">dog</Button>
                    </div>
                        <input type="number" placeholder="Seconds only. Max 60 seconds" min="0" maxLength="2"/>
                        <input type="submit" value="Submit" onClick={(console.log("hello"))} />
            
                </div>
            </header>
        </div>
    )
}

export default Options;