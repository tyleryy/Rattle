import React, { useEffect, useContext } from "react";
import Screen from '../../screen_bg/Screen'
import Button from '../../buton/Button';
import ButtonVal from '../../buton/ButtonVal';
import { Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../providers/provider";

function Options() {
    const navigate = useNavigate();
    const states = useContext<any>(Context);
    const [socket, _]: [Socket, any] = states.socket_state;
    useEffect(() => {
        socket.on('go_to_game', () => {
            navigate("/game");
        })
    }, [])
    return (
        <div className="parent">
            <div className="opts">
                <div>
                    <Button imageEnter="./game_sprites/back.png" imageLeave="./game_sprites/back2.png" routesPath="/" socketEmitEvent="" />
                </div>
                <div>
                    <Button imageEnter="./game_sprites/start.png" imageLeave="./game_sprites/start2.png" routesPath="/game" socketEmitEvent="go_to_game" />
                </div>

            </div>
            {/* <input type="number" placeholder="Seconds only. Max 60 seconds" min="0" maxLength="2"/>
                        <input type="submit" value="Submit" onClick={(console.log("hello"))} /> */}
        </div>
    )
}

export default Options;