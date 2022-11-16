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

        window.addEventListener("keydown", keysDown);
        window.addEventListener("keyup", keysUp);
    }, []);

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


    return (
        <Stage width={stageW} height={stageH} onPointerMove={(e: any) => {
            // when we move, we want to add the coordinate to the array
            const coordinate = {
                // x: Math.floor(e.clientX - e.target.offsetLeft), // subtract to account for the stage position
                x: lockedX - e.target.offsetLeft,
                y: Math.floor(e.clientY - e.target.offsetTop)
            }
            // changeStrokeHistory([...strokeHistory, coordinate]);
            changeCurrCord(coordinate);
            // console.log([...nextStrokes, coordinate]);
            // console.log(currStrokes);
        }}>
            <Sprite ref={stageRef} image="./game_sprites/back.png" x={100} y={100} />
            <Canvas currCord={currCoord} isDrawing={isDrawing} changeStrokes={changeStrokeHistory} currHistory={strokeHistory} />
        </Stage>
    )
}

export default Game;