import React from "react";
import Screen from '../../screen_bg/Screen'
import Button from '../../buton/Button';
import ButtonVal from '../../buton/ButtonVal';

function Options(props) {
    return (
        <div className = "parent">
                <div className = "opts">
                        <div>
                            <Button imageEnter="./game_sprites/back.png" imageLeave="./game_sprites/back2.png" routesPath="/">dog</Button>
                        </div>
                        <div>
                            <Button imageEnter="./game_sprites/start.png" imageLeave="./game_sprites/start2.png" routesPath="/game">dog2</Button>
                        </div>

                </div>
                    
                    {/* <input type="number" placeholder="Seconds only. Max 60 seconds" min="0" maxLength="2"/>
                        <input type="submit" value="Submit" onClick={(console.log("hello"))} /> */}
        </div>
    )
}

export default Options;