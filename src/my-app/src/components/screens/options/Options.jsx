import React from "react";
import Screen from '../../screen_bg/Screen'
import Button from '../../buton/Button';
import ButtonVal from '../../buton/ButtonVal';

function Options(props) {
    return (
        <div className = "parent">
                <div className = "opts">

                    <div className = "column">
                        <div>
                            <Button imageEnter="./game_sprites/back.png" imageLeave="./game_sprites/back2.png" routesPath="/">dog</Button>
                        </div>
                        <div>
                            <ButtonVal imageEnter="./game_sprites/3rounds.png" imageLeave="./game_sprites/3rounds2.png" val="3">3round</ButtonVal>
                        </div>
                        <div>
                            <ButtonVal imageEnter="./game_sprites/5rounds.png" imageLeave="./game_sprites/5rounds2.png" val="5">5round</ButtonVal>
                        </div>
                        <div>
                            <ButtonVal imageEnter="./game_sprites/7rounds.png" imageLeave="./game_sprites/7rounds2.png" val="7">7round</ButtonVal>
                        </div>
                    </div>
                    <div className = "column">
                        <div>
                            <ButtonVal imageEnter="./game_sprites/5seconds.png" imageLeave="./game_sprites/5seconds2.png" val="5">5seconds</ButtonVal>
                        </div>
                        <div>
                            <ButtonVal imageEnter="./game_sprites/10seconds.png" imageLeave="./game_sprites/10seconds2.png" val="10">10seconds</ButtonVal>
                        </div>
                        <div>
                            <ButtonVal imageEnter="./game_sprites/15seconds.png" imageLeave="./game_sprites/15seconds2.png" val="15">15seconds</ButtonVal>
                        </div>
                    </div>
                </div>
                    
                    {/* <input type="number" placeholder="Seconds only. Max 60 seconds" min="0" maxLength="2"/>
                        <input type="submit" value="Submit" onClick={(console.log("hello"))} /> */}
        </div>
    )
}

export default Options;