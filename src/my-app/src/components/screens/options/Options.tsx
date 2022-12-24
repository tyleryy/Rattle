import React, { useEffect, useContext } from "react";
import Button from '../../buton/Button';
import { Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../providers/provider";
import "./Options.css"


function Options() {
    const navigate = useNavigate();
    const states = useContext<any>(Context);
    const [socket, ]: [Socket, any] = states.socket_state;
    useEffect(() => {
        socket.on('go_to_game', () => {
            navigate("/game");
        })

        socket.on('Go Home', () => {
            navigate('/');
        });
    }, [socket, navigate])
    return (
        <div className="parentOptions">
            <Button imageEnter="./game_sprites/back.png" imageLeave="./game_sprites/back2.png" routesPath="/" socketEmitEvent="" />
            <div className="opts">
                <img src="./game_sprites/rules.png" alt="rules" />
            </div>
            <Button imageEnter="./game_sprites/start.png" imageLeave="./game_sprites/start2.png" routesPath="/game" socketEmitEvent="go_to_game" />

        </div>
    )
}

export default Options;