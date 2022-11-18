import React from "react";
import { useNavigate } from "react-router-dom";
import Screen from '../../screen_bg/Screen'
import ButtonChar from '../../buton/ButtonChar';
import Button from '../../buton/Button';
import SmallButton from "../../buton/SmallButton";
import Button2 from '../../buton/Button2';
import Platform from "../../platform/Platform";
import { Stage, Sprite, AnimatedSprite, PixiComponent } from '@inlet/react-pixi'
import { useState, useEffect, useRef } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Socket } from "socket.io-client";
import "./Choose.css";
import { JsxElement } from "typescript";

interface charSpriteMap {
    [key: number]: string[]
}

interface aniSpriteMap {
    [key: number]: JSX.Element
}

function Choose({ lobby_code, socket }: { lobby_code: string, socket: Socket }) {
     // stage size
     const [stageW, changeW] = useState<number>(800);
     const [stageH, changeH] = useState<number>(600);
    //  const [player1, changeChar1] = useState({
    //     image: "./game_sprites/char1.png",
    //     character: 0}
    //     );

        const navigate = useNavigate();

    const animatedSpriteMap: aniSpriteMap = {
        0: <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/back.png", "./game_sprites/back2.png"]} anchor={0.5}/>,
        1: <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/char1.png", "./game_sprites/char1frame2.png"]} anchor={0.5}/>,
        2: <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/char2_frames/char2frame1.png", "./game_sprites/char2_frames/char2frame2.png"]} anchor={0.5}/>,
        3: <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/char3.png", "./game_sprites/char3frame2.png"]} anchor={0.5}/>
    }

    // const charToFrames: charSpriteMap = 
    const [char1_active, checkActiveChar1] = useState (false)
    const [char2_active, checkActiveChar2] = useState (false)
    const [char3_active, checkActiveChar3] = useState (false)



    const [p1Frames, setP1Frames] = useState<any[]>([])
    
    useEffect( () => {
        console.log("Hello word");
        if (char1_active == true) {
            checkActiveChar2(false);
            checkActiveChar3(false);
        }
    }, [char1_active]);

    useEffect( () => {
        if (char2_active == true) {
            checkActiveChar1(false);
            checkActiveChar3(false);
        }
    }, [char2_active])

    useEffect( () => {
        if (char3_active == true) {
            checkActiveChar2(false);
            checkActiveChar1(false);
        }
    }, [char3_active])


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
     
    return (
        <div className="background">
            <img src="./game_sprites/cyc.png" alt="logo" className="cyc"/>
            <div className="roomCode">{lobby_code}</div>
            <div className="parent">

                <div className="column">
                    <div className = "stage">
                        <Stage width={400} height={700} options={{ backgroundAlpha:0 }}>
                            {/* <Sprite image={player1.image} scale={ {x: 0.8 , y: 0.8} }/> */}
                            <AnimatedSprite animationSpeed={0.05} isPlaying={char1_active} images={["./game_sprites/char1.png", "./game_sprites/char1frame2.png"]} anchor={0.01} visible = {char1_active}/> 
                            <AnimatedSprite animationSpeed={0.05} isPlaying={char2_active} images={["./game_sprites/char2_frames/char2frame1.png", "./game_sprites/char2_frames/char2frame3.png"]} anchor={0.01} visible={char2_active}/>
                            <AnimatedSprite animationSpeed={0.05} isPlaying={char3_active} images={["./game_sprites/petrframe1.png", "./game_sprites/char3frame2.png"]} anchor={0.01} visible={char3_active}/>
                        </Stage>
                    </div>
                    {/* <div className= "platform_left">
                        <Platform image="./game_sprites/platform2.png"></Platform>
                    </div> */}
                </div>

                <div className="column">
                    <ButtonChar imageEnter="./game_sprites/char1_but_.png" imageLeave="./game_sprites/char1_but_2.png" setCheck={checkActiveChar1}></ButtonChar>

                    <ButtonChar imageEnter="./game_sprites/char2_but_.png" imageLeave="./game_sprites/char2_but_2.png" setCheck={checkActiveChar2}></ButtonChar>

                    <ButtonChar imageEnter="./game_sprites/char3_but_.png" imageLeave="./game_sprites/char3_but_2.png" setCheck={checkActiveChar3}></ButtonChar>
                </div>

                <div className="column">
                    <div className = "stage_right">
                        <Stage width={400} height={700} options={{ backgroundAlpha:0 }}>
                            {/* <Sprite image="./game_sprites/back.png" /> */}
                             <AnimatedSprite animationSpeed={0.05} isPlaying={false} images={["./game_sprites/char1.png", "./game_sprites/char1frame2.png"]} anchor={0.01} visible = {false}/> 
                             <AnimatedSprite animationSpeed={0.05} isPlaying={false} images={["./game_sprites/char2_frames/char2frame1.png", "./game_sprites/char2_frames/char2frame3.png"]} anchor={0.01} visible={false}/>
                             <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/petrframe1.png", "./game_sprites/char3frame2.png"]} anchor={0.01} visible={true}/>
                             {/* {p1Ani} */}
                        </Stage>
                    </div>
                    {/* <div>
                        <Platform image="./game_sprites/platform2.png"></Platform>
                    </div> */}
                </div>
            </div>
            <div className="parent">

                <SmallButton imageEnter="./game_sprites/back.png" imageLeave="./game_sprites/back2.png" routesPath="/">dog</SmallButton>

                <SmallButton imageEnter="./game_sprites/select.png" imageLeave="./game_sprites/select2.png" routesPath="/options"></SmallButton>


            </div>
        </div>
    )
}

export default Choose;