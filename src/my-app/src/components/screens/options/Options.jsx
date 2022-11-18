import React from "react";
import Screen from '../../screen_bg/Screen'
import Button from '../../buton/Button';
import ButtonVal from '../../buton/ButtonVal';
import BackButtonRow from "../../backButtonRow/backButtonRow";
import { Image } from "react-bootstrap";
import "./Options.css"

function Options(props) {
    return (
        <div className = "parentOptions">
            <BackButtonRow />
            <div className = "opts">
                <img src="./game_sprites/rules.png" alt="rules" />
            </div>
            <Button imageEnter="./game_sprites/start.png" imageLeave="./game_sprites/start2.png" routesPath="/game" />
        </div>
    )
}

export default Options;