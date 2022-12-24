import { Stage, Sprite, AnimatedSprite } from '@inlet/react-pixi'
import { useState, useEffect, useRef } from 'react';
import React from 'react'
import DrawCanvas from './canvas/drawCanvas';
import { Coordinate } from '../../../interfaces/interfaces';
import { lockedX } from './constants';
import PlayCanvas from './canvas/playCanvas';
import { useContext } from 'react';
import { Context } from '../../../providers/provider';
import { GameState } from "../../../interfaces/interfaces";
import PassiveCanvas from './canvas/passiveCanvas';
import { useNavigate } from 'react-router-dom';
import "./game.css";

function Game() {
    // remember the strokes done
    const states: any = useContext(Context);
    // const [lobby_code, changeLobbyCode] = states.lobby_state;
    // const [player, changePlayer] = states.player_state;
    const [socket, ] = states.socket_state;
    const [character, ] = states.character_state;
    const [otherchar, ] = states.char2_state;

    const navigate = useNavigate();
    /** Static stroke history recording the y */
    const [strokeHistory, setStrokeHistory] = useState<(number | null)[]>([]);
    const [backendStrokeHistory, setBackendStrokeHistory] = useState<(number | null)[]>([]);

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
    const [playerState, setPlayerState] = useState<"wait" | "draw" | "play">("wait");
    // figure out if the player just ended drawing phase
    const [justEndedDraw, setJustEndedDraw] = useState<boolean>(false);

    // opponent player
    // const [opponentState, setOpponentState] = useState<IPlayer>();

    // what phase the game is in
    // playPhase is the copy strokes phase.
    // const [isPlayPhase, setPlayPhase] = useState<boolean>(false);
    // waiting phase renders a passive canvas where all you do is move around
    // const [isWaiting, setWaiting] = useState<boolean>(true);
    const [turnImage, setTurnImage] = useState<string>("./game_sprites/wait.png");

    // opponent position
    const [p2Pos, setP2Pos] = useState<Coordinate>({ x: null, y: null });


    useEffect(() => {
        const [socket, ] = states.socket_state;
        const [character, ] = states.character_state;
        console.log(character)

        console.log("Hello game")
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

        // socket events

        socket.on("endGame", () => {
            navigate("/victory");
        })

        socket.on('Go Home', () => {
            navigate('/');
        });

        // update the game state from info from the backend
        socket.on('update_game_state', (gameState: GameState) => {
            // update the game state
            setGameState(gameState);
        });

        // start to draw
        socket.on("startTurn", () => {
            // setPlayPhase(false);
            // setWaiting(false);
            console.log("STARTING TURN")
            setPlayerState("draw");
        });

        // waiting for other player to draw
        socket.on("waitTurn", () => {
            // setPlayPhase(false);
            // setWaiting(true);
            console.log("WAITING TURN")
            setPlayerState("wait");
        });

        socket.on("startPlay", (strokeHistory: (number | null)[]) => {
            console.log("STARTING PLAY NOW STATE");
            setBackendStrokeHistory(strokeHistory);
        });

        socket.on("endVerify", () => {
            console.log("ENDED VERIFY, PLAYER STATE RN IS " + playerState);
            // if (playerState !== "draw") {
            //     console.log("setting player state to wait from endVerify")
            //     setPlayerState("wait");
            // }
        });

        // start the game
        socket.emit("startGame");

        // loopPosition(isDrawing, prevCoord, currCoord);
    }, []);

    const [char1, char1Check] = useState(false);
    const [char2, char2Check] = useState(false);
    const [char3, char3Check] = useState(false);

    useEffect(() => {
        if (character === 1) {
            char1Check(true);
        }
        else if (character === 2) {
            char2Check(true);
        }
        else if (character === 3) {
            char3Check(true);
        }
    }, [char1, char2, char3, character])


    const [otherchar1, otherchar1Check] = useState(false);
    const [otherchar2, otherchar2Check] = useState(false);
    const [otherchar3, otherchar3Check] = useState(false);

    useEffect(() => {
        if (otherchar === 1) {
            otherchar1Check(true);
        }
        else if (otherchar === 2) {
            otherchar2Check(true);
        }
        else if (otherchar === 3) {
            otherchar3Check(true);
        }
    }, [otherchar1, otherchar2, otherchar3, otherchar])

    // when we update game state, update the smaller states connected
    useEffect(() => {
        if (gameState) {
            if (gameState.p2) {
                setP2Pos({ x: lockedX, y: gameState.p2.yPos })
            }
        }
    }, [gameState]);

    // handle player state changes
    useEffect(() => {
        console.log("PLAYER STATE JUST CHANGED TO " + playerState);
        // start timer if the player is drawing
        let imagePath = playerState === "wait" ? "./game_sprites/wait.png" : "./game_sprites/freestyle.png";
        setTurnImage(imagePath);

        // ! HARDCODE THE TIME
        const drawTime = 5000;
        if (playerState === "draw") {
            console.log("SETTING DRAW TIME TIMER FOR " + drawTime + " ms");
            setStrokeHistory([])
            setTimeout(() => {
                console.log("DRAW TIMEOUT EXECUTED")
                setJustEndedDraw(true);
            }, drawTime)
        } else if (playerState === "play") {
            const playTime = drawTime * 1.5;
            console.log("SETTING PLAYTIME TIMER FOR " + playTime + " ms");
            setTimeout(() => {
                console.log("PLAYTIME TIMEOUT EXECUTED")
                socket.emit("endVerify");
            }, playTime)
        }

        if (playerState !== "draw") {
            setJustEndedDraw(false);

        }

        // wipe backendStrokeHistory if not in play phase
        if (playerState !== "play") {
            setBackendStrokeHistory([]);
        }
    }, [playerState]);

    // used to send drawings to backend with timer
    useEffect(() => {
        if (justEndedDraw && playerState === "draw") {
            console.log("Emitting the following stroke history to backend")
            console.log(strokeHistory);
            setJustEndedDraw(false);
            socket.emit("endTurn", strokeHistory);
        }
    }, [justEndedDraw, socket]);

    useEffect(() => {
        if (backendStrokeHistory.length > 0) {
            setPlayerState("play");
            // console.log("GOT THIS FROM SOCKET")
            // console.log(strokeHistory)
        }
    }, [backendStrokeHistory])

    // useEffect(() => {
    //     if (playerState === "wait") {
            // console.log("STROKE HISTORY CHANGED");
            // console.log(strokeHistory)
    //     }
    // }, [strokeHistory])

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
            flipDrawingKey(true);
            // console.log("Key down " + drawKey);
        }

        // if (key === "KeyW") {
        //     setPlayPhase(true);
        // }
    }


    function keysUp(e: KeyboardEvent) {
        const key = e.code;
        if (key === drawKey) {
            flipDrawingKey(false);
        }
    }

    useEffect(() => {
        // console.log(strokeHistory);
    }, [strokeHistory])

    return (
        <div>
            <Stage width={stageW} height={stageH} options={{ backgroundAlpha: 0 }} style={{ left: 0, position: "absolute" }} onPointerMove={(e: any) => {
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
                setStrokeHistory([...strokeHistory, coordinate.y]);


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
                <Sprite ref={stageRef} image={turnImage} x={100} y={100} />
                {
                    playerState === "play" ?
                        <PlayCanvas lastNonNull={lastNonNullPos} backendStrokeHistory={backendStrokeHistory} p2Pos={p2Pos} socket={socket} />
                        :
                        playerState === "wait" ?
                            <PassiveCanvas lastNonNull={lastNonNullPos} p2Pos={p2Pos} socket={socket} />
                            :
                            <DrawCanvas lastNonNull={lastNonNullPos} changeAnimatedStrokes={changeAnimatedStrokeHistory} animateHistory={animatedStrokeHistory} isDrawing={isDrawing} p2Pos={p2Pos} socket={socket} />}

            </Stage>
            <div className="SStage">
                {/* player 1 sprites */}
                <Stage width={400} height={700} options={{ backgroundAlpha: 0 }} id="SpriteStage">
                    {/* active sprites            */}
                    <AnimatedSprite animationSpeed={0.05} isPlaying={char1} images={["./game_sprites/char1.png", "./game_sprites/char1rap.png"]} anchor={0.01} visible={char1} />
                    <AnimatedSprite animationSpeed={0.05} isPlaying={char2} images={["./game_sprites/char2_frames/char2frame1.png", "./game_sprites/char2_frames/char2rap.png"]} anchor={0.01} visible={char2} />
                    <AnimatedSprite animationSpeed={0.05} isPlaying={char3} images={["./game_sprites/petrrap.png", "./game_sprites/petrrap2.png"]} anchor={[0.01, 0.2]} visible={char3} />
                    {/* not active sprites */}
                    {/* can change alpha to be dimmer */}
                    {/* <AnimatedSprite animationSpeed={0.05} isPlaying={char1} images={["./game_sprites/char1.png", "./game_sprites/char1frame2.png"]} anchor={0.01} visible = {true} alpha = {1} /> 
                        <AnimatedSprite animationSpeed={0.05} isPlaying={char2} images={["./game_sprites/char2_frames/char2frame1.png", "./game_sprites/char2_frames/char2frame3.png"]} anchor={0.01} visible={false}/>
                        <AnimatedSprite animationSpeed={0.05} isPlaying={char3} images={["./game_sprites/petrframe1.png", "./game_sprites/char3frame2.png"]} anchor={[0.01, 0.2]} visible={false}/>              */}
                </Stage>
                {/* player 2 sprites */}
                <Stage width={400} height={700} options={{ backgroundAlpha: 0 }} id="SpriteStage">
                    {/* active sprites            */}
                    <AnimatedSprite animationSpeed={0.05} isPlaying={otherchar1} images={["./game_sprites/char1.png", "./game_sprites/char1rap.png"]} anchor={0.01} visible={otherchar1} />
                    <AnimatedSprite animationSpeed={0.05} isPlaying={otherchar2} images={["./game_sprites/char2_frames/char2frame1.png", "./game_sprites/char2_frames/char2rap.png"]} anchor={0.01} visible={otherchar2} />
                    <AnimatedSprite animationSpeed={0.05} isPlaying={otherchar3} images={["./game_sprites/petrrap.png", "./game_sprites/petrrap2.png"]} anchor={[0.01, 0.2]} visible={otherchar3} />
                    {/* not active sprites           
                        <AnimatedSprite animationSpeed={0.05} isPlaying={false} images={["./game_sprites/char1.png", "./game_sprites/char1frame2.png"]} anchor={0.01} visible = {false}/> 
                        <AnimatedSprite animationSpeed={0.05} isPlaying={false} images={["./game_sprites/char2_frames/char2frame1.png", "./game_sprites/char2_frames/char2frame3.png"]} anchor={0.01} visible={false}/>
                        <AnimatedSprite animationSpeed={0.05} isPlaying={false} images={["./game_sprites/petrframe1.png", "./game_sprites/char3frame2.png"]} anchor={[0.01, 0.2]} visible={false}/>            */}
                </Stage>
            </div>
        </div>

    )
}

export default Game;