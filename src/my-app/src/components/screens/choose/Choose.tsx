import React from "react";
import { useNavigate } from "react-router-dom";
import Screen from '../../screen_bg/Screen'
import ButtonChar from '../../buton/ButtonChar';
import Button from '../../buton/Button';
import SmallButton from "../../buton/SmallButton";
import Button2 from '../../buton/Button2';
import Platform from "../../platform/Platform";
import { Stage, Sprite } from '@inlet/react-pixi'
import { useState, useEffect, useRef } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Socket } from "socket.io-client";
import "./Choose.css";

function Choose({ lobby_code, socket }: { lobby_code: string, socket: Socket }) {
    // stage size
    const [stageW, changeW] = useState<number>(800);
    const [stageH, changeH] = useState<number>(600);
    const [player1, changeChar1] = useState({
        image: "./game_sprites/char1.png",
        character: 0
    });
    const navigate = useNavigate();
    useEffect(() => {

        socket.on('Go Home', () => {
            navigate('/');
        })
        // get the width of the screen
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        changeW(vw);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        changeH(vh);
        return () => { socket.removeAllListeners() };
    }, []);


    useEffect(() => {

        console.log(player1);

    }, [player1])

    return (
        <div className="background">
            <div className="roomCode">{lobby_code}</div>
            <div className="parent">

                <div className="column">
                    <div className="stage">
                        <Stage width={400} height={600} options={{ backgroundAlpha: 0 }}>
                            <Sprite image={player1.image} scale={{ x: 0.8, y: 0.8 }} />
                        </Stage>
                    </div>
                    {/* <div className= "platform_left">
                        <Platform image="./game_sprites/platform2.png"></Platform>
                    </div> */}
                </div>

                <div className="column">
                    <ButtonChar imageEnter="./game_sprites/char1_but_.png" imageLeave="./game_sprites/char1_but_2.png" changeChar={changeChar1} butChar={{ image: "./game_sprites/char1.png", character: 1 }}></ButtonChar>

                    <ButtonChar imageEnter="./game_sprites/char2_but_.png" imageLeave="./game_sprites/char2_but_2.png" changeChar={changeChar1} butChar={{ image: "./game_sprites/char2.png", character: 2 }}></ButtonChar>

                    <ButtonChar imageEnter="./game_sprites/char3_but_.png" imageLeave="./game_sprites/char3_but_2.png" changeChar={changeChar1} butChar={{ image: "./game_sprites/char3.png", character: 3 }}></ButtonChar>
                </div>

                <div className="column">
                    <div className="stage_right">
                        <Stage width={400} height={600} options={{ backgroundAlpha: 0 }}>
                            <Sprite image="./game_sprites/back.png" />
                        </Stage>
                    </div>
                    {/* <div>
                        <Platform image="./game_sprites/platform2.png"></Platform>
                    </div> */}
                </div>
            </div>
            <div className="parent">

                <SmallButton imageEnter="./game_sprites/back.png" imageLeave="./game_sprites/back2.png" routesPath="/">dog</SmallButton>

                <SmallButton imageEnter="./game_sprites/join.png" imageLeave="./game_sprites/join2.png" routesPath="/options"></SmallButton>


            </div>
        </div>
    )
}

export default Choose;