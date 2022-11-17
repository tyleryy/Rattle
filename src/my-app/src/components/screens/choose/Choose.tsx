import React from "react";
import { useNavigate } from "react-router-dom";
import Screen from '../../screen_bg/Screen'
import ButtonChar from '../../buton/ButtonChar';
import Button from '../../buton/Button';
import Button2 from '../../buton/Button2';
import Platform from "../../platform/Platform";
import { Stage, Sprite } from '@inlet/react-pixi'
import { useState, useEffect, useRef } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import "./Choose.css";


function Choose( {lobby_code} : {lobby_code: string}) {
     // stage size
     const [stageW, changeW] = useState<number>(800);
     const [stageH, changeH] = useState<number>(600);
     const stageRef = useRef(null);
     const [player1, changeChar1] = useState<string>("./game_sprites/back.png");

     useEffect(() => {
         // get the width of the screen
         const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
         changeW(vw);
         const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
         changeH(vh);
     }, []);
     

    useEffect(() => {
        console.log(player1);
    }, [player1])

    return (
        <div className="background">
            <div className="roomCode">{lobby_code}</div>
            <div className="parent">
                        
                <div className="column">
                    <div className = "stage">
                        <Stage width={400} height={600}>
                            <Sprite ref={stageRef} image= {player1} x={100} y={100} />
                        </Stage>
                    </div>
                    <div className= "platform_left">
                        <Platform image="./game_sprites/platform2.png"></Platform>
                    </div>
                </div>

                <div className="column">
                    <ButtonChar imageEnter="./game_sprites/char1_but.png" imageLeave="./game_sprites/char1_but2.png" changeChar={changeChar1} butChar="./game_sprites/test.png"></ButtonChar>
                
                    <ButtonChar imageEnter="./game_sprites/check.png" imageLeave="./game_sprites/char2_but2.png"></ButtonChar>
                
                    <ButtonChar imageEnter="./game_sprites/char3_but2.png" imageLeave="./game_sprites/char3_but.png"></ButtonChar>
                </div>
            
                <div className="column">
                    <div className = "stage_right">
                        <Stage width={400} height={600}>
                            <Sprite ref={stageRef} image="./game_sprites/back.png" x={100} y={100} />
                        </Stage>
                    </div>
                    <div>
                        <Platform image="./game_sprites/platform2.png"></Platform>
                    </div>
                </div>
            </div>
            <div className="parent">          

                <Button imageEnter="./game_sprites/back.png" imageLeave="./game_sprites/back2.png" routesPath="/">dog</Button>

                <div className="join_but">
                    <Button imageEnter="./game_sprites/join.png" imageLeave="./game_sprites/join2.png" routesPath="/options"></Button>
                </div>
                    
                
            </div>
        </div>
    )
}

export default Choose;