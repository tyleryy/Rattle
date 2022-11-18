import { Stage, AnimatedSprite } from "@inlet/react-pixi";
import React from "react";
import BackButtonRow from "../../backButtonRow/backButtonRow";
import Platform from "../../platform/Platform";
import "./victory.css";

function Victory() {

    return (
        <div className="page" >
            <BackButtonRow />
            <div className="column">
                    <div className = "stage">
                        <Stage width={400} height={700} options={{ backgroundAlpha:0 }}>
                            {/* <Sprite image={player1.image} scale={ {x: 0.8 , y: 0.8} }/> */}
                            <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/char1.png", "./game_sprites/char1frame2.png"]} anchor={0.01} visible = {true}/> 
                            <AnimatedSprite animationSpeed={0.05} isPlaying={false} images={["./game_sprites/char2_frames/char2frame1.png", "./game_sprites/char2_frames/char2frame3.png"]} anchor={0.01} visible={false}/>
                            <AnimatedSprite animationSpeed={0.05} isPlaying={false} images={["./game_sprites/petrframe1.png", "./game_sprites/char3frame2.png"]} anchor={0.01} visible={false}/>
                        </Stage>
                    </div>
                    <img src="./game_sprites/platform2.png"/>
                </div>
        </div>
    );
}

export default Victory;