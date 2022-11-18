import { Stage, Sprite, AnimatedSprite } from '@inlet/react-pixi'
import { useState, useEffect, useRef } from 'react';
import DrawCanvas from './canvas/drawCanvas';
import { Coordinate } from '../../../interfaces/interfaces';
import { lockedX } from './constants';
import PlayCanvas from './canvas/playCanvas';
import { Socket } from 'socket.io-client';
import { IPlayer, GameState } from "../../../interfaces/interfaces";
import "./game.css";

function Game({ socket }: { socket: Socket }) {
    // remember the strokes done

    /** Static stroke history recording the y */
    const [strokeHistory, changeStrokeHistory] = useState<(number | null)[]>([]);

    /** Animated stroke history where the canvas will be animating the position of the stroke. This will change over time */
    const [animatedStrokeHistory, changeAnimatedStrokeHistory] = useState<Coordinate[]>([]);

    /** Controls whether the key to draw is being pressed or not */
    const [isDrawing, flipDrawingKey] = useState<boolean>(false);

    /** Remember whether we just drew or not */
    const [justDrew, flipJustDrew] = useState<boolean>(false);

    /** Position of the mouse at all times (relative to the stage), used to control the player circle */
    const [lastNonNullPos, changeLastNonNullPos] = useState<Coordinate>({ x: null, y: null })

    /** Interval function to run repeatedly (attempt to draw while standing still) */
    const stageRef = useRef(null);

    // stage size
    const [stageW, changeW] = useState<number>(800);
    const [stageH, changeH] = useState<number>(600);

    /** States regarding the game status */

    // game state
    const [gameState, setGameState] = useState<GameState>();

    // client player (not the opponent)
    const [playerState, setPlayerState] = useState<IPlayer>();

    // opponent player
    const [opponentState, setOpponentState] = useState<IPlayer>();

    // what phase the game is in
    const [isPlayPhase, setPlayPhase] = useState<boolean>();

    // opponent position
    const [p2Pos, setP2Pos] = useState<Coordinate>({ x: null, y: null });



    // TEST STROKE RECREATION ONLY DELETE THIS LATER
    const [showMemory, flipShowMemory] = useState(false);

    useEffect(() => {
        // get the width of the screen
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        changeW(vw);
        // changeW(vw);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        changeH(vh);

        // default starting position of the circle
        changeLastNonNullPos({ x: lockedX, y: vh / 2 });

        window.addEventListener("keydown", keysDown);
        window.addEventListener("keyup", keysUp);
        // loopPosition(isDrawing, prevCoord, currCoord);
    }, []);

    // when we change the drawing status, reset the looping
    // useEffect(() => {
    //     // console.log(currCoord)
    //     if (loopInterval) {
    //         clearInterval(loopInterval);
    //         loopPosition(isDrawing, prevCoord, currCoord)
    //     }
    // }, [isDrawing, prevCoord, currCoord])

    const drawKey = "Space"

    function keysDown(e: KeyboardEvent) {
        const key = e.code;
        if (key === drawKey) {

            // FOR DEBUGGING REMOVE ME
            if (!isPlayPhase) {
                flipDrawingKey(true);
            }
            // console.log("Key down " + drawKey);
        }

        if (key === "KeyW") {
            setPlayPhase(true);
        }
    }


    function keysUp(e: KeyboardEvent) {
        const key = e.code;
        if (key === drawKey) {
            flipDrawingKey(false);
        }

        if (key === "KeyW") {
            setPlayPhase(false);
        }
    }

    // function loopPosition(isDrawing: boolean, prevCoord: Coordinate, currCoord: Coordinate) {
    //     // console.log("Resetting interval", isDrawing)
    //     const handler = setInterval(() => {
    //         if (isDrawing) {
    //             // console.log("Ui")
    //             // console.log(currCoord);
    //             // console.log(prevCoord)
    //             if (prevCoord.y && currCoord.y && prevCoord.x && currCoord.x) {
    //                 if (Math.abs(prevCoord.y - currCoord.y) <= 1) {
    //                     // standing still but trying to draw
    //                     console.log("STANDING STILL")
    //                     changeStrokeHistory([...strokeHistory, currCoord]);
    //                     changeAnimatedStrokeHistory([...animatedStrokeHistory, currCoord]);
    //                     // console.log("stading still?")
    //                 }
    //             }
    //             // if (currCoord.x === prevCoord.x && currCoord.y === prevCoord.y) {
    //             //     // trying to draw but not moving
    //             //     console.log("TRYING TO DRAW")
    //             //     let tinyCoord = currCoord;
    //             //     if (tinyCoord.x) {
    //             //         tinyCoord.x = tinyCoord.x + 0.00001;
    //             //         changeCurrCord(tinyCoord);
    //             //     }
    //             // }
    //         }
    //     }, 20);
    //     changeLoopInterval(handler);
    // }

    useEffect(() => {
        // console.log(strokeHistory);
    }, [strokeHistory])

    return (
        <div>
            <Stage width={stageW} height={stageH} options={{ backgroundAlpha:0 }} style={{ left: 0, position: "absolute" }} onPointerMove={(e: any) => {
                // when we move, we want to add the coordinate to the array
                let coordinate: Coordinate = {
                    // x: Math.floor(e.clientX - e.target.offsetLeft), // subtract to account for the stage position
                    x: Math.floor(lockedX),
                    y: Math.floor(e.clientY - e.target.offsetTop)
                }

                changeLastNonNullPos(coordinate);


                if (!isDrawing) {
                    // push null
                    // console.log("NULL")
                    coordinate = {
                        x: null,
                        y: null
                    }
                }
                changeStrokeHistory([...strokeHistory, coordinate.y]);

                // iterate through the strokes to remove the old ones out of the screen
                const lengthThreshold = 150;
                // const lengthThreshold = 10;
                // if we have a defined coordinate
                if (coordinate.x && coordinate.y && isDrawing) {
                    flipJustDrew(true);
                    if (animatedStrokeHistory.length > lengthThreshold * 3) {
                        // delete the first few values to maintain performance
                        changeAnimatedStrokeHistory([...animatedStrokeHistory.slice(lengthThreshold), coordinate]);
                    } else {
                        changeAnimatedStrokeHistory([...animatedStrokeHistory, coordinate]);
                    }
                } else if (!coordinate.x && !coordinate.y && justDrew) {
                    // we did not draw yet, add a null value to separate the strokes
                    changeAnimatedStrokeHistory([...animatedStrokeHistory, coordinate])
                    flipJustDrew(false);
                }
            }}>
                <Sprite ref={stageRef} image="./game_sprites/back.png" x={100} y={100} />
                {
                    isPlayPhase ?
                        <PlayCanvas lastNonNull={lastNonNullPos} strokeHistory={strokeHistory} p2Pos={p2Pos} />

                        :
                        <DrawCanvas lastNonNull={lastNonNullPos} changeAnimatedStrokes={changeAnimatedStrokeHistory} animateHistory={animatedStrokeHistory} isDrawing={isDrawing} socket={socket} p2Pos={p2Pos} />
                }
                            
            </Stage>
            <div className = "SStage">
                {/* player 1 sprites */}
                <Stage width={400} height={700} options={{ backgroundAlpha:0 }} id="SpriteStage">
                        {/* active sprites            */}
                        <AnimatedSprite animationSpeed={0.05} isPlaying={false} images={["./game_sprites/char1.png", "./game_sprites/char1rap.png"]} anchor={0.01} visible = {false}/> 
                        <AnimatedSprite animationSpeed={0.05} isPlaying={false} images={["./game_sprites/char2_frames/char2frame1.png", "./game_sprites/char2_frames/char2rap.png"]} anchor={0.01} visible={false}/>
                        <AnimatedSprite animationSpeed={0.05} isPlaying={false} images={["./game_sprites/petrrap.png", "./game_sprites/petrrap2.png"]} anchor = {[0.01, 0.2]} visible={false}/>
                        {/* not active sprites */}
                        <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/char1.png", "./game_sprites/char1frame2.png"]} anchor={0.01} visible = {true}/> 
                        <AnimatedSprite animationSpeed={0.05} isPlaying={false} images={["./game_sprites/char2_frames/char2frame1.png", "./game_sprites/char2_frames/char2frame3.png"]} anchor={0.01} visible={false}/>
                        <AnimatedSprite animationSpeed={0.05} isPlaying={false} images={["./game_sprites/petrframe1.png", "./game_sprites/char3frame2.png"]} anchor={[0.01, 0.2]} visible={false}/>             
                </Stage>
                {/* player 2 sprites */}
                <Stage width={400} height={700} options={{ backgroundAlpha:0 }} id="SpriteStage">
                        {/* active sprites            */}
                        <AnimatedSprite animationSpeed={0.05} isPlaying={false} images={["./game_sprites/char1.png", "./game_sprites/char1rap.png"]} anchor={0.01} visible = {false}/> 
                        <AnimatedSprite animationSpeed={0.05} isPlaying={false} images={["./game_sprites/char2_frames/char2frame1.png", "./game_sprites/char2_frames/char2rap.png"]} anchor={0.01} visible={false}/>
                        <AnimatedSprite animationSpeed={0.05} isPlaying={false} images={["./game_sprites/petrrap.png", "./game_sprites/petrrap2.png"]} anchor = {[0.01, 0.2]} visible={false}/>
                        {/* not active sprites */}           
                        <AnimatedSprite animationSpeed={0.05} isPlaying={false} images={["./game_sprites/char1.png", "./game_sprites/char1frame2.png"]} anchor={0.01} visible = {false}/> 
                        <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/char2_frames/char2frame1.png", "./game_sprites/char2_frames/char2frame3.png"]} anchor={0.01} visible={true}/>
                        <AnimatedSprite animationSpeed={0.05} isPlaying={false} images={["./game_sprites/petrframe1.png", "./game_sprites/char3frame2.png"]} anchor={[0.01, 0.2]} visible={false}/>           
                </Stage>
            </div>
            
        </div>
    )
}

export default Game;