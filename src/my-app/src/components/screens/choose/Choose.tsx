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
import "./Choose.css";
import petrSS from "./petr_spritesheet.json"
import { JsxElement } from "typescript";

interface charSpriteMap {
    [key: number]: string[]
}

interface aniSpriteMap {
    [key: number]: JSX.Element
}

function Choose() {
     // stage size
     const [stageW, changeW] = useState<number>(800);
     const [stageH, changeH] = useState<number>(600);
     const [player1, changeChar1] = useState({
        image: "./game_sprites/char1.png",
        character: 0}
        );

    const [char1Frames, setChar1Frames] = useState(["./game_sprites/back.png", "./game_sprites/back2.png"]);
    const [charFrameMap, setCharFrameMap] = useState<charSpriteMap>({
        0: ["./game_sprites/back.png", "./game_sprites/back2.png"],
        1: ["./game_sprites/back.png", "./game_sprites/back2.png"],
        2: ["./game_sprites/char2_frames/char2frame1.png", "./game_sprites/char2_frames/char2frame2.png"],
        3: ["./game_sprites/back.png", "./game_sprites/back2.png"]
    })
 
    const [p1Ani, setP1Ani] = useState<JSX.Element>(<AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/back.png", "./game_sprites/back2.png"]} anchor={1}/>)

    const animatedSpriteMap: aniSpriteMap = {
        0: <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={charFrameMap[0]} anchor={0.5}/>,
        1: <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={charFrameMap[1]} anchor={0.5}/>,
        2: <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={charFrameMap[2]} anchor={0.5}/>,
        3: <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={charFrameMap[3]} anchor={0.5}/>
    }

    // const charToFrames: charSpriteMap = 

    const [p1Frames, setP1Frames] = useState<any[]>([])
 
     useEffect(() => {
         // get the width of the screen
         const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
         changeW(vw);
         const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
         changeH(vh);

         // load all sprite assets
        // setP1Frames(
        //     Object.keys(petrSS.frames).map(frame => )
        // )
     }, []);
     
    // useEffect(() => {
    //     console.log(player1);
    //     console.log("now trying to switch to");
    //     console.log(charFrameMap[player1.character])
    //     // setChar1Frames(charFrameMap[player1.character])
    //     setP1Ani(animatedSpriteMap[player1.character])
    // }, [player1])
    
    return (
        <div className="background">
            <div className="roomCode">Test Room Code</div>
            <div className="parent">
                        
                <div className="column">
                    <div className = "stage">
                        <Stage width={400} height={600} options={{ backgroundAlpha:0 }}>
                            <Sprite image={player1.image} scale={ {x: 0.8 , y: 0.8} }/>
                            {/* {p1Ani} */}
                        </Stage>
                    </div>
                    {/* <div className= "platform_left">
                        <Platform image="./game_sprites/platform2.png"></Platform>
                    </div> */}
                </div>

                <div className="column">
                    <ButtonChar imageEnter="./game_sprites/char1_but_.png" imageLeave="./game_sprites/char1_but_2.png" changeChar={changeChar1} butChar={{image: "./game_sprites/char1.png", character: 1}}></ButtonChar>
                
                    <ButtonChar imageEnter="./game_sprites/char2_but_.png" imageLeave="./game_sprites/char2_but_2.png" changeChar={changeChar1} butChar={{image: "./game_sprites/char2.png", character: 2}}></ButtonChar>
                
                    <ButtonChar imageEnter="./game_sprites/char3_but_.png" imageLeave="./game_sprites/char3_but_2.png" changeChar={changeChar1} butChar={{image: "./game_sprites/char3.png", character: 3}}></ButtonChar>
                </div>
            
                <div className="column">
                    <div className = "stage_right">
                        <Stage width={400} height={600} options={{ backgroundAlpha:0 }}>
                            {/* <Sprite image="./game_sprites/back.png" /> */}
                             <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={charFrameMap[2]} anchor={0.5}/> 
                            
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

                <SmallButton imageEnter="./game_sprites/join.png" imageLeave="./game_sprites/join2.png" routesPath="/options"></SmallButton>
                    
                
            </div>
        </div>
    )
}

export default Choose;