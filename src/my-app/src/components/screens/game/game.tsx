import { Stage, Sprite } from '@inlet/react-pixi'
import { useState, useEffect, useRef } from 'react';
import Canvas from './canvas/canvas';
import { Coordinate } from '../../../interfaces/interfaces';
import { lockedX } from './constants';

function Game() {
    // remember the strokes done
    const [strokeHistory, changeStrokeHistory] = useState<Coordinate[]>([]);
    const [isDrawing, flipDrawingKey] = useState<boolean>(false);
    const [currCoord, changeCurrCord] = useState<Coordinate>({ x: null, y: null });
    const [prevCoord, changePrevCord] = useState<Coordinate>({ x: null, y: null });
    const [lastNonNullPos, changeLastNonNullPos] = useState<Coordinate>({ x: null, y: null })
    const [loopInterval, changeLoopInterval] = useState<NodeJS.Timer>()
    const stageRef = useRef(null);

    // stage size
    const [stageW, changeW] = useState<number>(800);
    const [stageH, changeH] = useState<number>(600);

    useEffect(() => {
        // get the width of the screen
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        changeW(vw);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        changeH(vh);

        changeLastNonNullPos({ x: lockedX, y: vh / 2 });

        window.addEventListener("keydown", keysDown);
        window.addEventListener("keyup", keysUp);
        // loopPosition(isDrawing, prevCoord, currCoord);
        // window.addEventListener("mousemove", mouseInPlay);
    }, []);

    // when we change the drawing status, reset the looping
    useEffect(() => {
        // console.log(currCoord)
        if (loopInterval) {
            clearInterval(loopInterval);
            loopPosition(isDrawing, prevCoord, currCoord)
        }
    }, [isDrawing, prevCoord, currCoord])

    const drawKey = "Space"

    function keysDown(e: KeyboardEvent) {
        const key = e.code;
        if (key === drawKey) {
            flipDrawingKey(true);
            // console.log("Key down " + drawKey);
        }
    }

    function keysUp(e: KeyboardEvent) {
        const key = e.code;
        if (key === drawKey) {
            flipDrawingKey(false);
            // console.log("Key up " + drawKey);
        }
    }

    // function mouseInPlay(e: MouseEvent) {
    //     e.
    // }

    function loopPosition(isDrawing: boolean, prevCoord: Coordinate, currCoord: Coordinate) {
        // console.log("Resetting interval", isDrawing)
        const handler = setInterval(() => {
            if (isDrawing) {
                // console.log("Ui")
                // console.log(currCoord);
                // console.log(prevCoord)
                if (prevCoord.y && currCoord.y && prevCoord.x && currCoord.x) {
                    if (Math.abs(prevCoord.y - currCoord.y) <= 1) {
                        // standing still but trying to draw
                        console.log("STANDING STILL")
                        changeStrokeHistory([...strokeHistory, currCoord]);
                        // console.log("stading still?")
                    }
                }
                // if (currCoord.x === prevCoord.x && currCoord.y === prevCoord.y) {
                //     // trying to draw but not moving
                //     console.log("TRYING TO DRAW")
                //     let tinyCoord = currCoord;
                //     if (tinyCoord.x) {
                //         tinyCoord.x = tinyCoord.x + 0.00001;
                //         changeCurrCord(tinyCoord);
                //     }
                // }
            }
        }, 20);
        changeLoopInterval(handler);
    }


    return (
        <Stage width={stageW} height={stageH} onPointerMove={(e: any) => {
            // when we move, we want to add the coordinate to the array
            let coordinate: Coordinate = {
                // x: Math.floor(e.clientX - e.target.offsetLeft), // subtract to account for the stage position
                x: Math.floor(lockedX - e.target.offsetLeft),
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
            const newPrevCoord = strokeHistory.at(-1);
            if (newPrevCoord) {
                changePrevCord(newPrevCoord);
            }
            changeCurrCord(coordinate);
            changeStrokeHistory([...strokeHistory, coordinate]);
        }}>
            <Sprite ref={stageRef} image="./game_sprites/back.png" x={100} y={100} />
            <Canvas currCord={currCoord} lastNonNull={lastNonNullPos} changeStrokes={changeStrokeHistory} currHistory={strokeHistory} isDrawing={isDrawing} />
        </Stage>
    )
}

export default Game;